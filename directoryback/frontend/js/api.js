const API_BASE_URL = 'http://localhost:3000';

// 登录接口
async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

// 获取联系人列表
async function fetchContacts() {
  const response = await fetch(`${API_BASE_URL}/contacts`);
  return response.json();
}

// 添加或编辑联系人
async function saveContact(contact) {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  return response.json();
}

// 删除联系人
async function deleteContact(id) {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}
