const User = require('./User');
const Task = require('./Task');
const Subtask = require('./Subtask');

User.hasMany(Task, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Task.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Task.hasMany(Subtask, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
    });
    
Subtask.belongsTo(Task, {
    foreignKey: 'task_id'
    });
  
  module.exports = { User, Task, Subtask };