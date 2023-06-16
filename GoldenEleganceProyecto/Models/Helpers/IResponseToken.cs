namespace GoldenEleganceProyecto.Models.Helpers
{
    public class IResponseToken
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object HelperData { get; set; }
        public object Token { get; set; }
    }
}
