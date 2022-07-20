import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import info from "../core/utils/info"
import EditorProfileView from "./views/EditorProfile.view"
import EditorsListView from "./views/EditorsList.view"
import Home from "./views/Home.view"
import NotFound404 from "./views/NotFound404.view"
import PostCreateView from "./views/PostCreate.view"
import PostEditView from "./views/PostEdit.view"

export default function App() {
  useEffect(() => {
    window.onunhandledrejection = (error: PromiseRejectionEvent) => {
      info({
        title: error.reason.response?.data.title || "Erro inesperado",
        description: error.reason.response?.data.detail || error.reason.message,
      })
    }
  }, [])

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editors" element={<EditorsListView />} />
      <Route path="/editors/:id" element={<EditorProfileView />} />
      <Route path="/posts/create" element={<PostCreateView />} />
      <Route path="/posts/edit/:id" element={<PostEditView />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </BrowserRouter>
}