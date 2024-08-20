using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class Child
    {
        public Child()
        {
            Bookings = new HashSet<Booking>();
        }

        public int Cid { get; set; }
        public int? Pid { get; set; }
        public string? Cname { get; set; }
        public DateOnly? Dob { get; set; }
        public string? Gender { get; set; }

        public virtual Parent? PidNavigation { get; set; }
        public virtual ICollection<Booking>? Bookings { get; set; }
    }
}
