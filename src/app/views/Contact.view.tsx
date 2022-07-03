import usePageTitle from "../../core/hooks/usePageTitle"
import DefaultLayout from '../layouts/Default/Default.layout';

export default function Contact() {
  usePageTitle('Contact')

  return <DefaultLayout>
    <h1>Contacto</h1>
  </DefaultLayout>
}