import { User } from "../@types";
import Service from "../Service";

class UserService extends Service {
  static getAllEditors(): Promise<User.EditorSummary[]> {
    return this.Http
      .get<User.EditorSummary[]>("/users/editors")
      .then(this.getData)
  }

  static getExistingEditor(editorId: number): Promise<User.EditorDetailed> {
    return this.Http
      .get<User.EditorDetailed>(`/users/editors/${editorId}`)
      .then(this.getData)
  }

  static getDetailedUser(userId: number): Promise<User.Detailed> {
    return this.Http
      .get<User.Detailed>(`/users/${userId}`)
      .then(this.getData)
  }

  static getAllUsers(): Promise<User.Summary[]> {
    return this.Http
      .get<User.Summary[]>('/users')
      .then(this.getData);
  }

  static updateExistingUser(
    userId: number,
    userData: User.Input
  ): Promise<User.Detailed> {
    return this.Http
      .put<User.Detailed>(`/users/${userId}`, userData)
      .then(this.getData);
  }

  static insertNewUser(userData: User.Input): Promise<User.Detailed> {
    return this.Http
      .post<User.Detailed>('/users', userData)
      .then(this.getData);
  }

  static activateExistingUser(userId: number): Promise<{}> {
    return this.Http
      .put<{}>(`/users/${userId}/activation`)
      .then(this.getData);
  }

  static deactivateExistingUser(userId: number): Promise<{}> {
    return this.Http
      .delete<{}>(`/users/${userId}/activation`)
      .then(this.getData);
  }
}

export default UserService