using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class District
    {
        public District()
        {
            Addresses = new HashSet<Address>();
            Cities = new HashSet<City>();
        }

        public int? Did { get; set; }
        public string? Dname { get; set; }
        public int? Sid { get; set; }

        public virtual State? SidNavigation { get; set; }
        public virtual ICollection<Address>? Addresses { get; set; }
        public virtual ICollection<City>? Cities { get; set; }
    }
}
