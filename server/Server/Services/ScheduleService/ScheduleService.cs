using Server.Contexts;
using Server.Models;
using Server.Services.AuthService;

namespace Server.Services.ScheduleService
{
    public class ScheduleService : IScheduleService
    {
        private readonly ApplicationContext _context;
        private readonly IAuthService _authService;
        private readonly ScheduleValidator _scheduleValidator;

        public ScheduleService(ApplicationContext context,
            IAuthService authService)
        {
            _context = context;
            _authService = authService;
            _scheduleValidator = new(_context);
        }

        public async Task<ServiceResponse<Schedule>> CreateAsync(Schedule schedule)
        {
            if (_authService.IsAdmin() || (_authService.IsOdontologist() && IsOwner(schedule)))
            {
                var validator = _scheduleValidator.Add(schedule);
                if (validator.IsValid is false)
                {
                    return new(errorMessage: validator.ErrorMessage,
                        statusCode: StatusCodes.Status400BadRequest);
                }
                try
                {
                    await _context.Schedules.AddAsync(schedule);
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message,
                        statusCode: StatusCodes.Status500InternalServerError);
                }
                return new(data: schedule, statusCode: StatusCodes.Status201Created);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public async Task<ServiceResponse<string>> DeleteAsync(long id)
        {
            var query = _context.Schedules.FirstOrDefault(x => x.Id == id);
            if (query is null)
            {
                return new(errorMessage: "Schedule does not exist",
                    statusCode: StatusCodes.Status404NotFound);
            }
            if (_authService.IsAdmin() || (_authService.IsOdontologist() && IsOwner(query)))
            {
                _context.Schedules.Remove(query);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message,
                        statusCode: StatusCodes.Status500InternalServerError);
                }
                return new(data: "Schedule deleted", statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public ServiceResponse<IEnumerable<Schedule>> FindAll()
        {
            if (_authService.IsAdmin() || _authService.IsAttendant())
            {
                var result = _context.Schedules;
                return new(data: result, statusCode: StatusCodes.Status200OK);
            }
            if (_authService.IsOdontologist())
            {
                var schedules = _context.Schedules.Where(x => x.OdontologistId == _authService.GetSID());
                return new(data: schedules,
                    statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public ServiceResponse<Schedule> FindById(long id)
        {
            var query = _context.Schedules.FirstOrDefault(x => x.Id == id);
            if (query is null)
            {
                return new(errorMessage: "Schedule does not exist",
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

        public async Task<ServiceResponse<Schedule>> UpdateAsync(Schedule schedule)
        {
            if (_authService.IsAdmin() || (_authService.IsOdontologist() && IsOwner(schedule)))
            {
                bool condition = _context.Schedules.Any(x => x.Id == schedule.Id);
                if (condition is false)
                {
                    return new(errorMessage: "Schedule does not exist",
                        statusCode: StatusCodes.Status404NotFound);
                }
                var validator = _scheduleValidator.Update(schedule);
                if (validator.IsValid is false)
                {
                    return new(errorMessage: validator.ErrorMessage,
                        statusCode: StatusCodes.Status400BadRequest);
                }
                try
                {
                    _context.Schedules.Update(schedule);
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message,
                        statusCode: StatusCodes.Status500InternalServerError);
                }
                return new(data: schedule, statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        private bool IsOwner(Schedule schedule)
        {
            return schedule.OdontologistId == _authService.GetSID();
        }
    }
}
