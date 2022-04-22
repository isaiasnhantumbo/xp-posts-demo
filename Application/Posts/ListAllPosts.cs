using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts;

public class ListAllPosts
{
    public class ListAllPostsQuery: IRequest<List<Post>>
    {
    }
    
    public class ListAllPostsQueryHandler: IRequestHandler<ListAllPostsQuery, List<Post>>
    {
        private readonly DataContext _context;

        public ListAllPostsQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Post>> Handle(ListAllPostsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Posts.Include(x => x.Author).ToListAsync(cancellationToken);
        }
    }
}