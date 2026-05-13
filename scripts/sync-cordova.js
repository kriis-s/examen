import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const dist = resolve(root, "dist")
const www = resolve(root, "cordova-app", "www")

if (!existsSync(dist)) {
  throw new Error("No existe dist. Ejecuta npm run build antes de sincronizar Cordova.")
}

mkdirSync(www, { recursive: true })

for (const item of readdirSync(www)) {
  rmSync(resolve(www, item), { recursive: true, force: true })
}

cpSync(dist, www, { recursive: true })

console.log("Cordova sincronizado con dist.")
