import usePageTitle from "../../core/hooks/usePageTitle"
import usePosts from "../../core/hooks/usePosts"
import PostsList from "../features/PostsList"
import UserEarnings from "../features/UserEarnings"
import UserPerformance from "../features/UserPerformance"
import UserTopTags from "../features/UserTopTags"
import DefaultLayout from '../layouts/Default/Default.layout'

export default function Home() {
  usePageTitle('Home')
  const { paginatedPosts, loading, fetchPosts } = usePosts()

  return <DefaultLayout>
    <button
      onClick={() => {
        fetchPosts({ page: 0, size: 5 })
      }}
    >
      Disparar ação
    </button>
    {loading ? 'Carregando...' : 'Finalizado'}
    <hr />
    {
      paginatedPosts?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))
    }
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: 32
    }}>
      <UserTopTags />
      <UserEarnings />
    </div>

    <UserPerformance />
    <PostsList />
  </DefaultLayout>
}
