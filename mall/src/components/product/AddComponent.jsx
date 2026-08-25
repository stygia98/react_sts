import { useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import UseCustomMove from "../../hooks/UseCustomMove";
import { productPostAdd } from "../../api/productApi";
import InfoModal from "../common/InfoModal";
import FetchingModal from "../common/FetchingModal";

const initState = {
  // "tno": 401,
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = ({ moveToProductList, page }) => {
  const [product, setProduct] = useState({ ...initState });
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const uploadRef = useRef(null);
  const [fetching, setFetching] = useState(false);

  const onChangeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onClickInsert = () => {
    const formData = new FormData();
    const files = uploadRef.current.files;

    for (let index = 0; index < files.length; index++) {
      formData.append("files", files[index]);
    }

    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    console.log(`formData : ${formData}`);

    productPostAdd(formData).then((data) => {
      setFetching(false);
    });

    productPostAdd(formData)
      .then((result) => {
        console.log(result);
        setFetching(true);
        setProduct({ ...initState }); // 초기화
        setTitle("Success");
        setContent(`${result.RESULT} 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setTitle("Fail");
        setContent(`${e} 실패`);
        setFlag(true);
        console.error(e);
      });
    console.log(formData);
  };

  const closeModal = () => {
    setFlag(false);
    moveToProductList();
  };

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
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="pname"
              type="text"
              value={product.pname}
              onChange={onChangeProduct}
              placeholder="Enter pname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              name="pdesc"
              value={product.pdesc}
              as="textarea"
              rows={4}
              onChange={onChangeProduct}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={product.price}
              onChange={onChangeProduct}
              placeholder="Enter price"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Files</Form.Label>
            <Form.Control ref={uploadRef} type="file" multiple="true" />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2 ">
          <Button variant="primary" type="button" onClick={onClickInsert}>
            저장
          </Button>
        </div>
      </Container>
    </>
  );
};
export default AddComponent;
