# Lumière 前端設計系統（Design System）與開發指南

---

## 1. 全域設計權杖（Design Tokens）

所有全域的設計變數均在 [src/App.css](file:///l:/Lumiere/Front_Lumiere/src/App.css) 中統一維護。嚴禁在任何組件 CSS 中使用硬編碼（Hardcoded）色碼。

```css
:root {
  /* 1. Core Brand Colors & Backgrounds */
  --color-primary: #8C6239;         /* 暖栗棕 Warm Chestnut Brown - 用於標題、邊框及關鍵文字 */
  --color-accent: #D4A373;          /* 琥珀金 Amber Gold - 主要 CTA 按鈕背景與強調狀態 */
  --color-accent-light: #F5EBE0;    /* 杏仁奶白變體 Almond Milk White Variant */
  --color-background: #F5EBE0;      /* 杏仁奶白全域背景 Almond Milk White - 應用主背景 */
  --color-surface: #FFFFFF;         /* 純白卡片/彈窗背景 Pure White */

  /* RGB variants for opacity manipulation (Used for transparent layers / shadows) */
  --color-primary-rgb: 140, 98, 57;
  --color-accent-rgb: 212, 163, 115;
  --color-shadow-rgb: 80, 55, 35;
  --color-secondary-rgb: 26, 54, 93;
  --color-success-rgb: 45, 106, 79;
  --color-error-rgb: 193, 18, 31;
  --color-warning-rgb: 217, 119, 6;
  --color-white-rgb: 255, 255, 255;
  --color-black-rgb: 0, 0, 0;

  /* 2. Typography & Layout Borders */
  --color-text: #2D2D2D;            /* 炭黑 Dark Charcoal - 主段落與文本色 */
  --color-muted-text: #6B6B6B;      /* 灰 Muted Grey - 次要標籤與提示文字 */
  --color-border: #8C6239;          /* 暖栗棕邊框 */

  /* 3. Functional/Auxiliary Colors */
  --color-secondary: #1A365D;       /* 深海藍 Deep Sea Blue - AI 圖表、雷達圖與數據線專用 */
  --color-success: #2D6A4F;         /* 成功綠 - Tested 徽章、正常指標等 */
  --color-error: #C1121F;           /* 警示紅 - 瑕疵警報、錯誤提示等 */
  --color-error-light: #FFF5F5;     /* 警示淺紅 */
  --color-exception-bg: rgba(var(--color-error-rgb), 0.1);    /* 異常膚況警示背景 */
  --color-exception-border: rgba(var(--color-error-rgb), 0.3);/* 異常膚況警示邊框 */
  --color-exception-text: #FF0000;  /* 異常膚況警示鮮紅文字 */
  --color-warning: #D97706;         /* 警告橘 - 醫療警示邊框、SPF 提示等 */
  --color-warning-light: #FFF4E5;   /* 警告淡黃 - 醫療警告背景 */
  --color-warning-text: #3D2300;    /* 警告深棕 - 警告內文色 */
  --color-success-light: #F0FDF4;   /* 成功綠淺背景 */

  /* 4. Clinical/Dermatology Badge Colors */
  --color-clinical-border: #CFE3E6;    /* 臨床綠色邊框 */
  --color-clinical-bg-start: #F3F9FA;  /* 臨床漸層起始背景 */
  --color-clinical-bg-end: #E8F2F4;    /* 臨床漸層結束背景 */
  --color-clinical-text: #3E5F66;      /* 臨床文字顏色 */

  /* 5. Color Corrector Palette (校色模組專用) */
  --color-corrector-border: #C8B6D9;   /* 校色框虛線紫色邊框 */
  --color-corrector-bg-start: #FCF7FF; /* 校色框背景漸層起始 */
  --color-corrector-bg-end: #F7F9FD;   /* 校色框背景漸層結束 */
  --color-corrector-text: #5B3D75;     /* 校色框主標題紫色文字 */
  --color-corrector-muted-text: #5D6470;/* 校色框描述灰色文字 */

  /* 6. Absolute Colors (用以替換硬編碼的 #fff 與 #000) */
  --color-white: #FFFFFF;
  --color-black: #000000;

  /* 7. Compatibility Aliases (Backwards Compatibility) */
  --color-bg: var(--color-background);
  --color-text-muted: var(--color-muted-text);

  /* 8. Radii & Shadows */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10);
  --font-sans: 'Noto Sans', 'Noto Sans TC', 'Noto Sans SC', system-ui, sans-serif;
  --transition: 0.2s ease;

  /* 9. Hover & Overlay Variants */
  --color-accent-hover: #c49363;     /* 琥珀金 Hover 效果色 */
  --color-overlay: rgba(61, 47, 32, 0.65); /* 暖栗色調半透明 Modal 遮罩背景 */

  /* 10. Spacing Scale Tokens */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */

  /* 11. Dashboard Layout Tokens */
  --sidebar-width: 240px;   /* 側導覽欄寬度 */
  --header-height: 64px;    /* 看板頂部高度 */
  --card-radius: var(--radius-md); /* Bento 卡片統一圓角 */
}
```

---

## 2. 前端組件整合狀態清單

所有核心前端組件已完成重構，完全收攏於上述設計權杖規範中：

| 組件名稱 | 關聯 CSS 檔案 | 設計系統整合項目 | 備註與規範 |
| :--- | :--- | :--- | :--- |
| **全域主頁** | [App.css](file:///l:/Lumiere/Front_Lumiere/src/App.css) | 定義全域設計權杖，統一全域主頁字體與背景。 | 核心設計系統基底。**100% 合規** |
| **登入首頁** | [LandingPage.css](file:///l:/Lumiere/Front_Lumiere/src/components/LandingPage/LandingPage.css) | 使用全域色彩與間距 Tokens，使用 RGB 變數支持半透明與高動態陰影。 | **100% 合規** |
| **人臉掃描動畫** | [FaceScanningAnimation.css](file:///l:/Lumiere/Front_Lumiere/src/components/FaceScanningAnimation/FaceScanningAnimation.css) | 掃描框發光與動態光圈已收攏至 `var(--color-accent)`、`rgba(var(--color-accent-rgb), ...)`。背景已更新為品牌栗棕/杏仁漸層。 | **100% 合規** |
| **膚質分析面板** | [ConditionsPanel.css](file:///l:/Lumiere/Front_Lumiere/src/components/ConditionsPanel/ConditionsPanel.css) | 條目與標籤完全引用全域顏色、圓角、間距與 exception 警告變數。 | **100% 合規** |
| **Bento 看板結果** | [SkinAnalysisDashboard.css](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/SkinAnalysisDashboard.css) | 主看板外觀與子卡片、面部點選熱區與 Heatmap 遮罩色彩均收攏至 RGB 變數，採用全域 overlay 權杖。 | **100% 合規** |
| **產品推薦** | [Recommendations.css](file:///l:/Lumiere/Front_Lumiere/src/components/Recommendations/Recommendations.css) | 美妝卡片 SPF 警告、臨床測試徽章、校色步驟皆已整合至對應專屬 CSS 變數。 | **100% 合規** |
| **上傳區域** | [UploadZone.css](file:///l:/Lumiere/Front_Lumiere/src/components/UploadZone/UploadZone.css) | 錯誤邊框與按鈕色彩完全收攏至 `var(--color-error-light)`、`var(--color-accent-hover)` 與 `var(--color-white)`。 | **100% 合規** |
| **照片預覽** | [FacePreview.css](file:///l:/Lumiere/Front_Lumiere/src/components/FacePreview/FacePreview.css) | GDPR 聲明背景及遮罩已完全使用 `var(--color-white)` 與 `var(--color-overlay)`。 | **100% 合規** |
| **錯誤邊界** | [ErrorBoundary.css](file:///l:/Lumiere/Front_Lumiere/src/components/ErrorBoundary/ErrorBoundary.css) | 重試按鈕已使用 `var(--color-white)` 與 `var(--color-accent-hover)`。 | **100% 合規** |
| **相機拍攝** | [CameraCapture.css](file:///l:/Lumiere/Front_Lumiere/src/components/CameraCapture/CameraCapture.css) | 快門、背景及遮罩等黑白與透明層已使用 `var(--color-black)`, `var(--color-white)` 及 `rgba(var(--color-black-rgb), ...)`。 | **100% 合規** |
| **均勻度雷達圖** | [UniformityRadar.css](file:///l:/Lumiere/Front_Lumiere/src/components/UniformityRadar/UniformityRadar.css) | 色彩與 Recharts 內嵌顏色全部使用全域 Tokens。 | **100% 合規** |
| **膚色對比** | [ToneComparison.css](file:///l:/Lumiere/Front_Lumiere/src/components/ToneComparison/ToneComparison.css) | 進度條與狀態色彩完全符合 Tokens 系統，Moderado 層級已正確收攏至 `var(--color-warning)`。 | **100% 合規** |
| **分區卡片** | [RegionCard.css](file:///l:/Lumiere/Front_Lumiere/src/components/RegionCard/RegionCard.css) | 進度條、狀態色彩、分區異常與條件標籤均完美引用全域 Tokens。 | **100% 合規** |
| **[已廢棄] 舊分析結果** | [AnalysisResult.css](file:///l:/Lumiere/Front_Lumiere/src/components/AnalysisResult/AnalysisResult.css) | 雖然此為廢棄元件，但已將內部所有硬編碼 Hex 顏色與 hover 效果全面收攏至設計系統。 | 廢棄備份元件。**100% 合規** |

---

## 3. 未來開發規範

為了維護 Lumière 設計系統的長期乾淨度與一致性，新進前端開發需嚴格遵守以下四條紅線原則：

### 🚫 嚴禁直接編寫色碼（Hex / RGB / Name）
* **錯誤示範**：
  ```css
  .my-component {
    background-color: #D4A373; /* ❌ 嚴禁寫死品牌色 */
    color: white;              /* ❌ 嚴禁使用 CSS 原生顏色名稱 */
  }
  ```
* **正確示範**：
  ```css
  .my-component {
    background-color: var(--color-accent);      /*  (琥珀金) */
    color: var(--color-white);                 /*  (全域純白 Token) */
  }
  ```

### 🚫 嚴禁直接於 `rgba()` 中硬編碼三原色數值
* **錯誤示範**：
  ```css
  .my-overlay {
    background-color: rgba(212, 163, 115, 0.25); /* ❌ 嚴禁硬編碼 RGB 數值 */
  }
  ```
* **正確示範**：
  ```css
  .my-overlay {
    background-color: rgba(var(--color-accent-rgb), 0.25); /*  使用對應的 RGB token 進行透明度控制 */
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
