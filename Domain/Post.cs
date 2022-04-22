namespace Domain;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string ImageUrl { get; set; }
    public DateTimeOffset DateCreated  { get; set; }
    public User Author  { get; set; }
}