using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Bolest
    {
        [Key]
        public int ID { get; set; }

        public String nazivBolesti { get; set; }

        public String simptomi { get; set; }

        [JsonIgnore]
        public List<Krevet> bolestSpoj { get; set; }
    }
}