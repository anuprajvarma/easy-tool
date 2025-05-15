// session based authentication

const userSessionData = new Map();

const setUser = (id, user) => {
  userSessionData.set(id, user);
};

const getUser = (id) => {
  const user = userSessionData.get(id);
  return user;
};

const deleteUser = (id) => {
  userSessionData.delete(id);
};

const checkUser = (id) => {
  const user = userSessionData.has(id);
  return user;
};

module.exports = { setUser, getUser, deleteUser, checkUser };
