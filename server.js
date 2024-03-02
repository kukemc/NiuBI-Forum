const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // 引入文件系统模块
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// 使用 body-parser 中间件解析请求体中的 JSON 数据
app.use(bodyParser.json());

// 配置 Express 静态文件目录
app.use(express.static('public'));
app.use(cors());

// 定义帖子文件路径


// 创建 posts.json 文件，如果文件不存在或为空

// 定义 POST 请求处理程序，将帖子保存到本地文件
app.post('/', async (req, res) => {
    const postsFilePath = './posts.json';
    const { title, content } = req.body;
    try {
        // 读取现有的帖子数据
        const postsData = await fs.readFile(postsFilePath, 'utf8');
        let posts = JSON.parse(postsData);
        console.log(posts);
        // 创建新的帖子对象
        const newPost = { id: Date.now(), title, content };
        posts.push(newPost);

        // 将更新后的帖子数据写入文件
        await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));

        res.json(newPost); // 返回保存成功的帖子信息
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/a', async (req, res) => {
    const postsFilePath = './reply.json';
    const { title, content } = req.body;
    try {
        // 读取现有的帖子数据
        const postsData = await fs.readFile(postsFilePath, 'utf8');
        let posts = JSON.parse(postsData);
        console.log(posts);
        // 创建新的帖子对象
        const newPost = { id: Date.now(), title, content };
        posts.push(newPost);

        // 将更新后的帖子数据写入文件
        await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));

        res.json(newPost); // 返回保存成功的帖子信息
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// 定义一个GET请求处理程序，用于获取posts.json文件的内容
app.get('/', async (req, res) => {
    const postsFilePath = './posts.json';
    try {
        // 读取posts.json文件的内容
        const postsData = await fs.readFile(postsFilePath, 'utf8');
        const asd = JSON.parse(postsData);
        res.json(asd); // 将读取到的内容作为JSON响应返回给客户端
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
