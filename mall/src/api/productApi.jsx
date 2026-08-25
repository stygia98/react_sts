import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;

// http://localhost:8080/api/products/tno - get
export const getOne = async (tno) => {
  const res = await axios.get(`${prefix}/${tno}`);
  return res.data;
};

// http://localhost:8080/api/products/list?page=5&size=10 - get
export const productGetList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};
// http://localhost:8080/api/products/tno - post
// 헤더 추가 할것
// return { result : {tno} }
export const productPostAdd = async (product) => {
  //파일업로드할때에는기본값인 ‘Content-Type’: ‘application/json’을 ‘multipart/form-data’ 변경해야됨
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.post(`${prefix}`, product, header);
  return res.data;
};

// http://localhost:8080/api/products/tno - delete
export const deleteOne = async (tno) => {
  const res = await axios.delete(`${prefix}/${tno}`);
  return res.data;
};

// http://localhost:8080/api/products/tno - put
export const putOne = async (todo) => {
  const res = await axios.put(`${prefix}/${todo.tno}`, todo);
  return res.data;
};
