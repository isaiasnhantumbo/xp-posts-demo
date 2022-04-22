using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Application.Errors;
using Application.Interfaces;
using Application.Users;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Infrastructure.Security;

public class AuthenticationService: IAuthenticationService
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;

    public AuthenticationService(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }
    private async Task<User?> AuthenticateUser(Login.LoginCommand loginRequest)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x =>
            x.Email.Trim().ToLower().Equals(loginRequest.Email.Trim().ToLower()));

        if (user == null) return null;

        return BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password) ? user : null;
    }
    
    public async Task<Login.LoginDto> Authenticate(Login.LoginCommand request)
    {
        var user = await AuthenticateUser(request);

            if (user == null) throw new RestException(HttpStatusCode.Unauthorized, "Invalid username or password!");
            
            //generate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            
    
            
            return new Login.LoginDto() 
            {
                Name = user.Name,
                Email = user.Email,
                Token = tokenString,
                UserId = user.Id
            };
    }
}