import fs from 'fs'
import { merge } from 'lodash'

const isDev = process.env.NODE_ENV === 'dev'

export type Config = {
  logLevel: string
  env: string
  isDev: boolean
  port: number
  baseUrl: string
  baseApiUrl: string
}

if (!process.env.ENV_NAME) {
  console.warn('ENV_NAME not defined, defaulting to local')
}
const envName = process.env.ENV_NAME || 'local'
console.info(`Using ${envName} config`)

const commongConfig = {
  isDev,
  env: envName,
  ...JSON.parse(fs.readFileSync('./config/common.json', 'utf8')),
}

const envConfig = {
  isDev,
  ...JSON.parse(fs.readFileSync(`./config/${envName}.json`, 'utf8')),
}

export const config = merge(envConfig, commongConfig) as Config
