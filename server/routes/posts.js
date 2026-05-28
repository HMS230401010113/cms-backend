const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // 后面会用到

// 文章发布接口（带实时通知）
router.post('/', async (req, res) => {
  try {
    // 1. 保存文章到数据库
    const newPost = new Post(req.body);
    await newPost.save();

    // 2. 向所有客户端广播通知
    const io = req.app.get('io');
    io.emit('new_post_alert', {
      title: newPost.title,
      author: newPost.author
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;