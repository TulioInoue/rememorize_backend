const HttpError = require("../http-error");
const { v4: uuid } = require("uuid");

let DUMMY_DATA = [
  {
    id: 1,
    firstName: "Túlio",
    lastName: "Inoue",
    email: "tulio.inoue2@gmail.com",
    password: "12345",
  },
];

// Pegar usuário pelo id pela url:
const getUsers = (req, res, next) => {
  const id = req.params.id;

  const user = DUMMY_DATA.filter((user) => user.id == id);

  if (!user) {
    const error = new Error();
    return next(new HttpError("Could not find user.", 404));
  }

  res.json({ data: user });
};

const createUser = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = { id: uuid(), firstName, lastName, email, password };
  DUMMY_DATA.push(newUser);
  res.json({ data: newUser });
};

module.exports = {
  getUsers,
  createUser,
};
