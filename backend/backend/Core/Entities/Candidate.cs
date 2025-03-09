namespace backend.Core.Entities
{
    public class Candidate : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Coverletter { get; set; }
        public string ResumeUrl { get; set; }
        public long JobId { get; set; }
        public Job Job { get; set; }
    }
}
