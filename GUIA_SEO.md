# Guia de SEO — Mulder Engenharia

Objetivo: fazer o site aparecer bem no Google para buscas como
*"inspeção predial Florianópolis"*, *"laudo de engenharia Florianópolis"*
e *"fiscalização de obras Florianópolis"*.

> ⚠️ SEO leva tempo (semanas a meses) e depende da concorrência.
> Nenhuma ação "garante" o primeiro lugar — mas o conjunto abaixo é o
> caminho comprovado.

---

## ✅ Já feito no site (código)

- Títulos, descrições e palavras-chave das 3 páginas reforçando
  **laudos, inspeção predial e fiscalização de obras** + região
  (Florianópolis, São José, Palhoça, Biguaçu).
- Dados estruturados (Schema.org `LocalBusiness`) com horário de
  atendimento, faixa de preço, cidades atendidas e serviço dedicado de
  **Inspeção Predial**.
- Seção de **Perguntas Frequentes (FAQ)** com `FAQPage` schema — pode
  fazer o site aparecer com perguntas expandidas na busca.
- `sitemap.xml` e `robots.txt` já presentes.

---

## 🔴 1. Google Meu Negócio — PRIORIDADE MÁXIMA (grátis)

É o que mais move o ponteiro em buscas locais (o bloco de mapa no topo).

1. Acesse **https://google.com/business** e entre com a conta Google da empresa.
2. Cadastre **"Mulder Engenharia"**.
3. **Categoria principal:** "Engenheiro civil".
   Categorias extras: "Serviço de inspeção predial", "Perito".
4. Preencha: telefone, WhatsApp, site, horário de funcionamento.
5. **Área de atendimento:** Florianópolis, São José, Palhoça, Biguaçu.
6. Suba **fotos** de qualidade: logo, Julian em obra, equipamentos, laudos.
7. Confirme o **código de verificação** que o Google envia (carta/telefone/e-mail).
8. **Peça avaliações** a clientes antigos — este é o fator nº 1 do ranking
   local. Mande o link de avaliação por WhatsApp.

> Mantenha o perfil ativo: poste fotos de serviços, responda avaliações.

---

## 🟡 2. Google Search Console (grátis)

Faz o Google indexar o site mais rápido e mostra como ele aparece nas buscas.

1. Acesse **https://search.google.com/search-console**.
2. Adicione a propriedade (o endereço do site).
3. Confirme a posse (via registro DNS ou arquivo — o Google orienta).
4. Em **Sitemaps**, envie: `sitemap.xml`.
5. Use **Inspeção de URL** → "Solicitar indexação" para cada página.
6. Acompanhe em **Desempenho** quais buscas trazem visitantes.

---

## 🟡 3. Conectar o domínio próprio — mulderengenharia.com.br

Passa mais credibilidade e ajuda no ranking (hoje o site está num
subdomínio genérico do GitHub).

Resumo do processo (quando for fazer):
1. No GitHub → repositório → **Settings → Pages → Custom domain**:
   digitar `mulderengenharia.com.br` (cria um arquivo `CNAME`).
2. No painel de DNS do domínio (Registro.br ou provedor onde o DNS é
   gerenciado): criar os registros **A** para os IPs do GitHub Pages e um
   **CNAME** para `www` apontando para `nettotkm.github.io`.
3. Aguardar a propagação e ativar o **HTTPS** (o GitHub gera o certificado).

> Depois de conectar o domínio, atualizar no site: as URLs `canonical`,
> `og:url`, o `sitemap.xml`, o `robots.txt` e as URLs dentro do JSON-LD
> (hoje apontam para `nettotkm.github.io/mulder-site`).

---

## 🟢 4. Reforço contínuo (opcional, mas ajuda)

- **Citações locais:** cadastrar a empresa em diretórios (listas de
  engenheiros, CREA-SC, guias locais) sempre com o **mesmo** nome,
  telefone e endereço.
- **Instagram ativo** vinculado ao perfil e ao site.
- **Conteúdo:** com o tempo, artigos curtos ("O que verifica uma inspeção
  predial", "Quando pedir vistoria cautelar") atraem buscas informativas.
- **Avaliações constantes** no Google — quantidade e recência contam.

---

## 📌 Ordem sugerida

1. Google Meu Negócio (agora)
2. Search Console + enviar sitemap
3. Conectar o domínio próprio
4. Pedir avaliações e manter os perfis ativos

_Última atualização: julho/2026._
