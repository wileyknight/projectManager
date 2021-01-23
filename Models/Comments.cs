using System;
using System.Collections.Generic;

namespace projectManager.Models
{
    public partial class Comments
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int? ProjectId { get; set; }
        public int? AssetId { get; set; }
        public int? ReferenceId { get; set; }
        public string Action { get; set; }
        public string Attachment { get; set; }
        public string Pin { get; set; }
        public string Comment { get; set; }
        public string Type { get; set; }
        public string Recipients { get; set; }
        public int? Pos { get; set; }
        public int? Neg { get; set; }
        public DateTime? Date { get; set; }
        public TimeSpan? Time { get; set; }

        public Comments()
        {
            this.Date = DateTime.Now.Date;
            this.Time = DateTime.Now.TimeOfDay;
        }
    }
}
