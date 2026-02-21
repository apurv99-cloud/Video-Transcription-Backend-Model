#  Video-Transcription Backend  
### *Node.js • VOSK • FFmpeg • Offline Speech-to-Text*

A production-ready backend service that:

*  Accepts video uploads  
*  Extracts optimized audio using FFmpeg  
*  Transcribes speech using VOSK (fully offline & free)  
*  Splits transcript into 45-second timestamped chunks  
*  Returns structured JSON response  

---

#  Architecture
Client (Frontend)
↓
Express API
↓
Multer (File Upload)
↓
FFmpeg (Convert → WAV Mono 16kHz PCM)
↓
VOSK (Speech-to-Text)
↓
Chunking (45 sec segments)
↓
JSON Response

#  Tech Stack

* Node.js  
* Express.js  
* Multer  
* FFmpeg  
* VOSK (Offline Speech Recognition)  
* JavaScript (ES Modules)  

---

#  Project Structure
backend/
│
├── server.js
├── routes/
│ └── upload.js
├── services/
│ ├── audioExtractor.js
│ ├── voskTranscription.js
│ └── chunkService.js
├── models/
│ └── vosk-model-small-en-us-0.15
├── uploads/
└── package.json
