# Lumière 前端設計系統（Design System）與開發指南

---

## 1. 全域設計權杖（Design Tokens）

所有全域的設計變數均在 [src/App.css](file:///l:/Lumiere/Front_Lumiere/src/App.css#L1-L54) 中統一維護。嚴禁在任何組件 CSS 中使用硬編碼（Hardcoded）色碼。

```css
:root {
  /* 1. Core Brand Colors & Backgrounds */
  --color-primary: #8C6239;         /* 暖栗棕 Warm Chestnut Brown - 用於標題、邊框及關鍵文字 */
  --color-accent: #D4A373;          /* 琥珀金 Amber Gold - 主要 CTA 按鈕背景與強調狀態 */
  --color-accent-light: #F5EBE0;    /* 杏仁奶白變體 Almond Milk White Variant */
  --color-background: #F5EBE0;      /* 杏仁奶白全域背景 Almond Milk White - 應用主背景 */
  --color-surface: #FFFFFF;         /* 純白卡片/彈窗背景 Pure White */

  /* 2. Typography & Layout Borders */
  --color-text: #2D2D2D;            /* 炭黑 Dark Charcoal - 主段落與文本色 */
  --color-muted-text: #6B6B6B;      /* 灰 Muted Grey - 次要標籤與提示文字 */
  --color-border: #8C6239;          /* 暖栗棕邊框 */

  /* 3. Functional/Auxiliary Colors */
  --color-secondary: #1A365D;       /* 深海藍 Deep Sea Blue - AI 圖表、雷達圖與數據線專用 */
  --color-success: #2D6A4F;         /* 成功綠 - Tested 徽章、正常指標等 */
  --color-error: #C1121F;           /* 警示紅 - 瑕疵警報、錯誤提示等 */
  --color-warning: #D97706;         /* 警告橘 - 醫療警示邊框、SPF 提示等 */
  --color-warning-light: #FFF4E5;   /* 警告淡黃 - 醫療警告背景 */
  --color-warning-text: #3D2300;    /* 警告深棕 - 警告內文色 */

  /* 4. Compatibility Aliases (Backwards Compatibility) */
  --color-bg: var(--color-background);
  --color-text-muted: var(--color-muted-text);

  /* 5. Radii & Shadows */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10);
  --font-sans: 'Noto Sans', 'Noto Sans TC', 'Noto Sans SC', system-ui, sans-serif;
  --transition: 0.2s ease;

  /* 6. Hover & Overlay Variants */
  --color-accent-hover: #c49363;     /* 琥珀金 Hover 效果色 */
  --color-overlay: rgba(61, 47, 32, 0.65); /* 暖栗色調半透明 Modal 遮罩背景 */

  /* 7. Spacing Scale Tokens */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
}
```

---

## 2. 前端組件整合狀態清單

所有核心前端組件已完成重構，完全收攏於上述設計權杖規範中：

| 組件名稱 | 關聯 CSS 檔案 | 設計系統整合項目 | 備註與規範 |
| :--- | :--- | :--- | :--- |
| **全域主頁** | [App.css](file:///l:/Lumiere/Front_Lumiere/src/App.css) | 定義 `:root` 設計權杖，統一全域主頁字體與背景。 | 核心設計系統基底。 |
| **登入首頁** | [LandingPage.css](file:///l:/Lumiere/Front_Lumiere/src/components/LandingPage/LandingPage.css) | 使用全域色彩與間距 Tokens，利用新增之 RGB 變數支持半透明與高動態陰影。 | 100% 符合設計系統。 |
| **人臉掃描動畫** | [FaceScanningAnimation.css](file:///l:/Lumiere/Front_Lumiere/src/components/FaceScanningAnimation/FaceScanningAnimation.css) | 移除所有舊版紫色與亮粉紅 fallback。將掃描框發光效果更新為琥珀金變體，背景陰影收攏為栗棕色調。 | 已徹底消除歷史風格遺毒。 |
| **膚質分析面板** | [ConditionsPanel.css](file:///l:/Lumiere/Front_Lumiere/src/components/ConditionsPanel/ConditionsPanel.css) | 清除所有舊泥橘色 fallback。條目背景統一為 `var(--color-surface)`，邊框使用 `var(--color-accent-light)`。 | 視覺色差已修正。 |
| **Bento 看板結果** | [SkinAnalysisDashboard.css](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/SkinAnalysisDashboard.css) | 主看板外觀與子卡片全部收攏於設計系統內，採用 overlay 權杖。 | 主架構已完成重構。 |
| **產品推薦** | [Recommendations.css](file:///l:/Lumiere/Front_Lumiere/src/components/Recommendations/Recommendations.css) | 將硬編碼的 SPF 警告旗幟色彩完全替換為警告狀態 Tokens (`var(--color-warning-*)`)。 | 宣傳卡片樣式已收攏。 |
| **上傳區域** | [UploadZone.css](file:///l:/Lumiere/Front_Lumiere/src/components/UploadZone/UploadZone.css) | 主按鈕 hover 背景色替換為 `var(--color-accent-hover)`。 | 按鈕行為標準化。 |
| **照片預覽** | [FacePreview.css](file:///l:/Lumiere/Front_Lumiere/src/components/FacePreview/FacePreview.css) | 主按鈕 hover 替換為 `var(--color-accent-hover)`。 | 按鈕行為標準化。 |
| **錯誤邊界** | [ErrorBoundary.css](file:///l:/Lumiere/Front_Lumiere/src/components/ErrorBoundary/ErrorBoundary.css) | 重新導向按鈕 hover 至 `var(--color-accent-hover)`。 | 按鈕行為標準化。 |
| **相機拍攝** | [CameraCapture.css](file:///l:/Lumiere/Front_Lumiere/src/components/CameraCapture/CameraCapture.css) | 快門按鈕 hover 替換為 `var(--color-accent-hover)`。 | 按鈕行為標準化。 |
| **均勻度雷達圖** | [UniformityRadar.css](file:///l:/Lumiere/Front_Lumiere/src/components/UniformityRadar/UniformityRadar.css) | 色彩全部使用全域 Tokens。 | 整合良好。 |
| **膚色對比** | [ToneComparison.css](file:///l:/Lumiere/Front_Lumiere/src/components/ToneComparison/ToneComparison.css) | 進度條與狀態色彩完全符合 Tokens 系統。 | 整合良好。 |
| **分區卡片** | [RegionCard.css](file:///l:/Lumiere/Front_Lumiere/src/components/RegionCard/RegionCard.css) | 進度條、狀態色彩全部引用全域 Tokens。 | 整合良好。 |
| **[已廢棄] 舊分析結果** | [AnalysisResult.css](file:///l:/Lumiere/Front_Lumiere/src/components/AnalysisResult/AnalysisResult.css) | 將警告黃色完全替換為 warning 權杖。現為廢棄元件。 | 已由 Bento 網格看板取代。 |

---

## 3. 未來開發規範

為了維護 Lumière 設計系統的長期乾淨度與一致性，新進前端開發需嚴格遵守以下三條紅線原則：

### 🚫 嚴禁直接編寫色碼（Hex / RGB / Name）
* **錯誤示範**：
  ```css
  .my-component {
    background-color: #D4A373; /* ❌ 嚴禁寫死品牌色 */
    color: #3D2300;            /* ❌ 嚴禁寫死警告色 */
  }
  ```
* **正確示範**：
  ```css
  .my-component {
    background-color: var(--color-accent);      /*  (琥珀金) */
    color: var(--color-warning-text);          /*  (警告深棕) */
  }
  ```

### 🚫 嚴禁使用帶色碼的 Fallback
* **錯誤示範**：
  ```css
  .my-component {
    border: 1px solid var(--color-border, #eadbd3); /* ❌ 嚴禁在 fallback 內寫死舊色碼 */
  }
  ```
* **正確示範**：
  ```css
  .my-component {
    border: 1px solid var(--color-border); /*  使用乾淨的 token 引用 */
  }
  ```

### 📏 優先使用排版與間距變數
* 建議在自定義組件的排版中，優先使用全域的 `--spacing-*` 尺度以確保各組件在行高、外邊距（margin）和內邊距（padding）上的一致性。
  ```css
  .card {
    padding: var(--spacing-lg); /*  1.5rem (24px) */
    margin-bottom: var(--spacing-md); /*  1rem (16px) */
  }
  ```
