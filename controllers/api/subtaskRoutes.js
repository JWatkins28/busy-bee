const router = require('express').Router();
const { Subtask } = require('../../models');
const checkAuth = require('../../utils/auth');

// CREATE SUBTASK
router.post('/', checkAuth, async (req, res) => {
    try {
        const newSubtask = await Subtask.create({...req.body});
        res.status(200).json(newSubtask);
    } catch (err) { res.status(400).json(err) }
});

// DELETE SUBTASK BY ID
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const subtaskData = await Subtask.destroy({where: {id: req.params.id,}});

        if (!subtaskData) {
            res.status(404).json({ message: 'No subtask found with this ID!' })
            return;
        };

        res.status(200).json(subtaskData)
    } catch (err) { res.status(400).json(err) }
});

// UPDATE TASK
router.put('/:id', async (req, res) => {
    try {

    const subtaskData = await Subtask.update(req.body, { where: { id: req.params.id } });
    
    if (!subtaskData) {
        res.status(404).json({ message: 'No subtask found with this ID!' })
        return;
    };

    res.status(200).json(subtaskData);

    } catch (err) { res.status(400).json(err) }
})

module.exports = router;