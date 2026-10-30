// 세 계산기가 같이 쓰는 입력·표시 도우미. 계산식은 각 페이지 안에 있어 따로 열어봐도 검증할 수 있다.
const $ = (id) => document.getElementById(id);

function num(id, fallback) {
  const v = parseFloat(String($(id).value).replace(/,/g, ""));
  return Number.isFinite(v) ? v : fallback;
}

// 원 단위 금액을 읽기 쉽게: 1억 2,345만 원
function won(x) {
  if (!Number.isFinite(x)) return "-";
  const neg = x < 0 ? "-" : "";
  x = Math.round(Math.abs(x));
  if (x < 10000) return neg + x.toLocaleString("ko-KR") + "원";
  const eok = Math.floor(x / 1e8);
  const man = Math.floor((x % 1e8) / 1e4);
  let s = "";
  if (eok) s += eok.toLocaleString("ko-KR") + "억 ";
  if (man) s += man.toLocaleString("ko-KR") + "만";
  return neg + (s.trim() || "0") + "원";
}

function pct(x, d = 1) { return (x * 100).toFixed(d) + "%"; }
function times(x, d = 2) { return x.toFixed(d) + "배"; }

// 입력이 바뀔 때마다 calc를 다시 부른다
function bind(ids, calc) {
  ids.forEach((id) => {
    const el = $(id);
    el.addEventListener("input", calc);
    el.addEventListener("change", calc);
  });
  calc();
}

function monthlyRate(annual) { return Math.pow(1 + annual, 1 / 12) - 1; }

// 매월 말 pay를 넣고 연 수익률 annual(복리)로 n개월 굴렸을 때의 끝 금액
function fvMonthly(pay, annual, n) {
  const r = monthlyRate(annual);
  return Math.abs(r) < 1e-12 ? pay * n : pay * (Math.pow(1 + r, n) - 1) / r;
}

if (typeof module !== "undefined") module.exports = { monthlyRate, fvMonthly };
