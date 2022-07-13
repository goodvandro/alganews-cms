import styled from "styled-components";
import Profile from "../components/Profile";
import { useEffect } from 'react';
import PostService from "../../sdk/services/Post.service";

export default function EditorsList() {
  useEffect(() => {
    const posts = PostService.getAllPosts({
      size: 10,
      page: 0,
      sort: ['id', 'desc']
    });
    console.log(posts);
  }, [])

  return <EditorListWrapper>
    <Profile editorId={1} name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile editorId={2} name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile editorId={3} name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile editorId={4} name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile editorId={5} name="Evandro Monteiro" description="editor há muito tempo" />
  </EditorListWrapper>
}

const EditorListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`