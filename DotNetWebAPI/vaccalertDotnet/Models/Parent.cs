using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class Parent
    {
        public Parent()
        {
            Bookings = new HashSet<Booking>();
            Children = new HashSet<Child>();
        }

        public int Pid { get; set; }
        public int? Uid { get; set; }
        public string? Fname { get; set; }
        public string? Lname { get; set; }
        public string? Contact { get; set; }
        public string? Email { get; set; }
        public int? Paddress { get; set; }

        public virtual Address? PaddressNavigation { get; set; }
        public virtual User? UidNavigation { get; set; }
        public virtual ICollection<Booking>? Bookings { get; set; }
        public virtual ICollection<Child>? Children { get; set; }
    }
}
