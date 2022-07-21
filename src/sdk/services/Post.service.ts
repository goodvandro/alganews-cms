import { Post } from "../@types";
import Service from "../Service";
import generateQueryString from "../utils/generateQueryString";

class PostService extends Service {
  static getAllPosts(search: Post.Query): Promise<Post.Paginated> {
    const queryString: string = generateQueryString(search)
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

  static publishExistingPost(postId: number): Promise<{}> {
    return this.Http
      .put<{}>(`/posts/${postId}/publishing`)
      .then(this.getData)
  }

  static updateExistingPost(postId: number, post: Post.Input): Promise<Post.Detailed> {
    return this.Http
      .put<Post.Detailed>(`/posts/${postId}`, post)
      .then(this.getData)
  }

  static deleteExistingPost(postId: number): Promise<{}> {
    return this.Http
      .delete<{}>(`/posts/${postId}`)
      .then(this.getData);
  }

  static deactivateExistingPost(postId: number): Promise<{}> {
    return this.Http
      .delete<{}>(`/posts/${postId}/activation`)
      .then(this.getData);
  }
}

export default PostService;