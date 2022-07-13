import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function getEditorDescription(editorCreationDate: Date): string {
  const distance: string = formatDistance(editorCreationDate, new Date(), { locale: ptBR })

  return `Editor há ${distance}`
}