import { Container, Table, Card, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { productGetList, API_SERVER_HOST } from "../../api/productApi";
import PageComponent from "../common/PageComponent";
import UseCustomMove from "../../hooks/UseCustomMove";
import FetchingModal from "../common/FetchingModal";
import exceptionHandle from "../common/exceptionHandle";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totolCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = ({
  page,
  size,
  moveToProductList,
  moveToProductRead,
  refresh,
}) => {
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    productGetList({ page, size })
      .then((data) => {
        // setFetching(true);
        console.log(data);
        setServerData(data);
      })
      .catch((e) => {
        exceptionHandle(e);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [page, size, refresh]);

  // http://localhost:5173/product/list/?page=1&size=10
  return (
    <>
      <Container className="px-5 justify-content-center mb-5">
        {fetching ? <FetchingModal /> : <></>}
        <Row className="display-content-around mt-5 gap-4">
          {serverData.dtoList.map((product) => (
            <Card
              className="p-3"
              style={{ width: "14rem", height: "20rem" }}
              key={product.pno}
              onClick={() => moveToProductRead(product.pno)}
            >
              <Card.Body>
                <Card.Title>PNO :{product.pno}</Card.Title>
                <Card.Title>NAME : {product.pname}</Card.Title>
                <Card.Title>PRICE : {product.price}원</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
              <img
                alt="product"
                width={150}
                height={150}
                src={`${host}/api/products/view/s_${product.uploadFileNames[0]} `}
              />
            </Card>
          ))}
        </Row>
        <PageComponent serverData={serverData} moveToList={moveToProductList} />
      </Container>
    </>
  );
};

export default ListComponent;
