// ─── ⚙️ 模擬設定開關 (Simulation Configuration Switch) ───
export const SIMULATION_CONFIG = {
  // 總開關：是否啟用測試用模擬數據 (若為 false，所有模擬功能將關閉)
  // Master Switch: Whether to enable simulation data (if false, all simulation features are disabled)
  enableSimulation: false,

  // 1. 膚況模擬開關 (針對 condition_map)
  // Condition simulation (for condition_map)
  conditionMap: {
    melasma: false,    // 設為 true 測試：SPF Banner + 校色步驟 (SPF Banner + Color Correction Step)
    vitiligo: true,    // 設為 true 測試：商品卡片亮起 Dermatologically Tested 徽章 (Dermatologically Tested badge)
    wine_stain: false, // 設為 true 測試：徽章 + 校色步驟 (Badge + Color Correction Step)
  },

  // 2. 未來模擬擴充 (例如：強制作為特定的 Fitzpatrick 等級)
  // Future simulation options (e.g. override fitzpatrick score)
  overrides: {
    // tom_geral_fitzpatrick: 4,
  }
}

export const mockAnalysisResponse = {
  get tom_geral_fitzpatrick() {
    return (SIMULATION_CONFIG.enableSimulation && SIMULATION_CONFIG.overrides.tom_geral_fitzpatrick !== undefined)
      ? SIMULATION_CONFIG.overrides.tom_geral_fitzpatrick
      : 4;
  },
  subtom_predominante: 'quente',
  tom_geral_hex: '#c68b6e',
  skin_tone: {
    median_hex: '#c68b6e',
    median_rgb: [198, 139, 110],
  },
  regioes: {
    testa: {
      tom_hex: '#c4856a',
      tom_fitzpatrick: 4,
      subtom: 'quente',
      oleosidade: 'alta',
      imperfeicoes: ['poro_dilatado', 'brilho_excessivo'],
      uniformidade: 6.5,
      notas: 'Area with oily tendency and visible pores',
    },
    bochecha_e: {
      tom_hex: '#c99070',
      tom_fitzpatrick: 4,
      subtom: 'quente',
      oleosidade: 'normal',
      imperfeicoes: ['mancha_solar'],
      uniformidade: 7.8,
      notas: 'Even tone with a small sun spot',
    },
    bochecha_d: {
      tom_hex: '#cb9272',
      tom_fitzpatrick: 4,
      subtom: 'quente',
      oleosidade: 'normal',
      imperfeicoes: [],
      uniformidade: 8.2,
      notas: 'Well-balanced and uniform region',
    },
    nariz: {
      tom_hex: '#bf7f62',
      tom_fitzpatrick: 4,
      subtom: 'quente',
      oleosidade: 'muito_alta',
      imperfeicoes: ['poro_dilatado', 'cravos', 'brilho_excessivo'],
      uniformidade: 5.1,
      notas: 'T-zone with high oiliness and visible blackheads',
    },
    queixo: {
      tom_hex: '#c68a6d',
      tom_fitzpatrick: 4,
      subtom: 'neutro',
      oleosidade: 'normal',
      imperfeicoes: ['acne_leve'],
      uniformidade: 7.0,
      notas: 'Mild acne in the chin area',
    },
  },
  comparacao_tons: {
    testa_vs_bochecha_e: { delta: 8, nivel: 'baixo' },
    testa_vs_bochecha_d: { delta: 11, nivel: 'baixo' },
    nariz_vs_bochecha_e: { delta: 18, nivel: 'moderado' },
    queixo_vs_testa: { delta: 6, nivel: 'baixo' },
  },
  imperfeicoes: [
    { tipo: 'poro_dilatado', intensidade: 'moderada', regiao: 'testa' },
    { tipo: 'brilho_excessivo', intensidade: 'alta', regiao: 'testa' },
    { tipo: 'mancha_solar', intensidade: 'leve', regiao: 'bochecha_e' },
    { tipo: 'poro_dilatado', intensidade: 'alta', regiao: 'nariz' },
    { tipo: 'cravos', intensidade: 'moderada', regiao: 'nariz' },
    { tipo: 'brilho_excessivo', intensidade: 'alta', regiao: 'nariz' },
    { tipo: 'acne_leve', intensidade: 'leve', regiao: 'queixo' },
  ],
  recommendations: [
    {
      brand: 'Fenty Beauty',
      shade_name: '340W',
      shade_code: '340W',
      undertone: 'quente',
      fitzpatrick_range: [3, 4],
      price_range: '$38–$42',
      where_to_buy: 'https://www.fentybeauty.com',
      category: 'foundation'
    },
    {
      brand: 'MAC',
      shade_name: 'NC35',
      shade_code: 'NC35',
      undertone: 'quente',
      fitzpatrick_range: [3, 4],
      price_range: '$35–$40',
      where_to_buy: 'https://www.maccosmetics.com',
      category: 'foundation'
    },
    {
      brand: 'Maybelline',
      shade_name: '320 Warm Nude',
      shade_code: '320',
      undertone: 'quente',
      fitzpatrick_range: [3, 4],
      price_range: '$10–$14',
      where_to_buy: 'https://www.maybelline.com',
      category: 'foundation'
    },
  ],
  medical_alert: {
    severity: "info",
    title: "Not a medical diagnosis",
    message:
      "Lumière provides cosmetic guidance and educational prototype analysis only. It does not diagnose, treat, or replace advice from a licensed healthcare professional.",
    recommendation:
      "If you notice persistent, painful, changing, spreading, bleeding, or concerning skin changes, please consult a licensed healthcare professional.",
  },

  segformer_condition_map: {
    vitiligo: {
      detected: true,
      area_percent: 4.8,
      zones: ['left_cheek', 'chin'],
    },
    melasma: {
      detected: false,
      area_percent: 0,
      zones: [],
    },
    wine_stain: {
      detected: false,
      area_percent: 0,
      zones: [],
    },
  },

  get condition_overlay() {
    const mockSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
      <!-- Forehead (Melasma) -->
      <rect x='80' y='40' width='240' height='90' rx='10' fill='rgba(255, 180, 0, 0.32)' stroke='white' stroke-width='2'/>
      <!-- Left Cheek (Vitiligo) -->
      <circle cx='100' cy='245' r='40' fill='rgba(255, 255, 255, 0.32)' stroke='white' stroke-width='2'/>
      <!-- Right Cheek (Wine Stain) -->
      <circle cx='300' cy='245' r='40' fill='rgba(255, 0, 0, 0.32)' stroke='white' stroke-width='2'/>
    </svg>`;
    const base64Image = typeof window !== 'undefined' ? `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(mockSvg)))}` : null;
    return {
      image: base64Image,
      has_detections: true,
      legend: [
        { label: 1, key: "vitiligo", name: "Vitiligo", color: "#ffffff" },
        { label: 2, key: "melasma", name: "Melasma / dark spots", color: "#ffb400" },
        { label: 3, key: "wine_stain", name: "Port-wine stain", color: "#ff0000" }
      ]
    };
  },

  // ─── 💡 手動新增後端模擬資料 (修改此處的值來測試不同 UI 效果) ───
  // ─── 💡 Manually add backend simulation data (modify the value here to test different UI effects). ───
  get condition_map() {
    if (!SIMULATION_CONFIG.enableSimulation) {
      return {
        melasma: false,
        vitiligo: false,
        wine_stain: false,
      }
    }
    return SIMULATION_CONFIG.conditionMap
  }

}
