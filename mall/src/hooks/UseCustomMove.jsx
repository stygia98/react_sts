import { useState, useCallback } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";

// const getNum = (param, defaultValue) => {
//   if (!param) {
//     return defaultValue;
//   }
//   return parseInt(param);
// };

const UseCustomMove = () => {
  const { tno, pno } = useParams();
  const nav = useNavigate();
  const [refresh, setRefresh] = useState(false);

  // todo/read?page=5&size=10
  //   const page = getNum(queryParams.get("page"), 1);
  //   const size = getNum(queryParams.get("size"), 10);
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  const queryDefault = createSearchParams({ page, size }).toString(); //새로 추가

  console.log(`UseCustomMove = ${page}`);

  const moveToProductList = (pageParam) => {
    let queryStr;

    if (pageParam) {
      const pageNum = pageParam.page ? parseInt(pageParam.page) : page;
      const sizeNum = pageParam.size ? parseInt(pageParam.size) : size;
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    nav({
      pathname: `../product/list`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
  };

  const moveToProductRead = (pno) => {
    nav({
      pathname: `../product/read/${pno}`,
      search: queryDefault,
    });
  };

  // const moveToProductRead = useCallback(
  //   (tno) => {
  //     nav({ pathname: `../todo/read/${tno}`, search: queryDefault });
  //   },
  //   [nav, queryDefault],
  // );

  const moveToProductModify = useCallback(
    (pno) => {
      nav({ pathname: `/product/modify/${pno}`, search: queryDefault });
    },
    [nav, queryDefault],
  );

  const moveToList = (pageParam) => {
    let queryStr;

    if (pageParam) {
      const pageNum = pageParam.page ? parseInt(pageParam.page) : page;
      const sizeNum = pageParam.size ? parseInt(pageParam.size) : size;
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
      //const pageNum = getNum(pageParam.page, page);
      //const sizeNum = getNum(pageParam.size, size);
    } else {
      queryStr = queryDefault;
    }
    nav({
      pathname: `../todo/list`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
  };

  // const moveToModify = (tno) => {
  //   console.log(queryDefault);
  //   nav({
  //     pathname: `../todo/modify/${tno}`,
  //     search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
  //   });
  // };

  // const moveToRead = (tno) => {
  //   nav({
  //     pathname: `../todo/read/${tno}`,
  //     search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
  //   });
  // };

  const moveToModify = useCallback(
    (tno) => {
      nav({ pathname: `/todo/modify/${tno}`, search: queryDefault });
    },
    [nav, queryDefault],
  );

  const moveToRead = useCallback(
    (tno) => {
      nav({ pathname: `../todo/read/${tno}`, search: queryDefault });
    },
    [nav, queryDefault],
  );

  return {
    moveToProductModify,
    moveToProductList,
    moveToProductRead,
    moveToList,
    moveToModify,
    moveToRead,
    page,
    size,
    tno,
    pno,
    nav,
    refresh,
  };
};

export default UseCustomMove;
