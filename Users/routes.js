import * as dao from "./dao.js";

export default function UserRoutes(app) {
  let globalCurrentUser;

  const createUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json(
        { message: "Please enter a username and password" });
    } else {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
          res.status(400).json(
            { message: "Username already taken" });
      } else {
          const good_user = await dao.createUser(req.body);
          res.json(good_user);
        }
    }
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};


  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };


  const findUserById = async (req, res) => { };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    res.json(status);
  };

  const signup = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json({message: "Username and Password is required."});
    }
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    } else {
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      globalCurrentUser = currentUser;
      res.json(currentUser);
    }
  };

  
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      globalCurrentUser = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    let currentUser = req.session["currentUser"];
    currentUser = globalCurrentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };


  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
