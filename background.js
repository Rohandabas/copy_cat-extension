// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyAllText") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tab = tabs[0];
          if (tab) {
              chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  function: copyAllText
              }, () => {
                  if (chrome.runtime.lastError) {
                      console.error('Error executing script: ', chrome.runtime.lastError);
                      sendResponse({ success: false });
                  } else {
                      sendResponse({ success: true });
                  }
              });
          } else {
              sendResponse({ success: false });
          }
      });
      return true; // Indicate that sendResponse will be called asynchronously
  }
});

function copyAllText() {
  const bodyText = document.body.innerText; // Get all text on the page
  navigator.clipboard.writeText(bodyText)
      .then(() => {
          console.log('Text copied to clipboard!');
      })
      .catch(err => {
          console.error('Failed to copy text: ', err);
      });
}
