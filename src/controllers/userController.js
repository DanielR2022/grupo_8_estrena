const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

/*  archivo de Usuarios */
const userFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

/*  archivo de Category */
const categoryFilePath = path.join(__dirname, "../data/usercateg.json");
const categories = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));
let pass, conPass, errors;
let contraseniaIguales = false;
//let usuarioALoguear = null;

const controller = {
  login: (req, res) => {
    res.render("users/user-login");
  },

  prosLogin: (req, res) => {
    errors = validationResult(req);
    // pass = req.body.password;

    if (!errors.isEmpty()) {
      return res.render("users/user-login", { errors: errors.errors });
    }

    let usuarioALoguear = users.find((usuario) => {
      return usuario.email == req.body.mail;
    });

    if (usuarioALoguear) {
      //comparo lo q ingreso en password con mi usuario
      console.log("usuariopasword: " + usuarioALoguear.password);
      let passOk = bcrypt.compareSync(
        req.body.password,
        usuarioALoguear.password
      );
      if (passOk) {
        delete usuarioALoguear.password;
        delete usuarioALoguear.confirmPassword;

        req.session.usuarioLogueado = usuarioALoguear;
        console.log("usuario a loguear");
        console.log(usuarioALoguear);

        if (req.body.recordar_usuario) {
          res.cookie("usuario_logueado", usuarioALoguear.email);
        }

        //console.log(req.session);
        return res.redirect("user-profile");
        //return res.render("users/user-profile");
      }
      return res.render("users/user-login", {
        errors: { password: { msg: "Usuario  / contraseña invalida" } },
      });
    }
    return res.render("users/user-login", {
      errors: { mail: { msg: "Usuario  / contraseña invalida" } },
    });
  },
  register: (req, res) => {
    res.render("users/user-register", { categories });
  },

  profile: (req, res) => {
    //console.log(req.cookie.usuario_logueado);
    res.render("users/user-profile", { userL: req.session.usuarioLogueado });
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },

  /* Guarda Usurio  de Creacion */

  userStore: (req, res) => {
    errors = validationResult(req);
    pass = req.body.password;
    conPass = req.body.confirmPassword;

    //evaluo si tiene errores
    if (errors.length > 0) {
      return res.render("users/user-register", {
        categories,
        errors: errors.errors,
        old: req.body,
      });
    }

    //contrseña y confirmacion de contraseña son iguales
    if (pass === conPass) {
      pass = bcrypt.hashSync(pass, 10);
      contraseniaIguales = true;
    }

    let usuarioACrear = users.find((usuario) => {
      return usuario.email == req.body.email;
    });

    /* Pendiente */
    /* if (usuarioACrear) {
      console.log("Entra a validar");
      return res.render("users/user-register", {
        errors: {
          email: { msg: "Este email ya esta registrado" },
        },
        old: req.body,
      });
    }*/
    //console.log("salio de validar");

    if (contraseniaIguales == true) {
      let image;

      if (req.file != undefined) {
        image = req.file.filename;
      } else {
        image = "image-default.jpg";
      }
      let newUser = {
        id: users[users.length - 1].id + 1,
        ...req.body,
        image: image,
        password: pass,
        confirmPassword: pass,
      };
      users.push(newUser);
      fs.writeFileSync(userFilePath, JSON.stringify(users, null, " "));
      res.redirect("/");
    } else {
      console.log("Contraseña invalidas");
      return res.render("users/user-register", {
        categories,
        errors: errors.errors,
        old: req.body,
      });
    }
  },
};

module.exports = controller;
