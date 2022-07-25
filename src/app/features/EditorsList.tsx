import { getEditorDescription, User } from 'goodvandro-alganews-sdk'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import useEditors from '../../core/hooks/useEditors'
import Profile from '../components/Profile'

export default function EditorsList() {
  const { editorsList, loading, fetchAllEditors } = useEditors()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetchAllEditors()
      .finally(() => setError)
  }, [fetchAllEditors])

  if (error)
    throw error

  if (!editorsList.length)
    return <EditorListWrapper>
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
    </EditorListWrapper>

  return <EditorListWrapper>
    {
      editorsList.map((editor: User.EditorSummary) => {
        return <Profile
          key={editor.id}
          editorId={editor.id}
          name={editor.name}
          description={getEditorDescription(new Date(editor.createdAt))}
          avatarUrl={editor.avatarUrls.small}
        />
      })
    }
    {loading ? "buscando mais informações" : null}
  </EditorListWrapper>
}

const EditorListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`