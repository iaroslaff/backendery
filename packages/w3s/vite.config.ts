import { configureReact as configure } from "@beardeddudes/vite-config"
import { fileURLToPath, URL } from "url"

export default configure(
  {
    appType: "spa",
    base: "/",
    build: {
      outDir: "dist",
      assetsInlineLimit: 1024 * 4,
      chunkSizeWarningLimit: 256,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: true,
      minify: "terser",
      modulePreload: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
            return null
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
        display: "swap",
        families: [
          { name: "IBM Plex Mono", styles: "wght@100;200;300;400;500;600;700" },
        ],
        preconnect: true,
      },
    },
  }
)
