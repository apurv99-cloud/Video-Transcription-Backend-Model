import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath);

export const extractAudio = (videoPath) => {
  return new Promise((resolve, reject) => {
    const outputPath = videoPath + ".wav";

    ffmpeg(videoPath)
      .output(outputPath)
      .audioCodec("pcm_s16le")
      .audioChannels(1)
      .audioFrequency(16000)
      .format("wav")
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .run();
  });
};