// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt"],
  app: {
    head: {
      link: [{ rel: "manifest", href: "/manifest.webmanifest" }],
      meta: [{ name: "theme-color", content: "#0d6efd" }],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "PWA Demo Application",
      short_name: "PWA Demo",
      description:
        "A Progressive Web Application demo with Bootstrap and Font Awesome",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#0d6efd",
      orientation: "portrait-primary",
      icons: [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: [],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
    },
  },
});
