using Server.Models;

namespace Server.Services.EmailService
{
    public class EmailFactory
    {

        private static string s_user = Environment.GetEnvironmentVariable("smtp_user") ?? "";
        private static string s_client = Environment.GetEnvironmentVariable("client") ?? "";


        public static Email CreateEmailFromNewUser(User user)
        {
            return new()
            {
                To = user.Email,
                From = s_user,
                Subject = "Your account has been registered!",
                Body = $"<p>You have been registered successfully. Click in the link below to complete the registration.</p><br><a href=\"{"http://" + s_client + "/user/verify?token=" + user.VerificationToken!}\">Complete the registration</a>"
            };
        }

        public static Email CreateEmailFromForgetPassword(User user)
        {
            return new()
            {
                To = user.Email,
                From = s_user,
                Subject = "Reset password.",
                Body = $"<p>You have requested to reset your password. Click in the link below to reset your password.</p><br><a href=\"{"http://" + s_client + "/user/reset_password?token=" + user.PasswordResetToken! }\">Reset password</a>"
            };
        }
    }
}
