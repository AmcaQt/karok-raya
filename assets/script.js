const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyM3WThrr-P9K_9WqxCssKKgBW3XwLuV4UFt3K13s5J749nGw0iDQMpiinB98nY2K0p/exec';

  /* ════ DECO ════ */
  const layer = document.getElementById('decoLayer');

  function ketupatSVG(sz, fill, stroke) {
    return `<svg width="${sz}" height="${sz}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,2 58,30 30,58 2,30" fill="${fill}"/>
      <polygon points="30,10 50,30 30,50 10,30" fill="none" stroke="${stroke}" stroke-width="2"/>
      <polygon points="30,18 42,30 30,42 18,30" fill="none" stroke="${stroke}" stroke-width="1.2" opacity=".6"/>
      <polygon points="30,23 37,30 30,37 23,30" fill="${stroke}" opacity=".8"/>
    </svg>`;
  }

  function lemangSVG(sz) {
    const h = sz * 2.2;
    return `<svg width="${sz}" height="${h}" viewBox="0 0 40 88" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="24" height="68" rx="12" fill="#7a5c3a"/>
      <ellipse cx="20" cy="10" rx="12" ry="5.5" fill="#a0794f"/>
      <ellipse cx="20" cy="78" rx="12" ry="5.5" fill="#5a3e28"/>
      <rect x="11" y="10" width="5" height="68" rx="2.5" fill="rgba(255,255,255,.1)"/>
      <ellipse cx="20" cy="10" rx="6" ry="2.5" fill="#c9a26a"/>
    </svg>`;
  }

  for(let i=0;i<20;i++){
    const s=document.createElement('div');
    s.className='sparkle';
    Object.assign(s.style,{
      left:Math.random()*100+'%', top:Math.random()*100+'%',
      width:(3+Math.random()*5)+'px', height:(3+Math.random()*5)+'px',
      animationDuration:(2+Math.random()*3.5)+'s',
      animationDelay:(Math.random()*5)+'s',
    });
    layer.appendChild(s);
  }

  [
    {t:'k',f:'#2d6a4f',s:'#74c69d',sz:30,x:4, dur:14,del:0},
    {t:'k',f:'#c9922a',s:'#f5e6c8',sz:22,x:16,dur:19,del:3},
    {t:'l',sz:18,x:27,dur:16,del:7},
    {t:'k',f:'#40916c',s:'#d8f3dc',sz:26,x:43,dur:21,del:1},
    {t:'l',sz:15,x:58,dur:13,del:9},
    {t:'k',f:'#e8b84b',s:'#fff',   sz:20,x:70,dur:18,del:4},
    {t:'k',f:'#1b4332',s:'#52b788',sz:33,x:83,dur:23,del:6},
    {t:'l',sz:20,x:92,dur:15,del:11},
    {t:'k',f:'#c9922a',s:'#ffe08a',sz:24,x:12,dur:20,del:2},
    {t:'l',sz:14,x:50,dur:17,del:5},
    {t:'k',f:'#2d6a4f',s:'#40916c',sz:18,x:35,dur:12,del:8},
    {t:'k',f:'#e8b84b',s:'#2d6a4f',sz:28,x:77,dur:25,del:10},
  ].forEach(d=>{
    const el=document.createElement('div');
    el.className='floater';
    Object.assign(el.style,{
      left:d.x+'%', bottom:'-90px',
      animationDuration:d.dur+'s', animationDelay:d.del+'s',
    });
    el.innerHTML = d.t==='k' ? ketupatSVG(d.sz,d.f,d.s) : lemangSVG(d.sz);
    layer.appendChild(el);
  });

  /* ════ LANTERNS ════ */
  const lanternColors=['#e63946','#e8b84b','#2d6a4f','#e63946','#c9922a','#40916c','#e8b84b','#e63946'];
  const strip=document.getElementById('lanternStrip');
  lanternColors.forEach((c,i)=>{
    strip.innerHTML+=`
    <div class="lantern-wrap" style="animation-delay:${i*.42}s">
      <div class="lantern-string"></div>
      <svg width="22" height="36" viewBox="0 0 22 36" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="11" cy="18" rx="9" ry="13" fill="${c}" opacity=".92"/>
        <ellipse cx="11" cy="18" rx="6" ry="9" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1"/>
        <rect x="7" y="3" width="8" height="3.5" rx="1.5" fill="rgba(255,255,255,.38)"/>
        <rect x="7" y="29.5" width="8" height="3.5" rx="1.5" fill="rgba(0,0,0,.18)"/>
        <line x1="11" y1="33" x2="9"  y2="37" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/>
        <line x1="11" y1="33" x2="11" y2="38" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/>
        <line x1="11" y1="33" x2="13" y2="37" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/>
      </svg>
    </div>`;
  });

  /* ════ CONDITIONAL ════ */
  document.querySelectorAll('input[name="jenis"]').forEach(r=>{
    r.addEventListener('change',()=>{
      const secK = document.getElementById('condKump');
      const secD = document.getElementById('condDuet');
      if(r.value==='Kumpulan'&&r.checked){
        secK.classList.add('open'); secD.classList.remove('open');
        document.getElementById('namaPasangan').value='';
        document.getElementById('kelasPasangan').value='';
      } else if(r.value==='Duet'&&r.checked){
        secD.classList.add('open'); secK.classList.remove('open');
        document.getElementById('namaKump').value='';
      } else {
        secK.classList.remove('open'); secD.classList.remove('open');
        document.getElementById('namaKump').value='';
        document.getElementById('namaPasangan').value='';
        document.getElementById('kelasPasangan').value='';
      }
    });
  });

  /* ════ TOAST ════ */
  function toast(msg){
    document.getElementById('toastMsg').textContent=msg;
    const t=document.getElementById('toast');
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),3200);
  }

  /* ════ VALIDATE ════ */
  function getFormData(){
    const jenis       = document.querySelector('input[name="jenis"]:checked');
    const nama        = document.getElementById('namaFull').value.trim();
    const kelas       = document.getElementById('kelas').value.trim();
    const tel         = document.getElementById('telefon').value.trim();
    const lagu        = document.getElementById('tajukLagu').value.trim();
    const muzik       = document.querySelector('input[name="muzik"]:checked');
    const kump        = document.getElementById('namaKump').value.trim();
    const namaPasang  = document.getElementById('namaPasangan').value.trim();
    const kelasPasang = document.getElementById('kelasPasangan').value.trim();

    if(!jenis)                                     { toast('Sila pilih Jenis Penyertaan.');          return null; }
    if(jenis.value==='Kumpulan' && !kump)          { toast('Sila masukkan Nama Kumpulan.');          return null; }
    if(jenis.value==='Duet' && !namaPasang)        { toast('Sila masukkan Nama Penuh Pasangan.');    return null; }
    if(jenis.value==='Duet' && !kelasPasang)       { toast('Sila masukkan Kelas Pasangan.');         return null; }
    if(!nama)                                      { toast('Sila masukkan Nama Penuh.');             return null; }
    if(!kelas)                                     { toast('Sila masukkan Kelas.');                  return null; }
    if(!tel)                                       { toast('Sila masukkan No. Telefon.');            return null; }
    if(!lagu)                                      { toast('Sila masukkan Tajuk Lagu.');             return null; }
    if(!muzik)                                     { toast('Sila pilih keperluan Muzik Latar.');     return null; }

    return {
      Timestamp:         new Date().toLocaleString('ms-MY'),
      'Jenis Penyertaan': jenis.value,
      'Nama Kumpulan':   kump        || '-',
      'Nama Pasangan':   namaPasang  || '-',
      'Kelas Pasangan':  kelasPasang || '-',
      'Nama Penuh':      nama,
      'Kelas':           kelas,
      'No. Telefon':     tel,
      'Tajuk Lagu':      lagu,
      'Muzik Latar':     muzik.value,
    };
  }

  /* ════ SLOT CHECK ════ */
  const MAX_SLOTS = 10;

  async function checkSlots(){
    try{
      const res  = await fetch(APPS_SCRIPT_URL, { method:'GET' });
      const json = await res.json();
      const used = json.count || 0;
      updateSlotUI(used);
      return used;
    } catch(e){
      console.warn('Slot check failed', e);
      return 0;
    }
  }

  function updateSlotUI(used){
    const pct   = Math.min(100, Math.round((used / MAX_SLOTS) * 100));
    const fill  = document.getElementById('slotFill');
    const label = document.getElementById('slotLabel');
    const usedEl= document.getElementById('slotUsed');
    const banner= document.getElementById('fullBanner');
    const btn   = document.getElementById('btnSubmit');
    const form  = document.querySelector('.card');

    usedEl.textContent = used;
    fill.style.width   = pct + '%';

    fill.classList.remove('warn','full');
    label.classList.remove('warn','full');

    if(used >= MAX_SLOTS){
      fill.classList.add('full'); label.classList.add('full');
      banner.style.display = 'block';
      btn.disabled = true;
      btn.style.opacity = '.5';
      // disable all inputs
      form.querySelectorAll('input, button.btn-submit').forEach(el => el.disabled = true);
    } else if(pct >= 75){
      fill.classList.add('warn'); label.classList.add('warn');
    }
  }

  // Run on page load
  checkSlots();

  /* ════ SUBMIT ════ */
  async function handleSubmit(){
    const data = getFormData();
    if(!data) return;

    // Guard: re-check slot count before submitting
    const currentUsed = parseInt(document.getElementById('slotUsed').textContent) || 0;
    if(currentUsed >= MAX_SLOTS){
      updateSlotUI(MAX_SLOTS);
      toast('Maaf, slot telah penuh!');
      return;
    }

    const btn    = document.getElementById('btnSubmit');
    const btnTxt = document.getElementById('btnTxt');
    const spin   = document.getElementById('spinner');
    btn.disabled = true;
    btnTxt.textContent = 'Menghantar...';
    spin.style.display = 'block';

    try{
      // no-cors avoids CORS preflight — opaque response is expected
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode:   'no-cors',
        body:   JSON.stringify(data),
      });
      // Optimistically update counter then re-verify from sheet
      updateSlotUI(currentUsed + 1);
      showPopup(data['Nama Penuh'], data['Jenis Penyertaan']);
      // Re-fetch real count after a short delay to stay in sync
      setTimeout(checkSlots, 2000);
    } catch(err){
      toast('Ralat semasa menghantar. Cuba semula.');
      console.error(err);
    } finally{
      btn.disabled = false;
      btnTxt.textContent = '🎤 Hantar Pendaftaran';
      spin.style.display = 'none';
    }
  }

  /* ════ POPUP ════ */
  function showPopup(nama, jenis){
    document.getElementById('popupBadge').textContent = nama + ' · ' + jenis;
    document.getElementById('popup').classList.add('show');
  }

  function closePopup(){
    document.getElementById('popup').classList.remove('show');
    document.querySelectorAll('input[type="text"],input[type="tel"]').forEach(i=>i.value='');
    document.querySelectorAll('input[type="radio"]').forEach(r=>r.checked=false);
    document.getElementById('condKump').classList.remove('open');
    document.getElementById('condDuet').classList.remove('open');
  }
