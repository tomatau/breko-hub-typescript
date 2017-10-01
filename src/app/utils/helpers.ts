import { filter, always, reject, isNil, flip, contains } from 'ramda'
import { CurriedFunction2 } from 'ramda'

export const compact = filter(Boolean)

export const noop = always(undefined)

// type isOneOf = CurriedFunction2<any, any[], boolean>
// export const isOneOf: <T>(xs: T[]) => (x: T) => boolean = flip(contains)
export const isOneOf = flip(contains)

export const filterNil = reject(isNil)
