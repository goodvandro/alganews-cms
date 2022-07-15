import { mdiUpload } from '@mdi/js'
import Icon from '@mdi/react'
import { ChangeEvent, useState } from 'react'
import FileService from '../../../sdk/services/File.service'
import Button from '../Button/Button'
import Loading from '../Loading'
import * as UI from './ImageUpload.styles'

export interface ImageUploadProps {
  label: string,
  onImageUpload: (imageUrl: string) => any
}

function ImageUpload(props: ImageUploadProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [pushing, setPushing] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const file: File = e.target.files![0]

    if (file) {
      const reader: FileReader = new FileReader()

      reader.addEventListener('load', async (e: ProgressEvent<FileReader>)
        : Promise<void> => {
        try {
          setPushing(true)
          setFilePreview(String(e.target?.result))
          const imageUrl: string = await FileService.upload(file)
          props.onImageUpload(imageUrl)
        } finally {
          setPushing(false)
        }
      })

      reader.readAsDataURL(file)
    }
  }

  if (filePreview) {
    return <UI.ImagePreviewWrapper>
      <UI.ImagePreview preview={filePreview}>
        <Button
          variant={'primary'}
          label={'Remover imagem'}
          onClick={(): void => setFilePreview(null)}
        />
      </UI.ImagePreview>
    </UI.ImagePreviewWrapper>
  }

  return <UI.Wrapper>
    <Loading show={pushing} />
    <UI.Label>
      <Icon
        size={'24px'}
        path={mdiUpload}
      />
      {props.label}
      <UI.Input
        type="file"
        onChange={handleChange}
      />
    </UI.Label>
  </UI.Wrapper>
}

export default ImageUpload