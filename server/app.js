const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
// 允许所有跨域请求
app.use(cors({ origin: "*" }));
// 解析 JSON 数据，必须加！不然 req.body 拿不到内容
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('客户端已连接：', socket.id);
});

// 发布文章接口
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  console.log('收到文章:', title, content);
  // 推送给所有客户端
  io.emit('newPost', { title, content });
  res.json({ success: true });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log('服务运行在 http://localhost:' + PORT);
});