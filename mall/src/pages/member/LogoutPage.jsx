import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import LogoutComponent from "../../components/member/LogoutComponent";
import UseCustomLogin from "../../hooks/UseCustomLogin";

const LogoutPage = () => {
  const { doLogout, moveToPath } = UseCustomLogin();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <LogoutComponent doLogout={doLogout} moveToPath={moveToPath} />
      </div>
    </Container>
  );
};
export default LogoutPage;
