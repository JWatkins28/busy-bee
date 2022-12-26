const router = require('express').Router();
const { Task } = require('../../models');
const checkAuth = require('../../utils/auth');

// CREATE TASK
router.post('/', checkAuth, async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newTask);
    } catch (err) { res.status(400).json(err) }
});

// DELETE TASK BY ID
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const taskData = await Task.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found with this ID!' })
            return;
        };

        res.status(200).json(taskData)
    } catch (err) { res.status(400).json(err) }
});

// UPDATE TASK
router.put('/:id', async (req, res) => {
    try {

    const taskData = await Task.update(req.body, { where: { id: req.params.id } });

    if (!taskData) {
        res.status(404).json({ message: 'No task found with this ID!' })
        return;
    };

    res.status(200).json(taskData);

    } catch (err) { res.status(400).json(err) }
})

module.exports = router;