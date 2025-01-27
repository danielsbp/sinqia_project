using APIPontoTuristico.Data;
using APIPontoTuristico.Repositories;
using APIPontoTuristico.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace APIPontoTuristico
{
    public class Program
    {   
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirTudo", policy =>
                {
                    policy.AllowAnyOrigin()  
                          .AllowAnyMethod()  
                          .AllowAnyHeader(); 
                });
            });

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddEntityFrameworkSqlServer().AddDbContext<PontoTuristicoDBContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase"))    
            );

            builder.Services.AddScoped<IPontoTuristicoRepository, PontoTuristicoRepository>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.UseCors("PermitirTudo");

            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PontoTuristicoDBContext>();
                context.Database.Migrate();
            }
            app.Run();
        }
    }
}
