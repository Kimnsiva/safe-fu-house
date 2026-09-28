import type { Config } from "tailwindcss"
import sharedConfig from "../../packages/ui/tailwind.config"

const config = {
  presets: [sharedConfig],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
} satisfies Config

export default config
