import React from 'react'

const Popup = () => {
  const handleAction = async (scriptFile: string, action: string) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      console.error('No active tab');
      return;
    }

    try {
      // Dynamically inject the script
      await chrome.scripting.executeScript({
  target: { tabId: tab.id },
  files: [scriptFile],
});

      // Then notify it to run
      chrome.tabs.sendMessage(tab.id, { action });
    } catch (err) {
      console.error('Injection error:', err);
    }
  }

  return (
    <div className="w-64 p-4 space-y-4">
      <h1 className="text-lg font-bold text-center">Quick Downloader</h1>

      <button
        onClick={() => handleAction('contentScriptImages.js', 'downloadImages')}

        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Download All Images
      </button>

      <button
        onClick={() => handleAction('contentScriptTables.js', 'downloadTables')}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Download All Tables
      </button>
    </div>
  )
}

export default Popup
