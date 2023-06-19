namespace GoldenEleganceProyecto.Models.Helpers
{
    public class IResponseToken
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string HelperData { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
