import { useEffect, useState } from "react";
import { productGetOne, API_SERVER_HOST } from "../../api/productApi";
import { Container, Form } from "react-bootstrap";
import FetchingModal from "../common/FetchingModal";
import exceptionHandle from "../common/exceptionHandle";

const host = API_SERVER_HOST;

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  files: [],
  uploadFileNames: [],
};

const ReadComponent = ({ pno, moveToProductList, moveToProductModify }) => {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(true);

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

  return (
    <>
      <Container className="p-5">
        {fetching ? <FetchingModal /> : <></>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>PNO</Form.Label>
            <Form.Control
              value={pno}
              type="text"
              placeholder="Enter pno"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>PNAME</Form.Label>
            <Form.Control
              value={product.pname}
              type="text"
              placeholder="Enter name"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>PRICE</Form.Label>
            <Form.Control
              type="text"
              value={product.price + "원"}
              placeholder="Enter price"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control
              type="text"
              value={product.pdesc}
              placeholder="Enter price"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-center">
            {product.uploadFileNames.map((imgFile, i) => (
              <img
                alt="product"
                key={i}
                style={{ width: "14rem", height: "14rem" }}
                src={`${host}/api/products/view/s_${imgFile}`}
              />
            ))}
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2 mt-5">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              moveToProductModify(pno);
            }}
          >
            수정하기
          </button>
          <button
            className="btn btn-info"
            type="button"
            onClick={() => {
              moveToProductList();
            }}
          >
            리스트보기
          </button>
        </div>
      </Container>
    </>
  );
};

// const makeDiv = (title, value) => (
//   <div className="flex justify-center">
//     <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//       <div className="w-1/5 p-6 text-right font-bold">{title}</div>
//       <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//         {value}
//       </div>
//     </div>
//   </div>
// );

export default ReadComponent;
