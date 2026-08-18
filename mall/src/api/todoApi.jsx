import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

// http://localhost:8080/api/todo/tno - get
export const getOne = async (tno) => {
  const res = await axios.get(`${prefix}/${tno}`);
  return res.data;
};

// http://localhost:8080/api/todo/list?page=5&size=10 - get
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};
// http://localhost:8080/api/todo/tno - post
export const postAdd = async (todoObj) => {
  const res = await axios.post(`${prefix}/`, todoObj);
  return res.data;
};
