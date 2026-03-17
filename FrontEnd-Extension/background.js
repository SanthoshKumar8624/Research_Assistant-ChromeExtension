/* Open side panel when extension icon is clicked */

chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
});


/* Run when extension is installed */

chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.create({
        id: "summarize",
        title: "Summarize with Research Assistant",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "explain",
        title: "Explain with Research Assistant",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "simplify",
        title: "Simplify with Research Assistant",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "questions",
        title: "Generate Questions",
        contexts: ["selection"]
    });

});


/* Handle context menu clicks */

chrome.contextMenus.onClicked.addListener(async (info, tab) => {

    if (!tab || !tab.id) return;

    const operationMap = {
        summarize: "summarize",
        explain: "explain",
        simplify: "simplify",
        questions: "questions"
    };

    const operation = operationMap[info.menuItemId];

    if (operation) {

        await chrome.sidePanel.open({
            tabId: tab.id
        });

        // wait for sidepanel to load
        setTimeout(() => {
            chrome.runtime.sendMessage({
                action: "processText",
                operation: operation
            });
        }, 300);

    }

});