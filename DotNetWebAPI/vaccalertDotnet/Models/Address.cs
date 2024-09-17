using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class Address
    {
        public Address()
        {
            Hospitals = new HashSet<Hospital>();
            Parents = new HashSet<Parent>();
        }

        public int Adid { get; set; }
        public int? State { get; set; }
        public int? District { get; set; }
        public int? City { get; set; }
        public int? Pincode { get; set; }
        public string? Area { get; set; }

        public virtual City? CityNavigation { get; set; }
        public virtual District? DistrictNavigation { get; set; }
        public virtual State? StateNavigation { get; set; }
        public virtual ICollection<Hospital>? Hospitals { get; set; }
        public virtual ICollection<Parent>? Parents { get; set; }
    }
}
