using Server.Contexts;
using Server.Models;
using Server.Services.AuthService;

namespace Server.Services.BreakTimeService
{
    public class BreakTimeService : IBreakTimeService
    {
        private readonly ApplicationContext _context;
        private readonly BreakTimeValidator _validator;
        private readonly IAuthService _authService;

        public BreakTimeService(ApplicationContext context,
            IAuthService authService)
        {
            _context = context;
            _authService = authService;
            _validator = new(_context);
        }

        public async Task<ServiceResponse<BreakTime>> CreateAsync(BreakTime breakTime)
        {
            if (_authService.IsAdmin() || (_authService.IsOdontologist() && IsOwner(breakTime)))
            {
                var validator = _validator.Add(breakTime);
                if (validator.IsValid is false)
                {
                    return new(errorMessage: validator.ErrorMessage,
                        statusCode: StatusCodes.Status400BadRequest);
                }
                try
                {
                    await _context.BreakTimes.AddAsync(breakTime);
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message,
                        statusCode: StatusCodes.Status500InternalServerError);
                }
                return new(data: breakTime, statusCode: StatusCodes.Status201Created);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public async Task<ServiceResponse<string>> DeleteAsync(long id)
        {
            var query = _context.BreakTimes.FirstOrDefault(x => x.Id == id);
            if (query is null)
            {
                return new(errorMessage: "BreakTime does not exist",
                    statusCode: StatusCodes.Status404NotFound);
            }
            if (_authService.IsAdmin() || (_authService.IsOdontologist() && IsOwner(query)))
            {
                _context.BreakTimes.Remove(query);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message,
                        statusCode: StatusCodes.Status500InternalServerError);
                }
                return new(data: "BreakTime deleted", statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public ServiceResponse<IEnumerable<BreakTime>> FindAll(long? scheduleId, string? name, DayOfWeek? startDay, TimeSpan? startTime, DayOfWeek? endDay, TimeSpan? endTime)
        {
            if (_authService.IsAdmin() || _authService.IsAttendant())
            {
                var breakTimes = _context.BreakTimes;
                var result = ApplyFilters(breakTimes, scheduleId, name, startDay, startTime, endDay, endTime);
                return new(data: result, statusCode: StatusCodes.Status200OK);

            }
            if (_authService.IsOdontologist())
            {
                var breakTimes = _context.BreakTimes.Where(item => item.Schedule != null
                    && item.Schedule.OdontologistId == _authService.GetSID());
                var result = ApplyFilters(breakTimes, scheduleId, name, startDay, startTime, endDay, endTime);
                return new(data: result,
                    statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public ServiceResponse<BreakTime> FindById(long id)
        {
            var query = _context.BreakTimes.FirstOrDefault(x => x.Id == id);
            if (query is null)
            {
                return new(errorMessage: "BreakTime does not exist",
                    statusCode: StatusCodes.Status404NotFound);
            }
            if (_authService.IsAdmin() || _authService.IsAttendant()
                || (_authService.IsOdontologist() && IsOwner(query)))
            {
                return new(data: query, statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public async Task<ServiceResponse<BreakTime>> UpdateAsync(BreakTime breakTime)
        {
            if (_authService.IsAdmin() || (_authService.IsOdontologist() && IsOwner(breakTime)))
            {
                bool condition = _context.BreakTimes.Any(x => x.Id == breakTime.Id);
                if (condition is false)
                {
                    return new(errorMessage: "BreakTime does not exist",
                        statusCode: StatusCodes.Status404NotFound);
                }
                var validator = _validator.Update(breakTime);
                if (validator.IsValid is false)
                {
                    return new(errorMessage: validator.ErrorMessage,
                        statusCode: StatusCodes.Status400BadRequest);
                }
                try
                {
                    _context.BreakTimes.Update(breakTime);
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message,
                        statusCode: StatusCodes.Status500InternalServerError);
                }
                return new(data: breakTime, statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        private bool IsOwner(BreakTime breakTime)
        {
            var schedule = _context.Schedules.FirstOrDefault(item => item.Id == breakTime.ScheduleId);
            return schedule != null && schedule.OdontologistId == _authService.GetSID();
        }

        private IQueryable<BreakTime> ApplyFilters(IQueryable<BreakTime> list, long? scheduleId, string? name, DayOfWeek? startDay, TimeSpan? startTime, DayOfWeek? endDay, TimeSpan? endTime)
        {
            var result = list.AsQueryable();
            if (scheduleId.HasValue)
            {
                result = result.Where(item => item.ScheduleId == scheduleId);
            }
            if(name is not null)
            {
                result = result.Where(item => item.Name == name);
            }
            if (startDay.HasValue)
            {
                result = result.Where(item => item.StartDay == startDay);
            }
            if (startTime.HasValue)
            {
                result = result.Where(item => item.StartTime == startTime);
            }
            if (endDay.HasValue)
            {
                result = result.Where(item => item.EndDay == endDay);
            }
            if(endTime.HasValue)
            {
                result = result.Where(item => item.EndTime == endTime);
            }

            return result;
        }
    }
}
