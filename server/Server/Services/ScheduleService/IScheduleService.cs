using Server.Models;

namespace Server.Services.ScheduleService
{
    public interface IScheduleService
    {
        public Task<ServiceResponse<Schedule>> CreateAsync(Schedule schedule);
        public ServiceResponse<Schedule> FindById(long id);
        public ServiceResponse<IEnumerable<Schedule>> FindAll();
        public Task<ServiceResponse<Schedule>> UpdateAsync(Schedule schedule);
        public Task<ServiceResponse<string>> DeleteAsync(long id);
    }
}
