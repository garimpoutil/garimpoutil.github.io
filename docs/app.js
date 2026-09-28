const LOJAS = { amazon: "Amazon", shopee: "Shopee", mercadolivre: "Mercado Livre" };

const produtos = [...(window.PRODUTOS || [])].sort((a, b) => b.id - a.id); // mais novo primeiro (id é só interno)
const $ = (id) => document.getElementById(id);
const estado = { busca: "", categoria: "Todos" };

const semAcento = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function filtrar() {
  const q = semAcento(estado.busca.trim());
  return produtos.filter((p) => {
    if (estado.categoria !== "Todos" && p.categoria !== estado.categoria) return false;
    return !q || semAcento(p.nome).includes(q); // a busca olha só o nome do produto
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

$("aviso-amazon").hidden = !produtos.some((x) => x.loja === "amazon");
$("ano").textContent = new Date().getFullYear();
desenharFiltros();
desenhar();
