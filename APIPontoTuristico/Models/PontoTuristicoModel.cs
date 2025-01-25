using System.ComponentModel.DataAnnotations;

namespace APIPontoTuristico.Models
{
    public class PontoTuristicoModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="É necessário informar a localização.")]
        [StringLength(150, ErrorMessage = "Foi ultrapassado o límite de caracteres do campo de localização. (máx. 150)")]
        public string? Localizacao { get; set; }


        [Required(ErrorMessage = "É necessário informar a descrição do ponto turístico.")]
        [StringLength(100, ErrorMessage = "Foi ultrapassado o límite de caracteres do campo de descrição. (máx. 100)")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "É necessário informar a cidade do ponto turístico.")]
        [StringLength(50, ErrorMessage = "Foi ultrapassado o límite de caracteres do campo de cidade. (máx. 50)")]
        public string? Cidade { get; set; }

        [Required(ErrorMessage = "É necessário informar o estado do ponto turístico.")]
        [StringLength(2, ErrorMessage = "Use a sigla do estado. Por exemplo: SP.")]
        public string? Estado { get; set; }
        public DateTime? CriadoEm { get; set; }


        [Required(ErrorMessage = "É necessário informar o nome do ponto turístico.")]
        [StringLength(100, ErrorMessage = "Foi ultrapassado o límite de caracteres do campo de nome. (máx. 100)")]
        public string Nome { get; set; }
    }
}
