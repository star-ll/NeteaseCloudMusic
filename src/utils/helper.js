export function getClientWidth() {
  return document.documentElement.clientWidth;
}

/**
 *
 * @param {String} title
 * @param {String} text
 * @param {String} url
 * @returns
 */
export function share(title, text, url) {
  const shareData = {
    title,
    text,
    url,
  };

  return async () => {
    await navigator.share(shareData);
  };
}
