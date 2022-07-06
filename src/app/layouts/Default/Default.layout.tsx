import confirm from '../../../core/utils/confirm';
import Logo from '../../components/Logo';
import NavBar from '../../components/NavBar';
import SessionController from '../../components/SessionController';
import * as DL from './Default.layout.styles';
import info from '../../../core/utils/info';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <DL.Wrapper>
      <DL.Header>
        <Logo />
      </DL.Header>
      <DL.Main>
        <DL.Navigation>
          <NavBar />
        </DL.Navigation>
        <DL.FeatureContent>
          {children}
        </DL.FeatureContent>
        <DL.Aside>
          <SessionController
            name="Evandro Monteiro"
            description="editor há 2 anos"
            onLogout={() => {
              confirm({
                title: 'Deseja realmente sair?',
                onConfirm: () => {
                  info({
                    title: 'Saiu!',
                    description: 'Você será redirecionado para a página de login'
                  })
                },
                onCancel: () => window.alert('Você cancelou!'),
              });
            }}
          />
        </DL.Aside>
      </DL.Main>
    </DL.Wrapper>
  );
}

export default DefaultLayout