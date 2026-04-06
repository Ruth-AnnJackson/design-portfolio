/**
 * Photo-only apparel board: three photorealistic tee mockups with NOVA artwork
 * composited (Ignite shirt photos in-repo + neutral tee template). No vector garments.
 * Run: npm run mockups:nova-apparel
 */
import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const novaDir = path.join(root, 'public/assets/logo-design/nova-street')
const igniteDir = path.join(root, 'public/assets/flyers-events/ignite-conference')
const outPath = path.join(novaDir, 'nova-apparel-mockup.png')

const TEE_FRONT = path.join(igniteDir, 'ignite-conference-tshirt-front-mockup.png')
const TEE_BACK = path.join(igniteDir, 'ignite-conference-tshirt-back-mockup.png')
const TEE_NEUTRAL = path.join(novaDir, 'tee-photo-template-front.png')

const LOGO_MAIN = path.join(novaDir, 'NOVA01-01_logo.png')
const LOGO_MARK = path.join(novaDir, 'NOVA01-02_mark.png')

const PANEL_H = 1600
const GAP = 36
const MAX_OUT_W = 2800
const LABEL_BLUR = 36

async function obscureAndLogo(imagePath, logoPath, rel, logoMaxW, blend = 'over') {
  const meta = await sharp(imagePath).metadata()
  const iw = meta.width ?? 1
  const ih = meta.height ?? 1
  const left = Math.round(rel.rx * iw)
  const top = Math.round(rel.ry * ih)
  const width = Math.round(rel.rw * iw)
  const height = Math.round(rel.rh * ih)

  const patch = await sharp(imagePath).extract({ left, top, width, height }).blur(LABEL_BLUR).toBuffer()
  const obscured = await sharp(imagePath).composite([{ input: patch, left, top }]).png().toBuffer()

  const scaled = await sharp(obscured).resize({ height: PANEL_H, fit: 'inside' }).png().toBuffer()
  const sh = (await sharp(scaled).metadata()).height ?? 1
  const scale = sh / ih

  const lx = Math.round(left * scale)
  const ly = Math.round(top * scale)
  const lw = Math.round(width * scale)
  const lh = Math.round(height * scale)

  const trimmed = await sharp(logoPath).trim({ threshold: 12 }).png().toBuffer()
  const logoW = Math.min(logoMaxW, Math.round(lw * 0.8))
  const logoBuf = await sharp(trimmed).resize({ width: logoW, fit: 'inside' }).png().toBuffer()
  const lm = await sharp(logoBuf).metadata()
  const lw_ = lm.width ?? 1
  const lh_ = lm.height ?? 1
  const logoLeft = Math.round(lx + (lw - lw_) / 2)
  const logoTop = Math.round(ly + (lh - lh_) / 2)

  return sharp(scaled).composite([{ input: logoBuf, left: logoLeft, top: logoTop, blend }]).png().toBuffer()
}

async function main() {
  await mkdir(novaDir, { recursive: true })

  const leftPanel = await obscureAndLogo(
    TEE_FRONT,
    LOGO_MAIN,
    { rx: 0.12, ry: 0.16, rw: 0.76, rh: 0.58 },
    480,
    'over',
  )
  const centerPanel = await obscureAndLogo(
    TEE_NEUTRAL,
    LOGO_MAIN,
    { rx: 0.1, ry: 0.12, rw: 0.8, rh: 0.72 },
    440,
    'over',
  )
  const rightPanel = await obscureAndLogo(
    TEE_BACK,
    LOGO_MARK,
    { rx: 0.26, ry: 0.14, rw: 0.48, rh: 0.46 },
    280,
    'over',
  )

  const m1 = await sharp(leftPanel).metadata()
  const m2 = await sharp(centerPanel).metadata()
  const m3 = await sharp(rightPanel).metadata()
  const w1 = m1.width ?? 0
  const w2 = m2.width ?? 0
  const w3 = m3.width ?? 0
  const h1 = m1.height ?? 0
  const h2 = m2.height ?? 0
  const h3 = m3.height ?? 0
  const h = Math.max(h1, h2, h3)
  const t1 = Math.round((h - h1) / 2)
  const t2 = Math.round((h - h2) / 2)
  const t3 = Math.round((h - h3) / 2)
  const boardW = w1 + GAP + w2 + GAP + w3

  let board = await sharp({
    create: {
      width: boardW,
      height: h,
      channels: 3,
      background: { r: 228, g: 226, b: 222 },
    },
  })
    .composite([
      { input: leftPanel, left: 0, top: t1 },
      { input: centerPanel, left: w1 + GAP, top: t2 },
      { input: rightPanel, left: w1 + GAP + w2 + GAP, top: t3 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer()

  const bw = (await sharp(board).metadata()).width ?? 1
  if (bw > MAX_OUT_W) {
    board = await sharp(board).resize({ width: MAX_OUT_W, fit: 'inside' }).png({ compressionLevel: 9 }).toBuffer()
  }

  await sharp(board).toFile(outPath)
  const om = await sharp(outPath).metadata()
  console.log('Wrote', path.relative(root, outPath), `(${om.width}×${om.height})`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
