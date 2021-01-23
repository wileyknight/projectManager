using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectManager.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public string Company { get; set; }
        [PersonalData]
        public string Address1 { get; set; }
        [PersonalData]
        public string Address2 { get; set; }
        [PersonalData]
        public string City { get; set; }
        [PersonalData]
        public string State { get; set; }
        [PersonalData]
        public int Zip { get; set; }
        [PersonalData]
        public string Avatar { get; set; }

    }
}
