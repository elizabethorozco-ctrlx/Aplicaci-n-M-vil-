const usersDB = [];

export const registerUser = async (user) => {
  const exists = usersDB.find(u => u.email === user.email);
  if (exists) return false;
  usersDB.push(user);
  return true;
};

export const loginUser = async (credentials) => {
  const found = usersDB.find(u => u.email === credentials.email && u.password === credentials.password);
  return !!found;
};