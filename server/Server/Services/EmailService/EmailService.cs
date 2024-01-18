using MailKit.Net.Smtp;
using MimeKit;
using Server.Models;

namespace Server.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private static string s_smtp = Environment.GetEnvironmentVariable("smtp_host") ?? "";
        private static string s_user = Environment.GetEnvironmentVariable("smtp_user") ?? "";
        private static string s_password = Environment.GetEnvironmentVariable("smtp_password") ?? "";

        public ServiceResponse<bool> SendEmail(Email email)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<bool>> SendEmailAsync(Email email)
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Control Panel", s_user));
            message.To.Add(new MailboxAddress(email.To, email.To));

            message.Subject = email.Subject;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = email.Body
            };

            using var smtp = new SmtpClient();
            smtp.Connect(s_smtp, 587, false);

            smtp.Authenticate(s_user, s_password);

            smtp.Send(message);
            smtp.Disconnect(true);
            
            return new(data: true, statusCode: StatusCodes.Status200OK);
        }
    }
}
