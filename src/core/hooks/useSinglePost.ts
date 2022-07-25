import { Post, PostService } from "goodvandro-alganews-sdk";
import { useCallback, useState } from "react";
import info from "../utils/info";

export default function useSinglePost() {
  const [post, setPost] = useState<Post.Detailed>()
  const [loading, setLoading] = useState(false)

  const publishPost = useCallback(async (postId: number) => {
    await PostService.publishExistingPost(postId)

    info({
      title: 'Post publicado',
      description: 'Você publicou um post com sucesso!',
    })
  }, [])

  const fetchPost = useCallback((postId: number) => {
    setLoading(true)
    PostService.getExistingPost(postId)
      .then(setPost)
      .finally(() => setLoading(false))
  }, [])

  return {
    post,
    loading,
    publishPost,
    fetchPost,
  }
}