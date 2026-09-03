import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/product/ModifyComponent";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";

const ModifyPage = () => {
  const { pno, moveToProductList, moveToProductRead } = useCustomMove();

  const { exceptionHandle } = useCustomLogin();

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
