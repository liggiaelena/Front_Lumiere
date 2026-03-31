export function fitzpatrickLabel(n) {
  const labels = {
    1: 'Tipo I — Pele muito clara, sempre queima, nunca bronzeia',
    2: 'Tipo II — Pele clara, quase sempre queima, raramente bronzeia',
    3: 'Tipo III — Pele média, às vezes queima, bronzeia gradualmente',
    4: 'Tipo IV — Pele oliva, raramente queima, bronzeia facilmente',
    5: 'Tipo V — Pele morena escura, muito raramente queima',
    6: 'Tipo VI — Pele negra, nunca queima',
  }
  return labels[n] || 'Tom desconhecido'
}

export function subtomLabel(s) {
  const labels = {
    quente: 'Quente (dourado, pêssego, amarelado)',
    frio: 'Frio (rosado, avermelhado, azulado)',
    neutro: 'Neutro (equilíbrio entre quente e frio)',
  }
  return labels[s] || s
}

export function oleosidadeLabel(o) {
  const labels = {
    seca: 'Seca',
    normal: 'Normal',
    mista: 'Mista',
    alta: 'Oleosa',
    muito_alta: 'Muito oleosa',
  }
  return labels[o] || o
}

export function deltaToPercent(delta) {
  // delta scale 0-50, returns 0-100 for bar width
  return Math.min(100, (delta / 50) * 100)
}

export function imperfeicaoLabel(tipo) {
  const labels = {
    poro_dilatado: 'Poro dilatado',
    brilho_excessivo: 'Brilho excessivo',
    mancha_solar: 'Mancha solar',
    cravos: 'Cravos',
    acne_leve: 'Acne leve',
    acne_moderada: 'Acne moderada',
    acne_severa: 'Acne severa',
    olheira: 'Olheira',
    rugas: 'Rugas',
    hiperpigmentacao: 'Hiperpigmentação',
  }
  return labels[tipo] || tipo
}

export function intensidadeLabel(i) {
  const labels = {
    leve: 'Leve',
    moderada: 'Moderada',
    alta: 'Alta',
  }
  return labels[i] || i
}

export function regiaoLabel(r) {
  const labels = {
    testa: 'Testa',
    bochecha_e: 'Bochecha esq.',
    bochecha_d: 'Bochecha dir.',
    nariz: 'Nariz',
    queixo: 'Queixo',
  }
  return labels[r] || r
}
