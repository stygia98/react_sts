import { useEffect, useRef, useState } from "react";
import {
  productGetOne,
  productPutOne,
  productDeleteOne,
} from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import { Form, Container, Row, Button, Card } from "react-bootstrap";
import InfoModal from "../common/InfoModal";
import UseCustomMove from "../../hooks/UseCustomMove";
import FetchingModal from "../common/FetchingModal";
import exceptionHandle from "../common/exceptionHandle";

const host = API_SERVER_HOST;

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  files: [],
  delFlag: false,
  uploadFileNames: [],
};

const ModifyComponent = ({ pno, moveToProductList, moveToProductRead }) => {
  const [product, setProduct] = useState(initState);
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [fetching, setFetching] = useState(true);
  const uploadRef = useRef();
  // const { page, moveToList } = UseCustomMove();

  const onClickUpdate = (e) => {
    const value = e.target.value;
    productPutOne(product)
      .then((data) => {
        setTitle(`Todo 수정 : ${product.tno}`);
        data.RESULT === "SUCCESS" ? setContent("성공") : setContent("실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`Todo 수정 : ${product.tno}`);
        setContent("오류발생");
        console.log(`예외[ModifyComponent]: ${e}`);
        setFlag(true);
      });
  };

  const onClickDelete = () => {
    productDeleteOne(product.tno)
      .then((data) => {
        setTitle(`Todo 삭제 : ${product.tno}`);
        data.RESULT === "SUCCESS" ? setContent("성공") : setContent("실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`Todo 삭제 : ${product.tno}`);
        setContent("오류발생");
        console.log(`예외[ModifyComponent]: ${e}`);
        setFlag(true);
      });
  };

  useEffect(() => {
    productGetOne(pno)
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((e) => {
        exceptionHandle(e);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [pno]);

  const handleChangeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const deleteImages = (imageName) => {
    const filteredFileName = product.uploadFileNames.filter(
      (fileName) => fileName != imageName,
    );
    setProduct({ ...product, uploadFileNames: [...filteredFileName] });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //other data
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }
    // setFetching(true);
    //수정처리
    productPutOne(pno, formData)
      .then((data) => {
        setFetching(false);
        setTitle("Success");
        setContent(`${data.RESULT} : 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setTitle("Fail");
        setContent(`${e} 실패`);
        setFlag(true);
        console.error(e);
      });
  };

  const handleClickDelete = () => {
    setFetching(true);
    productDeleteOne(pno)
      .then((data) => {
        setFetching(false);
        setTitle("Success");
        setContent(`${data.RESULT} : 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setTitle("Fail");
        setContent(`${e} 실패`);
        setFlag(true);
        console.error(e);
      });
  };

  const closeModal = () => {
    setFlag(false);
    moveToProductList();
  };

  const onChangeUseDelete = (e) => {
    const value = e.target.value === "true" ? true : false;
    setProduct({ ...product, delFlag: value });
  };

  useEffect(() => {}, [pno]);

  return (
    <>
      <Container className="p-5">
        {fetching ? <FetchingModal /> : <></>}
        <InfoModal
          show={flag}
          title={title}
          content={content}
          callbackFn={closeModal}
        ></InfoModal>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>PNAME</Form.Label>
            <Form.Control
              name="pname"
              value={product.pname}
              type="text"
              placeholder="Enter name"
              onChange={handleChangeProduct}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>PRICE</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={product.price}
              placeholder="Enter price"
              onChange={handleChangeProduct}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control
              name="pdesc"
              defaultValue={product.pdesc}
              as="textarea"
              rows={5}
              onChange={handleChangeProduct}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DELETE</Form.Label>
            <Form.Select
              name="delFlag"
              value={product.delFlag ? "true" : "false"}
              onChange={onChangeUseDelete}
            >
              <option value="false">사용</option>
              <option value="true">삭제</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Files</Form.Label>
            <Form.Control ref={uploadRef} type="file" multiple={true} />
          </Form.Group>
        </Form>
        <Row className="d-flex justify-content-center mt-5 gap-4">
          {product.uploadFileNames.map((imgFile, i) => (
            <Card style={{ width: "14rem", height: "14rem" }} key={i}>
              <Button variant="primary" onClick={() => deleteImages(imgFile)}>
                DELETE
              </Button>
              <Card.Body>
                <img
                  alt="img"
                  style={{ width: "10rem" }}
                  src={`${host}/api/products/view/s_${imgFile} `}
                />
              </Card.Body>
            </Card>
          ))}
        </Row>
        <div className="d-flex justify-content-center gap-2 mt-5">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleClickDelete}
          >
            DELETE
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClickModify}
          >
            MODIFY
          </button>
          <button
            className="btn btn-primary"
            type="text"
            onClick={moveToProductList}
          >
            LIST
          </button>
        </div>
      </Container>
    </>
  );
};
export default ModifyComponent;
