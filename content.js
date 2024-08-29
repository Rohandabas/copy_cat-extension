// content.js

// Function to copy all text on the page
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

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyAllText") {
      copyAllText(); // Call the function to copy all text
      sendResponse({ success: true });
  } else {
      sendResponse({ success: false });
  }
});
