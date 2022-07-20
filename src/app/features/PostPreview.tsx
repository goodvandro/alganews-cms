import { useEffect, useState } from "react";
import styled from "styled-components"
import withBoundary from "../../core/hoc/withBoundary"
import confirm from "../../core/utils/confirm";
import info from "../../core/utils/info";
import modal from "../../core/utils/modal";
import { Post } from "../../sdk/@types";
import PostService from "../../sdk/services/Post.service";
import Button from '../components/Button/Button';
import Loading from "../components/Loading";
import MarkdownEditor from "../components/MarkdownEditor"

interface PostPreviewProps {
  postId: number
}

function PostPreview(props: PostPreviewProps) {
  const [post, setPost] = useState<Post.Detailed>()
  const [loading, setLoading] = useState(false)

  async function publishPost() {
    await PostService.publishExistingPost(props.postId)
    info({
      title: 'Post publicado',
      description: 'O post foi publicado com sucesso'
    })
  }

  function reopenModal() {
    modal({
      children: <PostPreview postId={props.postId} />
    })
  }

  useEffect(() => {
    setLoading(true)
    PostService
      .getExistingPosts(props.postId)
      .then(setPost)
      .finally(() => setLoading(false))
  }, [props.postId])

  if (loading)
    return <Loading show />

  if (!post)
    return null

  return (
    <PostPreviewWrapper>
      <PostPreviewHeading>
        <PostPreviewTitle>
          {post.title}
        </PostPreviewTitle>
        <PostPreviewActions>
          <Button
            variant={'danger'}
            label={'Publicar'}
            disabled={post.published}
            onClick={(): void => {
              confirm({
                title: 'Publicar o post?',
                onConfirm: publishPost,
                onCancel: reopenModal,
              })
            }}
          />
          <Button
            variant={'primary'}
            label={'Editar'}
            disabled={post.published}
            onClick={() => window.location.pathname = `/posts/edit/${props.postId}`}
          />
        </PostPreviewActions>
      </PostPreviewHeading>
      <PostPreviewImage
        src={post.imageUrls.medium}
      />
      <PostPreviewContent>
        <MarkdownEditor
          readOnly
          value={post.body}
        />
      </PostPreviewContent>
    </PostPreviewWrapper>
  )
}

const PostPreviewWrapper = styled.div`
  background-color: #f3f8fa;
  padding: 24px;
  border: 1px solid #ccc;
  width: 655px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 6px 6px rgba(0,0,0,.05);
`

const PostPreviewHeading = styled.div`
  display: flex;
  justify-content: space-between;
`

const PostPreviewTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`

const PostPreviewActions = styled.div`
  display: flex;
  gap: 8px;
`

const PostPreviewImage = styled.img`
  height: 240px;
  width: 100%;
  object-fit: cover;
`

const PostPreviewContent = styled.div`
`

export default withBoundary(PostPreview)