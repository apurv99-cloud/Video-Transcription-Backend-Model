import fs from "fs";
import vosk from "vosk";
import path from "path";

const MODEL_PATH = path.resolve("models/vosk-model-small-en-us-0.15");

vosk.setLogLevel(0);

let model;
if (!fs.existsSync(MODEL_PATH)) {
  console.error("Model not found!");
  process.exit(1);
} else {
  model = new vosk.Model(MODEL_PATH);
}

export const transcribeWithVosk = (audioPath) => {
  return new Promise((resolve, reject) => {
    const wfReader = new fs.ReadStream(audioPath, { highWaterMark: 4096 });

    const rec = new vosk.Recognizer({ model: model, sampleRate: 16000 });

    let results = [];

    wfReader.on("data", (data) => {
      if (rec.acceptWaveform(data)) {
        const result = rec.result();
        if (result.result) {
          results = results.concat(result.result);
        }
      }
    });

    wfReader.on("end", () => {
      const finalResult = rec.finalResult();
      if (finalResult.result) {
        results = results.concat(finalResult.result);
      }

      rec.free();
      resolve(results);
    });

    wfReader.on("error", reject);
  });
};