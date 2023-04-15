const fs = require("fs");

const dirPath = "./database";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./database/users.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadUsers = () => {
  const fileBuffer = fs.readFileSync("./database/users.json", "utf-8");
  const users = JSON.parse(fileBuffer);
  return users;
};

const saveUsers = (users) => {
  fs.writeFileSync("./database/users.json", JSON.stringify(users));
};

const addUser = (user) => {
  const users = loadUsers();
  users.push(user);
  if (users.length == 1) {
    users[users.length - 1].id = 1;
  } else if (users.length > 1) {
    users[users.length - 1].id = users[users.length - 2].id + 1;
  }
  saveUsers(users);
};

function getLastUser() {
  let data = loadUsers();
  for (let i = 0; i < data.length; i++) {
    data = data[data.length - 1];
  }
  return data;
}

const checkEmail = (email) => {
  const users = loadUsers();
  return users.find((user) => user.email === email);
};

const checkPassword = (password) => {
  const users = loadUsers();
  return users.find((user) => user.password === password);
};

module.exports = { addUser, getLastUser, loadUsers, checkEmail, checkPassword };
