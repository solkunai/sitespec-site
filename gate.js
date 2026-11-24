/* SITESPEC pre-launch password gate. Remove the <script src="/gate.js"> tag from each page (or delete this file) to launch.
   Checks a shared password against Supabase (check_site_password). This hides the site from casual visitors;
   it is not hard security, so never put anything private in the site files. */
(function () {
  var URL_ = 'https://tlopsgfqsbctoqaanlti.supabase.co';
  var KEY = 'sb_publishable_VBlNHYWQKmuJhJBe5bgshg_-ql7smz9';
  var DAYS = 30, LS = 'sitespec_gate_ok';
  if (location.pathname.indexOf('/admins') === 0) return;
  try { var t = +localStorage.getItem(LS); if (t && Date.now() - t < DAYS * 864e5) return; } catch (e) {}

  var st = document.createElement('style');
  st.textContent = 'html.gated body>*:not(#gate){display:none!important}html.gated body{background:#1E2735!important;overflow:hidden}' +
    '#gate{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;background:#1E2735;z-index:99999;font-family:Barlow,Arial,sans-serif}' +
    '#gate form{width:100%;max-width:380px;text-align:center;color:#fff}#gate img{width:200px;max-width:70%;margin-bottom:28px}' +
    '#gate h1{font:800 34px/1.05 "Barlow Condensed",Arial Narrow,sans-serif;text-transform:uppercase;letter-spacing:.02em;margin:0 0 8px}' +
    '#gate p{margin:0 0 22px;color:#B4BCC8;font-size:15px}#gate input{width:100%;box-sizing:border-box;padding:14px 16px;border-radius:6px;border:2px solid #3B4A61;background:#141A23;color:#fff;font:600 16px Barlow,Arial,sans-serif;margin-bottom:12px}' +
    '#gate input:focus{outline:none;border-color:#F96A1B}#gate button{width:100%;padding:14px;border:0;border-radius:6px;background:#F96A1B;color:#1E2735;font:800 18px "Barlow Condensed",Arial Narrow,sans-serif;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}' +
    '#gate button:disabled{opacity:.6;cursor:wait}#gate .err{min-height:20px;margin:10px 0 0;color:#FF8A5C;font-size:14px}';
  document.head.appendChild(st);
  document.documentElement.classList.add('gated');

  function build() {
    var g = document.createElement('div'); g.id = 'gate';
    g.innerHTML = '<form autocomplete="off"><img src="/img/sitespec-logo-horizontal-white-transparent.png" alt="SITESPEC"><h1>Coming soon</h1><p>This site is private while we get ready to launch. Enter the password to continue.</p>' +
      '<label class="sr" for="gpw" style="position:absolute;left:-9999px">Password</label><input id="gpw" type="password" placeholder="Password" autocomplete="current-password" required><button type="submit">Enter</button><div class="err" id="gerr" role="alert"></div></form>';
    document.body.appendChild(g);
    var f = g.querySelector('form'), pw = g.querySelector('#gpw'), err = g.querySelector('#gerr'), b = g.querySelector('button');
    pw.focus();
    f.onsubmit = function (e) {
      e.preventDefault(); err.textContent = ''; b.disabled = true;
      fetch(URL_ + '/rest/v1/rpc/check_site_password', { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ p: pw.value }) })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (ok) {
          if (ok === true) { try { localStorage.setItem(LS, String(Date.now())); } catch (e) {} document.documentElement.classList.remove('gated'); g.remove(); }
          else { err.textContent = 'Wrong password.'; pw.select(); }
        })
        .catch(function () { err.textContent = 'Could not check the password. Try again.'; })
        .then(function () { b.disabled = false; });
    };
  }
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
