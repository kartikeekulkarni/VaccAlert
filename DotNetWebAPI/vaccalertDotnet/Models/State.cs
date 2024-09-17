using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class State
    {
        public State()
        {
            Addresses = new HashSet<Address>();
            Districts = new HashSet<District>();
        }

        public int Sid { get; set; }
        public string? Sname { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<District> Districts { get; set; }
    }
}
