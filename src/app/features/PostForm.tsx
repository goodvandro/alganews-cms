import { Post, PostService } from "goodvandro-alganews-sdk"
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Tag } from "react-tag-input"
import styled from "styled-components"
import countWordsInMarkdown from "../../core/utils/countWordsInMarkdown"
import info from '../../core/utils/info'
import Button from "../components/Button/Button"
import ImageUpload from "../components/ImageUpload"
import Input from "../components/Input/Input"
import Loading from "../components/Loading"
import MarkdownEditor from "../components/MarkdownEditor"
import TagInput from "../components/TagInput"
import WordPriceCounter from "../components/WordPriceCounter"

interface PostFormProps {
  postId?: number
}

export default function PostForm(props: PostFormProps) {
  const navigate = useNavigate()

  const [tags, setTags] = useState<Tag[]>([])
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [publishing, setPublishing] = useState(false)

  async function insertNewPost() {
    const newPost: Post.Input = {
      body,
      title,
      imageUrl,
      tags: tags.map((t: Tag): string => t.text),
    }

    await PostService.insertNewPost(newPost)

    info({
      title: 'Post salvo com sucesso!',
      description: 'Você acabou de criar o post com sucesso',
    })
  }

  async function updateExistingPost(postId: number) {
    const newPost: Post.Input = {
      body,
      title,
      imageUrl,
      tags: tags.map((t: Tag): string => t.text),
    }

    await PostService.updateExistingPost(postId, newPost)

    info({
      title: 'Post atualizado!',
      description: 'Você acabou de atualizar o post com sucesso',
    })
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      setPublishing(true)

      props.postId
        ? await updateExistingPost(props.postId)
        : await insertNewPost()

      navigate('/')
    } finally {
      setPublishing(false)
    }
  }

  function fetchPost(postId: number) {
    PostService
      .getExistingPost(postId)
      .then((post: Post.Detailed): void => {
        setTitle(post.title)
        setImageUrl(post.imageUrls.default)
        setBody(post.body)
        setTags(post.tags.map(tag => ({ id: tag, text: tag })))
      })
  }

  useEffect(() => {
    if (props.postId) {
      fetchPost(props.postId)
    }
  }, [props.postId])

  return (
    <PostFormWrapper onSubmit={handleFormSubmit}>
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
        preview={imageUrl}
      />
      <MarkdownEditor
        onChange={setBody}
        value={body}
      />
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
        <Button
          variant="primary"
          label="Salvar post"
          type="submit"
          disabled={!title || !imageUrl || !body || !tags.length || publishing}
        />
      </PostFormSubmitWrapper>
    </PostFormWrapper>
  )
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