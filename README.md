# AI-Powered Research Assistant Chrome Extension

## Overview
AI-Powered Research Assistant is a Chrome Extension that allows users to select text from any webpage and instantly generate summaries, explanations, simplified content, and questions using AI.

The extension communicates with a Spring Boot backend, which integrates with the Google Gemini API to process and return AI-generated responses.

---

## Features

- Summarize selected text from any webpage  
- Explain complex content in simple terms  
- Simplify technical content for beginners  
- Generate questions based on selected content  
- Save and manage research notes within the extension  
- Real-time AI response using backend API  

---

## Tech Stack

### Frontend (Chrome Extension)
- JavaScript, HTML, CSS
- Chrome Extension APIs (Manifest V3)
  - contextMenus
  - scripting
  - storage
  - sidePanel

### Backend
- Spring Boot
- REST APIs
- WebClient (for external API calls)

### AI Integration
- Google Gemini API

### Deployment
- Docker
- Render

---

## Architecture

User → Chrome Extension → Spring Boot Backend → Gemini API → Response → Extension UI

---

## Setup Instructions

### 1. Backend (Already Deployed)

The backend is deployed and publicly accessible.

If you want to run locally:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd BackEnd
./mvnw clean install
./mvnw spring-boot:run
```

---

### 2. Chrome Extension Setup

Since the backend is already deployed, you only need to load the frontend extension.

#### Steps:

1. Download the frontend as a ZIP file from this repository  
   (Click "Code" → "Download ZIP")

2. Extract the ZIP file

3. Open Chrome and go to:

```
chrome://extensions/
```

4. Enable **Developer Mode** (top right)

5. Click **Load unpacked**

6. Select the extracted frontend folder

7. The extension will be installed and ready to use
---
## Usage

1. Select any text on a webpage  
2. Right-click and choose:
   - Summarize  
   - Explain  
   - Simplify  
   - Generate Questions  
3. The side panel will open and display AI-generated results  
4. Optionally save results as notes  
---
## Security & Optimization

- Implemented rate limiting to control API usage  
- Restricted CORS to allow only the Chrome extension  
- Stored API keys using environment variables  

---
### Screenshot 1
<img width="1920" height="1200" alt="Screenshot (90)" src="https://github.com/user-attachments/assets/f1dccf3a-652b-4da4-b35d-f1018af2f50f" />

---

### Screenshot 2
<img width="1920" height="1200" alt="Screenshot (91)" src="https://github.com/user-attachments/assets/6a88704f-7933-4779-86eb-369453b84fd8" />

---

## Future Improvements

- User authentication  
- Per-user rate limiting  
- History tracking  
- UI enhancements  
