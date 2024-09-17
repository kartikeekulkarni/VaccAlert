using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class User
    {
        public User()
        {
            Hospitals = new HashSet<Hospital>();
            Parents = new HashSet<Parent>();
        }

        public int Uid { get; set; }
        public string? Uname { get; set; }
        public string? Password { get; set; }
        public int? Rid { get; set; }

        public virtual Role? RidNavigation { get; set; }
        public virtual ICollection<Hospital> Hospitals { get; set; }
        public virtual ICollection<Parent> Parents { get; set; }
    }
}
