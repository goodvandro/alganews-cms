import usePageTitle from "../../core/hooks/usePageTitle"
import PostsList from "../features/PostsList"
import UserMetrics from "../features/UserPerformance"
import UserTopTags from "../features/UserTopTags"
import DefaultLayout from '../layouts/Default/Default.layout'

export default function Home() {
  usePageTitle('Home')

  return <DefaultLayout>
    <UserTopTags />
    <UserMetrics />
    <PostsList />
  </DefaultLayout>
}
