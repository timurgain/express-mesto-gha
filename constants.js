const regExp = {
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  url: /^(ftp|http|https):\/\/[^ "]+#*$/,
  mongoObjectId: /^[0-9a-fA-F]{24}$/,
};

module.exports = { regExp };
