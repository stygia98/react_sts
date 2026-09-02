import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/product/ModifyComponent";
import UseCustomMove from "../../hooks/UseCustomMove";
import UseCustomLogin from "../../hooks/UseCustomLogin";

const ModifyPage = () => {
  const { pno, moveToProductList, moveToProductRead } = UseCustomMove();

  const { exceptionHandle } = UseCustomLogin();

  return (
    <Container>
      <Header />
      <ModifyComponent
        pno={pno}
        moveToProductList={moveToProductList}
        moveToProductRead={moveToProductRead}
        exceptionHandle={exceptionHandle}
      />
    </Container>
  );
};
export default ModifyPage;
