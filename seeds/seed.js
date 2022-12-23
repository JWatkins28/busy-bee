const sequelize = require('../config/connection');
const { User, Task } = require('../models');

const userData = require('./userData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const task of taskData) {
    await Task.create({
      ...task,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const tasks = await Task.findAll();

  process.exit(0);
};

seedDatabase();