# gahanglee.github.io 🌿

嘉晃 · James 的個人網站，整合「多元接納的心理空間」與「幼兒特教 SEL 教育資源」，使用 Jekyll + GitHub Pages 建置。

## 上線步驟

### 1. 建立 GitHub Repository
- 登入 `gahanglee` 帳號
- 建立新 repo，名稱設為 **`gahanglee.github.io`**（必須完全一致）
- 設為 **Public**

### 2. 上傳所有檔案
把這個資料夾內所有檔案（包含隱藏的 `.gitignore`）都上傳到 repo 的根目錄。

用 Git 指令：
```bash
cd 這個資料夾
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/gahanglee/gahanglee.github.io.git
git push -u origin main
```

或直接在 GitHub 網頁用 **Upload files** 拖曳上傳（注意：需要多次上傳，每次上限 100 個檔案）。

### 3. 開啟 GitHub Pages
進入 repo → **Settings → Pages** → Source 選 `Deploy from a branch` → Branch 選 `main` → 儲存。

約 1–2 分鐘後，前往 **https://gahanglee.github.io** 即可看到網站。

### 4. 複製原本 intro-site 的圖片
把 `intro-site` 的 `images/` 資料夾整個複製過來放在根目錄，讓專長頁的圖片能正常顯示：
```
gahanglee.github.io/
└── images/
    ├── integration.png
    ├── education.png
    ├── assistive-tech.png
    ├── finance.png
    ├── system-cooperation.png
    └── counseling.png
```

---

## 📁 網站結構

```
gahanglee.github.io/
├── _config.yml              # 網站設定
├── _layouts/
│   ├── default.html         # 所有頁面外框
│   └── post.html            # 部落格文章
├── _includes/
│   ├── nav.html             # 導覽列
│   └── footer.html          # 頁尾
├── _posts/                  # ✍️ 部落格文章（新增文章放這裡）
│   └── YYYY-MM-DD-title.md
├── assets/css/main.scss     # 所有樣式
├── pages/
│   ├── about.html           # 關於我
│   ├── specialties.html     # 專長列表
│   ├── specialties/         # 六個專長子頁
│   │   ├── integration.html
│   │   ├── education.html
│   │   ├── assistive-tech.html
│   │   ├── finance.html
│   │   ├── system-cooperation.html
│   │   └── counseling.html
│   ├── portfolio.html       # 教材作品集
│   ├── app.html             # 情緒島嶼 App
│   ├── blog.html            # 部落格列表
│   └── contact.html         # 聯絡
├── images/                  # 從 intro-site 複製過來
└── index.html               # 首頁
```

---

## ✍️ 新增部落格文章

在 `_posts/` 新增 `YYYY-MM-DD-標題.md`，開頭格式：

```yaml
---
layout: post
title: "文章標題"
date: 2025-05-01
category: 教學策略
emoji: 🎯
emoji_bg: "rgba(217,115,66,0.10)"
reading_time: 5
tags: [SEL, 幼兒園]
excerpt: "文章摘要"
---

正文內容（Markdown 格式）
```

### emoji_bg 建議色碼
| 風格 | 色碼 |
|------|------|
| 橙色（教學） | `rgba(217,115,66,0.10)` |
| 薄荷綠（心理） | `rgba(107,155,138,0.12)` |
| 紫色（科技） | `rgba(120,100,180,0.10)` |

---

## ⚙️ 修改個人資訊

編輯 `_config.yml` 的 `email`、`author` 等欄位。
