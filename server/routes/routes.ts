import * as express from "express";
// import userCtrl from "./userCtrl";

export function setRoutes(app) {

  const router = express.Router();

//   routes
  // router.post("/authenticate", authenticate);
  // router.post("/register", register);
  // router.get("/", getAll);
  // router.get("/current", getCurrent);
  // router.put("/:_id", update);
  // router.delete("/:_id", _delete);

//   Users
  // router.route('/login').post(userCtrl.login);
  // router.route('/users').get(userCtrl.getAll);
  // router.route('/users/count').get(userCtrl.count);
  // router.route('/user').post(userCtrl.insert);
  // router.route('/user/:id').get(userCtrl.get);
  // router.route('/user/:id').put(userCtrl.update);
  // router.route('/user/:id').delete(userCtrl.delete);

//   Apply the routes to our application with the prefix /api
  // app.use("/api", router);

  // function authenticate(req, res) {

  //   userCtrl.authenticate(req.body.username, req.body.password)
  //     .then(function (user) {
  //         if (user) {
  //           // authentication successful
  //           res.send(user);
  //         } else {
  //           // authentication failed
  //           res.status(401).send('Username or password is incorrect');
  //         }
  //       })
  //     .catch(function (err) {
  //       res.status(400).send(err);
  //     });
    
  // }

  // function register(req, res) {

  //   userCtrl.create(req.body)
  //     .then(function () {
  //       res.sendStatus(200);
  //     })
  //     .catch(function (err) {
  //       res.status(400).send(err);
  //     });

  // }

  // function getAll(req, res, next) {

  //   userCtrl.getAll(req, res, next)
  //     .then(function (users) {
  //       res.send(users);
  //     })
  //     .catch(function (err) {
  //       res.status(400).send(err);
  //     });

  // }

  // function getCurrent(req, res) {

  //   userCtrl.getById(req.user.sub)
  //     .then(function (user) {
  //       if (user) {
  //         res.send(user);
  //       } else {
  //         res.sendStatus(404);
  //       }
  //     })
  //     .catch(function (err) {
  //       res.status(400).send(err);
  //     });
    
  // }

  // function update(req, res) {

  //   userCtrl.update(req.params._id, req.body)
  //     .then(function () {
  //       res.sendStatus(200);
  //     })
  //     .catch(function (err) {
  //       res.status(400).send(err);
  //     });

  // }

  // function _delete(req, res) {

  //   userCtrl.delete(req.params._id)
  //     .then(function () {
  //       res.sendStatus(200);
  //     })
  //     .catch(function (err) {
  //       res.status(400).send(err);
  //     });

  // }

}
