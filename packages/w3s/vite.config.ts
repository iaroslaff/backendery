import { configureReact as configure } from "@beardeddudes/vite-config"
import { fileURLToPath, URL } from "url"

export default configure(
  {
    appType: "spa",
    base: "/",
    build: {
      outDir: "dist",
      assetsInlineLimit: 1024 * 4,
      chunkSizeWarningLimit: 1024,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      minify: "terser",
      modulePreload: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-responsive", "react-router", "react-router-dom", "react-use"],
          },
        },
      },
      sourcemap: true,
      ssr: false,
      ssrManifest: false,
      target: "esnext",
      write: true,
    },
    resolve: {
      alias: [
        { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
        { find: "@styles", replacement: fileURLToPath(new URL("./src/styles", import.meta.url)) },
      ],
    },
    server: { hmr: { overlay: true } },
  },
  {
    analytics: { enableDev: true },
    buildInfo: { enabled: true },
    lint: { enabled: true, enableBuild: true, stylelint: false },
    openGraph: { enabled: true },
    react: { swc: { enabled: true }, svg: { enabled: true } },
    fonts: {
      google: {
        display: "auto",
        families: [
          { name: "Red Hat Display", styles: "wght@400;500;600;700;800;900" },
          { name: "Source Code Pro", styles: "wght@400;500;600;700;800;900" },
        ],
        preconnect: true,
      },
    },
  }
)
