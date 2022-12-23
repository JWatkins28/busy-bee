const router = require('express').Router();
const { User } = require('../../models');

// SIGN UP
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.name;
            req.session.logged_in = true;
            res.status(200).json(userData);
        })
    } catch (err) { res.status(400).json(err) }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        // CHECK USERNAME
        const userData = await User.findOne({ where: { name: req.body.name } });
        if (!userData) { res.status(400).json({ message: 'Incorrect username or password, please try again.' }); return };
        // CHECK PASSWORD
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) { res.status(400).json({ message: 'Incorrect username or password, please try again.' }); return };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.name;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        })

    } catch (err) { res.status(400).json(err) }
});

// LOGOUT
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => { res.status(204).end() })
    } else { res.status(404).end() }
});

module.exports = router;