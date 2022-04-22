using System.Net;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts;

public class GetPost
{
    public class GetPostQuery: IRequest<Post>
    {
        public int PostId { get; set; }
    }
    
    public class GetPostQueryHandler: IRequestHandler<GetPostQuery, Post>
    {
        private readonly DataContext _context;

        public GetPostQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Post> Handle(GetPostQuery request, CancellationToken cancellationToken)
        {
            var post = await _context.Posts
                .Include(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == request.PostId, cancellationToken);

            if (post == null)
                throw new RestException(HttpStatusCode.NotFound, "Post not found");

            return post;
        }
    }
    
}