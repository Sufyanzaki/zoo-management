// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ),
      withCredentials: true
    };
  
    res.status(statusCode).cookie("token", token, options).redirect('/');
  };
  
  export default sendToken;