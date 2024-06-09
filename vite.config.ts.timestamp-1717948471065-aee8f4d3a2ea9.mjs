// vite.config.ts
import { defineConfig } from "file:///D:/Simon/Documents/_Docs/Programmation/movie-elo-v2/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Simon/Documents/_Docs/Programmation/movie-elo-v2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import adonisjs from "file:///D:/Simon/Documents/_Docs/Programmation/movie-elo-v2/node_modules/@adonisjs/vite/build/src/client/main.js";
import { getDirname } from "file:///D:/Simon/Documents/_Docs/Programmation/movie-elo-v2/node_modules/@adonisjs/core/build/src/helpers/main.js";
import { resolve } from "node:path";
import inertia from "file:///D:/Simon/Documents/_Docs/Programmation/movie-elo-v2/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
var __vite_injected_original_import_meta_url = "file:///D:/Simon/Documents/_Docs/Programmation/movie-elo-v2/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      script: { defineModel: true },
      template: { compilerOptions: { isCustomElement: (tag) => ["model-viewer"].includes(tag) } }
    }),
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ["inertia/app/app.ts"],
      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ["resources/views/**/*.edge"]
    }),
    inertia({ ssr: { enabled: false } }),
    adonisjs({ entrypoints: ["inertia/app/app.ts"], reload: ["resources/views/**/*.edge"] })
  ],
  resolve: {
    alias: {
      "@/": `${resolve(getDirname(__vite_injected_original_import_meta_url), "inertia")}/`,
      "~/": `${resolve(getDirname(__vite_injected_original_import_meta_url), ".")}/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxTaW1vblxcXFxEb2N1bWVudHNcXFxcX0RvY3NcXFxcUHJvZ3JhbW1hdGlvblxcXFxtb3ZpZS1lbG8tdjJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFNpbW9uXFxcXERvY3VtZW50c1xcXFxfRG9jc1xcXFxQcm9ncmFtbWF0aW9uXFxcXG1vdmllLWVsby12MlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovU2ltb24vRG9jdW1lbnRzL19Eb2NzL1Byb2dyYW1tYXRpb24vbW92aWUtZWxvLXYyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGFkb25pc2pzIGZyb20gJ0BhZG9uaXNqcy92aXRlL2NsaWVudCdcbmltcG9ydCB7IGdldERpcm5hbWUgfSBmcm9tICdAYWRvbmlzanMvY29yZS9oZWxwZXJzJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBpbmVydGlhIGZyb20gJ0BhZG9uaXNqcy9pbmVydGlhL2NsaWVudCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSh7XG4gICAgICBzY3JpcHQ6IHsgZGVmaW5lTW9kZWw6IHRydWUgfSxcbiAgICAgIHRlbXBsYXRlOiB7IGNvbXBpbGVyT3B0aW9uczogeyBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IFsnbW9kZWwtdmlld2VyJ10uaW5jbHVkZXModGFnKSB9IH0sXG4gICAgfSksXG4gICAgYWRvbmlzanMoe1xuICAgICAgLyoqXG4gICAgICAgKiBFbnRyeXBvaW50cyBvZiB5b3VyIGFwcGxpY2F0aW9uLiBFYWNoIGVudHJ5cG9pbnQgd2lsbFxuICAgICAgICogcmVzdWx0IGluIGEgc2VwYXJhdGUgYnVuZGxlLlxuICAgICAgICovXG4gICAgICBlbnRyeXBvaW50czogWydpbmVydGlhL2FwcC9hcHAudHMnXSxcblxuICAgICAgLyoqXG4gICAgICAgKiBQYXRocyB0byB3YXRjaCBhbmQgcmVsb2FkIHRoZSBicm93c2VyIG9uIGZpbGUgY2hhbmdlXG4gICAgICAgKi9cbiAgICAgIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10sXG4gICAgfSksXG4gICAgaW5lcnRpYSh7IHNzcjogeyBlbmFibGVkOiBmYWxzZSB9IH0pLFxuICAgIGFkb25pc2pzKHsgZW50cnlwb2ludHM6IFsnaW5lcnRpYS9hcHAvYXBwLnRzJ10sIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10gfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AvJzogYCR7cmVzb2x2ZShnZXREaXJuYW1lKGltcG9ydC5tZXRhLnVybCksICdpbmVydGlhJyl9L2AsXG4gICAgICAnfi8nOiBgJHtyZXNvbHZlKGdldERpcm5hbWUoaW1wb3J0Lm1ldGEudXJsKSwgJy4nKX0vYCxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxvQkFBb0I7QUFDcFgsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxhQUFhO0FBTHFNLElBQU0sMkNBQTJDO0FBTzFRLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFFBQVEsRUFBRSxhQUFhLEtBQUs7QUFBQSxNQUM1QixVQUFVLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFO0FBQUEsSUFDNUYsQ0FBQztBQUFBLElBQ0QsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLUCxhQUFhLENBQUMsb0JBQW9CO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLbEMsUUFBUSxDQUFDLDJCQUEyQjtBQUFBLElBQ3RDLENBQUM7QUFBQSxJQUNELFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxNQUFNLEVBQUUsQ0FBQztBQUFBLElBQ25DLFNBQVMsRUFBRSxhQUFhLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLDJCQUEyQixFQUFFLENBQUM7QUFBQSxFQUN6RjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLFFBQVEsV0FBVyx3Q0FBZSxHQUFHLFNBQVMsQ0FBQztBQUFBLE1BQ3hELE1BQU0sR0FBRyxRQUFRLFdBQVcsd0NBQWUsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUNwRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
