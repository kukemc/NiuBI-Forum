let posts = []; // 这里不再手动填充数据，而是从API获取

// 提交帖子
function submitPost() {
    let postContent = document.getElementById('nameInput').value + ': ' + document.getElementById('postContent').value;
    console.log(postContent);
    if (postContent.trim() === '') {
        alert('帖子内容不能为空！');
        return;
    }

    // 构建POST请求的数据
    const postData = {
        content: postContent
    };

    // 使用fetch发送POST请求到远程API
    fetch('https://api-save.kuke.ink/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 根据实际情况添加或移除Authorization Header
            // 'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // 直接获取最新帖子列表并更新显示
            getPostsFromAPI().then(displayPosts);
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });

    document.getElementById('postContent').value = '';
    alert("帖子已发出！");
}

// 回复帖子
function replyPost(postId) {
    console.log(postId)
    let replyContent = prompt('请输入回复内容:');
    if (replyContent === null || replyContent.trim() === '') {
        return;
    }
    const postData = {
        content: replyContent,
        postId: postId
    };

    // 使用fetch发送POST请求到远程API（假设回复接口是 /api/reply）
    fetch('https://api-save.kuke.ink/api/reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 根据实际情况添加或移除Authorization Header
            // 'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // 直接获取最新帖子列表并更新显示
            getPostsFromAPI().then(displayPosts);
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
                replies: [],
                // 假设id字段用于区分帖子
                id: post.id
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
        postElement.dataset.postId = post.id; // 添加postId作为数据属性以便后续操作
        postElement.innerHTML = `
        console.log('${post.id}')
            <div class="post-content">${post.content}</div>
            <button onclick="replyPost('${post.id}')">回复</button>
        `;
        // 在这里展示回复（假设API返回的帖子数据中包含了回复）
        // ...
        
        postsContainer.appendChild(postElement);
    });
}
