using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserLoginService.Models;

namespace UserLoginService.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class UserLoginController : ControllerBase
    {

        [HttpGet]
        public List<State> GetAllState()
        {
            List<State> result = new List<State>();
            using (var db = new vaccalertContext())
            {
                result = db.States.ToList();
            }
            return result;
        }

        [HttpGet]
        public List<District> GetAllDistrict(int sid)
        {
            List<District> result = new List<District>();
            using (var db = new vaccalertContext())
            {
                result = db.Districts.Where(s => s.Sid == sid).ToList();
            }
            return result;
        }


        [HttpGet]
        public List<City> GetAllCities(int did)
        {
            List<City> result = new List<City>();
            using (var db = new vaccalertContext())
            {
                result = db.Cities.Where(c => c.Did == did).ToList();
            }
            return result;
        }

        [HttpGet]
        public List<State> GetAllStateWithDistricts()
        {
            List<State> result = new List<State>();
            using (var db = new vaccalertContext())
            {
                result = db.States.Include(add => add.Districts).ToList();
            }
            return result;
        }
        [HttpPost]
        public async Task<IActionResult> LoginUser(User user)
        {
            if (user == null)
            {
                return BadRequest("User object is null");
            }

            using (var db = new vaccalertContext())
            {
                var userdb = db.Users.FirstOrDefault(u => u.Uname == user.Uname);

                if (userdb != null)
                {
                    try
                    {
                        if (BCrypt.Net.BCrypt.Verify(user.Password, userdb.Password))
                        {
                            if (userdb.Rid == 2) // Check if the user is a hospital
                            {
                                var hospital = db.Hospitals.Include(h => h.UidNavigation)
                                                           .FirstOrDefault(h => h.Uid == userdb.Uid);

                                if (hospital == null)
                                {
                                    return Unauthorized(new { status = false, message = "Hospital not found." });
                                }

                                bool hospitalApproved = hospital.Status ?? false; // Handle nullable boolean

                                if (!hospitalApproved)
                                {
                                    return Unauthorized(new { status = false, message = "Verification pending. Please wait for admin approval." });
                                }

                                return Ok(new { status = true, userdb, hospitalStatus = true });
                            }

                            // Handle other user types here
                            return Ok(new { status = true, userdb, hospitalStatus = false });
                        }

                        return Unauthorized(new { status = false, message = "Invalid password." });
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        return StatusCode(500, "Internal server error.");
                    }
                }

                return Unauthorized(new { status = false, message = "Invalid username." });
            }
        }


    }
}
