/**
 * Photorealistic packaging mockup: Morva Coffee logo on the same 4500× studio photos
 * as Brum & Co. (`Coffee Bag Mockup.png`, `Coffe Cup Mockup.png`). Label regions are
 * blurred, then the Morva mark is composited (multiply on bag for tonal blend; over on cup).
 * Run: npm run mockups:morva-coffee
 */
import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const brumDir = path.join(root, 'public/assets/branding/brum-co')
const bagTemplatePath = path.join(brumDir, 'Coffee Bag Mockup.png')
const cupTemplatePath = path.join(brumDir, 'Coffe Cup Mockup.png')
const logoPath = path.join(
  root,
  'public/assets/logo-design/modern-minimalist-logos/more/morva-logo.png',
)
const outPath = path.join(
  root,
  'public/assets/logo-design/modern-minimalist-logos/more/morva-coffee-packaging-mockup.png',
)

/** Max height per panel before joining (keeps file size reasonable vs. 4500² sources) */
const PANEL_TARGET_H = 2200
const GAP = 48
/** Blur sigma on label regions to knock back existing artwork (keep some texture) */
const LABEL_BLUR = 34

/**
 * @param {string} imagePath
 * @param {{ rx: number; ry: number; rw: number; rh: number }} rel label box 0–1
 * @param {'multiply' | 'over'} logoBlend multiply lets white “pick up” bag/cup tone
 */
async function obscureLabelAndCompositeLogo(imagePath, rel, logoMaxW, logoBlend) {
  const meta = await sharp(imagePath).metadata()
  const iw = meta.width ?? 1
  const ih = meta.height ?? 1
  const left = Math.round(rel.rx * iw)
  const top = Math.round(rel.ry * ih)
  const width = Math.round(rel.rw * iw)
  const height = Math.round(rel.rh * ih)

  const blurredPatch = await sharp(imagePath)
    .extract({ left, top, width, height })
    .blur(LABEL_BLUR)
    .toBuffer()

  const withBlurred = await sharp(imagePath)
    .composite([{ input: blurredPatch, left, top }])
    .png()
    .toBuffer()

  const scaled = await sharp(withBlurred)
    .resize({ height: PANEL_TARGET_H, fit: 'inside' })
    .png()
    .toBuffer()

  const ihScaled = (await sharp(scaled).metadata()).height ?? 1
  const scale = ihScaled / ih

  const lx = Math.round(left * scale)
  const ly = Math.round(top * scale)
  const lw = Math.round(width * scale)
  const lh = Math.round(height * scale)

  const trimmed = await sharp(logoPath).trim({ threshold: 14 }).png().toBuffer()
  const logoW = Math.min(logoMaxW, Math.round(lw * 0.78))
  const logoBuf = await sharp(trimmed).resize({ width: logoW, fit: 'inside' }).png().toBuffer()
  const lm = await sharp(logoBuf).metadata()
  const lw_ = lm.width ?? 1
  const lh_ = lm.height ?? 1

  const logoLeft = Math.round(lx + (lw - lw_) / 2)
  const logoTop = Math.round(ly + (lh - lh_) / 2)

  return sharp(scaled)
    .composite([{ input: logoBuf, left: logoLeft, top: logoTop, blend: logoBlend }])
    .png()
    .toBuffer()
}

async function main() {
  await mkdir(path.dirname(outPath), { recursive: true })

  // Label-centered regions on 4500×4500 Brum assets (tuned for main packaging read)
  const bagPanel = await obscureLabelAndCompositeLogo(
    bagTemplatePath,
    { rx: 0.14, ry: 0.08, rw: 0.72, rh: 0.8 },
    580,
    'multiply',
  )
  const cupPanel = await obscureLabelAndCompositeLogo(
    cupTemplatePath,
    { rx: 0.2, ry: 0.16, rw: 0.58, rh: 0.7 },
    380,
    'over',
  )

  const m1 = await sharp(bagPanel).metadata()
  const m2 = await sharp(cupPanel).metadata()
  const w1 = m1.width ?? 0
  const w2 = m2.width ?? 0
  const h1 = m1.height ?? 0
  const h2 = m2.height ?? 0
  const h = Math.max(h1, h2)
  const top1 = Math.round((h - h1) / 2)
  const top2 = Math.round((h - h2) / 2)
  const boardW = w1 + GAP + w2

  const board = await sharp({
    create: {
      width: boardW,
      height: h,
      channels: 3,
      background: { r: 235, g: 232, b: 227 },
    },
  })
    .composite([
      { input: bagPanel, left: 0, top: top1 },
      { input: cupPanel, left: w1 + GAP, top: top2 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer()

  const MAX_OUT_W = 2800
  const bm = await sharp(board).metadata()
  const bw = bm.width ?? 1
  const outBuf =
    bw > MAX_OUT_W
      ? await sharp(board).resize({ width: MAX_OUT_W, fit: 'inside' }).png({ compressionLevel: 9 }).toBuffer()
      : board

  await sharp(outBuf).toFile(outPath)

  const om = await sharp(outPath).metadata()
  console.log(
    'Wrote',
    path.relative(root, outPath),
    `(${om.width}×${om.height}, from Brum & Co. photo templates)`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
