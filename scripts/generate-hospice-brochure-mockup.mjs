/**
 * Tri-fold: full cover + inside side by side on a real wood surface (cropped from
 * Brum `Coffe Cup Mockup.png`). Flat print — no illustrated 3D accordion.
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
const insidePath = path.join(brandDir, 'tri-fold-inside.png')
const woodSourcePath = path.join(root, 'public/assets/branding/brum-co/Coffe Cup Mockup.png')
const outPath = path.join(brandDir, 'tri-fold-studio-mockup.png')

const PANEL_H = 1400
const GAP = 40
const PAD = 100
const MAX_OUT_W = 2800

async function main() {
  await mkdir(brandDir, { recursive: true })

  const coverBuf = await sharp(coverPath).resize({ height: PANEL_H, fit: 'inside' }).png().toBuffer()
  const insideBuf = await sharp(insidePath).resize({ height: PANEL_H, fit: 'inside' }).png().toBuffer()
  const m1 = await sharp(coverBuf).metadata()
  const m2 = await sharp(insideBuf).metadata()
  const w1 = m1.width ?? 0
  const w2 = m2.width ?? 0
  const h1 = m1.height ?? 0
  const h2 = m2.height ?? 0
  const artH = Math.max(h1, h2)
  const top1 = Math.round((artH - h1) / 2)
  const top2 = Math.round((artH - h2) / 2)
  const artW = w1 + GAP + w2

  const art = await sharp({
    create: {
      width: artW,
      height: artH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      { input: coverBuf, left: 0, top: top1 },
      { input: insideBuf, left: w1 + GAP, top: top2 },
    ])
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
