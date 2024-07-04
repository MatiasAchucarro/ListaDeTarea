namespace WebApiCine.Controllers.Molds
{
    public class Imagen
    {
        [key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
        public byte[] Value { get; set; }
       
    }
}
