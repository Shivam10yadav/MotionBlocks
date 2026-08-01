import { createHighlighter } from "shiki";

let highlighterPromise;

export const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["dracula"],
      langs: ["jsx", "bash"],
    });
  }
  return highlighterPromise;
};