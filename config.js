// ─────────────────────────────────────────────────────────────
// 설정 파일 — 보통은 이 파일만 고치면 됩니다.
// ─────────────────────────────────────────────────────────────

// 1) 구글 Apps Script를 '웹 앱'으로 배포한 뒤 받은 주소를 따옴표 안에 붙여넣으세요.
//    비워 두면 '미리보기 모드'(이 기기에만 임시 저장)로 동작합니다.
window.SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbPMQTa4IRbSMXQCq7Qonq3blJEvYeLBPq33A-2PzkeTWhkjQbgR2xgW82SbjozpK_/exec";

window.INFO = {
  org: "화성오산교육지원청 생활교육과",
  dept: "화해중재단",
  title: "관계성장 프로그램 팀장님 수업 참관 신청",
  // 신청 기간 — Code.gs의 START, DEADLINE도 같은 시각으로 맞춰 주세요.
  start: "2026-10-14T20:00:00+09:00",
  deadline: "2026-10-15T12:00:00+09:00",
  periodText: "2026. 10. 14.(수) 20:00 ~ 10. 15.(목) 12:00",
  resultText: "2026. 10. 15.(목) 저녁까지 문자로 안내",
  maxPick: 1,      // 1인당 신청 수업 수 (Code.gs의 MAX_PICK과 같게)
  cap: 2,          // 팀장님 1명당 참관 인원(수업을 합쳐서) — 마감 후 선정 기준
  contact: "생활교육과 장학사 윤희영 031-371-0640",
};
