import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: "src/",
  devtools: { enabled: true },
  css: ['./src/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  plugins: [
    '@/plugins/ant-design-vue', // Register the Ant Design Vue plugin
  ],
})
