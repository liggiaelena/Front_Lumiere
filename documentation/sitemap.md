# Lumière 前端網頁 Sitemap 與元件流程說明

本專案為**單頁面應用程式 (SPA)**。網頁沒有使用傳統的多路由瀏覽器網址導覽（如 `react-router-dom`），而是利用 `step` 狀態在 [App.jsx](../src/App.jsx) 中管理使用者的操作流程。

---

## 1. 網站導覽與步驟流程圖 (Sitemap Flow)

```mermaid
graph TD
    App[App.jsx - 主入口] -->|step = 'landing'| LandingPage[LandingPage.jsx - 介紹首頁]
    LandingPage -->|點擊體驗| UploadZone[UploadZone.jsx - 圖片上傳]
    
    UploadZone -->|點擊開啟相機| CameraCapture[CameraCapture.jsx - 鏡頭拍照]
    CameraCapture -->|成功拍照並傳回 blob| FacePreview[FacePreview.jsx - 人臉預覽與隱私同意]
    UploadZone -->|選擇/拖曳本機圖片| FacePreview
    
    FacePreview -->|重選照片| UploadZone
    FacePreview -->|點擊開始分析 / 發送 API| FaceScanning[FaceScanningAnimation.jsx - 雷射掃描動畫]
    
    FaceScanning -->|API 回傳成功| ResultGuard[ErrorBoundary - 渲染錯誤防護]
    ResultGuard --> SkinAnalysisDashboard[SkinAnalysisDashboard.jsx - 結果主面板]
    
    SkinAnalysisDashboard -->|重新分析| UploadZone
    
    subgraph Bento Grid 網格佈局 (Bento Grid Cards)
        SkinAnalysisDashboard --> MainVisualCard[MainVisualCard.jsx - 臉部交互熱圖卡片]
        SkinAnalysisDashboard --> SkinToneCard[SkinToneCard.jsx - 膚色等級與色票卡片]
        SkinAnalysisDashboard --> RegionDetailCard[RegionDetailCard.jsx - 分區詳情卡片]
        SkinAnalysisDashboard --> SensitiveSkinCard[SensitiveSkinCard.jsx - 敏感肌自評卡片]
        SkinAnalysisDashboard --> TextureSpotsCard[TextureSpotsCard.jsx - 瑕疵偵測卡片]
        SkinAnalysisDashboard --> UniformityRadar[UniformityRadar.jsx - 均勻度雷達圖]
        SkinAnalysisDashboard --> RecommendationsCard[RecommendationsCard.jsx - 推薦簡介卡片]
        SkinAnalysisDashboard --> ConditionsPanel[ConditionsPanel.jsx - 膚況指標卡片]
    end

    subgraph 側邊欄詳細分頁頁面 (Sidebar Detail Sections)
        SkinAnalysisDashboard --> SectionRegions[分區詳情分頁]
        SectionRegions --> RegionCard[RegionCard.jsx - 五大分區詳情卡]
        SectionRegions --> ToneComparison[ToneComparison.jsx - 色差 delta 對比]
        
        SkinAnalysisDashboard --> SectionConditions[膚況診斷分頁]
        SectionConditions --> ConditionsPanelDetail[ConditionsPanel.jsx - 完整膚況指標]
        
        SkinAnalysisDashboard --> SectionRecos[產品推薦分頁]
        SectionRecos --> RecommendationsDetail[Recommendations.jsx - 完整產品推薦]
    end
```

---

## 2. 各步驟頁面與元件說明

### 🔹 步驟零：介紹與登入首頁 (`step === 'landing'`)
使用者進入網頁的第一個畫面，建立品牌高級感。
*   **[LandingPage.jsx](../src/components/LandingPage/LandingPage.jsx)** (樣式：[LandingPage.css](../src/components/LandingPage/LandingPage.css))
    *   *職責：* 品牌介紹與體驗入口。採用嚴格對齊設計系統（Design Tokens）的毛玻璃微光（Glassmorphism）與高級暗色調設計，支援多國語系切換與登入驗證。

### 🔹 步驟一：上傳與拍照頁面 (`step === 'upload'`)
負責接收使用者的人臉圖片。
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

### 🔹 步驟四：分析結果 Bento 儀表板 (`step === 'result'`)
API 成功回傳資料後渲染的儀表板。為防範繪圖或資料解析異常導致整個網頁白屏，此區域由 **[ErrorBoundary.jsx](../src/components/ErrorBoundary/ErrorBoundary.jsx)** 進行包裹。
*   **[SkinAnalysisDashboard.jsx](../src/components/SkinAnalysisDashboard/SkinAnalysisDashboard.jsx)** (樣式：[SkinAnalysisDashboard.css](../src/components/SkinAnalysisDashboard/SkinAnalysisDashboard.css))
    *   *職責：* 全新 Bento Grid（便當盒式網格）與側邊導覽列（Sidebar）主控面板。負責解析後端回傳之資料，管理側邊欄多個分頁切換，並處理免責聲明彈窗、報告分享與列印下載。
    *   *全螢幕免責聲明彈窗 (Medical Warning Modal Popup)*：覆蓋全螢幕的半透明毛玻璃高斯模糊背景彈出視窗，並附帶語系對應之確認關閉按鈕，符合醫療合規性要求。
    *   *Bento Grid 八大卡片元件：*
        1.  **[MainVisualCard.jsx](../src/components/SkinAnalysisDashboard/MainVisualCard.jsx)**：展示上傳的臉部照片。包含 "Zones / Heatmap" 切換：可藉由選取特定臉部熱區互動，亦可一鍵重疊 Segformer 色彩異常分割遮罩（Heatmap 模式），帶有動態色彩標籤圖例（Legend）。
        2.  **[SkinToneCard.jsx](../src/components/SkinAnalysisDashboard/SkinToneCard.jsx)**：顯示整體 Fitzpatrick 膚色、Predominant 底妝副色調與中位數色塊，並附帶五大分區膚色色票盤（Skin Palette）。
        3.  **[RegionDetailCard.jsx](../src/components/SkinAnalysisDashboard/RegionDetailCard.jsx)**：與 `MainVisualCard` 進行交互連動。當使用者在臉部圖表點選特定區域（如額頭）時，即時渲染該區域的 Fitzpatrick、出油度、均勻度進度條、特定瑕疵與說明。
        4.  **[SensitiveSkinCard.jsx](../src/components/SkinAnalysisDashboard/SensitiveSkinCard.jsx)**：提供敏感肌自評聲明開關。
        5.  **[TextureSpotsCard.jsx](../src/components/SkinAnalysisDashboard/TextureSpotsCard.jsx)**：以列表形式展示所有檢出的一般膚質瑕疵，並標註嚴重度等級。
        6.  **[UniformityRadar.jsx](../src/components/UniformityRadar/UniformityRadar.jsx)**：使用 Recharts 套件，繪製前額、雙頰、鼻子、下巴五個區域的均勻度雷達圖，圖表標題與 Tooltip 字樣均已實現多語系支援。
        7.  **[RecommendationsCard.jsx](../src/components/SkinAnalysisDashboard/RecommendationsCard.jsx)**：Overview 中顯示最佳的前 3 名匹配化妝品與 SPF 防護提示卡片，可平滑滾動至詳細分頁。
        8.  **[ConditionsPanel.jsx](../src/components/ConditionsPanel/ConditionsPanel.jsx)**：以 Bento 卡片形式展示檢出的異常膚況指標（Vitiligo、Melasma、Wine Stain）受影響面積百分比與區域。若無檢出則該卡片自動隱藏。

---

## 3. 全域基礎設施

*   **多國語系 (i18n)**：
    *   **[LanguageContext.jsx](../src/i18n/LanguageContext.jsx)**：提供全域翻譯 Context 與切換機制。
    *   **[translations.js](../src/i18n/translations.js)**：內建 6 種語系翻譯對照字典（EN, PT, FR, ZH, TW, TR）。
*   **主視覺與樣式 (CSS)**：
    *   **[App.css](../src/App.css)**：包含所有全域變數（CSS Variables，例如暖栗棕主色 `--color-primary: #8C6239` 與琥珀金輔助色 `--color-accent: #D4A373` 等），本專案未使用 TailwindCSS。
*   **資料模擬 (Mock)**：
    *   **[analysisResponse.js](../src/mocks/analysisResponse.js)**：提供前端開發與測試用的模擬後端回傳資料結構。
