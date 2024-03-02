let posts = []; // 这里不再手动填充数据，而是从API获取

// 提交帖子
function submitPost() {
    let postContent = document.getElementById('nameInput').value + ':' + document.getElementById('postContent').value;
    if (postContent.trim() === '') {
        alert('帖子内容不能为空！');
        return;
    }

    // 构建POST请求的数据
    const postData = {
        content: postContent
    };

    // 使用fetch发送POST请求到远程API
    fetch('https://api-save.kuke.ink/api/posts', { // 替换为远程API的实际端点
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 根据实际情况添加或移除Authorization Header
            // 'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify(postData) // 将postData转换为JSON字符串发送
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })    
        .then(data => {
            console.log(data);
            // 获取最新帖子列表（这里假设API会在成功创建帖子后返回最新的帖子列表）
            // getPostsFromAPI().then(displayPosts);
            // 或者直接刷新页面以获取最新帖子
            location.reload();
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });

    document.getElementById('postContent').value = '';
}

// 回复帖子
function replyPost(postId) {
    let replyContent = prompt('请输入回复内容:');
    if (replyContent === null || replyContent.trim() === '') {
        return;
    }

    const postData = {
        content: replyContent,
        // 假设需要在请求体中包含被回复的帖子ID
        postId: postId
    };

    // 使用fetch发送POST请求到远程API（假设回复接口是 /api/reply）
    fetch('https://api-save.kuke.ink/api/reply', { // 替换为远程API的实际端点
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 根据实际情况添加或移除Authorization Header
            // 'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify(postData) // 将postData转换为JSON字符串发送
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // 获取最新帖子列表（这里假设API会在成功创建回复后返回最新的帖子列表）
            // getPostsFromAPI().then(displayPosts);
            // 或者直接刷新页面以获取最新帖子
            location.reload();
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });
}

// 获取帖子并展示
function getPostsFromAPI() {
    return fetch('https://api-save.kuke.ink/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            posts = data.map(post => ({
                content: post.content,
                replies: []
            }));
            return posts;
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });
}

// 调用获取帖子的函数并展示
getPostsFromAPI().then(displayPosts);

// 展示帖子
function displayPosts(posts = []) {
    let postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        let postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-content">${post.content}</div>
            <button onclick="replyPost('${post.id}')">回复</button>
        `;

        // 在这里展示回复（假设API返回的帖子数据中包含了回复）
        // ...
        
        postsContainer.appendChild(postElement);
    });
}
