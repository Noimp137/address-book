export function initLoginPage() {
  const loginPage = document.getElementById('loginPage');
  const contactPage = document.getElementById('contactPage');
  const loginForm = document.getElementById('loginForm');
  const usernameDisplay = document.getElementById('usernameDisplay');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    usernameDisplay.textContent = `Welcome, ${username}`;
    loginPage.classList.remove('active');
    contactPage.classList.add('active');
  });
}
