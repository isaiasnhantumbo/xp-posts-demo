using Application.Posts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PostsController : BaseController
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<Post>>> ListAllPosts()
    {
        return await Mediator.Send(new ListAllPosts.ListAllPostsQuery());
    }
    
    [HttpGet("user-posts")]
    public async Task<ActionResult<List<Post>>> ListUserPosts()
    {
        return await Mediator.Send(new ListPostsByLoggedInUser.ListPostsByLoggedInUserQuery());
    }
    
    [HttpGet("{postId}")]
    public async Task<ActionResult<Post>> GetPost(int postId)
    {
        return await Mediator.Send(new GetPost.GetPostQuery{ PostId = postId});
    }

    [HttpPost]
    public async Task<ActionResult<Post>> CreatePost(CreatePost.CreatePostCommand command)
    {
        return await Mediator.Send(command);
    }
    
    [HttpPut("{postId}")]
    public async Task<ActionResult<Post>> UpdatePost(int postId, EditPost.EditPostCommand command)
    {
        command.PostId = postId;
        return await Mediator.Send(command);
    }

    [HttpDelete("{postId}")]
    public async Task<ActionResult<Post>> DeletePost(int postId)
    {
        return await Mediator.Send(new DeletePost.DeletePostCommand { PostId = postId});
    }
}