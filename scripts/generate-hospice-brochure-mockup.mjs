/**
 * Tri-fold outside (cover) on wood, subtle creases (⅓ / ⅔, nudged ~40px left).
 * Cropped wood from Brum `Coffe Cup Mockup.png`.
 * Run: npm run mockups:hospice-brochure
 */
import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const brandDir = path.join(root, 'public/assets/branding/unity-hospice')
const coverPath = path.join(brandDir, 'Tri-Fold Brochure.png')
const woodSourcePath = path.join(root, 'public/assets/branding/brum-co/Coffe Cup Mockup.png')
const outPath = path.join(brandDir, 'tri-fold-studio-mockup.png')

const PANEL_H = 1400
const PAD = 100
const MAX_OUT_W = 2800

/** Twin-line creases at ⅓ and ⅔, nudged left (~40px total) and kept subtle vs panel text. */
function creaseOverlayPng(w, h) {
  const nudge = 40
  const x1 = Math.max(2, Math.round(w / 3) - nudge)
  const x2 = Math.max(x1 + 4, Math.round((w * 2) / 3) - nudge)
  const darkOp = 0.09
  const lightOp = 0.12
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <g shape-rendering="crispEdges">
    <line x1="${x1 - 1}" y1="0" x2="${x1 - 1}" y2="${h}" stroke="#000000" stroke-opacity="${darkOp}" stroke-width="1"/>
    <line x1="${x1 + 1}" y1="0" x2="${x1 + 1}" y2="${h}" stroke="#ffffff" stroke-opacity="${lightOp}" stroke-width="1"/>
    <line x1="${x2 - 1}" y1="0" x2="${x2 - 1}" y2="${h}" stroke="#000000" stroke-opacity="${darkOp}" stroke-width="1"/>
    <line x1="${x2 + 1}" y1="0" x2="${x2 + 1}" y2="${h}" stroke="#ffffff" stroke-opacity="${lightOp}" stroke-width="1"/>
  </g>
</svg>`
  return sharp(Buffer.from(svg, 'utf8')).png().toBuffer()
}

async function main() {
  await mkdir(brandDir, { recursive: true })

  const artBase = await sharp(coverPath).resize({ height: PANEL_H, fit: 'inside' }).png().toBuffer()
  const m = await sharp(artBase).metadata()
  const artW = m.width ?? 0
  const artH = m.height ?? 0

  const creaseBuf = await creaseOverlayPng(artW, artH)
  const art = await sharp(artBase)
    .composite([{ input: creaseBuf, blend: 'over' }])
    .png()
    .toBuffer()

  const boardW = artW + PAD * 2
  const boardH = artH + PAD * 2

  const wm = await sharp(woodSourcePath).metadata()
  const ww = wm.width ?? 4500
  const wh = wm.height ?? 4500
  const woodCropTop = Math.round(wh * 0.52)
  const woodCropH = Math.round(wh * 0.42)
  const wood = await sharp(woodSourcePath)
    .extract({ left: 0, top: woodCropTop, width: ww, height: woodCropH })
    .resize({ width: boardW, height: boardH, fit: 'cover', position: 'centre' })
    .modulate({ saturation: 0.92, brightness: 1.02 })
    .png()
    .toBuffer()

  let out = await sharp(wood)
    .composite([{ input: art, left: PAD, top: PAD }])
    .png({ compressionLevel: 9 })
    .toBuffer()
  const ow = (await sharp(out).metadata()).width ?? 1
  if (ow > MAX_OUT_W) {
    out = await sharp(out).resize({ width: MAX_OUT_W, fit: 'inside' }).png({ compressionLevel: 9 }).toBuffer()
  }

  await sharp(out).toFile(outPath)
  const om = await sharp(outPath).metadata()
  console.log('Wrote', path.relative(root, outPath), `(${om.width}×${om.height})`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
