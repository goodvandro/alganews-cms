import styled from "styled-components";
import Profile from "../components/Profile";

export default function EditorsList() {
  return <EditorListWrapper>
    <Profile name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile name="Evandro Monteiro" description="editor há muito tempo" />
    <Profile name="Evandro Monteiro" description="editor há muito tempo" />
  </EditorListWrapper>
}

const EditorListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`