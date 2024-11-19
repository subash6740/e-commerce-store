const sendToken = (user, res) => {
    const token = user.getJwtToken();
    const options = {
      httpOnly: true,
      secure: false,
    };
    res
      .cookie("token", token, options)
      .status(200)
      .json({ success: true, userId: user.id, username: user.username });
  };
  
  module.exports = sendToken;