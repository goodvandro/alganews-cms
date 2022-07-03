import usePageTitle from "../../core/hooks/usePageTitle"
import DefaultLayout from '../layouts/Default/Default.layout';

export default function Home() {
  usePageTitle('Home')

  return <DefaultLayout>
    <h1>Home</h1>
  </DefaultLayout>
}