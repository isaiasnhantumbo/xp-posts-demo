using System.Net;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts;

public class DeletePost
{
    public class DeletePostCommand: IRequest<Post>
    {
        public int PostId { get; set; }
    }
    
    public class DeletePostCommandHandler: IRequestHandler<DeletePostCommand, Post>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public DeletePostCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Post> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _context.Posts
                .Include(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == request.PostId, cancellationToken);

            if (post == null)
                throw new RestException(HttpStatusCode.NotFound, "Post not found");
            
            if (post.Author.Id != _userAccessor.GetCurrentId())
                throw new RestException(HttpStatusCode.Forbidden, "You are not authorized to delete other users posts");
            
            _context.Posts.Remove(post);

            if (await _context.SaveChangesAsync(cancellationToken) > 0)
                return post;

            throw new Exception($"Could not delete post {request.PostId}");
        }
    }
}