
using Application.User;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            return await Mediator.Send(new ListUsers.ListUsersQuery ());
        }
        
        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> CreateUser(RegisterUser.RegisterUserCommand command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<ActionResult<Login.LoginDto>> Login(Login.LoginCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}