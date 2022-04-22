using Application.Interfaces;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Users;

public class Login
{
    public class LoginDto
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
    }
    public class LoginCommand: IRequest<LoginDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    
    public class LoginCommandValidator: AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
    
    public class LoginCommandHandler: IRequestHandler<LoginCommand, LoginDto>
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly DataContext _context;

        public LoginCommandHandler(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        public async Task<LoginDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            return await _authenticationService.Authenticate(request);
        }
    }
}