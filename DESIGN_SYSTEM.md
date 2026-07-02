# Mulder Engenharia — Design System

---

## 🎨 Cores

### Primárias (Azul Navy)
| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#1A3C6E` | Cor principal — textos, fundos, botões |
| `primary-800` | `#0F2548` | Navy escuro — rodapé, faixa de cards |
| `primary-700` | `#2A4F8A` | Navy médio-claro |
| `primary-600` | `#4270B0` | Azul médio |

### Accent (Marrom Terroso)
| Token | Hex | Uso |
|-------|-----|-----|
| `accent` | `#B8926A` | CTA, badges, destaques, hover |
| `accent-200` | `#E8D9CC` | Bege quente — fundos suaves |
| `accent-100` | `#F5EDE6` | Bege claro — backgrounds |

### Neutros
| Token | Hex | Uso |
|-------|-----|-----|
| `surface` | `#F4F6F8` | Background de seções alternadas |
| `neutral-400` | `#9BA6B2` | Textos placeholder |
| `neutral-600` | `#6B7685` | Textos secundários |
| `white` | `#FFFFFF` | Fundos de cards, textos em fundo escuro |

### Erro
| Token | Hex | Uso |
|-------|-----|-----|
| `error` | `#DC2626` | Validação de formulário |

---

## 🔤 Tipografia

### Famílias
| Família | Uso |
|---------|-----|
| **Libre Franklin** | Títulos, headings, badges, botões, labels |
| **Inter** | Corpo de texto, parágrafos |

### Escala de tamanhos
| Token | Tamanho | Line Height | Uso |
|-------|---------|-------------|-----|
| `display` | 58px | 68px | Hero principal |
| `h1` | 42px | 54px | Títulos de página |
| `h2` | 34px | 44px | Títulos de seção |
| `h3` | 26px | 36px | Subtítulos |
| `h4` | 20px | 28px | Cards, destaques |
| `body-lg` | 17px | 28px | Corpo grande |
| `body` | 15px | 24px | Corpo padrão |
| `body-sm` | 13px | 20px | Texto auxiliar |
| `label` | 11px | 16px | Labels, badges, categorias |

---

## 📐 Border Radius
| Token | Valor | Uso |
|-------|-------|-----|
| `sm` | 8px | Inputs, elementos pequenos |
| `md` | 12px | Badges |
| `lg` | 16px | Cards pequenos, carrossel |
| `xl` | 20px | Cards médios |
| `2xl` | 24px | Cards principais, seções |
| `full` | 9999px | Botões, badges pills |

---

## 🌑 Sombras
| Token | Valor | Uso |
|-------|-------|-----|
| `sm` | `0 2px 8px rgba(0,0,0,0.06)` | Cards sutis |
| `md` | `0 4px 16px rgba(0,0,0,0.08)` | Cards padrão |
| `lg` | `0 8px 32px rgba(0,0,0,0.12)` | Modais, cards em destaque |

---

## 🔘 Botões

### Tamanhos
| Classe | Padding | Font Size |
|--------|---------|-----------|
| `btn-lg` | 18px 32px | 15px |
| `btn-md` | 13px 24px | 13px |
| `btn-sm` | 8px 16px | 11px |

> Todos os botões: `font-family: Libre Franklin`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `border-radius: 9999px`

### Variantes
| Classe | Background | Texto | Borda |
|--------|-----------|-------|-------|
| `btn-primary` | `#1A3C6E` | `#FFFFFF` | `#1A3C6E` |
| `btn-accent` | `#B8926A` | `#1A3C6E` | `#B8926A` |
| `btn-outline-dark` | transparente | `#1A3C6E` | `#1A3C6E` |
| `btn-outline-light` | transparente | `#FFFFFF` | `#FFFFFF` |
| `btn-ghost` | transparente | `#B8926A` | `rgba(184,146,106,0.35)` |

---

## 🏷️ Badges

> `font-family: Libre Franklin`, `font-weight: 700`, `font-size: 11px`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `padding: 6px 14px`, `border-radius: 9999px`

| Classe | Background | Texto | Borda |
|--------|-----------|-------|-------|
| `badge-solid-dark` | `#1A3C6E` | `#FFFFFF` | `#1A3C6E` |
| `badge-solid-accent` | `#B8926A` | `#1A3C6E` | `#B8926A` |
| `badge-outline` | transparente | `#1A3C6E` | `#1A3C6E` |
| `badge-outline-accent` | transparente | `#B8926A` | `#B8926A` |
| `badge-ghost` | transparente | `#6B7685` | `#9BA6B2` |

---

## 🃏 Cards

| Classe | Background | Sombra | Border Radius | Padding |
|--------|-----------|--------|---------------|---------|
| `card-info` | `#FFFFFF` | `md` | 24px | 32px |
| `card-stat` | `#FFFFFF` | `sm` | 24px | 32px |
| `card-feature` | `#FFFFFF` | `sm` | 24px | 32px |

---

## 🖼️ Imagens

### Grading padrão (`.img-graded`)
- `saturate(0.82) brightness(0.96) contrast(1.04)`
- Hover: remove o filtro (voltam às cores originais)

---

## ✍️ Estilos de texto no Figma

### Hierarchy sugerida
1. **Display / Hero** — Libre Franklin Bold 58px / lh 68px / cor `#1A3C6E`
2. **H1** — Libre Franklin Bold 42px / lh 54px / cor `#1A3C6E`
3. **H2** — Libre Franklin Bold 34px / lh 44px / cor `#1A3C6E`
4. **H3** — Libre Franklin Bold 26px / lh 36px / cor `#1A3C6E`
5. **H4** — Libre Franklin Bold 20px / lh 28px / cor `#1A3C6E`
6. **Body LG** — Inter Regular 17px / lh 28px / cor `#6B7685`
7. **Body** — Inter Regular 15px / lh 24px / cor `#6B7685`
8. **Body SM** — Inter Regular 13px / lh 20px / cor `#6B7685`
9. **Label / Category** — Libre Franklin SemiBold 11px / lh 16px / UPPERCASE / cor `#B8926A`

---

## 📦 Fontes (Google Fonts)
```
https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600;700&family=Inter:wght@400;500;600;700
```
