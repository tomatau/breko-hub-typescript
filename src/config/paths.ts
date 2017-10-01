import * as path from 'path'

export const ROOT = path.join(__dirname, '..', '..')
export const SRC = path.join(ROOT, 'src')
export const STATIC = path.join(SRC, 'static')
export const CONFIG = path.join(SRC, 'config')
export const SERVER = path.join(SRC, 'server')
export const ASSET_FILE = `${SERVER}/webpack-assets.json`
export const APP = path.join(SRC, 'app')