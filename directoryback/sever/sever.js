const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// JSON 文件路径
const usersFile = path.join(__dirname, 'data', 'users.json');
const contactsFile = path.join(__dirname, 'data', 'contacts.json');

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 工具函数：读写 JSON 文件
const readJsonFile = (filePath) => (fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : []);
const writeJsonFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// 初始化数据文件
if (!fs.existsSync(usersFile)) writeJsonFile(usersFile, []);
if (!fs.existsSync(contactsFile)) writeJsonFile(contactsFile, []);

// 登录接口
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

  const users = readJsonFile(usersFile);
  let user = users.find((u) => u.username === username);

  if (!user) {
    user = { username, password };
    users.push(user);
    writeJsonFile(usersFile, users);
  }

  res.json({ message: 'Login successful', username: user.username });
});

// 获取联系人列表
app.get('/contacts', (req, res) => {
  const contacts = readJsonFile(contactsFile);
  res.json(contacts);
});

// 添加或编辑联系人
app.post('/contacts', (req, res) => {
  const { id, name, nickname, phone1, phone2, email, socialMedia, starred } = req.body;
  if (!name || !phone1) return res.status(400).json({ message: 'Name and phone1 are required.' });

  let contacts = readJsonFile(contactsFile);
  if (id) {
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) return res.status(404).json({ message: 'Contact not found.' });
    contacts[index] = { id, name, nickname, phone1, phone2, email, socialMedia, starred };
  } else {
    contacts.push({
      id: Date.now().toString(),
      name,
      nickname: nickname || '',
      phone1,
      phone2: phone2 || '',
      email: email || '',
      socialMedia: socialMedia || '',
      starred: !!starred,
    });
  }

  writeJsonFile(contactsFile, contacts);
  res.json({ message: 'Contact saved successfully.' });
});

// 删除联系人
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  let contacts = readJsonFile(contactsFile);
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Contact not found.' });

  contacts.splice(index, 1);
  writeJsonFile(contactsFile, contacts);
  res.json({ message: 'Contact deleted successfully.' });
});

// 导出联系人
app.get('/contacts/export', (req, res) => {
  const contacts = readJsonFile(contactsFile);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=contacts.json');
  res.send(JSON.stringify(contacts, null, 2));
});

// 导入联系人
app.post('/contacts/import', (req, res) => {
  const { contacts: newContacts } = req.body;
  if (!Array.isArray(newContacts)) return res.status(400).json({ message: 'Invalid contacts format.' });

  const contacts = readJsonFile(contactsFile).concat(newContacts);
  writeJsonFile(contactsFile, contacts);
  res.json({ message: 'Contacts imported successfully.' });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
