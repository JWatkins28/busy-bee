// CHECKS IF USER IS LOGGED IN
const checkAuth = (req, res, next) => {

    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }

  };

  module.exports = checkAuth;