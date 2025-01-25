namespace APIPontoTuristico.Models
{
    public class PontoTuristicoModel
    {
        public int Id { get; set; }
        public string? Localizacao { get; set; }
        public string? Descricao { get; set; }
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        public DateTime? CriadoEm { get; set; }
        public object Nome { get; internal set; }
    }
}
