import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import UseCustomMove from "../../hooks/UseCustomMove";
import { postAdd } from "../../api/todoApi";
import InfoModal from "../common/InfoModal";

const initState = {
  // "tno": 401,
  title: "",
  writer: "",
  complete: false,
  dueDate: "",
};

const AddComponent = ({ moveToList, page }) => {
  const [todo, setTodo] = useState({ ...initState });
  // const { page, moveToList } = UseCustomMove();
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const onChangeTodo = (e) => {
    // const { name, value } = e.target;
    // todo[e.target.name] = e.target.value;
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onClickInsert = () => {
    postAdd(todo)
      .then((result) => {
        console.log(result);
        // setResult(result.TNO);
        // setInfoModalOn(true);
        setTodo({ ...initState }); // 초기화
        setTitle("Success");
        setContent(`${result.TNO} : 성공`);
        setFlag(true);
      })
      .catch((e) => {
        setTitle("Fail");
        setContent(`${e} 실패`);
        setFlag(true);
        console.error(e);
      });
    console.log(todo);
  };

  const closeModal = () => {
    setFlag(false);
    moveToList();
  };

  return (
    <>
      <Container className="p-5">
        <InfoModal
          show={flag}
          title={title}
          content={content}
          callbackFn={closeModal}
        ></InfoModal>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>TITLE</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={todo.title}
              onChange={onChangeTodo}
              placeholder="Enter Title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>WRITER</Form.Label>
            <Form.Control
              name="writer"
              type="text"
              value={todo.writer}
              onChange={onChangeTodo}
              placeholder="Enter Writer"
            />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>DUEDATE</Form.Label>
            <Form.Control
              name="dueDate"
              type="date"
              value={todo.dueDate}
              onChange={onChangeTodo}
              placeholder="Enter dueDate"
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2 ">
          <Button variant="primary" type="button" onClick={onClickInsert}>
            저장
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              moveToList({ page: `${page}` });
            }}
          >
            목록
          </Button>
        </div>
      </Container>
    </>
  );
};
export default AddComponent;
