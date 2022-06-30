import { mdiUpload } from '@mdi/js'
import Icon from '@mdi/react'
import { ChangeEvent, useState } from 'react'
import Button from '../Button/Button'
import * as UI from './ImageUpload.styles'

export interface ImageUploadProps {
  label: string
}

function ImageUpload(props: ImageUploadProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0]

    if (file) {
      const reader = new FileReader()

      reader.addEventListener('load', (e) => {
        setFilePreview(String(e.target?.result))
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
          onClick={() => setFilePreview(null)}
        />
      </UI.ImagePreview>
    </UI.ImagePreviewWrapper>
  }

  return <UI.Wrapper>
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