
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel'; 

export default defineConfig({
  // ОБЯЗАТЕЛЬНО: укажи свой будущий продакшн-домен
  site: 'https://localhost:4321',

  adapter: vercel(), // 

  integrations: [
    sitemap() // плагин подключился сюда автоматически
  ],
});