# Lumière 前端網頁 Sitemap 與元件流程說明

本專案為**單頁面應用程式 (SPA)**。網頁沒有使用傳統的多路由瀏覽器網址導覽（如 `react-router-dom`），而是利用 `step` 狀態在 [App.jsx](../src/App.jsx) 中管理使用者的操作流程。

---

## 1. 網站導覽與步驟流程圖 (Sitemap Flow)

```mermaid
graph TD
    App[App.jsx - 主入口] -->|step = 'upload'| UploadZone[UploadZone.jsx - 圖片上傳]
    UploadZone -->|點擊開啟相機| CameraCapture[CameraCapture.jsx - 鏡頭拍照]
    CameraCapture -->|成功拍照並傳回 blob| FacePreview[FacePreview.jsx - 人臉預覽與隱私同意]
    UploadZone -->|選擇/拖曳本機圖片| FacePreview
    
    FacePreview -->|重選照片| UploadZone
    FacePreview -->|點擊開始分析 / 發送 API| FaceScanning[FaceScanningAnimation.jsx - 雷射掃描動畫]
    
    FaceScanning -->|API 回傳成功| ResultGuard[ErrorBoundary - 渲染錯誤防護]
    ResultGuard --> AnalysisResult[AnalysisResult.jsx - 結果主面板]
    
    AnalysisResult -->|重新分析| UploadZone
    
    subgraph 結果分析子元件 (Dashboard Sub-components)
        AnalysisResult --> UniformityRadar[UniformityRadar.jsx - 均勻度雷達圖]
        AnalysisResult --> RegionCard[RegionCard.jsx - 五大分區膚況卡片]
        AnalysisResult --> ToneComparison[ToneComparison.jsx - 色差 delta 對比]
        AnalysisResult --> ConditionsPanel[ConditionsPanel.jsx - 膚況圖像分割結果]
        AnalysisResult --> Recommendations[Recommendations.jsx - 美妝與 SPF 護膚推薦]
    end
```

---

## 2. 各步驟頁面與元件說明

### 🔹 步驟一：上傳與拍照頁面 (`step === 'upload'`)
這是進入網站的首頁，負責接收使用者的人臉圖片。
*   **[UploadZone.jsx](../src/components/UploadZone/UploadZone.jsx)** (樣式：[UploadZone.css](../src/components/UploadZone/UploadZone.css))
    *   *職責：* 提供拖曳上傳與檔案瀏覽器選擇功能，限制圖片格式為 JPEG/PNG/WebP，限制檔案大小最大 10MB。
*   **[CameraCapture.jsx](../src/components/CameraCapture/CameraCapture.jsx)** (樣式：[CameraCapture.css](../src/components/CameraCapture/CameraCapture.css))
    *   *職責：* 當使用者點擊「開啟相機」時啟動，調用瀏覽器相機串流 API，繪製人臉對齊框（Oval Mask），處理拍照並傳回 blob 圖片資料。
    *   *配合 Hook：* **[useCamera.js](../src/hooks/useCamera.js)** 用於控制相機的初始化與生命週期管理。

### 🔹 步驟二：圖片確認與授權頁面 (`step === 'preview'`)
*   **[FacePreview.jsx](../src/components/FacePreview/FacePreview.jsx)** (樣式：[FacePreview.css](../src/components/FacePreview/FacePreview.css))
    *   *職責：* 顯示使用者上傳或拍攝的人臉圖片。使用者必須在 GDPR 同意書容器（限制高度為 250px 的滾動面板）中，將所有隱私與照片處理條款**滾動到最底部**後，同意核取方塊（Checkbox）與「分析肌膚」主動作按鈕方會解鎖點選（滾動解鎖合規防禦），以進入分析等待。
    *   *短文本自動解鎖防禦：* 透過 React Ref 與渲染後的高度比對，若因翻譯文字較短（如中文版條款）而未產生滾動條，會自動開啟同意勾選狀態，避免使用者因無法滾動而卡死在當前頁面。
    *   *排版對齊防禦：* 核取方塊的 checkbox 圖示在 CSS 中強制與多行長文字的左上角（`flex-start`）對齊，預防大語系（如葡萄牙文、法文）長句子造成的排版變形。

### 🔹 步驟三：AI 分析等待畫面 (`step === 'analyzing'`)
*   **[FaceScanningAnimation.jsx](../src/components/FaceScanningAnimation/FaceScanningAnimation.jsx)** (樣式：[FaceScanningAnimation.css](../src/components/FaceScanningAnimation/FaceScanningAnimation.css))
    *   *職責：* 在後端 API 運算期間，於畫面呈現雷射光束掃描與臉部外框動態光圈動畫。
    *   *配合 Hook：* **[useAnalysis.js](../src/hooks/useAnalysis.js)** 負責透過 **[api.js](../src/services/api.js)** 發送 `POST /api/analyze` 請求，並管理 `loading`、`error` 及 `result` 等狀態。

### 🔹 步驟四：分析結果主面板 (`step === 'result'`)
API 成功回傳資料後渲染的儀表板。為防範繪圖或資料解析異常導致整個網頁白屏，此區域由 **[ErrorBoundary.jsx](../src/components/ErrorBoundary/ErrorBoundary.jsx)** 進行包裹。
*   **[AnalysisResult.jsx](../src/components/AnalysisResult/AnalysisResult.jsx)** (樣式：[AnalysisResult.css](../src/components/AnalysisResult/AnalysisResult.css))
    *   *職責：* 儀表板的核心主控面板，負責解析後端回傳的 JSON 結構，並分發資料給子元件顯示：
        1.  **[UniformityRadar.jsx](../src/components/UniformityRadar/UniformityRadar.jsx)**：使用 Recharts 套件，以 `--color-secondary` (深海藍) 繪製前額、雙頰、鼻子、下巴五個區域的「膚色均勻度」雷達圖。標題與 Tooltip 均已動態多語系化。
        2.  **[RegionCard.jsx](../src/components/RegionCard/RegionCard.jsx)**：個別顯示 5 大分區（Forehead、Left Cheek、Right Cheek、Nose、Chin）的 Fitzpatrick 膚色評級、出油度、瑕疵標籤與備註。內建備註對譯字典，支援切換語系時即時動態對譯。
        3.  **[ToneComparison.jsx](../src/components/ToneComparison/ToneComparison.jsx)**：計算並比較區域間的膚色色差 delta 值，呈現長條圖級距。
        4.  **[ConditionsPanel.jsx](../src/components/ConditionsPanel/ConditionsPanel.jsx)**：呈現 Segformer 影像分割結果（Melasma 黃褐斑、Vitiligo 白斑、Wine Stain 胎記）的百分比與影響區塊，疾病類型均支援國際化翻譯。
        5.  **[Recommendations.jsx](../src/components/Recommendations/Recommendations.jsx)**：根據膚況與副色調匹配粉底液色號、SPF 防護建議、校色遮瑕步驟（Color Corrector Step），並整合皮膚學測試安全徽章與 disclaimer 聲明。商品卡片排版經過優化，徽章已移至品牌名稱下方以防排版被長品牌字元擠壓錯位。
    *   *免責聲明彈窗 (Medical Warning Modal Popup)*：轉換為覆蓋全螢幕的半透明毛玻璃高斯模糊背景彈出視窗，並附帶語系對應之確認關閉按鈕，符合醫療合規性要求。

---

## 3. 全域基礎設施

*   **多國語系 (i18n)**：
    *   **[LanguageContext.jsx](../src/i18n/LanguageContext.jsx)**：提供全域翻譯 Context 與切換機制。
    *   **[translations.js](../src/i18n/translations.js)**：內建 6 種語系翻譯對照字典（EN, PT, FR, ZH, TW, TR）。
*   **主視覺與樣式 (CSS)**：
    *   **[App.css](../src/App.css)**：包含所有全域變數（CSS Variables，例如暖栗棕主色 `--color-primary: #8C6239` 與琥珀金輔助色 `--color-accent: #D4A373` 等），本專案未使用 TailwindCSS。
*   **資料模擬 (Mock)**：
    *   **[analysisResponse.js](../src/mocks/analysisResponse.js)**：提供前端開發與測試用的模擬後端回傳資料結構。
