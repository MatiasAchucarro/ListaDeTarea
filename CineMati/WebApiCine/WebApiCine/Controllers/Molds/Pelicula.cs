namespace WebApiCine.Controllers.Molds
{
    public class Pelicula
    {
        [key]
        public int Id { get; set; }
        public int ImagenId { get; set; }
        public string Titles { get; set; }
        public string Description { get; set; }
        public  Imagen Imagen { get; set; }
    }
}
