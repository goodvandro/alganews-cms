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
}

export default UserService