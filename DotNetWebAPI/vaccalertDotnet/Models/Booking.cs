using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class Booking
    {
        public int Bkid { get; set; }
        public DateOnly? BkDate { get; set; }
        public DateOnly? AptDate { get; set; }
        public int? Hid { get; set; }
        public int? Pid { get; set; }
        public int? Cid { get; set; }
        public int? Vid { get; set; }
        public string? Status { get; set; }

        public virtual Child? CidNavigation { get; set; }
        public virtual Hospital? HidNavigation { get; set; }
        public virtual Parent? PidNavigation { get; set; }
    }
}
