using System.Net;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts;

public class EditPost
{
    public class EditPostCommand: IRequest<Post>
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
    }
    
    public class EditPostCommandValidator: AbstractValidator<EditPostCommand>
    {
        public EditPostCommandValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.ImageUrl).NotEmpty();
        }
    }
    
    public class EditPostCommandHandler: IRequestHandler<EditPostCommand, Post>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public EditPostCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Post> Handle(EditPostCommand request, CancellationToken cancellationToken)
        {
            var post = await _context.Posts
                .Include(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == request.PostId, cancellationToken);

            if (post == null)
                throw new RestException(HttpStatusCode.NotFound, "Post not found");

            if (post.Author.Id != _userAccessor.GetCurrentId())
                throw new RestException(HttpStatusCode.Forbidden, "You are not authorized to edit other users posts");

            post.Title = request.Title;
            post.Content = request.Content;
            post.ImageUrl = request.ImageUrl;

            if (await _context.SaveChangesAsync(cancellationToken) > 0)
                return post;

            throw new Exception("Could not update post");
        }
    }
}