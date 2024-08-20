using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class Hospital
    {
        public Hospital()
        {
            Bookings = new HashSet<Booking>();
            VaccineStocks = new HashSet<VaccineStock>();
        }

        public int Hid { get; set; }
        public int? Uid { get; set; }
        public string? Hname { get; set; }
        public string? Email { get; set; }
        public string? Url { get; set; }
        public int? Hadress { get; set; }
        public string? Contact { get; set; }
        public bool? Status { get; set; }

        public virtual Address? HadressNavigation { get; set; }
        public virtual User? UidNavigation { get; set; }
        public virtual ICollection<Booking>? Bookings { get; set; }
        public virtual ICollection<VaccineStock>? VaccineStocks { get; set; }
    }
}
