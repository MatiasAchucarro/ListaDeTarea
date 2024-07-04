using Microsoft.EntityFrameworkCore;
using WebApiCine.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//crear una variable para la cadena de conexion
var connectionString = builder.Configuration.GetConnectionString("Connection");
//registrar servicio para la conexion

builder.Services.AddDbContext<PeliculasContext>(
    options => options.UseSqlServer(connectionString)
);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options=>
{
    options.AddPolicy("Cors", app =>
    {
        app.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("Cors");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
