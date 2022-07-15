import styled from "styled-components"
import ImageUpload from "../components/ImageUpload"
import Input from "../components/Input/Input"
import MarkdownEditor from "../components/MarkdownEditor"
import TagInput from "../components/TagInput"
import { ChangeEvent, useState } from 'react'
import { Tag } from "react-tag-input"
import WordPriceCounter from "../components/WordPriceCounter"
import Button from "../components/Button/Button"
import countWordsInMarkdown from "../../core/utils/countWordsInMarkdown"
import info from '../../core/utils/info'
import PostService from "../../sdk/services/Post.service"
import { Post } from "../../sdk/@types"
import Loading from "../components/Loading"

export default function PostForm() {
  const [tags, setTags] = useState<Tag[]>([])
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [publishing, setPublishing] = useState(false)

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setPublishing(true)

      const newPost: Post.Input = {
        body,
        title,
        tags: tags.map((t: Tag): string => t.text),
        imageUrl,
      }

      const insertedPost: Post.Detailed = await PostService
        .insertNewPost(newPost)

      info({
        title: 'Post salvo com sucesso!',
        description: 'Você acabou de criar o post com o id ' + insertedPost.id,
      })
    } finally {
      setPublishing(false)
    }
  }

  return <PostFormWrapper onSubmit={handleFormSubmit}>
    <Loading show={publishing} />
    <Input
      label="Título"
      value={title}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
      placeholder="e.g.: Como fiquei rico aprendendo React"
    />
    <ImageUpload
      onImageUpload={setImageUrl}
      label="Thumbnail do post"
    />
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