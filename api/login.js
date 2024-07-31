const backendUrl = 'https://smard-study.vercel.app/api';

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === '' || password === '') {
    alert('Please enter both username and password.');
    return;
  }

  fetch(`${backendUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        alert('Login successful!');
        navigateTo('profile');
        displayProfile();
      }
    })
    .catch((error) => console.error('Error:', error));
}
