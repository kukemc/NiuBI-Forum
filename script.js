let posts = [];

// 提交帖子
function submitPost() {
    let postContent = document.getElementById('postContent').value;
    if (postContent.trim() === '') {
        alert('帖子内容不能为空！');
        return;
    }
    posts.push({
        content: postContent,
        replies: []
    });
    displayPosts();
    document.getElementById('postContent').value = ''; 
    // 构建POST请求的数据
    const postData = {
        content: postContent
    };

    // 使用fetch发送POST请求
    fetch('http://localhost:3000/', { // 替换为服务器上的实际端点
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-token'
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
            displayPosts()
            // 可以在这里处理服务器返回的数据，比如显示成功消息或者刷新帖子列表
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });

}


// 回复帖子
function replyPost(postIndex) {
    let replyContent = prompt('请输入回复内容:');
    if (replyContent === null || replyContent.trim() === '') {
        return;
    }
    console.log(replyContent);
    const postData = {
        content: replyContent
    };
    fetch('http://localhost:3000/a' , { // 替换为服务器上的实际端点
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-token'
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
            displayPosts()
            // 可以在这里处理服务器返回的数据，比如显示成功消息或者刷新帖子列表
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });

    posts[postIndex].replies.push(replyContent);
    displayPosts();
}

// 展示帖子
function displayPosts() {
    let postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // 清空内容

    posts.forEach((post, index) => {
        let postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-content">${post.content}</div>
            <button onclick="replyPost(${index})">回复</button>
        `;

        // 添加回复内容
        if (post.replies.length > 0) {
            let replyElement = document.createElement('div');
            replyElement.classList.add('reply-content');
            replyElement.innerHTML = post.replies.map(reply => `<div>${reply}</div>`).join(''); // 修正此行
            postElement.appendChild(replyElement); // 添加回复内容到帖子元素中
        }

        postsContainer.appendChild(postElement); // 将帖子元素添加到容器中
    });
}

function gethttp() {
    fetch('http://localhost:3000/')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(asd => {
            const obj = asd;
            console.log(asd); // 处理获取到的帖子数据
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    posts.push({
                        content: obj[key].content,
                        replies: []
                    });
                }
            }
            
            displayPosts();
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });

}
gethttp();