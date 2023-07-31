/**
 * Result is intended to be used in `dangerouslySetInnerHtml`. For example
 * with `Notification.body` or `SubscriptionAgreementParagraph.lines`.
 */
export function boldBracketedText(text: string): string {
  const textWithoutNewLines = text.replace(/\n/g, ' ');
  const regex = /{{(.*?)}}/g;

  return textWithoutNewLines.replace(regex, (_match, word: string) => parseToHTML(word));
}

function parseToHTML(word: string) {
  return `<span class="font-bold">${word}</span>`;
}
