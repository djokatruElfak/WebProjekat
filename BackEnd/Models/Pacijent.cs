using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Pacijent
    {
        [Key]
        public int ID { get; set; }

        public String Ime { get; set; }

        public String Prezime { get; set; }

        public int godinaRodjenja { get; set; }

        public String dodatneInfo { get; set; }

        public int pacijentID { get; set; }

        
        public Krevet pacijentSpoj { get; set; }
    }
}