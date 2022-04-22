using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts;

public class ListPostsByLoggedInUser
{
    public class ListPostsByLoggedInUserQuery: IRequest<List<Post>>
    {
    }
    
    public class ListPostsByLoggedInUserQueryHandler: IRequestHandler<ListPostsByLoggedInUserQuery, List<Post>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public ListPostsByLoggedInUserQueryHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<List<Post>> Handle(ListPostsByLoggedInUserQuery request, CancellationToken cancellationToken)
        {
            return await _context.Posts
                .Where(x => x.Author.Id == _userAccessor.GetCurrentId())
                .Include(x => x.Author).ToListAsync(cancellationToken);
        }
    }
}