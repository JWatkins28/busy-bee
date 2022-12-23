const router = require('express').Router();
const userRoutes = require('./userRoutes');
const taskRoutes = require('./goalRoutes');
const subtaskRoutes = require('./subtaskRoutes')

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/subtasks', subtaskRoutes);

module.exports = router;