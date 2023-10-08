export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

export const validatePasswordLength = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  return phone.length === 10;
};
