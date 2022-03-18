using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Bolnica {

        [Key]
        public int ID { get; set; }

        public String naziv { get; set; }

        public int duzina { get; set; }

        public int sirina { get; set; }

        public List<Krevet> bolnicaSpoj { get; set; }

        public List<Doktor> doktori { get; set; }
    }
}