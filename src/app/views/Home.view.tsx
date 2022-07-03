import usePageTitle from "../../core/hooks/usePageTitle"
import PostsList from "../features/PostsList"
import UserMetrics from "../features/UserMetrics"
import DefaultLayout from '../layouts/Default/Default.layout'

export default function Home() {
  usePageTitle('Home')

  return <DefaultLayout>
    <UserMetrics />
    <PostsList />
  </DefaultLayout>
}
