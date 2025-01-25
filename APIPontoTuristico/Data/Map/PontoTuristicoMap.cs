using APIPontoTuristico.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace APIPontoTuristico.Data.Map
{
    public class PontoTuristicoMap : IEntityTypeConfiguration<PontoTuristicoModel>
    {
        public void Configure(EntityTypeBuilder<PontoTuristicoModel> builder)
        {
            // Chave primária
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Nome).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Descricao).IsRequired().HasMaxLength(100);
            builder.Property(x => x.CriadoEm).IsRequired();
            builder.Property(x => x.Estado).IsRequired().HasMaxLength(2);
            builder.Property(x => x.Cidade).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Localizacao).IsRequired().HasMaxLength(150);
        }
    }
}
