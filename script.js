document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to the server
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())
    .then(data => {
        if (data.success) {
            document.querySelector('.login-form').style.display = 'none';
            document.querySelector('.checklist').style.display = 'block';
            loadChecklist(data.checklist);
        } else {
            alert('Login failed');
        }
    });
});

document.getElementById('saveButton').addEventListener('click', function() {
    const items = Array.from(document.querySelectorAll('#checklist li')).map(li => ({
        text: li.textContent,
        completed: li.classList.contains('completed')
    }));

    // Send checklist data to the server
    fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
    });
});

function loadChecklist(items) {
    const checklist = document.getElementById('checklist');
    checklist.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.text;
        if (item.completed) {
            li.classList.add('completed');
        }
        checklist.appendChild(li);
    });
}
