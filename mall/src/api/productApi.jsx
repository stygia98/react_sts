import axios from "axios";
import jwtAxios from "../util/jwtUtil";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;

// http://localhost:8080/api/products/tno - get
export const productGetOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);
  return res.data;
};

// http://localhost:8080/api/products/list?page=5&size=10 - get
export const productGetList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
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
  const res = await jwtAxios.post(`${prefix}`, product, header);
  return res.data;
};

// http://localhost:8080/api/products/tno - delete
export const productDeleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${prefix}/${pno}`);
  return res.data;
};

// http://localhost:8080/api/products/tno - put
export const productPutOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${prefix}/${pno}`, product, header);
  return res.data;
};
