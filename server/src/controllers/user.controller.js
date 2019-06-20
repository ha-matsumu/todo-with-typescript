const userController = {
  signup(req, res) {
    res.status(200).send("signup process");
  },

  signin(req, res) {
    res.status(200).send("signin process");
  },

  deactivate(req, res) {
    res.status(200).send("deactivate process")
  }
};

module.exports = userController;
