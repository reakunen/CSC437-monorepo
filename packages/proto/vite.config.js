import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        food: resolve(__dirname, 'food.html'),
        video: resolve(__dirname, 'video.html'),
        analytics: resolve(__dirname, 'analytics.html'),
        budget: resolve(__dirname, 'budget.html'),
        exercise: resolve(__dirname, 'exercise.html'),
        financeRecommend: resolve(__dirname, 'finance-recommendations.html'),
        foodReviewer: resolve(__dirname, 'food-reviewer.html'),
        founder: resolve(__dirname, 'founder.html'),
        gym: resolve(__dirname, 'gym.html'),
        musicPlaylist: resolve(__dirname, 'music-playlist.html'),
        sheetMusic: resolve(__dirname, 'sheet-music.html'),
        startup: resolve(__dirname, 'startup.html'),
        stocks: resolve(__dirname, 'stocks.html'),
        workout: resolve(__dirname, 'workout.html'),
      },
    },
  },
})
