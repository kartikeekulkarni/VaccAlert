using BCrypt.Net;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vaccalertDotnet.Models;

namespace vaccalertDotnet.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> RegisterParent(Parent parent)
        {
            using (var db = new vaccalertContext())
            {
                User username = db.Users.Where(u => u.Uname == parent.UidNavigation.Uname).FirstOrDefault();
                if (username != null) { return Unauthorized(new { message = "Username already in Used try differrent" }); }

                Parent mail = db.Parents.Where(u => u.Email == parent.Email).FirstOrDefault();
                if (mail != null) { return Unauthorized(new { message = "Email already Used" }); }

                parent.UidNavigation.Password = BCrypt.Net.BCrypt.HashPassword(parent.UidNavigation.Password);
                db.Parents.Add(parent);
                db.SaveChanges();
                return Ok(new { message = "successfull" });
            }

        }

        [HttpPost]
        public async Task<IActionResult> RegisterHospital(Hospital hospital)
        {
            using (var db = new vaccalertContext())
            {
                User username = db.Users.Where(u => u.Uname == hospital.UidNavigation.Uname).FirstOrDefault();
                if (username != null) { return Unauthorized(new { message = "Username already in Used try differrent" }); }

                Hospital mail = db.Hospitals.Where(u => u.Email == hospital.Email).FirstOrDefault();
                if (mail != null) { return Unauthorized(new { message = "Email already Used" }); }


                hospital.UidNavigation.Password = BCrypt.Net.BCrypt.HashPassword(hospital.UidNavigation.Password);
                db.Hospitals.Add(hospital);
                db.SaveChanges();
                return Ok(new { message = "successfull" });
            }

        }

        [HttpPost("{hospitalId}")]
        public IActionResult ApproveHospital(int hospitalId)
        {
            using (var db = new vaccalertContext())
            {
                var hospital = db.Hospitals.FirstOrDefault(h => h.Hid == hospitalId);
                if (hospital == null)
                {
                    return NotFound(new { message = "Hospital not found." });
                }

                hospital.Status = true;
                db.SaveChanges();

                return Ok(new { message = "Hospital approved successfully." });
            }
        }
        [HttpDelete("{hospitalId}")]
        public IActionResult RejectHospital(int hospitalId)
        {
            using (var db = new vaccalertContext())
            {
                // Find the hospital by ID
                var hospital = db.Hospitals
                                 .Include(h => h.HadressNavigation)  // Ensure HadressNavigation is loaded
                                 .FirstOrDefault(h => h.Hid == hospitalId);

                // Check if the hospital exists
                if (hospital == null)
                {
                    return NotFound(new { message = "Hospital not found." });
                }

                // Find the associated user and address
                var user = hospital.Uid.HasValue ? db.Users.FirstOrDefault(u => u.Uid == hospital.Uid) : null;
                var address = hospital.HadressNavigation != null ? db.Addresses.FirstOrDefault(a => a.Adid == hospital.HadressNavigation.Adid) : null;

                // Remove user and address if they exist
                if (user != null)
                {
                    db.Users.Remove(user);
                }

                if (address != null)
                {
                    db.Addresses.Remove(address);
                }

                // Remove the hospital from the database
                db.Hospitals.Remove(hospital);

                // Save changes to the database
                db.SaveChanges();

                return Ok(new { message = "Hospital rejected and deleted successfully." });
            }
        }


        [HttpGet]
        public IActionResult GetPendingHospitals()
        {
            using (var db = new vaccalertContext())
            {
                var pendingHospitals = db.Hospitals
                    .Where(h => h.Status == false)
                    .ToList();

                return Ok(pendingHospitals);
            }
        }
    }
}
