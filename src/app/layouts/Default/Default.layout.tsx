import Logo from '../../components/Logo';
import NavBar from '../../components/NavBar';
import SessionController from '../../components/SessionController';
import * as DL from './Default.layout.styles';

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
          />
        </DL.Aside>
      </DL.Main>
    </DL.Wrapper>
  );
}

export default DefaultLayout