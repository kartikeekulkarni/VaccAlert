using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using UserLoginService.Models;

namespace UserLoginService.Controllers
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
                var username = db.Users.Where(u => u.Uname == parent.UidNavigation.Uname).FirstOrDefault();
                if (username != null) { return Unauthorized(new { message = "UserName already Used" }); }

                Parent mail = db.Parents.Where(u => u.Email == parent.Email).FirstOrDefault();
                if (mail != null) { return Unauthorized(new { message = "Email already Used" }); }

                parent.UidNavigation.Password = BCrypt.Net.BCrypt.HashPassword(parent.UidNavigation.Password);
                db.Parents.Add(parent);
                await db.SaveChangesAsync();
                return Ok();
            }

        }

        [HttpPost]
        public async Task<IActionResult> RegisterHospital(Hospital hospital)
        {
            using (var db = new vaccalertContext())
            {
                // Check if UidNavigation is null
                if (hospital.UidNavigation == null)
                {
                    return BadRequest(new { message = "User information is required." });
                }

                // Check if the username already exists
                User username = db.Users.FirstOrDefault(u => u.Uname == hospital.UidNavigation.Uname);
                if (username != null)
                {
                    return Unauthorized(new { message = "Username already used." });
                }

                // Check if the email already exists
                Hospital mail = db.Hospitals.FirstOrDefault(u => u.Email == hospital.Email);
                if (mail != null)
                {
                    return Unauthorized(new { message = "Email already used." });
                }

                // Hash the password if it's not null
                if (!string.IsNullOrEmpty(hospital.UidNavigation.Password))
                {
                    hospital.UidNavigation.Password = BCrypt.Net.BCrypt.HashPassword(hospital.UidNavigation.Password);
                }
                else
                {
                    return BadRequest(new { message = "Password is required." });
                }

                // Set the hospital status to false (0) to indicate not approved
                hospital.Status = false;

                // Add the hospital to the database
                db.Hospitals.Add(hospital);
                await db.SaveChangesAsync();

                return Ok(new { message = "Your details are sent for verification." });
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
