/**
 * 文本模板解析渲染
 */
import { parseFilters } from './filter-parser'
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
export function parseText (text){
  const tagRE = defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // tag token
    const exp = parseFilters(match[1].trim())
    //resolveText
    tokens.push(`this.__rt(${exp})`)
    rawTokens.push({ '@binding': exp })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }
  // console.log("expression", tokens.join('+'))
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
