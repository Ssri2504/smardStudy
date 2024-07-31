const backendUrl = 'https://smard-study.vercel.app/api';

function register() {
  const regUsername = document.getElementById('regUsername').value.trim();
  const regPassword = document.getElementById('regPassword').value.trim();
  const regName = document.getElementById('regName').value.trim();
  const regCollege = document.getElementById('regCollege').value.trim();
  const regCourse = document.getElementById('regCourse').value.trim();
  const regDob = document.getElementById('regDob').value.trim();
  const regContact = document.getElementById('regContact').value.trim();
  const regSex = document.getElementById('regSex').value.trim();

  if (regUsername === '' || regPassword === '' || regName === '' || regCollege === '' || regCourse === '' || regDob === '' || regContact === '' || regSex === '') {
    alert('Please fill in all fields.');
    return;
  }

  fetch(`${backendUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ regUsername, regPassword, regName, regCollege, regCourse, regDob, regContact, regSex }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        showLogin();
      }
    })
    .catch((error) => console.error('Error:', error));
}
