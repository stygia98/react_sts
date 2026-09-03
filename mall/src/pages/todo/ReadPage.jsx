import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../components/todo/ReadComponent";
import { useCallback } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";

const ReadPage = () => {
  // const { tno } = useParams();
  // const nav = useNavigate();

  // const [queryParams] = useSearchParams();
  // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  // const queryStr = createSearchParams({ page, size }).toString();
  // console.log(`queryStr = ${queryStr}`);

  // const moveToModify = useCallback(
  //   (tno) => nav({ pathname: `/todo/modify/${tno}`, search: queryStr }),
  //   [nav, queryStr],
  // );

  // const moveToList = useCallback(() => {
  //   nav({ pathname: `/todo/list`, search: queryStr });
  // }, [nav, queryStr]);

  const { moveToList, moveToModify, tno, nav } = useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        {/* http://localhost:5173/todo/read/10?page=1&size=10 */}
        {/* tno = {tno} */}
        <ReadComponent
          tno={tno}
          moveToList={moveToList}
          moveToModify={moveToModify}
        />
        {/* <div>
          <button onClick={() => moveToModify(tno)}>Test Modify</button>
          <button onClick={() => moveToList()}>Test List</button>
        </div> */}
      </div>
    </Container>
  );
};

export default ReadPage;
