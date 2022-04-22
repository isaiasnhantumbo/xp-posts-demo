using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users;

public class ListUsers
{
    public class ListUsersQuery: IRequest<List<Domain.User>>
    {
    }
    
    public class ListUsersQueryHandler: IRequestHandler<ListUsersQuery, List<Domain.User>>
    {
        private readonly DataContext _context;

        public ListUsersQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.User>> Handle(ListUsersQuery request, CancellationToken cancellationToken)
        {
            return await _context.Users.ToListAsync(cancellationToken);
        }
    }
}