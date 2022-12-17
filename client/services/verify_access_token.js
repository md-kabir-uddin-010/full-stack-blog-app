import axios_interceptor from "../utils/axios/axios_interceptor";

export default verify_access_token = async () => {
  try {
    const { data } = await axios_interceptor.get(
      "/api/v1/check/access/token/valid"
    );
    const valid = data.valid;
    return valid;
  } catch (error) {
    return false;
  }
};
