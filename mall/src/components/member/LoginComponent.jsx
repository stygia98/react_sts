import { React, useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
  email: "",
  pw: "",
};
export default function LoginComponent({ dologin, moveToPath }) {
  const [loginParam, setLoginParam] = useState({ ...initState });
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
  };

  const handleClickLogin = (e) => {
    // dispatch(login(loginParam));
    dologin(loginParam)
      // .unwrap()
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          alert("로그인 성공");
          // navigate({ pathname: "/" }, { replace: true });
          moveToPath("/");
        }
      });
  };
  return (
    <>
      <h2 className="text-center mb-3">Login Component</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          name="email"
          type="email"
          placeholder="name@example.com"
          value={loginParam.email}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          name="pw"
          type="password"
          placeholder="Password"
          value={loginParam.pw}
          onChange={handleChange}
        />
      </FloatingLabel>
      <div className="d-grid gap-2 mt-3">
        <Button variant="outline-primary" onClick={handleClickLogin}>
          로그인
        </Button>
      </div>
      <KakaoLoginComponent />
    </>
  );
}
