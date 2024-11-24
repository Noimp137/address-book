const loginForm = document.getElementById('loginForm');
const usernameDisplay = document.getElementById('usernameDisplay');
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');

let contacts = [];

// 登录事件
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const data = await login(username, password);
  usernameDisplay.textContent = `Welcome, ${data.username}`;
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('contactPage').classList.add('active');
  await loadContacts();
});

// 加载联系人
async function loadContacts() {
  contacts = await fetchContacts();
  renderContacts();
}

// 渲染联系人
function renderContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact) => {
    const li = document.createElement('li');
    li.textContent = `${contact.name} - ${contact.phone1}`;
    contactList.appendChild(li);
  });
}

// 提交联系人表单
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const contact = {
    name: document.getElementById('name').value,
    phone1: document.getElementById('phone1').value,
  };
  await saveContact(contact);
  await loadContacts();
});
