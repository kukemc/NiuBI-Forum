
# NiuBI Simple Forum
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

这是一个基于Web前端技术构建的简易NiuBi论坛应用程序，旨在提供基础的发帖、回复、刷新帖子功能，并支持Markdown格式文本输入。目前，该项目仅开源了前端部分，后续计划公开对应的后端代码。

### 功能特性
- **发帖功能**：用户可以撰写包含Markdown格式内容的帖子，用户名及发布时间会被自动关联。
- **Markdown支持**：帖子内容支持Markdown语法，允许用户美化他们的帖子内容。
- **回复功能**：用户可以对已发布的帖子进行回复互动。
- **刷新帖子**：实时更新帖子列表，确保用户看到最新的帖子内容。
- **粘贴图片**：用户可以直接对着帖子输入框粘贴想要发送的图片即可自动生成一个八位数随机id的markdown并把图片dataurl缓存到本地，发送时自动将id替换为dataurl实现发送图片

### 技术栈
- **前端框架/库**：html
- **后端框架/技术**：Python, Flask, SQLite, SQLAlchemy, Blueprints, Pytz, JSON, ORM, sessionmaker
- **样式**：CSS, jquery
- **Markdown解析**：使用了showdown将Markdown文本转换为HTML。

### 状态与展望
请注意，本项目是我个人在学习前端开发初期阶段所创建的作品，代码质量与结构可能存在不足之处。尽管如此，该项目对我个人的成长有着重要意义，并希望能为同样热爱编程和游戏社区建设的开发者们提供一些参考。（纯纯刚学前端写的 别喷）

**未来计划**：
- 开源完整的后端服务，提供API支持。
- 持续优化用户体验和界面设计。
- 添加更多实用功能，如用户登录注册等。

### 如何贡献
欢迎任何形式的反馈和贡献。如果您发现bug、有改进意见或愿意参与开发，请随时提交issue或pull request。

### 快速启动
（暂时没整）

### 版权许可
本项目遵循MIT开源许可证，详细内容请参阅[LICENSE](LICENSE)文件。

### 联系作者
如有问题或合作意向，可直接提Issues。

再次感谢您对本项目的关注和支持，让我们共同打造更强大的社区工具！
