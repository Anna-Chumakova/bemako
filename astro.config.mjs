
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ОБЯЗАТЕЛЬНО: укажи свой будущий продакшн-домен
  site: 'https://localhost:4321',
  
  integrations: [
    sitemap() // плагин подключился сюда автоматически
  ],
});