let posts = []; // 这里不再手动填充数据，而是从API获取
var showdown = new showdown.Converter();

// 确保在文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取并添加刷新按钮事件监听
    var refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            getPostsFromAPI().then(displayPosts);
        });
    } else {
        console.error('未找到 ID 为 "refresh-button" 的元素');
    }

    // 为初始加载添加刷新功能
    getPostsFromAPI().then(displayPosts);
});

// 提交帖子
function submitPost() {
    if (document.getElementById('postContent').value === '') {
        showModal('帖子内容不能为空！');
        return;
    }
    if (document.getElementById('nameInput').value === '') {
        showModal('名称不能为空！');
        return;
    }
    let postContent = document.getElementById('nameInput').value + ': ' + document.getElementById('postContent').value;

    let postContentMd = document.getElementById('postContent').value;
    let postContentHtml = showdown.makeHtml(postContentMd); // 将Markdown转换为HTML
    let postContentFormatted = document.getElementById('nameInput').value + ': ' + postContentHtml;
    // 更新postData
    
    console.log(postContent);
    
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
    showModal('发送成功');
}

// 回复帖子
function replyPost(postId) {
    console.log(postId)
    let replyContent = prompt('请输入回复内容:');
    if (replyContent === null || replyContent.trim() === '') {
        return;
    }
    let replyContent1 = document.getElementById('nameInput').value + ': ' + replyContent;
    const postData = {
        content: replyContent1,
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
            showModal('回复成功！');
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
            // 直接返回从API获取的原始数据，不要重置replies为[]
            return data;
        })
        .catch(error => {
            console.error('发送请求时出错:', error);
        });
}

// 调用getPostsFromAPI后直接传入displayPosts
getPostsFromAPI().then(posts => {
    displayPosts(posts);
});

// 展示帖子
function displayPosts(posts = []) {
    console.log("帖子数据:", posts);
    let postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    console.log("开始展示帖子列表");

    // 将帖子数组反转
    posts.reverse();

    posts.forEach((post, index) => {
        let postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.postId = post.id;

        // 将Markdown转换为HTML并添加到postContentElement
        let postContentHtml = showdown.makeHtml(post.content);
        let postContentElement = document.createElement('div');
        postContentElement.classList.add('post-content');
        postContentElement.innerHTML = postContentHtml; // 将Markdown转换后的HTML放入元素内
        postElement.appendChild(postContentElement);

        console.log(`正在处理帖子ID ${post.id}`);

        // 新增回复展示部分
        if (Array.isArray(post.replies) && post.replies.length > 0) {
            let repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies');

            post.replies.forEach((reply, replyIndex) => {
                let replyElement = document.createElement('div');
                replyElement.classList.add('reply-content');
                replyElement.textContent = reply.content;

                console.log(`帖子ID ${post.id} 的回复 ${replyIndex + 1}: ${reply.content}`);

                repliesContainer.appendChild(replyElement);
            });

            postElement.appendChild(repliesContainer);
        }

        // 新增显示帖子时间的部分（转换为中国时区时间格式）
        let postTimeStr = post.time
        console.log(postTimeStr);
        let options = { 
          timeZone: 'Asia/Shanghai', // 设置为上海时区，即北京时间
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        };
        let formatter = new Intl.DateTimeFormat('default', options);
        let formattedPostTime = formatter.format(new Date(postTimeStr));

        let postTime = document.createElement('div');
        postTime.classList.add('post-time');
        postTime.textContent = formattedPostTime;
        postElement.appendChild(postTime);
        
        let replyButton = document.createElement('button');
        replyButton.textContent = '回复';
        replyButton.onclick = () => replyPost(post.id);
        replyButton.classList.add('reply-button'); // 添加CSS类名
        postElement.appendChild(replyButton);

        postsContainer.appendChild(postElement);
    });
}

// 弹窗函数
function showModal(message) {
    $('#modal-message').text(message);
    
    // 移除隐藏和隐藏动画类，添加显示动画类
    $('#modal')
      .removeClass('hidden animate-hide')
      .addClass('animate-modal');

    // 重新绑定确认按钮事件，以处理隐藏动画
    $('#confirm-button').off('click').on('click', function() {
      const modalElement = $(this).closest('#modal');
      modalElement
        .removeClass('animate-modal')
        .addClass('animate-modal-out');

      // 使用`animationend`事件来监听动画结束
      modalElement.one('animationend', () => {
        modalElement.removeClass('animate-modal-out'); // 可以在此处添加其他隐藏逻辑，如增加.hidden类
      });
    });
}
