using Server.Models;

namespace Server.Services.AppointmentService
{
    public interface IAppointmentService
    {
        public Task<ServiceResponse<Appointment>> CreateAsync(Appointment appointment);
        public ServiceResponse<Appointment> FindById(long id);
        public ServiceResponse<IEnumerable<Appointment>> FindAll();
        public Task<ServiceResponse<Appointment>> UpdateAsync(Appointment appointment);
        public Task<ServiceResponse<string>> DeleteAsync(long id);
    }
}
