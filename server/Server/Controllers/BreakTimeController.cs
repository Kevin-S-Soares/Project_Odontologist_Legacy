﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services.BreakTimeService;

namespace Server.Controllers
{
    [ApiController, Route("api/[controller]"), Authorize]
    public class BreakTimeController : ControllerBase
    {
        private readonly IBreakTimeService _service;

        public BreakTimeController(IBreakTimeService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult Get(long? scheduleId, string? name, DayOfWeek? startDay, TimeSpan? startTime, DayOfWeek? endDay, TimeSpan? endTime)
        {
            return _service.FindAll(scheduleId, name, startDay, startTime, endDay, endTime);
        }

        [HttpGet("{id}")]
        public ActionResult Get(long id)
        {
            return _service.FindById(id);
        }

        [HttpPost]
        public async Task<ActionResult> Post(BreakTime breakTime)
        {
            return await _service.CreateAsync(breakTime);
        }

        [HttpPut]
        public async Task<ActionResult> Put(BreakTime breakTime)
        {
            return await _service.UpdateAsync(breakTime);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(long id)
        {
            return await _service.DeleteAsync(id);
        }
    }
}
