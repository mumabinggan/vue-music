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

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export const JHTransform = prefixStyle('transform')
export const JHBackdrop = prefixStyle('backdrop-filter')
