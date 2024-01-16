using Server.Models.Requests;

namespace Server.Services.UserService
{
    public interface IUserService
    {
        public Task<ServiceResponse<UserRegisterRequest>> RegisterAsync(UserRegisterRequest request);
        public Task<ServiceResponse<string>> VerifyAsync(string token);
        public Task<ServiceResponse<string>> ForgetPasswordAsync(string email);
        public Task<ServiceResponse<string>> ResetPasswordAsync(UserResetPasswordRequest request);
        public ServiceResponse<string> Login(UserLoginRequest request);
    }
}
