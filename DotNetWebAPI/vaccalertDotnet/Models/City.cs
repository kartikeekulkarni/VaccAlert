using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class City
    {
        public City()
        {
            Addresses = new HashSet<Address>();
        }

        public int Cityid { get; set; }
        public string? Cityname { get; set; }
        public int? Did { get; set; }

        public virtual District? DidNavigation { get; set; }
        public virtual ICollection<Address>? Addresses { get; set; }
    }
}
