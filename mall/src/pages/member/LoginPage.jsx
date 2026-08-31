import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import LoginComponent from "../../components/member/LoginComponent";
import UseCustomLogin from "../../hooks/UseCustomLogin";

const LoginPage = () => {
  const { doLogout, moveToPath } = UseCustomLogin();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5 p-5">
        <LoginComponent />
      </div>
    </Container>
  );
};

export default LoginPage;
