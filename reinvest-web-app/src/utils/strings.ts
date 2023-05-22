/**
 * Result is intended to be used in `dangerouslySetInnerHtml`. For example
 * with `Notification.body` or `SubscriptionAgreementParagraph.lines`.
 */
export function boldBracketedText(text: string): string {
  const words = text.split(' ');
  const maybeHighlightedWords = words.map(word => {
    const matchesPlaceholder = word.startsWith('{{') && word.endsWith('}}');

    if (matchesPlaceholder) {
      const wordWithoutPlaceholder = word.replace(/{{|}}/g, '');

      return parseToHTML(wordWithoutPlaceholder);
    }

    return word;
  });

  return maybeHighlightedWords.join(' ');
}

function parseToHTML(word: string) {
  return `<span class="font-bold">${word}</span>`;
}
