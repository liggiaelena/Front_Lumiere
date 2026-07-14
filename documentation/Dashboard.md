# SkinAnalysisDashboard 數據整合與設計系統（Design Tokens）審查報告

本文件旨在評估 `SkinAnalysisDashboard` 面板及其子組件對於 **Lumière 前端設計系統（Design System）** 的合規程度，並深入分析 Bento Grid 各卡片與後端 API 資料的整合情形、防禦性程式碼（Fallback）與硬編碼（Hardcoded）問題。

---

## 一、 設計權杖（Design Tokens）合規性審查

根據 [Design System.md](file:///l:/Lumiere/Front_Lumiere/documentation/Design%20System.md) 規範，所有全域變數皆定義於 `src/App.css` 的 `:root` 中，嚴禁在組件中硬編碼色碼。經檢視 `SkinAnalysisDashboard` 目錄下的元件及 CSS 檔，發現以下合規與不合規項目：

### 🟢 合規項目
* **架構整合**：主樣式表 [SkinAnalysisDashboard.css](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/SkinAnalysisDashboard.css) 與均勻度雷達圖的 [UniformityRadar.css](file:///l:/Lumiere/Front_Lumiere/src/components/UniformityRadar/UniformityRadar.css) 大量且正確地使用了全域權杖（如 `var(--color-background)`, `var(--color-surface)`, `var(--color-primary)`, `var(--color-border)`, `var(--radius-md)` 等），整體視覺基底十分契合品牌風格。
* **字型與間距**：基本上均採用 `var(--font-sans)` 以及 `var(--spacing-*)` 級距，保證了佈局與字形的一致性。

### 🟢 設計權杖（Design Tokens）違規項目

1. **硬編碼膚色 Fallback**
   * 在 [SkinToneCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/SkinToneCard.jsx#L48) 與 [RecommendationsCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/RecommendationsCard.jsx#L89) 中，若後端未回傳主膚色 Hex 時，皆寫死了備用膚色 `#c68b6e`。
   * **目前現狀**：因該備用色為特定膚質的代表 swatch，目前維持為兜底 Hex。未來建議可將此 Fallback 值定義在常數配置中，或是改用 CSS 變數 `var(--color-accent-light)` 做視覺兜底。

---

## 二、 Bento Grid 卡片後端資料整合分析

SkinAnalysisDashboard 採用 Bento Grid 佈局，核心由 7 個卡片/區塊組成。以下分析各區塊對應的檔案、呼叫的後端 API 資料欄位，以及資料空值/缺失時的降級防禦邏輯。

### Bento Grid 卡片概覽表

| 卡片/區塊 | 對應檔案 | 呼叫後端資料欄位 | 是否有 Hardcoded 資料 | 資料缺失時的降級處理（Fallback） |
| :--- | :--- | :--- | :--- | :--- |
| **1. 臉部分區分析**<br>(Main Visual Card) | [MainVisualCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/MainVisualCard.jsx) | `imageUrl` (原始上傳圖片 Blob)<br>`condition_overlay` (影像分割遮罩與色彩圖例) | ❌ 否 | 1. 若 `imageUrl` 為空，顯示「照片無法顯示」提示文字。<br>2. 若無 `condition_overlay` 影像，則自動隱藏分段控制鈕與熱圖遮罩，僅展示 Zones 分區互動功能。 |
| **2. 膚色與色調**<br>(Skin Tone Card) | [SkinToneCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/SkinToneCard.jsx) | `tom_geral_hex`<br>`tom_geral_fitzpatrick`<br>`subtom_predominante`<br>`skin_tone`<br>`regioes` | ⚠️ 有限制<br>(Fallback 色碼 `#c68b6e` 寫死於代碼內) | 1. 膚色 swatch 缺失時 fallback 為 `#c68b6e`。<br>2. Fitzpatrick 評級不存在時隱藏徽章。<br>3. 區域色票會自動過濾無 `tom_hex` 的分區。<br>4. BiSeNet 純淨膚色 `skin_tone` 為空時，隱藏該區塊。 |
| **3. 分區詳情卡片**<br>(Region Detail Card) | [RegionDetailCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/RegionDetailCard.jsx) | `regioes[selectedRegion]`：<br>- `tom_hex`<br>- `tom_fitzpatrick`<br>- `oleosidade`<br>- `uniformidade`<br>- `imperfeicoes`<br>- `notas`<br>`conditions` (來自 `segformer_condition_map`) | ⚠️ 部分<br>(區域圖為 "coming soon" 預留位置；膚況標籤使用硬編碼 RGBA 樣式) | 1. 若未選擇任何區域（`selectedRegion` 為空），顯示導引提示「點擊上方照片分區查看詳細分析」。<br>2. 瑕疵列表為空時顯示「✓ 未偵測到瑕疵」。<br>3. `conditions` 為空時不渲染膚況標籤。<br>4. 數值（如 `uniformidade`）缺失時，進度條長度降級為 `0%`。 |
| **4. 敏感肌模式**<br>(Sensitive Skin Card) | [SensitiveSkinCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/SensitiveSkinCard.jsx) | **無** (純前端互動 Switch 元件) | ❌ 否 | 無後端依賴。狀態為本機 state，預設為 `false`。 |
| **5. 瑕疵偵測清單**<br>(Texture & Spots Card) | [TextureSpotsCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/TextureSpotsCard.jsx) | `imperfeicoes` (陣列) | ❌ 否<br>(但存在硬編碼顏色) | 1. `imperfeicoes` 為空或非陣列時，顯示「✓ 未偵測到瑕疵」。<br>2. 單筆資料屬性缺失時，以降級字串顯示。 |
| **6. 均勻度雷達圖**<br>(Uniformity Radar) | [UniformityRadar.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/UniformityRadar/UniformityRadar.jsx) | `regioes[key].uniformidade` | ❌ 否 | 1. 過濾未包含在 `regioes` 中的分區。<br>2. 均勻度數值缺失時預設為 `0`。<br>3. 若有效資料筆數小於 3 筆，則雷達圖元件**直接返回 null**，在 Bento Grid 中會呈現空白。 |
| **7. 推薦產品簡介**<br>(Recommendations Card) | [RecommendationsCard.jsx](file:///l:/Lumiere/Front_Lumiere/src/components/SkinAnalysisDashboard/RecommendationsCard.jsx) | `recommendations`<br>`condition_map` (例如 `melasma`, `vitiligo`, `wine_stain`) | 🟢 已優化<br>(已將原本寫死的 `#c68b6e` 替換為 `var(--color-exception-text)`) | 1. 若產品清單為空，整個卡片**直接返回 null** 不顯示。<br>2. 點擊按鈕平滑滾動至下方的詳細推薦區。<br>3. 產品色票 `shade_hex` 為空時降級顯示 `var(--color-exception-text)` 以警示數據缺失。 |

---

## 三、 各卡片詳細分析與調用欄位

### 1. MainVisualCard (臉部分區分析)
* **調用檔案**：`src/components/SkinAnalysisDashboard/MainVisualCard.jsx`
* **後端資料欄位**：
  * `imageUrl`：用於渲染用戶上傳的臉部照片 `<img>`。
  * `conditionOverlay` (`condition_overlay`)：包含 `image` (Base64 PNG 熱圖遮罩) 與 `legend` (異常狀況色彩標示)。
* **空值防禦**：
  ```javascript
  {imageUrl ? (
    <img src={imageUrl} ... />
  ) : (
    <div className="fallback">{rl(CARD_LABELS.noPhoto)}</div>
  )}
  ```
  當圖片尚未載入或失敗時，會優雅顯示錯誤佔位文字。當無 `conditionOverlay.image` 時，底部的 Segmented Control 及對應的遮罩圖、色彩圖例將自動隱藏，安全降級為僅顯示 Zones 互動圖。
* **視圖切換與遮罩重疊實作**：
  * **分段控制鈕 (Segmented Control)**：於底部新增 `Zones` (分區) 與 `Heatmap` (熱圖) 的切換按鈕，支援完整的國際化多語系。
  * **Zones 模式**：顯示原始相片，並在上方顯示 Forehead, Nose, Chin, Left Cheek, Right Cheek 五個絕對定位的互動按鈕熱點。當選取分區時，底部的 Selected Indicator 會顯示當前選取的區域名稱。
  * **Heatmap 模式**：利用絕對定位 `.main-visual-card__photo-overlay` 將預先融合了臉部的 Base64 遮罩影像重疊於原始相片上方。配合設計系統 Design Tokens 中的 `transition: opacity var(--transition)` 屬性控制淡入淡出。在 Heatmap 模式下會自動隱藏五大分區熱點與 Selected Indicator 條，避免視覺干擾，呈現清晰的分析圖像。
  * **動態色彩圖例 (Legend)**：於分段控制鈕旁渲染專屬色彩標籤。讀取 `conditionOverlay.legend` 陣列，動態顯示白斑症、黃褐斑、鮮紅斑痣或皺紋等項目的專屬色彩圓點與本地化標籤，提供專業醫療級的數據展示體驗。
* **是否硬編碼**：否。全變數控制，遮罩展示為後端生成影像，色彩與動畫均遵循設計系統權杖。

### 2. SkinToneCard (膚色與色調)
* **調用檔案**：`src/components/SkinAnalysisDashboard/SkinToneCard.jsx`
* **後端資料欄位**：
  * `tomGeralHex` (`tom_geral_hex`)：主要大色塊背景。
  * `tomGeralFitz` (`tom_geral_fitzpatrick`)：Fitzpatrick 級別。
  * `subtomPredominante` (`subtom_predominante`)：優勢底色（如 Warm, Cool, Neutral）。
  * `skinTone` (`skin_tone`)：BiSeNet 去背景純膚色，讀取其中的 `median_hex` 與 `median_rgb`。
  * `regioes`：抓取五大區域的 `tom_hex` 渲染下方的「分區色票（Regional Palette）」。
* **空值防禦**：
  * `tomGeralHex` 缺失時使用設計變數 `var(--color-exception-text)` 作為警示。
  * `skinTone?.median_hex` 缺失時，BiSeNet Swatch 區域直接不渲染：
    ```javascript
    {skinTone?.median_hex && ( ... )}
    ```
  * `regioes` 格式不對時：
    ```javascript
    const palette = REGION_ORDER
      .filter(k => regioes?.[k]?.tom_hex)
      .map(k => ({ ... }))
    ```
    透過 `filter` 進行防禦，確保只有成功分析出膚色 hex 的區域才會顯示在色盤上。

### 3. RegionDetailCard (分區詳情卡片)
* **調用檔案**：`src/components/SkinAnalysisDashboard/RegionDetailCard.jsx`
* **後端資料欄位**：
  當前被選取的區域資料 `regioes[selectedRegion]`：
  * `tom_hex`：區域圓點顏色。
  * `tom_fitzpatrick`：Fitzpatrick 數值。
  * `oleosidade`：出油程度。
  * `uniformidade`：均勻度數值。
  * `imperfeicoes`：局部瑕疵陣列。
  * `notas`：局部膚況說明。
  * `conditions`：從上層 `segformer_condition_map` 過濾出來、屬於此分區的醫學膚況標籤。
* **空值防禦**：
  * 整體卡片對 `regionData` 進行了 null 檢查：
    ```javascript
    {!regionData && ( /* 渲染點擊分區查看提示 */ )}
    {regionData && ( /* 渲染詳細數值 */ )}
    ```
  * 進度條百分比計算防禦：
    ```javascript
    const uniformPct = regionData?.uniformidade != null
      ? Math.round((regionData.uniformidade / 10) * 100)
      : 0
    ```
    確保不會因為屬性不存在而拋出 NaN。
  * 瑕疵陣列長度防禦：
    ```javascript
    {regionData.imperfeicoes?.length > 0 ? ( ... ) : ( <p>✓ 未偵測到瑕疵</p> )}
    ```
* **是否硬編碼**：是。卡片頂部寫死了一個「局部分區圖」佔位區：
  ```javascript
  <span className="region-detail__photo-placeholder-text">
    {rl(CARD_LABELS.futurePlaceholder)} {/* 顯示：局部圖像 — 即將提供 */}
  </span>
  ```
  此為預留功能，目前以靜態 Icon 與文字展示。

### 4. SensitiveSkinCard (敏感肌模式)
* **調用檔案**：`src/components/SkinAnalysisDashboard/SensitiveSkinCard.jsx`
* **後端資料欄位**：**無**。
* **是否硬編碼**：否。雖然是純前端開關，但文字均正確導入 `useLanguage` 的多國語系機制，沒有硬編碼中文或英文在元件內。

### 5. TextureSpotsCard (瑕疵偵測清單)
* **調用檔案**：`src/components/SkinAnalysisDashboard/TextureSpotsCard.jsx`
* **後端資料欄位**：
  * `imperfeicoes`：後端分析出的一般皮膚瑕疵清單。每項包含 `tipo` (類型，如 spots, pores)、`regiao` (區域)、`intensidade` (嚴重度，如 alta, moderada)。
* **空值防禦**：
  * `imperfeicoes` 防禦性定義為陣列：
    ```javascript
    const safe = Array.isArray(imperfeicoes) ? imperfeicoes : []
    ```
    並在長度為 0 時渲染「✓ 未偵測到瑕疵」。
* **是否硬編碼**：否。資料來源均為後端陣列，但其高嚴重度色調樣式採用了 JSX 內聯硬編碼色碼 `#ffebee` 與 `#c62828`。

### 6. UniformityRadar (均勻度雷達圖)
* **調用檔案**：`src/components/UniformityRadar/UniformityRadar.jsx`
* **後端資料欄位**：
  * `regioes[key].uniformidade`：用於繪製雷達圖多邊形的數值。
* **空值防禦**：
  * 過濾不存在的區域，並對缺失的均勻度指標以 `0` 兜底：
    ```javascript
    const data = REGION_ORDER
      .filter((k) => regioes[k])
      .map((k) => ({
        region: t.regions?.[k] ?? k,
        score: regioes[k].uniformidade ?? 0,
        fullMark: 10,
      }))
    ```
  * **關鍵邊界**：若後端返回的區域小於 3 個（雷達圖至少需要三個點才能成面），則元件不渲染：
    ```javascript
    if (data.length < 3) return null
    ```
    需要注意此時 Bento Grid 的該區塊將顯示為空白，CSS 的 `.bento-card--radar` 將只剩下一個外殼。

### 7. RecommendationsCard (推薦產品簡介)
* **調用檔案**：`src/components/SkinAnalysisDashboard/RecommendationsCard.jsx`
* **後端資料欄位**：
  * `recommendations`：後端回傳的建議化妝品/護膚品。包含 `id`, `brand`, `shade_name`, `shade_hex`, `price_range`, `where_to_buy`。
  * `conditionMap` (`condition_map` / `result.condition_map`)：用於觸發警示橫幅。
* **空值防禦**：
  * 產品列表防禦性截取前三筆，且清單為空時，整個卡片直接隱藏不佔位：
    ```javascript
    if (safe.length === 0) return null
    ```
  * 醫療警告橫幅防禦：若 `conditionMap.melasma === true`，則主動觸發 SPF 強烈防護警告，此邏輯十分健壯，且文案均使用 `useLanguage` 對應的多國語言翻譯。

---

## 四、 總結與後續改善建議


