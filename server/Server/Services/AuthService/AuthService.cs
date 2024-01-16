using System.Security.Claims;

namespace Server.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetSID()
        {
            int result = 0;
            if (_httpContextAccessor.HttpContext is not null)
            {
                result = Convert.ToInt32(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid));
            }
            return result;
        }

        public bool IsAdmin()
        {
            bool condition = false;
            if (_httpContextAccessor.HttpContext is not null)
            {
                string role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
                condition = role.Equals("Admin");
            }
            return condition;
        }

        public bool IsOdontologist()
        {
            bool condition = false;
            if (_httpContextAccessor.HttpContext is not null)
            {
                string role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
                condition = role.Equals("Odontologist");
            }
            return condition;
        }

        public bool IsAttendant()
        {
            bool condition = false;
            if (_httpContextAccessor.HttpContext is not null)
            {
                string role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
                condition = role.Equals("Attendant");
            }
            return condition;
        }
    }
}
