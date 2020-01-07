const UserController = {
    async index(req, res) {
        res.send("hello world! welcome to the users list")
    }
};

module.exports = UserController;