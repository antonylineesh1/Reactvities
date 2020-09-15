using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Category { get; set; }
            public string Description { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //mapping the data to entity
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity is null)
                    throw new Exception("Activity is not found");

                activity.Title = request.Title ?? activity.Title;
                activity.Category = request.Category ?? activity.Category;
                activity.Description = request.Description ?? activity.Description;
                activity.Date = request.Date ?? activity.Date;
                activity.City = request.City ?? activity.City;

                bool success = (await _context.SaveChangesAsync()) > 0;
                if (success)
                    return Unit.Value;
                throw new Exception("Not created some erorr occurs");
            }
        }
    }
}