using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using WebApiCine.Context;
using WebApiCine.Controllers.Molds;
using WebApiCine.Dto;


namespace WebApiCine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private readonly PeliculasContext _context;

        public PeliculasController(PeliculasContext context)
        {
            _context = context;
        }

        // GET: api/Peliculas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pelicula>>> GetPeliculas()
        {
            return await _context.Pelicula.Include(x => x.Imagen).ToListAsync();
        }

        // GET: api/Peliculas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pelicula>> GetPeliculas(int id)
        {
            var peliculas = await _context.Pelicula.FindAsync(id);

            if (peliculas == null)
            {
                return NotFound();
            }

            return peliculas;
        }

        

       

// POST: api/Peliculas
// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
[HttpPost]
        public  ActionResult<Pelicula>  CreatePelicula(PeliculaInput peliculaDto)
        {
            if (peliculaDto.Imagen == null || peliculaDto.Imagen.Value == null)
            {
                return BadRequest("Imagen data is required");
            }
                byte[] Bytes = Convert.FromBase64String(peliculaDto.Imagen.Value);

            var imagen = new Imagen()
            {
                Name = peliculaDto.Imagen.Name,
                Extension = peliculaDto.Imagen.Extension,
                Value = Bytes

            };
            _context.Imagen.Add(imagen);
            _context.SaveChanges();

            var Pelicula = new Pelicula()
            {
                Titles = peliculaDto.Titles,
                Description= peliculaDto.Description,
                ImagenId = imagen.Id,

        };
          


            _context.Pelicula.Add(Pelicula);
            _context.SaveChanges();

            return Pelicula;
        }



        // DELETE: api/Peliculas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePeliculas(int id)
        {
            var peliculas = await _context.Pelicula.FindAsync(id);
            if (peliculas == null)
            {
                return NotFound();
            }

            _context.Pelicula.Remove(peliculas);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool PeliculasExists(int id)
        {
            return _context.Pelicula.Any(e => e.Id == id);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PeliculaInput updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPelicula = await _context.Pelicula.FindAsync(id);
            if (existingPelicula == null)
            {
                return NotFound();
            }

            try
            {
             
                existingPelicula.Titles = updateDto.Titles ?? existingPelicula.Titles;
                existingPelicula.Description = updateDto.Description ?? existingPelicula.Description;

               
                
                // Actualizar la imagen de la película si se proporciona
                if (updateDto.Imagen != null)
                {
                    byte[] imagenBytes;
                    try
                    {
                        imagenBytes = Convert.FromBase64String(updateDto.Imagen.Value);
                    }
                    catch (FormatException)
                    {
                        return BadRequest("Datos de imagen inválidos: No se puede decodificar la cadena Base64.");
                    }

                    if (!ValidateImageContent(imagenBytes))
                    {
                        return BadRequest("Datos de imagen inválidos: Error en la validación del contenido de la imagen.");
                    }

                    // Actualizar la imagen de la película
                    var existingImagen = await _context.Imagen.FindAsync(id);
                    if (existingImagen == null)
                    {
                        // Crear una nueva imagen si no existe
                        existingImagen = new Imagen
                        {
                            Id = id,
                            Value = imagenBytes,
                            Name = updateDto.Imagen.Name,
                            Extension = updateDto.Imagen.Extension
                        };
                        _context.Imagen.Add(existingImagen);
                    }
                    else
                    {
                        // Actualizar la imagen existente
                        existingImagen.Value = imagenBytes;
                        existingImagen.Name = updateDto.Imagen.Name ?? existingImagen.Name;
                        existingImagen.Extension = updateDto.Imagen.Extension ?? existingImagen.Extension;
                        _context.Imagen.Update(existingImagen);
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(existingPelicula);
            }
            catch (DbUpdateException ex)
            {
                // Registrar la excepción (ex) aquí si se configura el registro
                return StatusCode(500, "Se produjo un error de base de datos al actualizar la película y la imagen.");
            }
            catch (Exception ex)
            {
                // Registrar la excepción (ex) aquí si se configura el registro
                return StatusCode(500, "Se produjo un error inesperado.");
            }
        }

        private bool ValidateImageContent(byte[] imageBytes)
        {
            // Implementar la lógica de validación de la imagen real aquí
            return true;
        }
    }



}



