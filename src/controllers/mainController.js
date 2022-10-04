const mainController = {
  index: (req, res) => {
    // res.sendFile(path.resolve(__dirname, "../views/home.html"));
    res.render("home");
  },
};

module.exports = mainController;
