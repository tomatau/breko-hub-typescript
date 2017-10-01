import { contains } from 'ramda'

export const hasWindow = typeof window !== 'undefined'

export const isBrowser = process.env.APP_ENV === 'browser'

type isEnv = (...environments: string[]) => boolean
export const isEnv:isEnv = (...environments) =>
  contains<string>(process.env.NODE_ENV)(environments)
