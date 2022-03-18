using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Krevet
    {
        [Key]
        public int ID { get; set; }

        public int krevetID { get; set; }

        public int x { get; set; }

        public int y { get; set; }

        [JsonIgnore]
        public Bolnica bolnica { get; set; }

        // [JsonIgnore]
        public Bolest bolest { get; set; }

        // [ForeignKey("KrevetPacijentFK")]
        [JsonIgnore]
        public Pacijent pacijent { get; set; }
        [JsonIgnore]
        public Doktor doktor {get; set;}
    }
}