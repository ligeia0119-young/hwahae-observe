// 저장소 연결: SCRIPT_URL이 있으면 구글 시트, 없으면 이 브라우저에 임시 저장(미리보기)
(function(){
  const DEMO_KEY = "hwahae_observe_demo";
  const isDemo = () => !/^https:\/\/script\.google\.com\//.test(window.SCRIPT_URL || "");
  const norm = s => String(s || "").replace(/\s+/g, "");
  const load = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || "[]"); } catch(e){ return []; } };
  const save = l => { try { localStorage.setItem(DEMO_KEY, JSON.stringify(l)); } catch(e){} };
  const same = (r, name, pin) => norm(r.name) === norm(name) && String(r.pin) === String(pin);
  const tally = l => { const c = {}; l.forEach(r => r.slots.forEach(id => c[id] = (c[id] || 0) + 1)); return c; };

  async function post(body){
    const res = await fetch(window.SCRIPT_URL, { method:"POST", headers:{ "Content-Type":"text/plain;charset=utf-8" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!data.ok) { const e = new Error(data.error || "처리하지 못했습니다."); e.full = data.full; throw e; }
    return data;
  }
  async function get(params){
    const q = new URLSearchParams({ ...params, t: Date.now() }).toString();
    const res = await fetch(window.SCRIPT_URL + "?" + q);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "불러오지 못했습니다.");
    return data;
  }
  async function counts(){
    if (isDemo()) return { ok:true, counts: tally(load()) };
    return get({ action:"counts" });
  }
  async function mine(name, pin){
    if (isDemo()){ const r = load().find(r => same(r, name, pin)); return { ok:true, found:!!r, record:r || null }; }
    return post({ action:"mine", name, pin });
  }
  async function submit(name, pin, slots){
    if (isDemo()){
      const l = load(), had = l.some(r => same(r, name, pin));
      const others = l.filter(r => !same(r, name, pin));
      save(others.concat([{ name, pin, slots, time:new Date().toISOString() }]));
      return { ok:true, updated:had };
    }
    return post({ action:"submit", name, pin, slots });
  }
  async function cancel(name, pin){
    if (isDemo()){ const l = load(); const had = l.some(r => same(r, name, pin)); save(l.filter(r => !same(r, name, pin))); return { ok:true, removed:had }; }
    return post({ action:"cancel", name, pin });
  }
  async function list(key){
    if (isDemo()) return { ok:true, rows: load() };
    return get({ action:"list", key });
  }
  window.API = { isDemo, counts, mine, submit, cancel, list };
})();
