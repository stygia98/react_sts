import { Container } from "react-bootstrap";
import Header from "../../include/Header";
// import ListComponent from "../../components/todo/ListComponent";
import { useSearchParams } from "react-router-dom";
import AddComponent from "../../components/product/AddComponent";
import useCustomMove from "../../hooks/useCustomMove";

const AddPage = () => {
  // const [queryParams] = useSearchParams();
  // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  const { page, size, moveToProductList } = useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <h1>Todo Add Page</h1>
        <AddComponent moveToProductList={moveToProductList} page={page} />
      </div>
    </Container>
  );
};

export default AddPage;
