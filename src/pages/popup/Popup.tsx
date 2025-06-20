import React from 'react';

const Popup = () => {
  const handleAction = async (scriptFile: string, action: string) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      console.error('No active tab');
      return;
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [scriptFile],
      });

      chrome.tabs.sendMessage(tab.id, { action });
    } catch (err) {
      console.error('Injection error:', err);
    }
  };

  return (
    <div className="w-[300px] h-[220px] p-4 bg-gray-900 text-white rounded-lg shadow-lg font-sans">
      <h1 className="text-lg font-semibold text-center mb-4 border-b border-gray-700 pb-2">
        ⚡ Quick Downloader
      </h1>

      <button
        onClick={() => handleAction('contentScriptImages.js', 'downloadImages')}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 mb-3 rounded"
      >
        📸 Download All Images
      </button>

      <button
        onClick={() => handleAction('contentScriptTables.js', 'downloadTables')}
        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded"
      >
        📊 Download All Tables
      </button>
    </div>
  );
};

export default Popup;
