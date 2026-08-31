import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate({ pathname: "/" }, { replace: true });
  };
  return (
    <Container className="p-5">
      <Card className="text-center">
        <Card.Header>Logout Component</Card.Header>
        <Card.Body>
          <Card.Title>로그아웃을진행합니다.</Card.Title>
          <div className="d-grid gap-2 mt-3">
            <Button variant="outline-primary" onClick={handleClickLogout}>
              로그아웃
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
