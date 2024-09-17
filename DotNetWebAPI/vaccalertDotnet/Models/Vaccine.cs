using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class Vaccine
    {
        public Vaccine()
        {
            VaccineStocks = new HashSet<VaccineStock>();
        }

        public int Vid { get; set; }
        public string? VaccineName { get; set; }
        public string? Description { get; set; }
        public string? Dose { get; set; }
        public string? Route { get; set; }
        public string? Site { get; set; }
        public string? Whentogive { get; set; }

        public virtual ICollection<VaccineStock> VaccineStocks { get; set; }
    }
}
