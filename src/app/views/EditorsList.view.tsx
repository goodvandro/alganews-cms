import DefaultLayout from "../layouts/Default"
import usePageTitle from "../../core/hooks/usePageTitle"

export default function EditorsListView() {
  usePageTitle("Lista de editores")

  return (
    <DefaultLayout>
      <h1>Editors</h1>
    </DefaultLayout>
  )
}