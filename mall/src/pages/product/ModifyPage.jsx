import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/product/ModifyComponent";
import UseCustomMove from "../../hooks/UseCustomMove";

const ModifyPage = () => {
  const { tno, moveToList, moveToRead } = UseCustomMove();

  return (
    <Container>
      <Header />
      <ModifyComponent
        tno={tno}
        moveToList={moveToList}
        moveToRead={moveToRead}
      />
    </Container>
  );
};
export default ModifyPage;
