import { date } from 'quasar'

export const textHighlighter = ( content, searchString ) => {
  if ( !content || content.toString().length === 0 ) {
    return ''
  }

  if ( typeof content === 'object' && date.isValid(content) ) {
    content = date.formatDate(content, 'DD.MM.YYYY HH:mm')
  }

  if ( !searchString || searchString.toString().length < 1 ) {
    return content !== true
      ? content
      : ''
  }

  const expression = new RegExp(searchString, 'gi')
  content = typeof content !== 'string' ? content.toString() : content

  return content.replace(expression, match => '<span class="highlight-text">' + match + '</span>')
}
