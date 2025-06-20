chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download_images' || message.action === 'download_tables') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (tab?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: [message.action === 'download_images' ? 'contentScriptImages.js' : 'contentScriptTables.js'],
        })
      }
    })
  }
})
