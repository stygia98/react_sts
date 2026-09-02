import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ListComponent from "../../components/product/ListComponent";
import { useSearchParams } from "react-router-dom";
import UseCustomMove from "../../hooks/UseCustomMove";
import UseCustomLogin from "../../hooks/UseCustomLogin";

const ListPage = () => {
  // const [queryParams] = useSearchParams();
  // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  const { page, size, moveToProductList, moveToProductRead, refresh } =
    UseCustomMove();

  const { exceptionHandle } = UseCustomLogin();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        {/* page {page} =========== size {size} */}
        <ListComponent
          page={page}
          size={size}
          moveToProductList={moveToProductList}
          moveToProductRead={moveToProductRead}
          exceptionHandle={exceptionHandle}
          refresh={refresh}
        />
      </div>
    </Container>
  );
};

export default ListPage;
