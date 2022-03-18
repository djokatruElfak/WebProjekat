using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class Doktor {
        public int ID { get; set; }
        public String ime { get; set; }
        public String prezime { get; set; }

        [JsonIgnore]
        public Bolnica bolnica { get; set; }

        public int kapacitet { get; set; }

        public int brUzetihPacijenata { get; set; }

        [JsonIgnore]
        public List<Krevet> kreveti { get; set; }
    }
}