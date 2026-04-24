/* Aither auth gate — client-side.
   Enforces Firebase Auth + @aither.co email. Hides the page until a valid
   session is confirmed, otherwise redirects to login.html.

   Usage — include in <head> of every protected page, BEFORE any app scripts:
     <script src="./shared/firebase-config.js"></script>
     <script src="./shared/auth-gate.js"></script>

   The gate exposes:
     window.AITHER_USER         - { email, displayName, photoURL, uid } once signed in
     window.aitherLogout()      - signs out and returns to login.html
     window.aitherOnReady(fn)   - fn(user) is called once auth is confirmed
*/
(function () {
  var ALLOWED_DOMAIN = 'aither.co';
  var LOGIN_PAGE = 'login.html';

  // Hide the page immediately to avoid flashing unauthenticated content.
  var hideStyle = document.createElement('style');
  hideStyle.id = 'aither-auth-hide';
  hideStyle.textContent = 'html{visibility:hidden!important}';
  document.documentElement.appendChild(hideStyle);

  // Safety: if something goes wrong in the next ~8s, bail to login rather than
  // leaving the user staring at a blank page.
  var bailTimer = setTimeout(function () {
    redirectToLogin('timeout');
  }, 8000);

  function reveal() {
    clearTimeout(bailTimer);
    var s = document.getElementById('aither-auth-hide');
    if (s && s.parentNode) s.parentNode.removeChild(s);
  }

  function redirectToLogin(reason) {
    clearTimeout(bailTimer);
    var here = window.location.pathname + window.location.search + window.location.hash;
    var url = LOGIN_PAGE + '?next=' + encodeURIComponent(here);
    if (reason) url += '&reason=' + encodeURIComponent(reason);
    window.location.replace(url);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  var readyCallbacks = [];
  window.aitherOnReady = function (fn) {
    if (window.AITHER_USER) { try { fn(window.AITHER_USER); } catch (e) {} return; }
    readyCallbacks.push(fn);
  };

  window.aitherLogout = function () {
    try {
      if (window.firebase && firebase.auth) {
        firebase.auth().signOut().finally(function () {
          window.location.replace(LOGIN_PAGE);
        });
        return;
      }
    } catch (e) {}
    window.location.replace(LOGIN_PAGE);
  };

  async function boot() {
    if (!window.FIREBASE_CONFIG) {
      console.error('[auth-gate] firebase-config.js missing or not loaded before auth-gate.js');
      redirectToLogin('config');
      return;
    }
    try {
      if (!window.firebase || !firebase.apps) {
        await loadScript('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
      }
      await loadScript('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js');

      if (!firebase.apps.length) {
        firebase.initializeApp(window.FIREBASE_CONFIG);
      }

      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) { redirectToLogin(); return; }
        var email = (user.email || '').toLowerCase();
        if (!email.endsWith('@' + ALLOWED_DOMAIN)) {
          // Signed in with the wrong domain — kick them back to login with an error.
          firebase.auth().signOut().finally(function () {
            redirectToLogin('domain');
          });
          return;
        }

        window.AITHER_USER = {
          email: email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          uid: user.uid
        };
        reveal();
        readyCallbacks.forEach(function (fn) { try { fn(window.AITHER_USER); } catch (e) {} });
        readyCallbacks.length = 0;
      });
    } catch (err) {
      console.error('[auth-gate] boot failed', err);
      redirectToLogin('boot');
    }
  }

  boot();
})();
