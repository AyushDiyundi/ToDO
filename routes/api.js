const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/tasks', async (req, res, next) => {
  try {
    const name = (req.body.name || '').trim();
    const description = (req.body.description || '').trim();
    const dueDate = req.body.dueDate || null;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const task = await Task.create({ name, description, dueDate, status: 'pending' });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newStatus = req.body.status || 'pending';
    task.status = newStatus;
    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
