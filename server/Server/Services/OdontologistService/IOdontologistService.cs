using Server.Models;

namespace Server.Services.OdontologistService
{
    public interface IOdontologistService
    {
        public Task<ServiceResponse<Odontologist>> CreateAsync(Odontologist odontologist);
        public ServiceResponse<Odontologist> FindById(long id);
        public ServiceResponse<IEnumerable<Odontologist>> FindAll();
        public Task<ServiceResponse<Odontologist>> UpdateAsync(Odontologist odontologist);
        public Task<ServiceResponse<string>> DeleteAsync(long id);
    }
}
