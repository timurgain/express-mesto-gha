const regExp = {
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  url: /^(ftp|http|https):\/\/[^ "]+#*$/,
};

module.exports = { regExp };