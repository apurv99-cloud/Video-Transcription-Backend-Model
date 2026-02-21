import express from "express";
import multer from "multer";
import { extractAudio } from "../services/audioExtractor.js";
import { transcribeWithVosk } from "../services/voskTranscription.js";
import { chunkTranscript } from "../services/chunkService.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const videoPath = req.file.path;

    const audioPath = await extractAudio(videoPath);

    const words = await transcribeWithVosk(audioPath);

    const chunks = chunkTranscript(words);

    res.json({
      success: true,
      chunks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Processing failed" });
  }
});

export default router;