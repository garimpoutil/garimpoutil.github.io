const LOJAS = { amazon: "Amazon", shopee: "Shopee", mercadolivre: "Mercado Livre" };

const produtos = [...(window.PRODUTOS || [])].sort((a, b) => b.id - a.id); // mais novo primeiro
const $ = (id) => document.getElementById(id);
const estado = { busca: "", categoria: "Todos" };

const semAcento = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const numero = (id) => "#" + String(id).padStart(3, "0");

function filtrar() {
  const q = estado.busca.trim().replace(/^#/, "");
  return produtos.filter((p) => {
    if (/^\d+$/.test(q)) return p.id === Number(q); // número do vídeo: exato, ignora a categoria
    if (estado.categoria !== "Todos" && p.categoria !== estado.categoria) return false;
    if (!q) return true;
    return semAcento(`${p.nome} ${p.destaque} ${p.categoria}`).includes(semAcento(q));
  });
}

function desenharFiltros() {
  const contagem = { Todos: produtos.length };
  produtos.forEach((p) => (contagem[p.categoria] = (contagem[p.categoria] || 0) + 1));
  const nomes = ["Todos", ...Object.keys(contagem).filter((c) => c !== "Todos").sort()];
  $("filtros").innerHTML = nomes
    .map((c) => `<button type="button" data-cat="${c}" aria-pressed="${c === estado.categoria}">
      ${c} <span>${contagem[c]}</span></button>`)
    .join("");
}

function cartao(p, i) {
  const loja = LOJAS[p.loja] || p.loja;
  return `<a class="cartao" href="${p.link}" target="_blank" rel="sponsored nofollow noopener"
      style="animation-delay:${Math.min(i, 12) * 40}ms">
    <figure>
      <img src="${p.imagem}" alt="" width="800" height="800" loading="lazy">
      <span class="numero">${numero(p.id)}</span>
    </figure>
    <div class="corpo">
      <span class="loja">${loja}</span>
      <h2 class="nome">${p.nome}</h2>
      <p class="destaque">${p.destaque || ""}</p>
      <div class="acao"><span class="botao">Ver na loja <span aria-hidden="true">↗</span></span></div>
    </div>
  </a>`;
}

function desenhar() {
  const lista = filtrar();
  $("grade").innerHTML = lista.map(cartao).join("");
  $("vazio").hidden = lista.length > 0;
  $("contagem").textContent = lista.length === 1 ? "1 achado" : `${lista.length} achados`;
  document.querySelectorAll("#filtros button").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.cat === estado.categoria));
}

$("busca").addEventListener("input", (e) => { estado.busca = e.target.value; desenhar(); });
$("filtros").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  estado.categoria = b.dataset.cat;
  desenhar();
});
$("limpar").addEventListener("click", () => {
  estado.busca = ""; estado.categoria = "Todos"; $("busca").value = ""; desenhar();
});

// Link direto para um produto: ?p=12 (ex.: figurinha de link nos stories)
const p = new URLSearchParams(location.search).get("p");
if (p) { estado.busca = p; $("busca").value = p; }

$("aviso-amazon").hidden = !produtos.some((x) => x.loja === "amazon");
$("ano").textContent = new Date().getFullYear();
desenharFiltros();
desenhar();
