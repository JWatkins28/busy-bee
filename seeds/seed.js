const sequelize = require('../config/connection');
const { User, Task, Subtask } = require('../models');

const userData = require('./userData.json');
const taskData = require('./taskData.json');
const subtaskData = require('./subtaskData.json')

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

  for (const subtask of subtaskData) {
    await Subtask.create({
      ...subtask,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();