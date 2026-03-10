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

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (!tab || !tab.id) return;

    if (
        info.menuItemId === "summarize" ||
        info.menuItemId === "explain" ||
        info.menuItemId === "simplify" ||
        info.menuItemId === "questions"
    ) {

        chrome.sidePanel.open({
            tabId: tab.id
        });

    }

});