using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Contexts
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext() { }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options) { }

        public virtual DbSet<Odontologist> Odontologists { get; set; } = default!;
        public virtual DbSet<Appointment> Appointments { get; set; } = default!;
        public virtual DbSet<Schedule> Schedules { get; set; } = default!;
        public virtual DbSet<BreakTime> BreakTimes { get; set; } = default!;
        public virtual DbSet<User> Users { get; set; } = default!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string? connectionString = Environment.GetEnvironmentVariable("connection_string");
            if (connectionString is not null)
            {
                optionsBuilder.UseSqlite(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Seed();
        }
    }
}
