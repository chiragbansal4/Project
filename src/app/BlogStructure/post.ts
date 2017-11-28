export class Post {
  constructor(
    public authorName?: string,
    public id?: string,
    public title?: string,
    public body?: string,
    public category?: string,
    public postDate?: string
  ) { }
}
