// OmniStudy AI YouTube Content Script
// Injects an "⚡ OmniStudy Notes" button directly below YouTube video player

(function initOmniStudyButton() {
  function createButton() {
    if (document.getElementById('omnistudy-yt-btn')) return;

    // Look for YouTube action buttons container
    const targetContainer = document.querySelector('#top-level-buttons-computed') ||
                            document.querySelector('#actions-inner #top-level-buttons-computed') ||
                            document.querySelector('ytd-menu-renderer');

    if (!targetContainer) return;

    const btn = document.createElement('button');
    btn.id = 'omnistudy-yt-btn';
    btn.innerHTML = `
      <span style="display:flex;align-items:center;gap:6px;font-family:'Plus Jakarta Sans',Roboto,sans-serif;font-size:13px;font-weight:700;">
        <span style="font-size:15px;">⚡</span>
        <span>OmniStudy Notes</span>
      </span>
    `;

    Object.assign(btn.style, {
      background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '24px',
      padding: '8px 16px',
      cursor: 'pointer',
      margin: '0 8px',
      display: 'inline-flex',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
      transition: 'all 0.2s ease',
      zIndex: '9999'
    });

    btn.onmouseover = () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.boxShadow = '0 4px 12px rgba(37,99,235,0.5)';
    };
    btn.onmouseout = () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 2px 8px rgba(37,99,235,0.3)';
    };

    btn.onclick = () => {
      const currentUrl = window.location.href;
      btn.innerHTML = `<span>⏳ Opening OmniStudy...</span>`;
      // Open local or hosted OmniStudy app with prefilled URL
      const appUrl = `http://localhost:3000/?url=${encodeURIComponent(currentUrl)}`;
      window.open(appUrl, '_blank');
      setTimeout(() => {
        btn.innerHTML = `<span>⚡ OmniStudy Notes</span>`;
      }, 2000);
    };

    targetContainer.prepend(btn);
  }

  // Periodic check as YouTube uses dynamic SPA navigation
  setInterval(createButton, 1500);
})();