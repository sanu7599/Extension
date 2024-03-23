// content.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'fillForm') {
        fillForm(message.data);
    }
});

function fillForm(data) {
    // Logic to fill out the form using the provided data
    // For example:
    document.querySelector('input[name="name"]').value = data.name;
    document.querySelector('input[name="email"]').value = data.email;
    // Fill out other form fields similarly
}

// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'extractInformation') {
        fetch('http://localhost:5000/extract_information', {
            method: 'POST',
            body: new FormData({ file_path: message.file_path })
        })
        .then(response => response.json())
        .then(data => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'fillForm', data: data });
            });
        });
    }
});

// popup.js (for the extension's popup)

document.getElementById('uploadFile').addEventListener('change', function () {
    var file = this.files[0];
    if (file) {
        chrome.runtime.sendMessage({ action: 'extractInformation', file_path: file.path });
    }
});
