import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
};

const loginSlice = createSlice({
  name: "loginSlice",
  // initialState: initState,
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("**************login***************");
      const payload = action.payload;
      setCookie("member", JSON.stringify(payload), 1); //1 일
      return payload;

      // const loginParam = action.payload;
      // return { email: loginParam.email };
    },
    logout: (state, action) => {
      console.log("**************logout**************");
      removeCookie("member");
      return { ...initState };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled : 완료");
        const payload = action.payload;
        //정상적인 로그인시에만 쿠키에 저장
        if (!payload.error) {
          console.log("쿠키 저장");
          setCookie("member", JSON.stringify(payload), 1); //1 일
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 처리중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
