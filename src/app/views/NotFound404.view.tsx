import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import notFound from '../../assets/not_found.svg';
import Button from '../components/Button/Button';

export default function NotFound404() {
  const navegate = useNavigate()

  return <NotFound404Wrapper>
    <span>Oops!</span>
    <h1>Não encontramos a sua página</h1>
    <img src={notFound} alt="Não encontrado" />
    <Button
      variant="primary"
      label="Ir para o início"
      onClick={(): void => navegate('/', { replace: true })}
    />
  </NotFound404Wrapper>
}

const NotFound404Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  span {
    font-size: 72px;
  }

  h1 {
    font-size: 18px;
    font-weight: 400;
  }
`