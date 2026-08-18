import { Container } from "react-bootstrap";
import Header from "../include/Header";

const AboutPage = () => {
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
