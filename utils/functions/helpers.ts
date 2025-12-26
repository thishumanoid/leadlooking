
export function truncateText(text: string, maxLength: number = 500): string {
  if (!text || text.length <= maxLength) return text;
  
  // Truncate and add ellipsis
  return text.substring(0, maxLength).trim() + '...';
}


export function cleanText(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Remove code blocks (``` or ~~~)
//   cleaned = cleaned.replace(/```[\s\S]*?```/g, (match) => {
//     // Extract just the code content without the backticks and language identifier
//     return match.replace(/```\w*\n?/g, '').replace(/```/g, '');
//   });

  cleaned = cleaned.replace(/~~~[\s\S]*?~~~/g, (match) => {
    return match.replace(/~~~\w*\n?/g, '').replace(/~~~/g, '');
  });

  // Remove inline code backticks
//   cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

  // Remove headers (# ## ### etc.)
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');

  // Remove bold/italic (** __ * _)
  cleaned = cleaned.replace(/(\*\*|__)(.*?)\1/g, '$2');
  cleaned = cleaned.replace(/(\*|_)(.*?)\1/g, '$2');

  // Remove strikethrough (~~)
//   cleaned = cleaned.replace(/~~(.*?)~~/g, '$1');

  // Remove links but keep the text [text](url) -> text
//   cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Remove reference-style links [text][ref] -> text
//   cleaned = cleaned.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');

  // Remove images ![alt](url) -> alt text
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1');

  // Remove blockquotes (>)
  cleaned = cleaned.replace(/^>\s+/gm, '');

  // Remove horizontal rules (--- or ***)
  cleaned = cleaned.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '');

  // Remove HTML tags (Reddit sometimes includes these)
//   cleaned = cleaned.replace(/<[^>]+>/g, '');

  // Remove escaped characters backslashes
//   cleaned = cleaned.replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1');

  // Remove list markers (- * + or numbered lists)
//   cleaned = cleaned.replace(/^[\s]*[-*+]\s+/gm, '');
//   cleaned = cleaned.replace(/^[\s]*\d+\.\s+/gm, '');

  // Remove table formatting (| and -)
//   cleaned = cleaned.replace(/\|/g, ' ');
//   cleaned = cleaned.replace(/^[\s]*[-:]+[\s]*$/gm, '');

  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n'); // Max 2 consecutive newlines
  cleaned = cleaned.replace(/[ \t]+/g, ' '); // Multiple spaces to single space
  cleaned = cleaned.trim();

  return cleaned;
}



export const delay = (ms: number) => new Promise(r => setTimeout(r, ms))