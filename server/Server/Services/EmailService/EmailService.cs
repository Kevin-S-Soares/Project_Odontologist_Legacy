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

            message.From.Add(new MailboxAddress("no-reply", s_user));
            message.To.Add(new MailboxAddress("new user", email.To));

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
            /*
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(email.From));
            message.To.Add(MailboxAddress.Parse(email.To));
            message.Subject = email.Subject;
            message.Body = new TextPart(TextFormat.Html) { Text = email.Body };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync("alexzander.jakubowski@ethereal.email", "KT1UCAJTbxsfHt2AVZ");
            await smtp.SendAsync(message);
            */
            return new(data: true, statusCode: StatusCodes.Status200OK);
        }
    }
}
