let decoder

export default {
  /**
   * 
   * @param {string} html 
   * @returns string
   */
  decode (html) {
    decoder = decoder || document.createElement('div')
    decoder.innerHTML = html
    return decoder.textContent
  }
}
