function userLogMiddleware(req, res, next) {
  if (req.session.usuarioLogueado) {
    // return res.redirect("users/user-profile");
    return res.redirect("user-profile");
  }
  next();
}
module.exports = userLogMiddleware;
