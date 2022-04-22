using Application.Users;

namespace Application.Interfaces;

public interface IAuthenticationService
{
    Task<Login.LoginDto> Authenticate(Login.LoginCommand request);

}