export function getData (el, name) {
  const attributeName = 'data-' + name
  return el.getAttribute(attributeName)
}

export function setData (el, name, val) {
  if (val == null) {
    return
  }
  const attributeName = 'data-' + name
  el.setAttribute(attributeName, val)
}
