# Garimpo Útil

Página de links dos vídeos do Garimpo Útil (TikTok e Instagram): quem viu um produto no vídeo procura pelo nome ou pela categoria e chega ao link.

Publicada pelo GitHub Pages a partir da pasta `docs/`.

## Pastas

- `docs/`: o site. É estático (HTML, CSS e JS puro, sem build).
  - `produtos.js`: **o catálogo**. É o único arquivo que muda quando entra um produto novo.
  - `img/produtos/`: a foto de cada produto, com o nome igual ao `id` (`001.jpg`).

## Adicionar um produto

1. Salvar a foto em `docs/img/produtos/NNN.jpg` (quadrada, 800 px).
2. Acrescentar a entrada em `docs/produtos.js`, com um `id` novo (interno: define a ordem e o nome da foto, não aparece no site) e o **link de afiliado** (nunca o link comum da loja).

## Ver no PC

```
python -m http.server 8095 --directory docs
```

Depois abrir http://localhost:8095.

## Regras

- **Nada de preço, ranking ou "mais vendido" no site.** São números que mudam depois da publicação.
- O rodapé mostra o aviso de afiliado, e o aviso da Amazon quando houver produto da Amazon no catálogo.
- Os links usam `rel="sponsored nofollow"`.
