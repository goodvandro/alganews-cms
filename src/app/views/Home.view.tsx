import usePageTitle from "../../core/hooks/usePageTitle"
import PostsList from "../features/PostsList"
import UserEarnings from "../features/UserEarnings"
import UserPerformance from "../features/UserPerformance"
import UserTopTags from "../features/UserTopTags"
import DefaultLayout from '../layouts/Default/Default.layout'

export default function Home() {
  usePageTitle('Home')

  return <DefaultLayout>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 32 }}>
      <UserTopTags />
      <UserEarnings />
    </div>

    <UserPerformance />
    <PostsList />
  </DefaultLayout>
}
