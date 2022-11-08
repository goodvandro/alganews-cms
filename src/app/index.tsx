import jwtDecode from "jwt-decode";
import { useEffect, useMemo } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import { Authentication } from "../auth/Auth";
import AuthService from "../auth/Authorization.service";
import useAuth from "../core/hooks/useAuth";
import info from "../core/utils/info";
import Loading from "./components/Loading/Loading";
import EditorProfileView from "./views/EditorProfile.view";
import EditorsListView from "./views/EditorsList.view";
import Home from "./views/Home.view";
import NotFound404 from "./views/NotFound404.view";
import PostCreateView from "./views/PostCreate.view";
import PostEditView from "./views/PostEdit.view";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchUser } = useAuth();

  useEffect(() => {
    window.onunhandledrejection = (error: PromiseRejectionEvent) => {
      info({
        title: error.reason.response?.data.title || "Erro inesperado",
        description: error.reason.response?.data.detail || error.reason.message,
      });
    };
  }, []);

  useEffect(() => {
    async function identify() {
      const isInAuthorizationRoute = window.location.pathname === "/authorize";
      const code = new URLSearchParams(window.location.search).get("code");

      const codeVerifier = AuthService.getCodeVerifier();
      const accessToken = AuthService.getAccessToken();

      if (!accessToken && !isInAuthorizationRoute) {
        AuthService.imperativelySendToLoginScreen();
      }

      if (isInAuthorizationRoute) {
        if (!code) {
          info({
            title: "Erro inesperado",
            description: "Código de autorização não informado",
          });
          AuthService.imperativelySendToLoginScreen();
          return;
        }

        if (!codeVerifier) {
          AuthService.imperativelySendToLogout();
          return;
        }

        // busca o primeiro token de acesso
        const { access_token, refresh_token } =
          await AuthService.getFirstAccessToken({
            code,
            codeVerifier,
            redirectUri: "http://localhost:3001/authorize",
          });

        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(access_token);
        fetchUser(decodedToken["alganews:user_id"]);

        navigate("/");
      }

      if (accessToken) {
        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(accessToken);
        fetchUser(decodedToken["alganews:user_id"]);
      }
    }

    identify();
  }, [fetchUser, navigate]);

  const isAuthorizationRoute = useMemo(
    () => location.pathname === "/authorize",
    [location.pathname]
  );

  if (isAuthorizationRoute || !user) return <Loading show />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editors" element={<EditorsListView />} />
      <Route path="/editors/:id" element={<EditorProfileView />} />
      <Route path="/posts/create" element={<PostCreateView />} />
      <Route path="/posts/edit/:id" element={<PostEditView />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
