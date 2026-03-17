document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['researchNotes'], function (result) {
        if (result.researchNotes) {
            document.getElementById('notes').value = result.researchNotes;
        }
        document.getElementById('clearNotesBtn').addEventListener('click', clearNotes);
        document.getElementById('copyNotesBtn').addEventListener('click', copyNotes);
    });

    document.getElementById('summarizeBtn').addEventListener('click', () => processText('summarize'));
    document.getElementById('explainBtn').addEventListener('click', () => processText('explain'));
    document.getElementById('simplifyBtn').addEventListener('click', () => processText('simplify'));
    document.getElementById('questionsBtn').addEventListener('click', () => processText('questions'));
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "processText") {
        processText(message.operation);
    }

});

async function processText(operation) {

    const loading = document.getElementById('loading');
    loading.style.display = "block";

    try {

        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

        const [{result}] = await chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: () => window.getSelection().toString()
        });

        if (!result) {
            showResult('Please select some text first');
            loading.style.display = "none";
            return;
        }

        const response = await fetch('http://localhost:8081/api/research/process', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: result,
                operation: operation
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const text = await response.text();

        showResult(
            text
                .replace(/\*\*/g, '')
                .replace(/\n/g, '<br>')
        );

    } catch (error) {

        showResult('Error: ' + error.message);

    } finally {

        loading.style.display = "none";

    }
}

async function saveNotes() {
    const notes = document.getElementById('notes').value;
    chrome.storage.local.set({'researchNotes': notes}, function () {
        alert('Notes saved successfully');
    });
}

function clearNotes() {

    document.getElementById('notes').value = '';

    chrome.storage.local.remove('researchNotes', function () {
        showResult("Notes cleared successfully");
    });

}

function copyNotes() {

    const notes = document.getElementById('notes').value;

    navigator.clipboard.writeText(notes);

    showResult("Notes copied to clipboard");
}

function showResult(content) {

    document.getElementById('results').innerHTML = `
        <div class="result-item">
            <div class="result-content">${content}</div>
            <button id="addToNotesBtn">Add to Notes</button>
        </div>
    `;

    document.getElementById("addToNotesBtn").addEventListener("click", () => {

        const notesArea = document.getElementById("notes");

        notesArea.value += "\n\n" + content;

        chrome.storage.local.set({
            researchNotes: notesArea.value
        });

    });

}