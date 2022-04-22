using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts;

public class CreatePost
{
    public class CreatePostCommand: IRequest<Post>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
    }
    
    public class CreatePostCommandValidator: AbstractValidator<CreatePostCommand>
    {
        public CreatePostCommandValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.ImageUrl).NotEmpty();
        }
    }
    
    public class CreatePostCommandHandler: IRequestHandler<CreatePostCommand, Post>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreatePostCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Post> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == _userAccessor.GetCurrentId(),
                cancellationToken);

            var post = new Post
            {
                Title = request.Title,
                Content = request.Content,
                ImageUrl = request.ImageUrl,
                DateCreated = DateTimeOffset.UtcNow,
                Author = user
            };

            await _context.Posts.AddAsync(post, cancellationToken);

            if (await _context.SaveChangesAsync(cancellationToken) > 0)
                return post;

            throw new Exception("Could not create post");
        }
    }
    
    
}