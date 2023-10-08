import Cookies from "js-cookie";

// Export the function with a named export
export const CookiesDataSave = async (role, userid, token) => {
  await Cookies.set(
    "userDetails",
    JSON.stringify({
      role: role,
      userid: userid,
      token: token,
    }),
    {
      expires: 30,
      secure: true,
    }
  );
};

// Export the function with a named export
export const checkUserLoginned = () => {
  const userLoginCookie = Cookies.get("userDetails"); // Change 'userLogin' to 'userDetails'
  const isLogin = userLoginCookie ? true : false;
  if (isLogin) {
    return false;
  }

  return true;
};
