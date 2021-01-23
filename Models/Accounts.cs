using System;
using System.Collections.Generic;

namespace projectManager.Models
{
    public partial class Accounts
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public string Avatar { get; set; }
        public string Company { get; set; }
        public int? Attempts { get; set; }
        public string SecurityId { get; set; }
    }
}
