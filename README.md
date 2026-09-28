# Garimpo Útil

Página de links dos vídeos do Garimpo Útil (TikTok e Instagram): quem viu um produto no vídeo digita o número e chega ao link.

Publicada pelo GitHub Pages a partir da pasta `docs/`.

## Pastas

- `docs/`: o site. É estático (HTML, CSS e JS puro, sem build).
  - `produtos.js`: **o catálogo**. É o único arquivo que muda quando entra um produto novo.
  - `img/produtos/`: a foto de cada produto, com o nome igual ao número (`001.jpg`).

## Adicionar um produto

1. Salvar a foto em `docs/img/produtos/NNN.jpg` (quadrada, 800 px).
2. Acrescentar a entrada em `docs/produtos.js`, com o `id` igual ao número que aparece no vídeo e o **link de afiliado** (nunca o link comum da loja).

## Ver no PC

```
python -m http.server 8095 --directory docs
```

Depois abrir http://localhost:8095. Para testar o link direto de um produto: http://localhost:8095/?p=1

## Regras

- **Nada de preço, ranking ou "mais vendido" no site.** São números que mudam depois da publicação.
- O rodapé mostra o aviso de afiliado, e o aviso da Amazon quando houver produto da Amazon no catálogo.
- Os links usam `rel="sponsored nofollow"`.
