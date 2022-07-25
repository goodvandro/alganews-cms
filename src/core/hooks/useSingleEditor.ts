import { User, UserService } from "goodvandro-alganews-sdk"
import { useCallback, useState } from "react"

export default function useSingleEditor() {
  const [editor, setEditor] = useState<User.EditorDetailed>()

  const fetchEditor = useCallback(
    async function fetchEditor(editorId: number) {
      UserService.getExistingEditor(editorId).then(setEditor)
    },
    []
  )

  return {
    fetchEditor,
    editor,
  }
}