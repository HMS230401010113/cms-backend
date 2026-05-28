import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notifications, setNotifications] = useState([]);

  // 连接 WebSocket
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log("✅ WebSocket 已连接到 5000 端口！");
    });

    // 接收后端推送的通知
    socket.on('newPost', (data) => {
      setNotifications(prev => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  // 发布文章
  const handlePublish = async () => {
    if (!title || !content) {
      alert('请填写完整的标题和内容！');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content })
      });

      if (response.ok) {
        alert('✅ 文章发布成功！');
        setTitle('');
        setContent('');
      } else {
        alert('❌ 发布失败，请检查后端是否启动');
      }
    } catch (error) {
      console.error('请求出错:', error);
      alert('❌ 发布失败，无法连接到服务器');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', padding: '0 20px' }}>
      <h1>Hexa-CMS 实时通知</h1>

      <div style={{ margin: '15px 0' }}>
        <input
          placeholder="文章标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        />
      </div>

      <div style={{ margin: '15px 0' }}>
        <textarea
          placeholder="文章内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        />
      </div>

      <button
        onClick={handlePublish}
        style={{ padding: "12px 25px", fontSize: 16, cursor: "pointer" }}
      >
        发布文章
      </button>

      <h3 style={{ marginTop: 30 }}>实时通知：</h3>
      {notifications.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
          <h4>{item.title}</h4>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;