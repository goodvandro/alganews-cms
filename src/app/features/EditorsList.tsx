import { useEffect, useState } from 'react';
import styled from "styled-components";
import { User } from "../../sdk/@types";
import UserService from "../../sdk/services/User.service";
import getEditorDescription from '../../sdk/utils/getEditorDescription';
import Profile from "../components/Profile";

export default function EditorsList() {
  const [editors, setEditors] = useState<User.EditorSummary[]>([]);
  const [error, setError] = useState<Error>()

  useEffect(() => {
    UserService
      .getAllEditors()
      .then(setEditors)
      .catch(error => setError(new Error(error.message)))
  }, [])

  if (error)
    throw error

  return <EditorListWrapper>
    {
      editors.map((editor: User.EditorSummary) => {
        return <Profile
          key={editor.id}
          editorId={editor.id}
          name={editor.name}
          description={getEditorDescription(new Date(editor.createdAt))}
          avatarUrl={editor.avatarUrls.small}
        />
      })
    }
  </EditorListWrapper>
}

const EditorListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`