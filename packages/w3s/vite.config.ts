import { configureReact as configure } from "@beardeddudes/vite-config"

const [gtmId] = [process.env.W3S_GOOGLE_TAG_MANAGER_ID || ""]

export default configure(
  {
    appType: "spa",
    base: "/",
    build: {
      outDir: "dist",
      assetsInlineLimit: 1024 * 4,
      chunkSizeWarningLimit: 512,
      cssCodeSplit: true,
      emptyOutDir: true,
      manifest: false,
      minify: "terser",
      modulePreload: true,
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            if (assetInfo.name) {
              const extension = assetInfo.name.split(".").pop() || ""
              if (["svg"].includes(extension)) {
                return `assets/images/${extension}/[name][extname]`
              }
            }
            return "assets/[name]-[hash][extname]"
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"
            }
            return null
          },
        },
      },
      sourcemap: false,
      ssr: false,
      ssrManifest: false,
      target: "esnext",
      write: true,
    },
    server: { hmr: { overlay: true } },
  },
  {
    analytics: { enableDev: false, gtm: { id: gtmId } },
    buildInfo: { enabled: false },
    lint: { enabled: true, enableBuild: true, stylelint: false },
    openGraph: { enabled: false },
    react: { swc: { enabled: true }, svg: { enabled: true } },
  }
)
