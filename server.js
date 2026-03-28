<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>BSPORT — Live</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--red:#E8001E;--rdd:#b5001a;--blk:#0a0a0a;--drk:#111;--crd:#1a1a1a;--brd:#252525;--txt:#f0f0f0;--mut:#777;--dsc:#5865F2;--grn:#00c853;--tg:#29b6f6}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--blk);color:var(--txt);font-family:'Inter',sans-serif;min-height:100vh}
.page{display:none;min-height:100vh;flex-direction:column}.page.active{display:flex}
nav{display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:60px;background:rgba(10,10,10,.98);border-bottom:1px solid var(--brd);position:sticky;top:0;z-index:200;backdrop-filter:blur(12px)}
.logo{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:4px;cursor:pointer;user-select:none}.logo span{color:var(--red)}
.nav-right{display:flex;align-items:center;gap:8px}
.npill{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:6px;font-size:.8rem;font-weight:700;cursor:pointer;transition:all .2s;border:none;font-family:'Inter',sans-serif;text-decoration:none;color:inherit}
.npill.red{background:var(--red);color:#fff}.npill.red:hover{background:var(--rdd)}
.npill.ghost{background:var(--crd);color:var(--txt);border:1px solid var(--brd)}.npill.ghost:hover{border-color:var(--mut)}
.hero{position:relative;overflow:hidden;padding:44px 24px 36px;text-align:center;border-bottom:1px solid var(--brd)}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 80% at 50% 0%,rgba(29,100,255,.13),transparent 65%),radial-gradient(ellipse 40% 40% at 50% 100%,rgba(232,0,30,.06),transparent 60%);pointer-events:none}
.hero-grid{position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,.018) 60px),repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,.018) 60px);pointer-events:none}
.hero-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
.hero-txt{font-family:'Bebas Neue',sans-serif;font-size:5rem;letter-spacing:8px;margin-bottom:14px;animation:float 3s ease-in-out infinite;line-height:1}.hero-txt span{color:var(--red)}
.live-pill{display:inline-flex;align-items:center;gap:7px;background:rgba(232,0,30,.1);border:1px solid rgba(232,0,30,.3);color:var(--red);padding:4px 13px;border-radius:20px;font-size:.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:13px}
.hero-tag{font-size:.88rem;color:var(--mut);font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px}
.hero-btns{display:flex;gap:9px;flex-wrap:wrap;justify-content:center}
.hbtn{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:8px;font-size:.82rem;font-weight:700;cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:all .2s;text-decoration:none}
.hbtn.red{background:var(--red);color:#fff;animation:pglow 2s infinite}.hbtn.red:hover{background:var(--rdd)}
.hbtn.dc{background:rgba(88,101,242,.12);border:1px solid rgba(88,101,242,.35);color:#5865F2}
.hbtn.tg{background:rgba(41,182,246,.1);border:1px solid rgba(41,182,246,.3);color:var(--tg)}
.streams-body{flex:1;max-width:1200px;width:100%;margin:0 auto;padding:28px 22px}
.sec-hdr{display:flex;align-items:center;gap:9px;margin-bottom:18px}
.sec-dot{width:9px;height:9px;border-radius:50%;background:var(--red);animation:pulse 1.4s infinite;flex-shrink:0}
.sec-title{font-size:.98rem;font-weight:700}
.sec-count{background:var(--crd);border:1px solid var(--brd);color:var(--mut);font-size:.7rem;font-weight:600;padding:2px 9px;border-radius:20px}
.refresh{margin-left:auto;background:var(--crd);border:1px solid var(--brd);color:var(--mut);width:32px;height:32px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all .2s}.refresh:hover{border-color:var(--red);color:var(--red)}
.sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.scard{background:var(--crd);border:1px solid var(--brd);border-radius:11px;overflow:hidden;cursor:pointer;transition:all .2s}
.scard:hover{border-color:var(--red);transform:translateY(-3px);box-shadow:0 8px 30px rgba(232,0,30,.14)}
.scard-thumb{width:100%;aspect-ratio:16/9;background:#111;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.scard-thumb img{max-width:70%;max-height:70%;object-fit:contain}
.scard-ph{font-size:2.5rem}
.scard-live{position:absolute;top:9px;left:9px;background:var(--red);color:#fff;font-size:.62rem;font-weight:800;letter-spacing:2px;padding:3px 9px;border-radius:4px;display:flex;align-items:center;gap:5px}
.scard-body{padding:12px 14px}
.scard-name{font-size:.92rem;font-weight:700;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.scard-cat{font-size:.73rem;color:var(--mut)}
.no-stream{padding:36px;text-align:center;color:var(--mut);font-size:.85rem;border:1px dashed var(--brd);border-radius:11px}
.player-inner{flex:1;max-width:980px;width:100%;margin:0 auto;padding:24px 20px;display:flex;flex-direction:column}
.pback{display:flex;align-items:center;gap:7px;color:var(--mut);font-size:.82rem;font-weight:600;cursor:pointer;margin-bottom:18px;transition:color .2s;width:fit-content}.pback:hover{color:var(--txt)}
.pname{font-size:1.2rem;font-weight:800;margin-bottom:4px}
.pstatus{font-size:.78rem;color:var(--mut);margin-bottom:16px}
.pvid-wrap{width:100%;background:#000;border-radius:11px;overflow:hidden;border:1px solid var(--brd);position:relative;aspect-ratio:16/9}
.pvid-wrap video{width:100%;height:100%;display:block}
.pph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--mut);gap:10px}
.pph span{font-size:2.8rem}.pph p{font-size:.88rem;font-weight:600}
.plive{position:absolute;bottom:12px;left:12px;background:var(--red);color:#fff;font-size:.7rem;font-weight:800;letter-spacing:2px;padding:4px 10px;border-radius:4px;display:none;align-items:center;gap:5px}.plive.show{display:flex}
.acc-inner{flex:1;max-width:880px;margin:0 auto;padding:44px 22px;width:100%}
.acc-title{font-family:'Bebas Neue',sans-serif;font-size:2.6rem;letter-spacing:3px;margin-bottom:6px}
.acc-sub{color:var(--mut);font-size:.88rem;margin-bottom:32px}
.plans{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:12px;margin-bottom:24px}
.plan{background:var(--crd);border:1px solid var(--brd);border-radius:11px;padding:22px 18px;text-align:center;transition:all .2s;position:relative}
.plan:hover{border-color:var(--red);transform:translateY(-3px)}.plan.ft{border-color:var(--red)}
.pbdg{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;font-size:.6rem;font-weight:800;letter-spacing:2px;padding:3px 10px;border-radius:20px;white-space:nowrap}
.pdur{font-size:.76rem;font-weight:700;color:var(--mut);margin-bottom:9px;text-transform:uppercase;letter-spacing:1px}
.pprice{font-family:'Bebas Neue',sans-serif;font-size:2.6rem;letter-spacing:1px;line-height:1}.pprice sup{font-size:1rem;vertical-align:super}
.pper{font-size:.7rem;color:var(--mut);margin-bottom:15px}
.pperks{list-style:none;text-align:left;margin-bottom:16px}
.pperks li{font-size:.76rem;color:#bbb;padding:3px 0;display:flex;align-items:center;gap:5px}
.pperks li::before{content:'✓';color:var(--red);font-weight:800;flex-shrink:0}
.pbtn{width:100%;padding:9px;border-radius:7px;font-size:.8rem;font-weight:700;cursor:pointer;border:none;transition:all .2s;font-family:'Inter',sans-serif;text-decoration:none;display:block;text-align:center}
.pbtn.r{background:var(--red);color:#fff}.pbtn.r:hover{background:var(--rdd)}
.pbtn.o{background:transparent;border:1px solid var(--brd);color:var(--txt)}.pbtn.o:hover{border-color:var(--dsc);color:var(--dsc)}
.paybox{background:var(--crd);border:1px solid var(--brd);border-radius:11px;padding:22px;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}
.paybox h3{font-size:.92rem;font-weight:700;margin-bottom:5px}.paybox p{font-size:.8rem;color:var(--mut);line-height:1.6}
.pp-tag{background:#009cde;color:#fff;font-size:.7rem;font-weight:800;padding:4px 10px;border-radius:5px}
.btn-dc{display:inline-flex;align-items:center;gap:7px;background:var(--dsc);color:#fff;padding:10px 18px;border-radius:7px;font-size:.82rem;font-weight:700;cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:opacity .2s;text-decoration:none}.btn-dc:hover{opacity:.85}
#aLogin{flex:1;display:flex;align-items:center;justify-content:center}
.lbox{background:var(--crd);border:1px solid var(--brd);border-radius:12px;padding:34px;width:100%;max-width:340px;text-align:center}
.lbox h2{font-family:'Bebas Neue',sans-serif;font-size:1.9rem;letter-spacing:3px;margin-bottom:5px}
.lbox p{font-size:.8rem;color:var(--mut);margin-bottom:22px}
.finp{width:100%;background:var(--drk);border:1px solid var(--brd);color:var(--txt);padding:10px 13px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.86rem;outline:none;transition:border-color .2s;margin-bottom:9px}.finp:focus{border-color:var(--red)}
.bfull{width:100%;padding:11px;background:var(--red);color:#fff;border:none;border-radius:7px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:700;cursor:pointer}.bfull:hover{background:var(--rdd)}
#aErr{color:var(--red);font-size:.76rem;margin-top:7px;display:none}
#aPanel{display:none;flex:1;flex-direction:column}
.abar{background:var(--drk);border-bottom:1px solid var(--brd);padding:12px 22px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.abar-t{font-weight:700;font-size:.9rem;flex:1}
.ab{padding:7px 13px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.76rem;font-weight:700;cursor:pointer;border:none;transition:all .2s;white-space:nowrap}
.ab.r{background:var(--red);color:#fff}.ab.r:hover{background:var(--rdd)}
.ab.g{background:transparent;border:1px solid var(--brd);color:var(--txt)}.ab.g:hover{border-color:var(--red);color:var(--red)}
.ab.blue{background:transparent;border:1px solid var(--dsc);color:var(--dsc)}
.ab.tgb{background:transparent;border:1px solid var(--tg);color:var(--tg)}
.ab.org{background:transparent;border:1px solid #ff9800;color:#ff9800}
.ab.stop{background:transparent;border:1px solid var(--brd);color:var(--mut)}.ab.stop:hover{border-color:#f44;color:#f44}
.admin-cols{flex:1;display:flex;min-height:0}
.acol-left{width:380px;min-width:280px;border-right:1px solid var(--brd);display:flex;flex-direction:column;background:var(--drk)}
.acol-sec{padding:14px;border-bottom:1px solid var(--brd)}
.acol-title{font-size:.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--mut);margin-bottom:10px}
.ainp{width:100%;background:var(--crd);border:1px solid var(--brd);color:var(--txt);padding:8px 11px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.8rem;outline:none;transition:border-color .2s;margin-bottom:6px}.ainp:focus{border-color:var(--red)}
.cfg-row{display:grid;grid-template-columns:75px 1fr;gap:6px;align-items:center;margin-bottom:7px}
.cfg-row label{font-size:.72rem;color:var(--mut)}
.cfg-row input{background:var(--blk);border:1px solid var(--brd);color:var(--txt);padding:7px 10px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.78rem;outline:none;width:100%}.cfg-row input:focus{border-color:var(--red)}
.ch-list{flex:1;overflow-y:auto}
.ch-item{display:flex;align-items:center;gap:9px;padding:9px 13px;border-bottom:1px solid #1c1c1c;transition:background .15s}.ch-item:hover{background:rgba(232,0,30,.05)}
.ch-logo{width:34px;height:34px;border-radius:5px;background:var(--crd);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;font-size:.7rem;flex-shrink:0;overflow:hidden}.ch-logo img{width:100%;height:100%;object-fit:contain}
.ch-info{flex:1;min-width:0}.ch-name{font-size:.8rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ch-grp{font-size:.67rem;color:var(--mut)}
.ch-add{padding:5px 11px;background:var(--red);color:#fff;border:none;border-radius:5px;cursor:pointer;font-family:'Inter',sans-serif;font-size:.7rem;font-weight:700;transition:all .2s;white-space:nowrap;flex-shrink:0}
.ch-add:hover{background:var(--rdd)}.ch-add.added{background:var(--grn);color:#000;cursor:default}
.acol-right{flex:1;padding:20px;overflow-y:auto}
.stats{display:flex;gap:9px;margin-bottom:18px}
.stat{flex:1;background:var(--crd);border:1px solid var(--brd);border-radius:9px;padding:11px;text-align:center}
.snum{font-family:'Bebas Neue',sans-serif;font-size:1.7rem;color:var(--red)}.slbl{font-size:.66rem;color:var(--mut);text-transform:uppercase;letter-spacing:1px}
.stream-list{display:flex;flex-direction:column;gap:10px}
.sc{background:var(--crd);border:1px solid var(--brd);border-radius:9px;padding:12px;display:flex;gap:10px;align-items:center}
.sc-thumb{width:56px;height:56px;background:#000;border-radius:6px;overflow:hidden;flex-shrink:0;border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;font-size:1.1rem}.sc-thumb img{width:100%;height:100%;object-fit:contain}
.sc-info{flex:1;min-width:0}.sc-name{font-size:.88rem;font-weight:700;margin-bottom:2px}.sc-url{font-size:.65rem;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px}
.sc-acts{display:flex;gap:5px}
.sca{padding:3px 9px;background:transparent;border:1px solid var(--brd);color:var(--mut);border-radius:5px;cursor:pointer;font-family:'Inter',sans-serif;font-size:.66rem;font-weight:600;transition:all .2s}.sca:hover{border-color:var(--txt);color:var(--txt)}.sca.del:hover{border-color:#f44;color:#f44}
#popup{position:fixed;inset:0;z-index:9000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.85);backdrop-filter:blur(8px)}
.pbox-pop{background:linear-gradient(135deg,#0d0d0d,#1a0005);border:1px solid var(--red);border-radius:14px;max-width:410px;width:90%;padding:30px 24px;text-align:center;position:relative}
.pclosebtn{position:absolute;top:11px;right:13px;background:rgba(255,255,255,.05);border:1px solid var(--brd);color:var(--mut);border-radius:50%;width:29px;height:29px;cursor:not-allowed;font-size:.76rem;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:'Inter',sans-serif}
.picon{font-size:2.3rem;margin-bottom:11px}.ptitle{font-family:'Bebas Neue',sans-serif;font-size:1.9rem;letter-spacing:3px;line-height:1.1;margin-bottom:8px}
.psub{font-size:.8rem;color:var(--mut);letter-spacing:1px;margin-bottom:20px}
.pmainbtn{width:100%;padding:13px;color:#fff;border:none;border-radius:8px;font-family:'Inter',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;margin-bottom:9px;animation:pglow 2s infinite}
.pskip{width:100%;padding:8px;background:transparent;color:var(--mut);border:1px solid var(--brd);border-radius:8px;font-family:'Inter',sans-serif;font-size:.76rem;font-weight:600;cursor:not-allowed;opacity:.4}
#splash{position:fixed;inset:0;z-index:9999;background:var(--blk);display:flex;align-items:center;justify-content:center;padding:24px}
.sbox{text-align:center;max-width:440px;width:100%}.slogo{font-family:'Bebas Neue',sans-serif;font-size:3.5rem;letter-spacing:5px;margin-bottom:3px}.slogo span{color:var(--red)}
.stag{font-size:.75rem;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:var(--mut);margin-bottom:36px}
.sicon{font-size:2.8rem;margin-bottom:12px}.stitle{font-family:'Bebas Neue',sans-serif;font-size:1.9rem;letter-spacing:3px;line-height:1.1;margin-bottom:8px}
.ssub{font-size:.8rem;color:var(--mut);letter-spacing:1px;text-transform:uppercase;margin-bottom:26px}
.sbtn{width:100%;max-width:300px;padding:15px;color:#fff;border:none;border-radius:9px;font-family:'Inter',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;margin-bottom:11px;animation:pglow 2s infinite}
.sskip{background:transparent;border:none;color:var(--mut);font-family:'Inter',sans-serif;font-size:.75rem;font-weight:600;cursor:not-allowed;opacity:.4}
.sdots{display:flex;justify-content:center;gap:7px;margin-top:22px}.sdot{width:7px;height:7px;border-radius:50%;background:var(--brd);transition:background .3s}.sdot.on{background:var(--red)}
.toast{position:fixed;bottom:18px;right:18px;background:var(--grn);color:#000;padding:9px 18px;border-radius:7px;font-size:.8rem;font-weight:700;z-index:9999;opacity:0;transform:translateY(8px);transition:all .3s;pointer-events:none}.toast.show{opacity:1;transform:translateY(0)}.toast.err{background:var(--red);color:#fff}
footer{text-align:center;padding:18px;border-top:1px solid var(--brd);font-size:.7rem;color:var(--mut)}footer span{color:var(--red)}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes pglow{0%,100%{box-shadow:0 0 0 0 rgba(232,0,30,.4)}60%{box-shadow:0 0 0 10px rgba(232,0,30,0)}}
@media(max-width:700px){.admin-cols{flex-direction:column}.acol-left{width:100%;border-right:none;border-bottom:1px solid var(--brd);max-height:55vh}}
</style>
</head>
<body>
<div class="toast" id="toast"></div>

<div id="splash">
  <div class="sbox">
    <div class="slogo">B<span>S</span>PORT</div>
    <div class="stag">Live Streaming</div>
    <div id="sIcon" class="sicon"></div>
    <div id="sTitle" class="stitle"></div>
    <div id="sSub" class="ssub"></div>
    <button id="sBtn" class="sbtn" onclick="splashAction()"></button>
    <button id="sSkip" class="sskip" onclick="enterSite()">Ignorer dans <span id="sCt">5</span>s</button>
    <div class="sdots"><div class="sdot" id="d1"></div><div class="sdot" id="d2"></div><div class="sdot" id="d3"></div></div>
  </div>
</div>

<div id="popup">
  <div class="pbox-pop">
    <button class="pclosebtn" id="popClose" onclick="closePopup()"><span id="popCt">5</span></button>
    <div id="popIcon" class="picon"></div>
    <div id="popTitle" class="ptitle"></div>
    <div id="popSub" class="psub"></div>
    <button id="popBtn" class="pmainbtn"></button>
    <button id="popSkip" class="pskip" onclick="closePopup()">Passer dans <span id="popSkipCt">5</span>s...</button>
  </div>
</div>

<div id="pg-home" class="page active">
  <nav>
    <div class="logo" id="secretLogo">B<span>S</span>PORT</div>
    <div class="nav-right">
      <button class="npill red" onclick="go('pg-access')">🔥 Abonnement</button>
      <a href="https://t.me/bsport12" target="_blank" class="npill ghost">📲</a>
      <a href="https://discord.gg/FABHWRfX" target="_blank" class="npill ghost">💬</a>
    </div>
  </nav>
  <div class="hero">
    <div class="hero-bg"></div><div class="hero-grid"></div>
    <div class="hero-inner">
      <div class="hero-txt">B<span>S</span>PORT</div>
      <div class="live-pill"><div style="width:6px;height:6px;background:var(--red);border-radius:50%;animation:pulse 1.4s infinite"></div>DIFFUSION EN DIRECT</div>
      <div class="hero-tag">Le sport en direct, sans interruption</div>
      <div class="hero-btns">
        <button class="hbtn red" onclick="go('pg-access')">🔥 S'abonner — dès 9.99€/mois</button>
        <a href="https://discord.gg/FABHWRfX" target="_blank" class="hbtn dc">💬 Discord</a>
        <a href="https://t.me/bsport12" target="_blank" class="hbtn tg">📲 Telegram</a>
      </div>
    </div>
  </div>
  <div class="streams-body">
    <div class="sec-hdr">
      <div class="sec-dot"></div>
      <div class="sec-title">Streams en direct</div>
      <div class="sec-count" id="mainCount">0</div>
      <button class="refresh" onclick="loadPublic()">↻</button>
    </div>
    <div id="mainGrid" class="sgrid"></div>
  </div>
  <footer>© 2025 <span>BSPORT</span> — Tous droits réservés</footer>
</div>

<div id="pg-player" class="page">
  <nav>
    <div class="logo" onclick="go('pg-home')">B<span>S</span>PORT</div>
    <div class="nav-right"><button class="npill ghost" onclick="go('pg-home')">← Retour</button></div>
  </nav>
  <div class="player-inner">
    <div class="pback" onclick="go('pg-home')">← Retour aux streams</div>
    <div class="pname" id="plName">En direct</div>
    <div class="pstatus" id="plStatus">Connexion...</div>
    <div class="pvid-wrap">
      <div class="pph" id="pph"><span>📡</span><p>Chargement...</p></div>
      <video id="vid" controls playsinline style="display:none;width:100%;height:100%"></video>
      <div class="plive" id="plive"><div style="width:6px;height:6px;background:#fff;border-radius:50%;animation:pulse 1.4s infinite"></div>LIVE</div>
    </div>
  </div>
  <footer>© 2025 <span>BSPORT</span></footer>
</div>

<div id="pg-access" class="page">
  <nav>
    <div class="logo" onclick="go('pg-home')">B<span>S</span>PORT</div>
    <div class="nav-right"><button class="npill ghost" onclick="go('pg-home')">← Accueil</button></div>
  </nav>
  <div class="acc-inner">
    <div class="acc-title">Choisissez votre accès</div>
    <div class="acc-sub">PayPal ou crypto. Activation en moins de 10 minutes via Discord.</div>
    <div class="plans">
      <div class="plan"><div class="pdur">1 Mois</div><div class="pprice"><sup>€</sup>9<span style="font-size:1.2rem">.99</span></div><div class="pper">30 jours</div><ul class="pperks"><li>Tous les streams</li><li>Full HD</li><li>Support Discord</li></ul><a href="https://discord.gg/FABHWRfX" target="_blank" class="pbtn o">Contacter Discord</a></div>
      <div class="plan"><div class="pdur">3 Mois</div><div class="pprice"><sup>€</sup>17<span style="font-size:1.2rem">.99</span></div><div class="pper">90 jours</div><ul class="pperks"><li>Tous les streams</li><li>Full HD</li><li>Support Discord</li></ul><a href="https://discord.gg/FABHWRfX" target="_blank" class="pbtn o">Contacter Discord</a></div>
      <div class="plan ft"><div class="pbdg">⭐ Populaire</div><div class="pdur">6 Mois</div><div class="pprice"><sup>€</sup>29<span style="font-size:1.2rem">.99</span></div><div class="pper">180 jours</div><ul class="pperks"><li>Tous les streams</li><li>Full HD</li><li>Support prioritaire</li><li>-25%</li></ul><a href="https://discord.gg/FABHWRfX" target="_blank" class="pbtn r">Contacter Discord</a></div>
      <div class="plan"><div class="pbdg" style="background:#f0a500;color:#000">🏆 Best</div><div class="pdur" style="margin-top:10px">1 An</div><div class="pprice"><sup>€</sup>39<span style="font-size:1.2rem">.99</span></div><div class="pper">365 jours</div><ul class="pperks"><li>Tous les streams</li><li>Full HD</li><li>Support VIP</li><li>-67%</li></ul><a href="https://discord.gg/FABHWRfX" target="_blank" class="pbtn o">Contacter Discord</a></div>
    </div>
    <div class="paybox">
      <div><h3>Comment payer ?</h3><p>Rejoignez notre Discord, ouvrez un ticket et indiquez la durée souhaitée. Activation en moins de 10 minutes.</p></div>
      <div>
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:11px"><span class="pp-tag">💳 PayPal</span><span style="color:var(--mut)">₿ Ξ 💎</span></div>
        <a href="https://discord.gg/FABHWRfX" target="_blank" class="btn-dc">💬 Rejoindre Discord</a>
      </div>
    </div>
  </div>
  <footer>© 2025 <span>BSPORT</span></footer>
</div>

<div id="pg-admin" class="page">
  <nav>
    <div class="logo" onclick="go('pg-home')">B<span>S</span>PORT <span style="font-size:.72rem;color:var(--mut);font-family:'Inter',sans-serif;letter-spacing:2px;font-weight:600">ADMIN</span></div>
    <div class="nav-right">
      <button class="npill ghost" onclick="go('pg-home')">← Site</button>
      <button class="npill ghost" id="logoutBtn" style="display:none" onclick="logout()">Déconnexion</button>
    </div>
  </nav>
  <div id="aLogin">
    <div class="lbox">
      <h2>🔐 Admin</h2>
      <p>Accès administrateur uniquement</p>
      <input class="finp" type="password" id="aPass" placeholder="Mot de passe" onkeydown="if(event.key==='Enter')doLogin()"/>
      <button class="bfull" onclick="doLogin()">Se connecter</button>
      <div id="aErr">Mot de passe incorrect</div>
    </div>
  </div>
  <div id="aPanel">
    <div class="abar">
      <div class="abar-t">🎛 Panneau admin</div>
      <button class="ab g" onclick="go('pg-home')">👁 Site</button>
      <span style="color:var(--mut);font-size:.72rem;font-weight:600">POPUP:</span>
      <button class="ab blue" onclick="triggerPopup('discord')">💬 Discord</button>
      <button class="ab tgb" onclick="triggerPopup('telegram')">📲 Telegram</button>
      <button class="ab org" onclick="triggerPopup('abo')">🔥 Abo</button>
      <button class="ab stop" onclick="stopPopup()">⛔ Stop</button>
      <button class="ab g" onclick="resetSplash()">🔄 Splash</button>
    </div>
    <div class="admin-cols">
      <div class="acol-left">
        <div class="acol-sec">
          <div class="acol-title">⚙️ Config Proxy</div>
          <div class="cfg-row"><label>Proxy URL</label><input id="cfgWorker" type="text" placeholder="https://lbshop.store"/></div>
          <div class="cfg-row"><label>Username</label><input id="cfgUsr" type="text"/></div>
          <div class="cfg-row"><label>Password</label><input id="cfgPwd" type="text"/></div>
          <button class="ab r" style="width:100%;margin-top:4px" onclick="saveConfig()">💾 Sauvegarder</button>
          <div id="cfgInfo" style="font-size:.7rem;color:var(--grn);margin-top:6px;text-align:center;min-height:16px"></div>
        </div>
        <div class="acol-sec">
          <div class="acol-title">🔍 Rechercher une chaîne</div>
          <div style="display:flex;gap:6px">
            <input class="ainp" id="chSrch" type="text" placeholder="beIN, Canal, RMC..." style="margin:0;flex:1" onkeydown="if(event.key==='Enter')searchCh()"/>
            <button class="ab r" onclick="searchCh()" style="padding:8px 12px">🔍</button>
          </div>
          <div id="loadInfo" style="font-size:.72rem;color:var(--mut);margin-top:5px;min-height:16px"></div>
        </div>
        <div class="ch-list" id="chList">
          <div style="padding:28px;text-align:center;color:var(--mut);font-size:.8rem;line-height:1.7">1️⃣ Configure le Proxy<br>2️⃣ Cherche une chaîne<br>3️⃣ Clique Diffuser</div>
        </div>
      </div>
      <div class="acol-right">
        <div class="stats">
          <div class="stat"><div class="snum" id="stCount">0</div><div class="slbl">Streams actifs</div></div>
          <div class="stat"><div class="snum" id="stCh">—</div><div class="slbl">Chaînes dispo</div></div>
        </div>
        <div class="acol-title" style="margin-bottom:12px">📺 Streams actuellement diffusés</div>
        <div id="streamList" class="stream-list">
          <div style="padding:28px;text-align:center;color:var(--mut);font-size:.8rem;border:1px dashed var(--brd);border-radius:9px">Aucun stream actif</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- mpegts.js supporte H.264 ET H.265 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.10/hls.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mpegts.js@1.7.3/dist/mpegts.js"></script>
<script>
const PASS='bsport2025';
const DISCORD='https://discord.gg/FABHWRfX';
const TELEGRAM='https://t.me/bsport12';

let CFG={worker:'https://lbshop.store',usr:'x5Mf7ekq',pwd:'kBxTD4h'};
const apiUrl=(action)=>`${CFG.worker}/player_api.php?username=${CFG.usr}&password=${CFG.pwd}&action=${action}`;
const streamUrl=(id)=>`${CFG.worker}/live/${CFG.usr}/${CFG.pwd}/${id}.m3u8`;

function _gi(){return atob(['YThjN2U5Yjc','2YzkxYzY3OD','Y5YjkzZDUyZ','TY3MWI3NGY='].join(''))}
function _gt(){return atob(['Z2hwXzJIcVBDQj','JqakROcnpDWFNX','V08wazhTQmlBdz','NkUzFBdDFrRg=='].join(''))}

let streams=[],allCh=[],hlsI=null,mpI=null,logoClicks=0,logoTimer=null,popTimer=null,splashTimer=null;

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function toast(m,e=false){const t=document.getElementById('toast');t.textContent=m;t.className='toast'+(e?' err':'');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800)}

async function gistSave(data){
  try{await fetch(`https://api.github.com/gists/${_gi()}`,{method:'PATCH',headers:{'Authorization':'token '+_gt(),'Content-Type':'application/json'},body:JSON.stringify({files:{'bsport-data.json':{content:JSON.stringify(data)}}})});}catch(e){}
}
async function gistLoad(){
  try{const r=await fetch(`https://api.github.com/gists/${_gi()}`);const d=await r.json();const f=d.files&&d.files['bsport-data.json'];if(f&&f.content)return JSON.parse(f.content);}catch(e){}
  return null;
}

function loadConfig(){
  try{const c=JSON.parse(localStorage.getItem('bs:cfg')||'{}');if(c.worker)CFG.worker=c.worker;if(c.usr)CFG.usr=c.usr;if(c.pwd)CFG.pwd=c.pwd;}catch(e){}
}
function saveConfig(){
  CFG.worker=document.getElementById('cfgWorker').value.trim().replace(/\/+$/,'');
  CFG.usr=document.getElementById('cfgUsr').value.trim();
  CFG.pwd=document.getElementById('cfgPwd').value.trim();
  localStorage.setItem('bs:cfg',JSON.stringify(CFG));
  allCh=[];
  document.getElementById('cfgInfo').textContent='✅ Sauvegardé !';
  setTimeout(()=>document.getElementById('cfgInfo').textContent='',2500);
  toast('✅ Config sauvegardée !');
}
function fillConfigFields(){
  document.getElementById('cfgWorker').value=CFG.worker;
  document.getElementById('cfgUsr').value=CFG.usr;
  document.getElementById('cfgPwd').value=CFG.pwd;
}

function go(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
  if(id==='pg-home')loadPublic();
  if(id==='pg-admin'){fillConfigFields();loadStreams();renderStreamList()}
}

document.getElementById('secretLogo').addEventListener('click',()=>{
  go('pg-home');logoClicks++;clearTimeout(logoTimer);
  logoTimer=setTimeout(()=>logoClicks=0,2000);
  if(logoClicks>=5){logoClicks=0;go('pg-admin')}
});

function loadStreams(){
  try{const d=localStorage.getItem('bs:streams');if(d)streams=JSON.parse(d)}catch(e){streams=[]}
  updateStats();
}
async function saveStreams(){
  localStorage.setItem('bs:streams',JSON.stringify(streams));
  updateStats();
  await gistSave({streams,activePopup:localStorage.getItem('bs:popup')||null});
  toast('✅ Synchronisé !');
}
function updateStats(){const e=document.getElementById('stCount');if(e)e.textContent=streams.length}

async function loadPublic(){
  const remote=await gistLoad();
  if(remote&&remote.streams){
    streams=remote.streams;localStorage.setItem('bs:streams',JSON.stringify(streams));
    if(remote.activePopup){const last=localStorage.getItem('bs:lastPop');if(last!==remote.activePopup){localStorage.setItem('bs:lastPop',remote.activePopup);setTimeout(()=>showPopupType(remote.activePopup),600)}}
    else localStorage.removeItem('bs:lastPop');
  }else loadStreams();
  renderPublic();
}

function renderPublic(){
  const grid=document.getElementById('mainGrid');
  const cnt=document.getElementById('mainCount');
  if(cnt)cnt.textContent=streams.length;
  if(!streams.length){grid.innerHTML='<div class="no-stream">Aucun stream actif pour le moment</div>';return}
  grid.innerHTML=streams.map(s=>`
    <div class="scard" onclick="watchStream('${esc(s.url)}','${esc(s.name)}')">
      <div class="scard-thumb">
        ${s.thumb?`<img src="${esc(s.thumb)}" alt="" onerror="this.outerHTML='<div class=scard-ph>📺</div>'">`:'<div class="scard-ph">📺</div>'}
        <div class="scard-live"><div style="width:5px;height:5px;background:#fff;border-radius:50%;animation:pulse 1.4s infinite"></div>LIVE</div>
      </div>
      <div class="scard-body">
        <div class="scard-name">${esc(s.name)}</div>
        <div class="scard-cat">${esc(s.cat||'Sport')}</div>
      </div>
    </div>
  `).join('');
}

function watchStream(url,name){
  document.getElementById('plName').textContent=name;
  document.getElementById('plStatus').textContent='Connexion...';
  go('pg-player');
  setTimeout(()=>startPlayer(url),150);
}

function destroyPlayers(){
  if(hlsI){hlsI.destroy();hlsI=null}
  if(mpI){mpI.destroy();mpI=null}
}

function startPlayer(url){
  const ph=document.getElementById('pph');
  const v=document.getElementById('vid');
  const lo=document.getElementById('plive');
  const st=document.getElementById('plStatus');

  ph.style.display='none';v.style.display='block';lo.classList.remove('show');
  destroyPlayers();

  st.textContent='Connexion en cours...';

  // Essai 1 : HLS.js (H.264)
  if(Hls.isSupported()){
    hlsI=new Hls({
      enableWorker:true,
      lowLatencyMode:false,
      manifestLoadingTimeOut:30000,
      manifestLoadingMaxRetry:3,
      levelLoadingTimeOut:30000,
      fragLoadingTimeOut:30000,
      fragLoadingMaxRetry:3,
    });
    hlsI.loadSource(url);
    hlsI.attachMedia(v);
    hlsI.on(Hls.Events.MANIFEST_PARSED,()=>{
      v.play().catch(()=>{});
      lo.classList.add('show');
      st.textContent='En direct ✅';
    });
    hlsI.on(Hls.Events.ERROR,(_,d)=>{
      if(d.fatal){
        console.warn('HLS fatal, essai mpegts...',d);
        hlsI.destroy();hlsI=null;
        // Essai 2 : mpegts.js (H.265)
        tryMpegts(url,v,ph,lo,st);
      }
    });
  }else if(v.canPlayType('application/vnd.apple.mpegurl')){
    // Safari natif
    v.src=url;v.play().catch(()=>{});
    lo.classList.add('show');st.textContent='En direct ✅';
  }else{
    tryMpegts(url,v,ph,lo,st);
  }
}

function tryMpegts(url,v,ph,lo,st){
  if(mpegts&&mpegts.isSupported()){
    st.textContent='Chargement H.265...';
    mpI=mpegts.createPlayer({type:'mpegts',url:url,isLive:true},{enableWorker:true,liveBufferLatencyChasing:true});
    mpI.attachMediaElement(v);
    mpI.load();
    mpI.play().then(()=>{lo.classList.add('show');st.textContent='En direct ✅';}).catch(e=>{
      showError(ph,v,st,'⚠ Flux indisponible');
    });
    mpI.on(mpegts.Events.ERROR,(et,ed)=>{
      if(ed&&ed.fatal){showError(ph,v,st,'⚠ Flux indisponible');}
    });
  }else{
    showError(ph,v,st,'⚠ Navigateur non supporté');
  }
}

function showError(ph,v,st,msg){
  destroyPlayers();
  ph.style.display='flex';ph.querySelector('p').textContent=msg;
  v.style.display='none';st.textContent='Erreur';
  toast(msg,true);
}

function doLogin(){
  if(document.getElementById('aPass').value===PASS){
    document.getElementById('aLogin').style.display='none';
    document.getElementById('aPanel').style.display='flex';
    document.getElementById('logoutBtn').style.display='block';
    document.getElementById('aPass').value='';
    document.getElementById('aErr').style.display='none';
    fillConfigFields();loadStreams();renderStreamList();
  }else document.getElementById('aErr').style.display='block';
}
function logout(){
  document.getElementById('aLogin').style.display='flex';
  document.getElementById('aPanel').style.display='none';
  document.getElementById('logoutBtn').style.display='none';
}

async function searchCh(){
  const q=document.getElementById('chSrch').value.trim().toLowerCase();
  if(!q){toast('Tape un nom de chaîne',true);return}
  if(!CFG.worker){toast('⚠ Configure le Proxy d\'abord !',true);return}
  const info=document.getElementById('loadInfo');
  const list=document.getElementById('chList');
  if(!allCh.length){
    info.textContent='⏳ Chargement...';
    list.innerHTML='<div style="padding:20px;text-align:center;color:var(--mut);font-size:.78rem">⏳ Connexion...</div>';
    try{
      const r=await fetch(apiUrl('get_live_streams'));
      if(!r.ok)throw new Error('HTTP '+r.status);
      const data=await r.json();
      if(!Array.isArray(data)||!data.length)throw new Error('Réponse vide');
      allCh=data;info.textContent=`✅ ${data.length} chaînes`;
      const sc=document.getElementById('stCh');if(sc)sc.textContent=data.length;
    }catch(e){
      info.textContent='❌ '+e.message;
      list.innerHTML=`<div style="padding:20px;text-align:center;color:var(--red);font-size:.78rem">❌ ${e.message}</div>`;
      return;
    }
  }
  const results=allCh.filter(c=>(c.name||'').toLowerCase().includes(q)).slice(0,60);
  if(!results.length){list.innerHTML=`<div style="padding:20px;text-align:center;color:var(--mut);font-size:.78rem">Aucun résultat pour "${q}"</div>`;return}
  const activeUrls=new Set(streams.map(s=>s.url));
  list.innerHTML=results.map(c=>{
    const url=streamUrl(c.stream_id);
    const isAdded=activeUrls.has(url);
    return `<div class="ch-item">
      <div class="ch-logo">${c.stream_icon?`<img src="${esc(c.stream_icon)}" onerror="this.style.display='none'" alt="">`:'📺'}</div>
      <div class="ch-info"><div class="ch-name">${esc(c.name)}</div><div class="ch-grp">${esc(c.category_name||'')}</div></div>
      <button class="ch-add${isAdded?' added':''}" onclick="diffuser(${c.stream_id},'${esc(c.name)}','${esc(c.category_name||'Sport')}','${esc(c.stream_icon||'')}')" ${isAdded?'disabled':''}>${isAdded?'✔ Actif':'Diffuser'}</button>
    </div>`;
  }).join('');
}

async function diffuser(id,name,cat,logo){
  const url=streamUrl(id);
  if(streams.find(s=>s.url===url)){toast('Déjà diffusé !',true);return}
  streams.push({id:Date.now(),name,url,cat,thumb:logo});
  await saveStreams();renderStreamList();searchCh();
  toast(`🔴 "${name}" diffusé !`);
}
function removeStream(id){streams=streams.filter(s=>s.id!==id);saveStreams();renderStreamList()}
function renderStreamList(){
  const el=document.getElementById('streamList');if(!el)return;
  document.getElementById('stCount').textContent=streams.length;
  if(!streams.length){el.innerHTML='<div style="padding:28px;text-align:center;color:var(--mut);font-size:.8rem;border:1px dashed var(--brd);border-radius:9px">Aucun stream actif</div>';return}
  el.innerHTML=streams.map(s=>`
    <div class="sc">
      <div class="sc-thumb">${s.thumb?`<img src="${esc(s.thumb)}" alt="" onerror="this.style.display='none'">`:'📺'}</div>
      <div class="sc-info"><div class="sc-name">${esc(s.name)}</div><div class="sc-url">${esc(s.url)}</div><div class="sc-acts"><button class="sca del" onclick="removeStream(${s.id})">🗑 Retirer</button></div></div>
    </div>
  `).join('');
}

const POPUPS={
  discord:{icon:'🎮',title:'REJOIGNEZ<br><span style="color:#5865F2">NOTRE DISCORD</span>',sub:'Support & offres exclusives',btn:'➤ Rejoindre le Discord',color:'#5865F2',action:()=>window.open(DISCORD,'_blank')},
  telegram:{icon:'📲',title:'REJOIGNEZ<br><span style="color:var(--tg)">NOTRE TELEGRAM</span>',sub:'Toutes nos offres',btn:'➤ Rejoindre le Telegram',color:'var(--tg)',action:()=>window.open(TELEGRAM,'_blank')},
  abo:{icon:'🔥',title:'ACCÈS <span style="color:var(--red)">ILLIMITÉ</span><br>À L\'IPTV',sub:'Chaînes · Films · Séries',btn:"🚀 S'abonner maintenant",color:'var(--red)',action:()=>go('pg-access')}
};
async function triggerPopup(type){localStorage.setItem('bs:popup',type);localStorage.setItem('bs:lastPop',type);await gistSave({streams,activePopup:type});showPopupType(type);toast('Popup "'+type+'" envoyée !')}
async function stopPopup(){localStorage.removeItem('bs:popup');localStorage.removeItem('bs:lastPop');await gistSave({streams,activePopup:null});closePopup();toast('Popup désactivée')}
function showPopupType(type){
  const c=POPUPS[type];if(!c)return;
  document.getElementById('popIcon').textContent=c.icon;
  document.getElementById('popTitle').innerHTML=c.title;
  document.getElementById('popSub').textContent=c.sub;
  const btn=document.getElementById('popBtn');btn.textContent=c.btn;btn.style.background=c.color;
  btn.onclick=()=>{c.action();closePopup()};
  document.getElementById('popup').style.display='flex';
  let n=5;
  const cb=document.getElementById('popClose'),sk=document.getElementById('popSkip');
  cb.disabled=true;cb.style.cursor='not-allowed';cb.innerHTML='<span id="popCt">5</span>';
  sk.disabled=true;sk.style.opacity='.4';sk.style.cursor='not-allowed';sk.innerHTML='Passer dans <span id="popSkipCt">5</span>s...';
  clearInterval(popTimer);
  popTimer=setInterval(()=>{
    n--;const c1=document.getElementById('popCt'),c2=document.getElementById('popSkipCt');
    if(c1)c1.textContent=n;if(c2)c2.textContent=n;
    if(n<=0){clearInterval(popTimer);cb.disabled=false;cb.style.cursor='pointer';cb.style.border='1px solid var(--red)';cb.style.color='#fff';cb.style.background='var(--red)';cb.innerHTML='✕';sk.disabled=false;sk.style.opacity='1';sk.style.cursor='pointer';sk.innerHTML='Continuer vers le site'}
  },1000);
}
function closePopup(){clearInterval(popTimer);document.getElementById('popup').style.display='none'}

function initSplash(){
  const v=parseInt(localStorage.getItem('bs:visits')||'0')+1;
  localStorage.setItem('bs:visits',v);
  for(let i=1;i<=3;i++){const d=document.getElementById('d'+i);if(d)d.className='sdot'+(i<=v?' on':'')}
  if(v===1){document.getElementById('sIcon').textContent='📲';document.getElementById('sTitle').innerHTML='REJOIGNEZ<br><span style="color:var(--tg)">NOTRE TELEGRAM</span>';document.getElementById('sSub').textContent='Offres et actualités';const b=document.getElementById('sBtn');b.textContent='➤ Rejoindre le Telegram';b.style.background='var(--tg)'}
  else if(v===2){document.getElementById('sIcon').textContent='🎮';document.getElementById('sTitle').innerHTML='REJOIGNEZ<br><span style="color:#5865F2">NOTRE DISCORD</span>';document.getElementById('sSub').textContent='Support & offres exclusives';const b=document.getElementById('sBtn');b.textContent='➤ Rejoindre le Discord';b.style.background='#5865F2'}
  else{enterSite();return}
  let ct=5;clearInterval(splashTimer);
  splashTimer=setInterval(()=>{ct--;const el=document.getElementById('sCt');if(el)el.textContent=ct;if(ct<=0){clearInterval(splashTimer);const sk=document.getElementById('sSkip');if(sk){sk.disabled=false;sk.style.opacity='1';sk.style.cursor='pointer';sk.innerHTML='Ignorer →'}}},1000);
}
function splashAction(){clearInterval(splashTimer);const v=parseInt(localStorage.getItem('bs:visits')||'1');if(v===1)window.open(TELEGRAM,'_blank');else window.open(DISCORD,'_blank');enterSite()}
function enterSite(){const s=document.getElementById('splash');s.style.opacity='0';s.style.transition='opacity .4s';setTimeout(()=>s.style.display='none',400)}
function resetSplash(){localStorage.removeItem('bs:visits');toast('Splash remis à zéro !')}

setInterval(async()=>{
  const r=await gistLoad();if(!r)return;
  if(r.streams){streams=r.streams;localStorage.setItem('bs:streams',JSON.stringify(streams));renderPublic()}
  if(r.activePopup){const last=localStorage.getItem('bs:lastPop');if(last!==r.activePopup){localStorage.setItem('bs:lastPop',r.activePopup);showPopupType(r.activePopup)}}
  else localStorage.removeItem('bs:lastPop');
},20000);

window.addEventListener('load',()=>{loadConfig();loadPublic();initSplash()});
</script>
</body>
</html>
