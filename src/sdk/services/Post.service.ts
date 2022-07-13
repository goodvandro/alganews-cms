import { Post } from "../@types";
import Service from "../Service";
import generateQueryString from "../utils/generateQueryString";

class PostService extends Service {
  static getAllPosts(search: Post.Query): Promise<Post.Paginated> {
    const queryString: string = generateQueryString(search)
    console.log(queryString)
    return this.Http
      .get<Post.Paginated>('/posts'.concat(queryString))
      .then(this.getData)
  }

  static getExistingPosts(id: number): Promise<Post.Detailed> {
    return this.Http
      .get<Post.Detailed>(`/posts/${id}`)
      .then(this.getData)
  }

  static insertNewPost(post: Post.Input): Promise<Post.Detailed> {
    return this.Http
      .post<Post.Detailed>('/posts', post)
      .then(this.getData)
  }
}

export default PostService;