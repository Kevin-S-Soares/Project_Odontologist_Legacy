using Server.Models;

namespace Server.Services.BreakTimeService
{
    public interface IBreakTimeService
    {
        public Task<ServiceResponse<BreakTime>> CreateAsync(BreakTime breakTime);
        public ServiceResponse<BreakTime> FindById(long id);
        public ServiceResponse<IEnumerable<BreakTime>> FindAll(long? scheduleId, string? name, DayOfWeek? startDay, TimeSpan? startTime, DayOfWeek? endDay, TimeSpan? endTime);
        public Task<ServiceResponse<BreakTime>> UpdateAsync(BreakTime breakTime);
        public Task<ServiceResponse<string>> DeleteAsync(long id);
    }
}
