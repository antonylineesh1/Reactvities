using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
                return await _mediator.Send(new List.Query(),ct);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Post(Create.Command activity)
        {
            return await _mediator.Send(activity);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Post(Guid id,Edit.Command activity)
        {
            activity.Id=id;
            return await _mediator.Send(activity);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {            
            return await _mediator.Send(new Delete.Command{Id=id});
        }
    }
}