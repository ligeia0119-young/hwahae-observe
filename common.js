// 두 화면이 함께 쓰는 도우미
(function(){
  const WD = ["일","월","화","수","목","금","토"];
  function fmtDate(iso){ // "2026-10-21" → "10. 21.(수)"
    const [y,m,d] = iso.split("-").map(Number);
    const wd = WD[new Date(y, m-1, d).getDay()];
    return `${m}. ${d}.(${wd})`;
  }
  function mins(t){ const m = /(\d{1,2}):(\d{2})/.exec(t); return m ? (+m[1])*60 + (+m[2]) : 0; }
  function span(t){ const p = String(t).split("~"); return [mins(p[0]), mins(p[1] || p[0])]; }
  // 프로그램의 (날짜, 시간) 목록
  function sessions(p){ return p.dates.map((d,i) => ({ date:d, time:p.times[i] || p.times[0] })); }
  // 두 프로그램이 같은 날 시간이 겹치는지
  function overlaps(a, b){
    return sessions(a).some(x => sessions(b).some(y => {
      if (x.date !== y.date) return false;
      const [s1,e1] = span(x.time), [s2,e2] = span(y.time);
      return s1 < e2 && s2 < e1;
    }));
  }
  // 선택한 것 중 서로 겹치는 묶음 찾기 → [[id,id],...]
  function conflicts(ids){
    const P = window.PROGRAMS.filter(p => ids.includes(p.id)); const out = [];
    for (let i=0;i<P.length;i++) for (let j=i+1;j<P.length;j++) if (overlaps(P[i],P[j])) out.push([P[i].id,P[j].id]);
    return out;
  }
  function whenText(p){ return sessions(p).map(s => fmtDate(s.date) + " " + s.time).join(" / "); }
  function firstKey(p){ return p.dates[0] + " " + String(mins(p.times[0])).padStart(4,"0"); }
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  window.U = { fmtDate, sessions, overlaps, conflicts, whenText, firstKey, esc };
})();
