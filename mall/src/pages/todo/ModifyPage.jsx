import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/todo/ModifyComponent";
import useCustomMove from "../../hooks/useCustomMove";

const ModifyPage = () => {
  const { tno, moveToList, moveToRead } = useCustomMove();

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
