/* eslint-disable no-extend-native */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Wrapper } from './Wrapper'

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value: any) {
      if (this == null) {
        throw new TypeError('this is null or not defined')
      }

      const O = Object(this)
      // tslint:disable-next-line:no-bitwise
      const len = O.length >>> 0
      const start = arguments[1]
      // tslint:disable-next-line:no-bitwise
      const relativeStart = start >> 0

      let k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len)

      const end = arguments[2]
      // tslint:disable-next-line:no-bitwise
      const relativeEnd = end === undefined ? len : end >> 0

      const final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len)

      while (k < final) {
        O[k] = value
        k++
      }

      return O
    },
  })
}

ReactDOM.render(<Wrapper />, document.getElementById('root'))
