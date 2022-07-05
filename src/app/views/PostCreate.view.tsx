import usePageTitle from "../../core/hooks/usePageTitle"
import DefaultLayout from '../layouts/Default/Default.layout';

export default function PostCreateView() {
  usePageTitle("Novo Post")

  return (
    <DefaultLayout>
      todo: post view
    </DefaultLayout>
  )
}