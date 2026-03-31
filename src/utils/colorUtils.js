export function fitzpatrickLabel(n) {
  const labels = {
    1: 'Type I — Very fair skin, always burns, never tans',
    2: 'Type II — Fair skin, usually burns, rarely tans',
    3: 'Type III — Medium skin, sometimes burns, gradually tans',
    4: 'Type IV — Olive skin, rarely burns, tans easily',
    5: 'Type V — Dark brown skin, very rarely burns',
    6: 'Type VI — Deeply pigmented skin, never burns',
  }
  return labels[n] || 'Unknown skin type'
}

export function subtomLabel(s) {
  const labels = {
    quente: 'Warm (golden, peachy, yellowish)',
    frio: 'Cool (rosy, reddish, bluish)',
    neutro: 'Neutral (balance of warm and cool)',
  }
  return labels[s] || s
}

export function oleosidadeLabel(o) {
  const labels = {
    seca: 'Dry',
    normal: 'Normal',
    mista: 'Combination',
    alta: 'Oily',
    muito_alta: 'Very oily',
  }
  return labels[o] || o
}

export function deltaToPercent(delta) {
  // delta scale 0-50, returns 0-100 for bar width
  return Math.min(100, (delta / 50) * 100)
}

export function imperfeicaoLabel(tipo) {
  const labels = {
    poro_dilatado: 'Enlarged pores',
    brilho_excessivo: 'Excess shine',
    mancha_solar: 'Sun spot',
    cravos: 'Blackheads',
    acne_leve: 'Mild acne',
    acne_moderada: 'Moderate acne',
    acne_severa: 'Severe acne',
    olheira: 'Dark circles',
    rugas: 'Wrinkles',
    hiperpigmentacao: 'Hyperpigmentation',
  }
  return labels[tipo] || tipo
}

export function intensidadeLabel(i) {
  const labels = {
    leve: 'Mild',
    moderada: 'Moderate',
    alta: 'High',
  }
  return labels[i] || i
}

export function regiaoLabel(r) {
  const labels = {
    testa: 'Forehead',
    bochecha_e: 'Left cheek',
    bochecha_d: 'Right cheek',
    nariz: 'Nose',
    queixo: 'Chin',
  }
  return labels[r] || r
}
