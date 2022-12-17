const Cryptr = require("cryptr");
const cryptr = new Cryptr("MyDataSecret");

//encode password
export const endcodePass = (password) => {
  const encryptedString = cryptr.encrypt(password);
  localStorage.setItem("_up", JSON.stringify(encryptedString));
};

//decode password
export const decodePass = () => {
  const getPass =
    localStorage.getItem("_up") && JSON.parse(localStorage.getItem("_up"));
  if (getPass) {
    const decrypted = cryptr.decrypt(getPass);
    return decrypted;
  }
  return null;
};
