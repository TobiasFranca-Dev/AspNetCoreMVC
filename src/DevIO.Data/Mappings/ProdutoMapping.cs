using DevIO.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DevIO.Data.Mappings
{
    public class ProdutoMapping : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            //Define a chave primaria
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                .IsRequired() // Define o campo como obrigatório
                .HasColumnType("varchar(200)"); //Define o tipo da coluna (varchar com tamanho de 200 caracteres)

            builder.Property(p => p.Descricao)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(p => p.Imagem)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.ToTable("Produtos"); //Define o nome da tabela no banco de dados
        }

    }
}
