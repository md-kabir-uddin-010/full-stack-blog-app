const checkLogin = () => {
  let access_token =
    localStorage.getItem("access_token") &&
    JSON.parse(localStorage.getItem("access_token"));

  if (access_token) {
    return true;
  }
  return false;
};

export default checkLogin;
