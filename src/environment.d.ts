export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: string
      PORT: string
      DGRAPH_API_KEY: string
    }
  }
}
