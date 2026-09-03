import { Container } from "react-bootstrap";
import Header from "../include/Header";
import useCustomLogin from "../hooks/useCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToPath } = useCustomLogin();
  if (!isLogin) {
    alert("회원전용페이지");
    moveToPath("/");
  }

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <button className="btn btn-outline-primary" type="button">
          AboutPage
        </button>
      </div>
    </Container>
  );
};

export default AboutPage;
