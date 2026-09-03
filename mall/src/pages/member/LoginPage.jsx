import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import LoginComponent from "../../components/member/LoginComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const LoginPage = () => {
  const { doLogin, moveToPath } = useCustomLogin();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5 p-5">
        <LoginComponent dologin={doLogin} moveToPath={moveToPath} />
      </div>
    </Container>
  );
};

export default LoginPage;
