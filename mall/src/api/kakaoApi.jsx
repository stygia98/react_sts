import axios from "axios";
// import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const auth_code_path = "https://kauth.kakao.com/oauth/authorize"; // url
const rest_api_key = "81516aa59352758da79c09549992c389"; //client_id
const redirect_uri = "http://localhost:5173/member/kakao"; //redirect_uri
//response_type = code

const access_token_url = "https://kauth.kakao.com/oauth/token";

//https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code
//${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  const header = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
    //client_secret: client_secret
  };
  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`,
  );
  return res.data;
};
