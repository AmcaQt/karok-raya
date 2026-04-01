# 🎤 Karaoke Raya — Registration Form

A Raya-themed event registration form with floating ketupat & lemang decorations,
animated lanterns, a ketupat mascot success popup, and Google Sheets as the database.

---

## 📁 Project Structure

```
karaoke-raya-registration/
├── index.html   ← main form (all-in-one)
└── README.md    ← this file
```

---

## 🗃️ Setting Up Google Sheets as Database

### Step 1 — Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → create a **New Spreadsheet**
2. Name it: `Pendaftaran Karaoke Raya`
3. In **Row 1**, add these headers exactly:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Jenis Penyertaan | Nama Kumpulan | Nama Penuh | Kelas | No. Telefon | Tajuk Lagu | Muzik Latar |

---

### Step 2 — Create the Apps Script

1. In your Google Sheet → click **Extensions → Apps Script**
2. Delete all existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data['Timestamp']          || '',
      data['Jenis Penyertaan']   || '',
      data['Nama Kumpulan']      || '',
      data['Nama Penuh']         || '',
      data['Kelas']              || '',
      data['No. Telefon']        || '',
      data['Tajuk Lagu']         || '',
      data['Muzik Latar']        || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (floppy disk icon) → name the project `KaraokeRaya`

---

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click ⚙️ gear icon → select **Web app**
3. Fill in:
   - **Description**: `Karaoke Raya Form`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Click **Authorize access** → sign in with your Google account → allow permissions
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

### Step 4 — Paste URL into index.html

Open `index.html`, find this line near the top of the `<script>` section:

```javascript
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

Replace it with your actual URL:

```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
```

Save the file. Done! 🎉

---

## 🚀 Deploying to GitHub Pages

```bash
git init
git add .
git commit -m "feat: Karaoke Raya registration form"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/karaoke-raya-registration.git
git push -u origin main
```

Then in GitHub → **Settings → Pages → Source: main branch / root** → Save.

Your form will be live at:
```
https://YOUR_USERNAME.github.io/karaoke-raya-registration/
```

---

## ✨ Features

- 🌙 Raya-themed design — green + gold palette
- 🎋 Floating ketupat & lemang animations
- 🏮 Swinging lantern strip in header
- 🎤 Karaoke Raya success popup with ketupat mascot saying "Tahniah!"
- ✅ Client-side form validation with toast notifications
- 📊 Google Sheets database via Apps Script (free, no backend needed)
- 📱 Fully responsive — mobile friendly

---

## 🛠️ Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | HTML + CSS + Vanilla JS       |
| Backend  | Google Apps Script (free)     |
| Database | Google Sheets                 |
| Hosting  | GitHub Pages (free)           |
| Fonts    | Playfair Display + DM Sans    |

---

Built with 💚 for portfolio & GitHub showcase.
