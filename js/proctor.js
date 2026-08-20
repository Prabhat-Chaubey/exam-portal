// ============================================================
// PROCTORING ENGINE
// Handles: Tab switch, window blur, fullscreen exit, 
//          keyboard shortcuts, right-click
// ============================================================

const Proctor = (() => {

  let violationCount = 0;
  let terminated     = false;
  let onViolationCb  = null;
  let examActive     = false;

  // ── Fullscreen Management ─────────────────────────────

  function requestFullscreen() {
    const el = document.documentElement;
    if      (el.requestFullscreen)       return el.requestFullscreen();
    else if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen)    return el.mozRequestFullScreen();
    else if (el.msRequestFullscreen)     return el.msRequestFullscreen();
  }

  function isFullscreen() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  // ── Violation Handler ────────────────────────────────

  function triggerViolation(reason) {
    if (terminated || !examActive) return;
    violationCount++;
    terminated = true;

    console.warn(`[PROCTOR] Violation #${violationCount}: ${reason}`);

    // Log to Firebase
    const studentData = JSON.parse(sessionStorage.getItem('studentData') || '{}');
    if (studentData.docId && typeof db !== 'undefined') {
      db.collection(COLLECTIONS.violations).add({
        studentDocId: studentData.docId,
        rollNumber:   studentData.rollNumber,
        email:        studentData.email,
        reason:       reason,
        violationNo:  violationCount,
        timestamp:    new Date().toISOString()
      });

      // Update student status
      db.collection(COLLECTIONS.students)
        .doc(studentData.docId)
        .update({ status: 'terminated', terminatedAt: new Date().toISOString(), reason });
    }

    if (onViolationCb) onViolationCb(reason);
  }

  // ── Event Listeners ──────────────────────────────────

  function attachListeners() {

    // Tab / window visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) triggerViolation('Tab switch detected');
    });

    // Window blur (alt+tab, clicking outside)
    window.addEventListener('blur', () => {
      if (examActive) triggerViolation('Window focus lost');
    });

    // Fullscreen exit
    document.addEventListener('fullscreenchange',       checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange',    checkFullscreen);
    document.addEventListener('MSFullscreenChange',     checkFullscreen);

    // Keyboard shortcuts — block all exam-cheating keys
    document.addEventListener('keydown', (e) => {
      const blocked = [
        e.key === 'F12',
        e.ctrlKey && ['c','v','u','s','a','p','f'].includes(e.key.toLowerCase()),
        e.altKey  && e.key === 'Tab',
        e.key     === 'Escape',
        e.metaKey
      ];
      if (blocked.some(Boolean)) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'Escape') {
          // Re-request fullscreen
          setTimeout(requestFullscreen, 100);
        }
      }
    }, true);

    // Right click
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Copy/paste
    document.addEventListener('copy',  e => e.preventDefault());
    document.addEventListener('paste', e => e.preventDefault());
    document.addEventListener('cut',   e => e.preventDefault());
  }

  function checkFullscreen() {
    if (!isFullscreen() && examActive && !terminated) {
      triggerViolation('Exited full screen mode');
    }
  }

  // ── Public API ────────────────────────────────────────

  return {
    init(violationCallback) {
      onViolationCb = violationCallback;
      attachListeners();
    },

    async startProctoring() {
      examActive = true;
      try {
        await requestFullscreen();
      } catch(e) {
        console.warn('Fullscreen request failed:', e);
      }
    },

    stopProctoring() {
      examActive = false;
    },

    isTerminated() { return terminated; },
    getViolationCount() { return violationCount; }
  };

})();