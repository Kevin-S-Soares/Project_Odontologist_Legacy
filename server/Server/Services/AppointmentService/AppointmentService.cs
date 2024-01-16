using Server.Contexts;
using Server.Models;
using Server.Services.AuthService;

namespace Server.Services.AppointmentService
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ApplicationContext _context;
        private readonly AppointmentValidator _validator;
        private readonly IAuthService _authService;

        public AppointmentService(ApplicationContext context,
            IAuthService authService)
        {
            _context = context;
            _authService = authService;
            _validator = new(_context);
        }

        public async Task<ServiceResponse<Appointment>> CreateAsync(Appointment appointment)
        {
            if (_authService.IsAdmin() || _authService.IsAttendant()
                || (_authService.IsOdontologist() && IsOwner(appointment)))
            {
                var validator = _validator.Add(appointment);
                if (validator.IsValid is false)
                {
                    return new(errorMessage: validator.ErrorMessage,
                        statusCode: StatusCodes.Status400BadRequest);
                }
                await _context.Appointments.AddAsync(appointment);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message, StatusCodes.Status500InternalServerError);
                }
                return new(data: appointment, statusCode: StatusCodes.Status201Created);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public async Task<ServiceResponse<string>> DeleteAsync(long id)
        {
            var query = _context.Appointments.FirstOrDefault(x => x.Id == id);
            if (query is null)
            {
                return new(errorMessage: "Appointment does not exist",
                    statusCode: StatusCodes.Status404NotFound);
            }
            if (_authService.IsAdmin() || _authService.IsAttendant()
                || (_authService.IsOdontologist() && IsOwner(query)))
            {
                _context.Appointments.Remove(query);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message, statusCode: StatusCodes.Status500InternalServerError);
                }
                return new(data: "Appointment deleted", statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public ServiceResponse<IEnumerable<Appointment>> FindAll()
        {
            if (_authService.IsAdmin() || _authService.IsAttendant())
            {
                var result = _context.Appointments;
                return new(data: result, statusCode: StatusCodes.Status200OK);
            }
            if (_authService.IsOdontologist())
            {
                var appointments = _context.Appointments.Where(item => item.Schedule != null
                    && item.Schedule.OdontologistId == _authService.GetSID());
                return new(data: appointments,
                    statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        public ServiceResponse<Appointment> FindById(long id)
        {
            var query = _context.Appointments.FirstOrDefault(x => x.Id == id);
            if (query is null)
            {
                return new(errorMessage: "Appointment does not exist",
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

        public async Task<ServiceResponse<Appointment>> UpdateAsync(Appointment appointment)
        {
            if (_authService.IsAdmin() || _authService.IsAttendant()
                || (_authService.IsOdontologist() && IsOwner(appointment)))
            {
                bool condition = _context.Appointments.Any(x => x.Id == appointment.Id);
                if (condition is false)
                {
                    return new(errorMessage: "Appointment does not exist",
                         statusCode: StatusCodes.Status404NotFound);
                }
                var validator = _validator.Update(appointment);
                if (validator.IsValid is false)
                {
                    return new(errorMessage: validator.ErrorMessage,
                        statusCode: StatusCodes.Status400BadRequest);
                }
                try
                {
                    _context.Appointments.Update(appointment);
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return new(errorMessage: e.Message, StatusCodes.Status500InternalServerError);
                }
                return new(data: appointment, statusCode: StatusCodes.Status200OK);
            }
            return new(errorMessage: "Not authorized",
                statusCode: StatusCodes.Status403Forbidden);
        }

        private bool IsAuthorizedToUpdate()
        {
            return _authService.IsAdmin() || _authService.IsAttendant() || _authService.IsOdontologist();
        }

        private bool IsOwner(Appointment appointment)
        {
            var schedule = _context.Schedules.FirstOrDefault(item => item.Id == appointment.ScheduleId);
            return schedule != null && schedule.OdontologistId == _authService.GetSID();
        }
    }
}
