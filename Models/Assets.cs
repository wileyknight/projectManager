using System;
using System.Collections.Generic;

namespace projectManager.Models
{
    public partial class Assets
    {
        public int Id { get; set; }
        public int? ProjectId { get; set; }
        public string FileName { get; set; }
        public string FileSize { get; set; }
        public string ContentType { get; set; }
        public string FileLocation { get; set; }
        public string FileType { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
        public string Refrence { get; set; }
        public int? Pos { get; set; }
        public int? Neg { get; set; }
        public string Viewed { get; set; }
    }
}
