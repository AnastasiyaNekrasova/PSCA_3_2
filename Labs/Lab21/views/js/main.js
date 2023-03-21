function lockRemoveButton() {
    const removeButton = document.getElementById('remove-button');
    if (!removeButton) return;
    removeButton.setAttribute('disabled', 'true');
}

function create() {
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const error = document.getElementsByClassName('error')[0];
    if (!fio || !number) {
        error.innerHTML = 'Check information!!! Wrong data (＃￣0￣)';
        return;
    }
    if (!/\+375\(\d{2}\)\d{3}\-\d{2}\-\d{2}$/.test(number)) {
        error.innerHTML = '(＞ｍ＜) Wrong phone number!!! Pattern: +375(xx)xxx-xx-xx (」°ロ°)」';
        return;
    }

    fetch('/add',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fio, number })
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function update() {
    const id = document.getElementsByClassName('editContainer')[0].getAttribute('data-key');
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const error = document.getElementsByClassName('error')[0];

    if (!fio || !number) {
        error.innerHTML = 'Write some info!!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧';
        return;
    }

    if (!/\+375\(\d{2}\)\d{3}\-\d{2}\-\d{2}$/.test(number)) {
        error.innerHTML = '(＞ｍ＜) Wrong phone number!!! Pattern: +375(xx)xxx-xx-xx (」°ロ°)」';
        return;
    }

    fetch('/update',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, fio, number })
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function remove() {
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const id = document.getElementsByClassName('editContainer')[0].getAttribute('data-key');
    const button = document.getElementsByClassName('rmvBtn')[0];
    const error = document.getElementsByClassName('error')[0];

    if (!id) return;
    if (fio.length > 1) {
        button.disabled = true; 
    }
    if (!fio || !number) {
        error.innerHTML = 'Write some info!!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧';
        return;
    }

    fetch('/delete',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, fio, number })
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}