// const textarea = document.getElementById('text');
// const submitbtn = document.getElementById('btn');
// const areatoadd = document.getElementById('add');

// // Load saved items from storage when the extension is opened
// document.addEventListener('DOMContentLoaded', () => {
//     chrome.storage.local.get('items', (data) => {
//         const items = data.items || [];
//         items.forEach(item => {
//             addItemToDOM(item);
//         });
//     });
// });

// submitbtn.addEventListener('click', () => {
//     const inputValue = textarea.value; 
//     if (inputValue) {
//         const newItem = { text: inputValue };

//         // Save the new item
//         chrome.storage.local.get('items', (data) => {
//             const items = data.items || [];
//             items.push(newItem);
//             chrome.storage.local.set({ items: items });
//         });

//         addItemToDOM(newItem);

//         // Clear the input field after adding the element
//         textarea.value = '';
//     }
// });

// function addItemToDOM(item) {
//     // Create a container div for the new elements
//     const container = document.createElement("div");
//     container.classList.add("item-container");

//     // Create the new div with the input text
//     const newInput = document.createElement("div");
//     newInput.textContent = item.text;

//     // Create the copy button
//     const button = document.createElement("button");
//     button.textContent = "Copy";

//     // Add the event listener to copy text
//     button.addEventListener("click", () => {
//         navigator.clipboard.writeText(item.text)
//             // .then(() => {
//             //     alert('Text copied to clipboard!');
//             // })
//             // .catch(err => {
//             //     console.error('Failed to copy text: ', err);
//             // });
//     });

//     // Create the delete button
//     const removebtn = document.createElement("button");
//     removebtn.textContent = "Delete";

//     // Add the event listener to delete the entire container
//     removebtn.addEventListener("click", () => {
//         container.remove();

//         // Remove the item from storage
//         chrome.storage.local.get('items', (data) => {
//             const items = data.items || [];
//             const updatedItems = items.filter(i => i.text !== item.text);
//             chrome.storage.local.set({ items: updatedItems });
//         });
//     });

//     // Append the newInput, button, and removebtn to the container
//     container.appendChild(newInput);
//     container.appendChild(button);
//     container.appendChild(removebtn);

//     // Append the container to the area where elements are added
//     areatoadd.appendChild(container);
// }
const textarea = document.getElementById('text');
const submitbtn = document.getElementById('btn');
const areatoadd = document.getElementById('add');
const copyAllBtn = document.getElementById('copyAll');

// Load saved items from storage when the extension is opened
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('items', (data) => {
        const items = data.items || [];
        items.forEach(item => {
            addItemToDOM(item); // Load each saved item into the DOM
        });
    });
});

submitbtn.addEventListener('click', () => {
    const inputValue = textarea.value.trim(); // Trim whitespace
    if (inputValue) {
        const newItem = { text: inputValue };

        // Save the new item to Chrome's local storage
        chrome.storage.local.get('items', (data) => {
            const items = data.items || [];
            items.push(newItem);
            chrome.storage.local.set({ items: items });
        });

        addItemToDOM(newItem); // Add the new item to the DOM

        // Clear the input field after adding the element
        textarea.value = '';
    }
});

// Add functionality to copy all page text
copyAllBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "copyAllText" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error('Error sending message: ', chrome.runtime.lastError);
        } else if (response && response.success) {
            alert('All page text copied to clipboard!');
        } else {
            alert('Failed to copy text.');
        }
    });
});

// Function to add an item to the DOM
function addItemToDOM(item) {
    const container = document.createElement("div");
    container.classList.add("item-container");

    const newInput = document.createElement("div");
    newInput.classList.add("text-item");
    newInput.textContent = item.text;

    const button = document.createElement("button");
    button.classList.add("copy-btn");
    button.textContent = "Copy";

    button.addEventListener("click", () => {
        navigator.clipboard.writeText(item.text)
            .then(() => {
                alert('Text copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    });

    const removebtn = document.createElement("button");
    removebtn.classList.add("delete-btn");
    removebtn.textContent = "Delete";

    removebtn.addEventListener("click", () => {
        container.remove();

        chrome.storage.local.get('items', (data) => {
            const items = data.items || [];
            const updatedItems = items.filter(i => i.text !== item.text);
            chrome.storage.local.set({ items: updatedItems });
        });
    });

    container.appendChild(newInput);
    container.appendChild(button);
    container.appendChild(removebtn);

    areatoadd.appendChild(container);
}
