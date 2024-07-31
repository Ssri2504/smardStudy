// Function to navigate between sections
function navigateTo(section) {
    const sections = document.querySelectorAll('section.content');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
  }
  
  // Function to open resources in a new tab
  function openResource(resource) {
    if (!isLoggedIn()) {
      alert('Please login first.');
      navigateTo('profile');
      return;
    }
    window.open(`${resource}.html`, '_blank');
  }
  
  // Function to add a task
function addTask() {
    if (!isLoggedIn()) {
      alert('Please login first.');
      navigateTo('profile');
      return;
    }
  
    const taskInput = document.getElementById('todoInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
  
    // Get current time
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `<span><input type="checkbox"> ${taskText}</span><span class="task-time">${time}</span>`;
    document.getElementById('todoList').appendChild(taskItem);
    taskInput.value = '';
  }
  
  
  // Function to start a video call
  function startVideoCall() {
    if (!isLoggedIn()) {
      alert('Please login first.');
      navigateTo('profile');
      return;
    }
    document.getElementById('videoCall').style.display = 'block';
  }
  
  // Function to check if a user is logged in
  function isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
  }
  
  // Function to handle login
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
      return;
    }
  
    // Retrieve the users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Find the user with matching username and password
    const user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      // Store the logged-in user in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful!');
      navigateTo('profile');
      displayProfile();
    } else {
      alert('Invalid username or password.');
    }
  }
  
  // Function to handle registration
  function register() {
    const regUsername = document.getElementById('regUsername').value.trim();
    const regPassword = document.getElementById('regPassword').value.trim();
    const regName = document.getElementById('regName').value.trim();
    const regCollege = document.getElementById('regCollege').value.trim();
    const regCourse = document.getElementById('regCourse').value.trim();
    const regDob = document.getElementById('regDob').value.trim();
    const regContact = document.getElementById('regContact').value.trim();
    const regSex = document.getElementById('regSex').value;
  
    if (regUsername === '' || regPassword === '' || regName === '' || regCollege === '' || regCourse === '' || regDob === '' || regContact === '' || regSex === '') {
      alert('Please fill in all fields.');
      return;
    }
  
    // Retrieve the users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if the username is already taken
    if (users.some(user => user.username === regUsername)) {
      alert('Username is already taken. Please choose a different one.');
      return;
    }
  
    // Add the new user to the list
    users.push({ username: regUsername, password: regPassword, name: regName, college: regCollege, course: regCourse, dob: regDob, contact: regContact, sex: regSex });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Registration successful! Please login.');
    showLogin();
  }
  
  
  // Function to display profile details
  function displayProfile() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      document.querySelector('.profile-container').innerHTML = `
        <h1>${user.name}'s Profile</h1>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>College:</strong> ${user.college}</p>
        <p><strong>Course:</strong> ${user.course}</p>
        <p><strong>Date of Birth:</strong> ${user.dob}</p>
        <p><strong>Contact No.:</strong> ${user.contact}</p>
        <p><strong>Sex:</strong> ${user.sex}</p>
        <button onclick="logout()">Logout</button>
      `;
    }
  }

  
  
  // Function to handle logout
  function logout() {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    resetState();
  }
  
  // Function to reset the state of the website to the initial state
  function resetState() {
    document.getElementById('todoList').innerHTML = '';
    document.getElementById('videoCall').style.display = 'none';
    showLogin();
    navigateTo('home');
  }
  
  // Function to show the registration form
  function showRegister() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
  }
  
  // Function to show the login form
  function showLogin() {
    document.querySelector('.profile-container').innerHTML = `
      <h1 class="website-name">smartStudy</h1>
      <div id="login">
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username" />
        <input type="password" id="password" placeholder="Password" />
        <button onclick="login()">Login</button>
        <button onclick="showRegister()">Register</button>
      </div>
      <div id="register" style="display: none">
        <h2>Register</h2>
        <input type="text" id="regUsername" placeholder="Username" />
        <input type="password" id="regPassword" placeholder="Password" />
        <input type="text" id="regName" placeholder="Name" />
        <input type="text" id="regCollege" placeholder="College Name" />
        <input type="text" id="regCourse" placeholder="Course" />
        <input type="date" id="regDob" placeholder="Date of Birth" />
        <input type="text" id="regContact" placeholder="Contact No." />
        <select id="regSex">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button onclick="register()">Register</button>
        <button onclick="showLogin()">Back to Login</button>
      </div>
    `;
  }
  
  // Show profile details if logged in on page load
  window.onload = function() {
    if (isLoggedIn()) {
      displayProfile();
    } else {
      showLogin();
    }
  };
  
