using System;
using System.Collections.Generic;

namespace projectManager.Models
{
    public partial class Projects
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string Description { get; set; }
        public string Rate { get; set; }
        public string Due { get; set; }
        public string Category { get; set; }
        public string Company { get; set; }
        public string Status { get; set; }
        public string Accounts { get; set; }
        public DateTime? Date { get; set; }
        public TimeSpan? Time { get; set; }

        public Projects()
        {
            this.Date = DateTime.Now.Date;
            this.Time = DateTime.Now.TimeOfDay;
        }
    }
}
