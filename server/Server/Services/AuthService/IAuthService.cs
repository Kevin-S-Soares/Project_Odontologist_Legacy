namespace Server.Services.AuthService
{
    public interface IAuthService
    {
        public bool IsAdmin();
        public bool IsOdontologist();
        public bool IsAttendant();
        public int GetSID();
    }
}
