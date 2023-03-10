const router = require("express").Router();
const { json } = require("sequelize");
const { User, Task, Subtask } = require("../models");
const checkAuth = require("../utils/auth");

// HOMEPAGE RENDER
router.get("/", async (req, res) => {
  try { res.render("homepage", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET TASK BY ID
router.get("/task/:id", checkAuth, async (req, res) => {
  try {
    // GRAB ALL SUBTASKS IF THERE'S ANY
    const subtaskCheck = await Subtask.findAll({
      where: { task_id: req.params.id },
    });
    let taskData;
    // CHECK IF SUBTASKS EXIST - IF THEY DON'T GRAB ALL POSTS WITHOUT INCLUDING SUBTASKS
    if (!subtaskCheck.length) {
      taskData = await Task.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
      // IF IT DOES HAVE TASKS, GRAB ALL POSTS WITH TASKS WITH ATTACHED SUBTASKS
    } else {
      taskData = await Task.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Subtask,
            where: { task_id: req.params.id },
          },
        ],
      });
    }

    const task = taskData.get({ plain: true });

    res.render("task", {
      ...task,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// MY TASKS PAGE RENDER
router.get("/mytasks", checkAuth, async (req, res) => {
  try {
    // GRAB LOGGED IN USER'S TASKS
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Task }],
    });

    const user = userData.get({ plain: true });

    res.render("mytasks", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD TASK RENDER
router.get("/add", checkAuth, async (req, res) => {
  try {
    res.render("addtask", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EDIT TASK RENDER
router.get("/edit/:id", checkAuth, async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);

    const task = taskData.get({ plain: true });

    res.render("edit", {
      ...task,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD SUBTASK RENDER
router.get("/task/:id/add", checkAuth, async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id);

    const task = taskData.get({ plain: true });

    res.render("addsubtask", {
      ...task,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EDIT SUBTASK RENDER
router.get("/subtask/edit/:id", checkAuth, async (req, res) => {
  try {
    const subtaskData = await Subtask.findByPk(req.params.id);

    const subtask = subtaskData.get({ plain: true });

    res.render("editsubtask", {
      ...subtask,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PROFILE PAGE RENDER
router.get("/profile", checkAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Task }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN RENDER/REDIRECT
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/mytasks");
    return;
  }

  res.render("login");
});

// SIGN UP RENDER/REDIRECT
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/mytasks");
    return;
  }

  res.render("signup");
});

module.exports = router;