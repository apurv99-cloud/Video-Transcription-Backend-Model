export const chunkTranscript = (segments) => {
  const chunks = [];
  let currentChunk = [];
  let chunkStart = 0;

  segments.forEach((word) => {
    if (word.end - chunkStart <= 45) {
      currentChunk.push(word);
    } else {
      chunks.push({
        start: chunkStart,
        end: currentChunk[currentChunk.length - 1].end,
        text: currentChunk.map((w) => w.word).join(" "),
      });

      currentChunk = [word];
      chunkStart = word.start;
    }
  });

  if (currentChunk.length > 0) {
    chunks.push({
      start: chunkStart,
      end: currentChunk[currentChunk.length - 1].end,
      text: currentChunk.map((w) => w.word).join(" "),
    });
  }

  return chunks;
};
