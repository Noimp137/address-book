import { initLoginPage } from './login.js';
import { initContactPage } from './contacts.js';
import './events.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoginPage();
  initContactPage();
});
