一个普普通通的通讯录

具有星标收藏功能 模糊搜索功能 导入导出表格功能 能记录多个联系人信息



front：

directoryfront/
├── index.html         # 主 HTML 文件
├── css/               # 样式文件夹
│   └── styles.css     # 样式文件
├── js/                # 前端逻辑和功能脚本
│   ├── app.js         # 应用入口文件
│   ├── login.js       # 登录页面相关逻辑
│   ├── contacts.js    # 联系人页面相关逻辑
│   ├── utilities.js   # 通用工具方法（如果需要）
│   └── events.js      # 导入、导出及事件相关逻辑
├── libs/              # 外部库文件
     └── xlsx.full.min.js  # xlsx.js 库


back：

directoryback/
├── server/
│   ├── server.js            # 主后端文件
│   ├── data/
│   │   ├── users.json       # 用户数据
│   │   ├── contacts.json    # 联系人数据
├── frontend/                # 前端代码目录
