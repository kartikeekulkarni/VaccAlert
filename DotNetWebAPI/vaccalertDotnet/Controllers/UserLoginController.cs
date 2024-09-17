using Microsoft.AspNetCore.Cors;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using vaccalertDotnet.Models;

namespace vaccalertDotnet.Controllers
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
            User? userdb;
            using (var db = new vaccalertContext())
            {
                userdb = db.Users.Where(u => u.Uname == user.Uname).ToList().FirstOrDefault();
                if (userdb != null)
                {
                    try
                    {
                        if (BCrypt.Net.BCrypt.Verify(user.Password, userdb.Password))
                        {
                            if (userdb.Rid == 2)
                            {
                                Hospital h = db.Hospitals.Where(u => u.Uid == userdb.Uid).FirstOrDefault();
                                if (h.Status == false)
                                {
                                    return Unauthorized(new { message = "Hospital verification pending plese contact admin" });
                                }
                                return Ok(new { message = "Login successful.", userdb });
                            }
                            return Ok(new { message = "Login successful.", userdb });
                        }
                        return Unauthorized(new { message = "Invalid Password" });

                    }
                    catch (Exception e) { Console.WriteLine(e); }

                }
                return Unauthorized(new { message = "Invalid Username And Password" });
            }

        }
    }
}
