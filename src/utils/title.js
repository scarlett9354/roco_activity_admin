/**
 *
 * @param {string} title
 */
export default function title(title = process.env.VUE_APP_TITLE) {
  window.document.title = title
}
