import { useEffect, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/productApi";
import { Form, Container } from "react-bootstrap";
import InfoModal from "../common/InfoModal";
import UseCustomMove from "../../hooks/UseCustomMove";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};

const ModifyComponent = ({ tno, moveToList, moveToRead }) => {
  const [todo, setTodo] = useState(initState);
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  // const { page, moveToList } = UseCustomMove();

  const onClickUpdate = (e) => {
    const value = e.target.value;
    putOne(todo)
      .then((data) => {
        setTitle(`Todo 수정 : ${todo.tno}`);
        data.RESULT === "SUCCESS" ? setContent("성공") : setContent("실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`Todo 수정 : ${todo.tno}`);
        setContent("오류발생");
        console.log(`예외[ModifyComponent]: ${e}`);
        setFlag(true);
      });
  };

  const onClickDelete = () => {
    deleteOne(todo.tno)
      .then((data) => {
        setTitle(`Todo 삭제 : ${todo.tno}`);
        data.RESULT === "SUCCESS" ? setContent("성공") : setContent("실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`Todo 삭제 : ${todo.tno}`);
        setContent("오류발생");
        console.log(`예외[ModifyComponent]: ${e}`);
        setFlag(true);
      });
  };

  const closeModal = () => {
    setFlag(false);
    moveToList();
  };

  useEffect(() => {
    getOne(tno).then((data) => {
      setTodo(data);
    });
  }, [tno]);

  const onChangeTodo = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onChangeComplete = (e) => {
    const value = e.target.value === "true" ? true : false;
    // todo.complete = value === "true" ? "true" : "false";
    setTodo({ ...todo, complete: value });
  };

  useEffect(() => {}, [tno]);
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
            <Form.Label>TNO</Form.Label>
            <Form.Control
              value={tno}
              type="text"
              placeholder="Enter no"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>WRITER</Form.Label>
            <Form.Control
              value={todo.writer}
              type="text"
              placeholder="Enter writer"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>TITLE</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={todo.title}
              placeholder="Enter title"
              onChange={onChangeTodo}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DATE</Form.Label>
            <Form.Control
              name="dueDate"
              value={todo.dueDate}
              type="date"
              onChange={onChangeTodo}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>COMPLETE</Form.Label>
            <Form.Select
              name="complete"
              value={todo.complete ? "true" : "false"}
              onChange={onChangeComplete}
            >
              <option value="true">Completed</option>
              <option value="false">Not Yet</option>
            </Form.Select>
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2 mt-5">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onClickUpdate}
          >
            수정하기
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={onClickDelete}
          >
            삭제하기
          </button>
          <button
            className="btn btn-primary"
            type="text"
            onClick={() => {
              moveToList();
            }}
          >
            목록가기
          </button>
        </div>
      </Container>
    </>
  );
};
export default ModifyComponent;
