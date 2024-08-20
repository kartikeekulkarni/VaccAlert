using System;
using System.Collections.Generic;

namespace vaccalertDotnet.Models
{
    public partial class VaccineStock
    {
        public int Vsid { get; set; }
        public int? Hid { get; set; }
        public int? Vid { get; set; }
        public int? Stock { get; set; }

        public virtual Hospital? HidNavigation { get; set; }
        public virtual Vaccine? VidNavigation { get; set; }
    }
}
