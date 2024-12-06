// /* eslint-disable no-unused-vars */
import '@testing-library/jest-dom'
import 'dotenv/config'

global.importMeta = {
  env: {
    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || '',
    VITE_API_KEY: process.env.VITE_API_KEY || '',
  },
}
