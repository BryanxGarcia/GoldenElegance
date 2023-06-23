namespace GoldenEleganceProyecto.Models.Helpers
{
    public record ConfirmacionCorreoDTO
    {
        public string Email { get; set; }
        public string EmailToken { get; set; }
    }
}
