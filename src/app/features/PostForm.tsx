import styled from "styled-components"
import ImageUpload from "../components/ImageUpload"
import Input from "../components/Input/Input"
import MarkdownEditor from "../components/MarkdownEditor"
import TagInput from "../components/TagInput"
import { useState } from 'react';
import { Tag } from "react-tag-input"
import WordPriceCounter from "../components/WordPriceCounter"
import Button from "../components/Button/Button"
import countWordsInMarkdown from "../../core/utils/countWordsInMarkdown"
import info from '../../core/utils/info';

export default function PostForm() {
  const [tags, setTags] = useState<Tag[]>([])
  const [body, setBody] = useState('')

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    info({
      title: 'Post salvo com sucesso!',
      description: 'Você acabou de salvar o post!',
    })

  }

  return <PostFormWrapper onSubmit={handleFormSubmit}>
    <Input
      label="Título"
      placeholder="e.g.: Como fiquei rico aprendendo React"
    />
    <ImageUpload label="Thumbnail do post" />
    <MarkdownEditor onChange={setBody} />
    <TagInput
      tags={tags}
      onAdd={(tag: Tag): void => setTags([...tags, tag])}
      onDelete={(index: number): void => setTags(tags.filter((_: Tag, i: number): boolean => i !== index))}
      placeholder="Insira as tags deste post"
    />
    <PostFormSubmitWrapper>
      <WordPriceCounter
        pricePerWord={0.25}
        wordsCount={countWordsInMarkdown(body)}
      />
      <Button variant="primary" label="Salvar post" type="submit" />
    </PostFormSubmitWrapper>
  </PostFormWrapper>
}

const PostFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PostFormSubmitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`