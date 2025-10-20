using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Leads.Api.Models
{
    public class Lead
    {
        [Key]
        public int Id { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        [Required, MaxLength(100)]
        public string Suburb { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que 0.")]
        public decimal Price { get; set; }

        public string Status { get; set; } = "Invited";

        // Dados do Contato
        [Required, MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(150)]
        public string? FullName { get; set; }

        [Phone]
        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string? Email { get; set; }
    }
}
