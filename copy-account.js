

async function fetchAccounts() {
    const url = CONFIG.GS_URL;
    const response = await fetch(`${url}?action=getAccounts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'fetch=1' // You can change this based on what your script expects
    });

    const accounts = await response.json();

    const container = document.getElementById('fieldsetsContainer');
    container.innerHTML = '';

    accounts.forEach(acc => {
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'btn';

        const input = document.createElement('input');
        input.value = acc;

        const button = document.createElement('button');
        button.textContent = 'Copy Text';
        button.onclick = () => {
            navigator.clipboard.writeText(acc);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '5px';
        deleteButton.onclick = async () => {
            if (confirm(`Delete "${acc}" from the sheet?`)) {
                const deleteResponse = await fetch(`${url}?action=deleteAccount`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `deleteAccount=${encodeURIComponent(acc)}`
                });

                const result = await deleteResponse.text();
                alert(result);
                fetchAccounts(); // Refresh the list after deletion
            }
        };

        fieldset.appendChild(input);
        fieldset.appendChild(button);
        fieldset.appendChild(deleteButton);
        container.appendChild(fieldset);
    });
}

// Call it on page load
window.onload = fetchAccounts;