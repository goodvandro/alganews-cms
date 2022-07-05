import styled from "styled-components"
import ImageUpload from "../components/ImageUpload"
import Input from "../components/Input/Input"
import MarkdownEditor from "../components/MarkdownEditor"
import TagInput from "../components/TagInput"
import { useState } from 'react';
import { Tag } from "react-tag-input"
import WordPriceCounter from "../components/WordPriceCounter"
import Button from "../components/Button/Button"

export default function PostForm() {
  const [tags, setTags] = useState<Tag[]>([])

  return <PostFormWrapper>
    <Input
      label="Título"
      placeholder="e.g.: Como fiquei rico aprendendo React"
    />
    <ImageUpload label="Thumbnail do post" />
    <MarkdownEditor />
    <TagInput
      tags={tags}
      onAdd={(tag: Tag): void => setTags([...tags, tag])}
      onDelete={(index: number): void => setTags(tags.filter((_: Tag, i: number): boolean => i !== index))}
      placeholder="Insira as tags deste post"
    />
    <PostFormSubmitWrapper>
      <WordPriceCounter pricePerWord={0.25} wordsCount={40} />
      <Button variant="primary" label="Salvar post" type="submit" />
    </PostFormSubmitWrapper>
  </PostFormWrapper>
}

const PostFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PostFormSubmitWrapper = styled.form`
  display: flex;
  justify-content: space-between;
`