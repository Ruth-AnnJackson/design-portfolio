/**
 * Smartphone + IG-style in-feed framing. `mockup-social-carousel.png` matches a classic
 * “carousel strip” concept: five equal 4:5 tiles in one row (2 + phone + 2), aligned on
 * the same baseline, gaps between tiles and screen, phone layered on top. Run: npm run mockups:hospice-social
 */
import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'public/assets/branding/unity-hospice')
const outDir = path.join(srcDir, 'mockups')

/** Scale from a 1000px-tall reference device — larger = phone dominates the frame. */
const REF_PHONE_H = 1000
const SCALE = 1.92

const PHONE_H = Math.round(REF_PHONE_H * SCALE)
const PHONE_W = Math.round(492 * SCALE)
const PHONE_RX = Math.round(62 * SCALE)

const BEZEL_X = Math.round(12 * SCALE)
const BEZEL_TOP = Math.round(54 * SCALE)
const BEZEL_BOT = Math.round(28 * SCALE)

const screenW = PHONE_W - BEZEL_X * 2
const screenH = PHONE_H - BEZEL_TOP - BEZEL_BOT
const SCREEN_RX = Math.round(44 * SCALE)

/** Tight margins so the device reads “close” / hero-sized */
const MARGIN_X = 56
const MARGIN_Y = 56
const CANVAS_W = PHONE_W + MARGIN_X * 2
const CANVAS_H = PHONE_H + MARGIN_Y * 2

const USER_HANDLE = 'unity_hospice'

function phoneLeft(canvasW = CANVAS_W) {
  return Math.round((canvasW - PHONE_W) / 2)
}
function phoneTop() {
  return Math.round((CANVAS_H - PHONE_H) / 2) - 6
}

/** Studio backdrop + soft vignette */
async function studioBackgroundPng(canvasW = CANVAS_W, variant = 'cool') {
  const warm = Buffer.from(
    `<svg width="${canvasW}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f7f3eb"/>
          <stop offset="50%" stop-color="#f2ede4"/>
          <stop offset="100%" stop-color="#ebe4d8"/>
        </linearGradient>
        <radialGradient id="vin" cx="50%" cy="45%" r="75%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.04"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#vin)"/>
    </svg>`,
  )
  const cool = Buffer.from(
    `<svg width="${canvasW}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#eef0f4"/>
          <stop offset="55%" stop-color="#e4e7ee"/>
          <stop offset="100%" stop-color="#d8dce5"/>
        </linearGradient>
        <radialGradient id="vin" cx="50%" cy="42%" r="68%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.07"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#vin)"/>
    </svg>`,
  )
  return sharp(variant === 'warm' ? warm : cool).png().toBuffer()
}

/** Layered contact + ambient shadow (scales with phone size) */
async function floorShadowPng(canvasW = CANVAS_W) {
  const cx = canvasW / 2
  const baseY = phoneTop() + PHONE_H - 4
  const rw = PHONE_W / 492
  const rh = PHONE_H / 1000
  const b1 = Math.round(52 * SCALE)
  const b2 = Math.round(28 * SCALE)
  const b3 = Math.round(14 * SCALE)
  const svg = Buffer.from(
    `<svg width="${canvasW}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="b1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${b1}"/>
        </filter>
        <filter id="b2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${b2}"/>
        </filter>
        <filter id="b3" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${b3}"/>
        </filter>
      </defs>
      <ellipse cx="${cx}" cy="${baseY}" rx="${Math.round(380 * rw)}" ry="${Math.round(64 * rh)}" fill="#1a1622" opacity="0.22" filter="url(#b1)"/>
      <ellipse cx="${cx}" cy="${baseY}" rx="${Math.round(260 * rw)}" ry="${Math.round(46 * rh)}" fill="#0a090c" opacity="0.38" filter="url(#b2)"/>
      <ellipse cx="${cx + Math.round(6 * SCALE)}" cy="${baseY + Math.round(6 * rh)}" rx="${Math.round(140 * rw)}" ry="${Math.round(24 * rh)}" fill="#050508" opacity="0.45" filter="url(#b3)"/>
    </svg>`,
  )
  return sharp(svg).png().toBuffer()
}

/** Device shell: gradient fill, island, side keys (positions scale with device) */
async function phoneShellPng(canvasW = CANVAS_W) {
  const L = phoneLeft(canvasW)
  const T = phoneTop()
  const k = PHONE_H / REF_PHONE_H
  const bw = Math.max(3, Math.round(4 * k))
  const bx = Math.round(3 * k)
  const y1 = Math.round(168 * k)
  const h1 = Math.round(64 * k)
  const y2 = Math.round(248 * k)
  const h2 = Math.round(92 * k)
  const y3 = Math.round(352 * k)
  const h3 = Math.round(92 * k)
  const yPow = Math.round(268 * k)
  const hPow = Math.round(112 * k)
  const sheenH = Math.round(168 * k)
  const stroke = Math.max(2, Math.round(2.5 * k))
  const islW = Math.round(124 * k)
  const islH = Math.round(34 * k)
  const islRx = Math.round(17 * k)
  const islInW = Math.round(116 * k)
  const islInH = Math.round(30 * k)
  const islInRx = Math.round(15 * k)
  const islY = Math.round(20 * k)
  const islInY = Math.round(22 * k)
  const homeW = Math.round(104 * k)
  const homeH = Math.max(4, Math.round(5 * k))
  const homeRx = homeH / 2
  const homeY = PHONE_H - Math.round(22 * k)
  const svg = Buffer.from(
    `<svg width="${canvasW}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metal" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stop-color="#6a6a78"/>
          <stop offset="22%" stop-color="#3d3d46"/>
          <stop offset="55%" stop-color="#1c1c22"/>
          <stop offset="100%" stop-color="#08080b"/>
        </linearGradient>
        <linearGradient id="rim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#9a9aaa" stop-opacity="0.5"/>
          <stop offset="12%" stop-color="#4a4a55" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#0a0a0c" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="topSheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
          <stop offset="8%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="${L - bx}" y="${T + y1}" width="${bw}" height="${h1}" rx="2" fill="#1f1f24"/>
      <rect x="${L - bx}" y="${T + y2}" width="${bw}" height="${h2}" rx="2" fill="#1f1f24"/>
      <rect x="${L - bx}" y="${T + y3}" width="${bw}" height="${h3}" rx="2" fill="#1f1f24"/>
      <rect x="${L + PHONE_W - 1}" y="${T + yPow}" width="${bw}" height="${hPow}" rx="2" fill="#1f1f24"/>
      <rect x="${L}" y="${T}" width="${PHONE_W}" height="${PHONE_H}" rx="${PHONE_RX}" ry="${PHONE_RX}" fill="url(#metal)"/>
      <rect x="${L}" y="${T}" width="${PHONE_W}" height="${sheenH}" rx="${PHONE_RX}" fill="url(#topSheen)"/>
      <rect x="${L}" y="${T}" width="${PHONE_W}" height="${PHONE_H}" rx="${PHONE_RX}" ry="${PHONE_RX}" fill="none" stroke="url(#rim)" stroke-width="${stroke}" opacity="0.95"/>
      <rect x="${L + PHONE_W / 2 - islW / 2}" y="${T + islY}" width="${islW}" height="${islH}" rx="${islRx}" fill="#050508"/>
      <rect x="${L + PHONE_W / 2 - islInW / 2}" y="${T + islInY}" width="${islInW}" height="${islInH}" rx="${islInRx}" fill="#0a0a0d"/>
      <rect x="${L + PHONE_W / 2 - homeW / 2}" y="${T + homeY}" width="${homeW}" height="${homeH}" rx="${homeRx}" fill="#ffffff" opacity="0.12"/>
    </svg>`,
  )
  return sharp(svg).png().toBuffer()
}

async function applyRoundedMask(buf, w, h, rx) {
  const maskSvg = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="white"/>
    </svg>`,
  )
  return sharp(buf)
    .ensureAlpha()
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

/** Inner glass: subtle top sheen (screen) + edge falloff (multiply) */
async function addScreenDepth(screenBuf) {
  const W = screenW
  const H = screenH
  const rx = SCREEN_RX
  const specSvg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.11"/>
          <stop offset="0.14" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" rx="${rx}" fill="url(#top)"/>
    </svg>`,
  )
  const vinSvg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vin" cx="50%" cy="46%" r="72%">
          <stop offset="0.76" stop-color="#000000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000000" stop-opacity="0.32"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" rx="${rx}" fill="url(#vin)"/>
    </svg>`,
  )
  const specPng = await sharp(specSvg).png().toBuffer()
  const vinPng = await sharp(vinSvg).png().toBuffer()
  return sharp(screenBuf)
    .composite([
      { input: specPng, blend: 'screen' },
      { input: vinPng, blend: 'multiply' },
    ])
    .png()
    .toBuffer()
}

/** In-feed media slot: 4:5 portrait (Instagram-style), clamped to available screen height. */
function feedMediaLayout() {
  const W = screenW
  const H = screenH
  const u = PHONE_H / REF_PHONE_H
  const fs = (n) => Math.max(1, Math.round(n * u))
  const statusH = fs(44)
  const postHeadH = fs(52)
  const actionH = fs(50)
  const metaH = fs(52)
  const minBlack = fs(48)
  let mediaH = Math.round((W * 5) / 4)
  const needed = statusH + postHeadH + mediaH + actionH + metaH + minBlack
  if (needed > H) {
    mediaH = Math.max(fs(240), H - statusH - postHeadH - actionH - metaH - minBlack)
  }
  return { statusH, postHeadH, actionH, metaH, mediaW: W, mediaH, fs, u }
}

/** Status bar + post header + media + action row + caption strip (IG-style, scales with phone) */
async function buildFeedScreen(imageBuffer, options = {}) {
  const { precomposedMedia, captionTspan = ' Compassionate care, every day.' } = options
  const W = screenW
  const H = screenH
  const { statusH, postHeadH, actionH, metaH, mediaW, mediaH, fs } = feedMediaLayout()

  let imgBuf
  if (precomposedMedia) {
    const m = await sharp(precomposedMedia).metadata()
    if (m.width === mediaW && m.height === mediaH) {
      imgBuf = precomposedMedia
    } else {
      imgBuf = await sharp(precomposedMedia)
        .resize(mediaW, mediaH, { fit: 'cover', position: 'centre' })
        .png()
        .toBuffer()
    }
  } else {
    imgBuf = await sharp(imageBuffer)
      .resize(mediaW, mediaH, { fit: 'cover', position: 'centre' })
      .png()
      .toBuffer()
  }

  const cx = fs(30)
  const avR = fs(17)
  const avRi = fs(16)
  const headerSvg = Buffer.from(
    `<svg width="${W}" height="${statusH + postHeadH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${statusH + postHeadH}" fill="#000000"/>
      <text x="${fs(28)}" y="${fs(29)}" fill="#ffffff" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${fs(16)}" font-weight="600">9:41</text>
      <rect x="${W - fs(78)}" y="${fs(16)}" width="${fs(18)}" height="${fs(11)}" rx="2" stroke="#ffffff" stroke-opacity="0.85" stroke-width="${Math.max(1, fs(1.2))}" fill="none"/>
      <rect x="${W - fs(54)}" y="${fs(19)}" width="${fs(22)}" height="${fs(7)}" rx="1.5" fill="#ffffff" fill-opacity="0.9"/>
      <circle cx="${W - fs(98)}" cy="${fs(24)}" r="${fs(2.5)}" fill="#ffffff" fill-opacity="0.9"/>
      <circle cx="${W - fs(90)}" cy="${fs(24)}" r="${fs(2.5)}" fill="#ffffff" fill-opacity="0.9"/>
      <circle cx="${W - fs(82)}" cy="${fs(24)}" r="${fs(2.5)}" fill="#ffffff" fill-opacity="0.9"/>
      <circle cx="${cx}" cy="${statusH + fs(26)}" r="${avR}" fill="#1f1f1f"/>
      <circle cx="${cx}" cy="${statusH + fs(26)}" r="${avRi}" stroke="#333333" stroke-width="1" fill="none"/>
      <text x="${fs(56)}" y="${statusH + fs(31)}" fill="#ffffff" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${fs(15)}" font-weight="600">${escapeXml(USER_HANDLE)}</text>
      <text x="${W - fs(36)}" y="${statusH + fs(30)}" fill="#ffffff" font-family="system-ui, sans-serif" font-size="${fs(20)}" font-weight="700">⋯</text>
    </svg>`,
  )
  const headerPng = await sharp(headerSvg).png().toBuffer()

  const actionY = statusH + postHeadH + mediaH
  const sw = Math.max(2, fs(2))
  const footerSvg = Buffer.from(
    `<svg width="${W}" height="${actionH + metaH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${actionH + metaH}" fill="#000000"/>
      <text x="${fs(14)}" y="${fs(36)}" fill="#ffffff" font-size="${fs(22)}">♡</text>
      <rect x="${fs(48)}" y="${fs(20)}" width="${fs(24)}" height="${fs(20)}" rx="4" fill="none" stroke="#ffffff" stroke-width="${sw}"/>
      <path d="M${fs(52)} ${fs(32)} L${fs(60)} ${fs(38)} L${fs(68)} ${fs(32)}" fill="none" stroke="#ffffff" stroke-width="${sw}"/>
      <path d="M${fs(92)} ${fs(22)} L${fs(116)} ${fs(34)} L${fs(92)} ${fs(46)} Z" fill="none" stroke="#ffffff" stroke-width="${sw}" stroke-linejoin="round"/>
      <line x1="${fs(116)}" y1="${fs(34)}" x2="${fs(100)}" y2="${fs(34)}" stroke="#ffffff" stroke-width="${sw}"/>
      <path d="M ${W - fs(30)} ${fs(18)} v ${fs(28)} l ${-fs(11)} ${-fs(9)} l ${-fs(11)} ${fs(9)} V ${fs(18)} z" fill="none" stroke="#ffffff" stroke-width="${sw}" stroke-linejoin="round"/>
      <line x1="1" y1="${actionH}" x2="${W - 1}" y2="${actionH}" stroke="#262626" stroke-width="1"/>
      <text x="${fs(16)}" y="${actionH + fs(30)}" fill="#a8a8a8" font-family="system-ui, -apple-system, sans-serif" font-size="${fs(12)}" font-weight="500">Liked by community_health and others</text>
      <text x="${fs(16)}" y="${actionH + fs(48)}" fill="#e8e8e8" font-family="system-ui, -apple-system, sans-serif" font-size="${fs(12)}">
        <tspan fill="#ffffff" font-weight="600">${escapeXml(USER_HANDLE)}</tspan><tspan>${escapeXml(captionTspan)}</tspan>
      </text>
    </svg>`,
  )
  const footerPng = await sharp(footerSvg).png().toBuffer()

  const base = sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: '#000000',
    },
  })

  const composed = await base
    .composite([
      { input: headerPng, left: 0, top: 0 },
      { input: imgBuf, left: 0, top: statusH + postHeadH },
      { input: footerPng, left: 0, top: actionY },
    ])
    .png()
    .toBuffer()

  const rounded = await applyRoundedMask(composed, W, H, SCREEN_RX)
  return addScreenDepth(rounded)
}

/**
 * One 4:5 strip tile (same size as in-feed media), rounded corners + soft drop shadow.
 * Used for slides 1–2 and 4–5 beside the phone.
 */
async function stripTileWithShadow(imageBuffer, mediaW, mediaH) {
  const k = PHONE_H / REF_PHONE_H
  const cornerRx = Math.max(8, Math.round(Math.min(mediaW, mediaH) * 0.028))
  const face = await sharp(imageBuffer)
    .resize(mediaW, mediaH, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()
  const rounded = await applyRoundedMask(face, mediaW, mediaH, cornerRx)

  const pad = Math.round(Math.min(mediaW, mediaH) * 0.05)
  const drop = Math.round(mediaH * 0.035)
  const tw = mediaW + pad * 2
  const th = mediaH + pad + drop
  const cx = tw / 2
  const cy = mediaH + pad + Math.round(mediaH * 0.04)
  const rxEll = Math.round(mediaW * 0.38)
  const ryEll = Math.round(mediaH * 0.09)
  const blur = Math.max(5, Math.round(9 * k))
  const shadowSvg = Buffer.from(
    `<svg width="${tw}" height="${th}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="b" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${blur * 0.38}"/>
        </filter>
      </defs>
      <ellipse cx="${cx}" cy="${cy}" rx="${rxEll}" ry="${ryEll}" fill="#2a2418" opacity="0.22" filter="url(#b)"/>
    </svg>`,
  )
  const shadowPng = await sharp(shadowSvg).png().toBuffer()
  return sharp({
    create: {
      width: tw,
      height: th,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadowPng, left: 0, top: 0 },
      { input: rounded, left: pad, top: pad },
    ])
    .png()
    .toBuffer()
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Outer glass streak (template-style specular) */
async function screenGlossPng(left, top, canvasW = CANVAS_W) {
  const svg = Buffer.from(
    `<svg width="${canvasW}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/>
          <stop offset="35%" stop-color="#ffffff" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="${left}" y="${top}" width="${screenW}" height="${screenH}" rx="${SCREEN_RX}" fill="url(#g)"/>
    </svg>`,
  )
  return sharp(svg).png().toBuffer()
}

async function makeMockup(inputPath, outputPath, { maxInputWidth } = {}) {
  let pipeline = sharp(inputPath).ensureAlpha()
  if (maxInputWidth) {
    pipeline = pipeline.resize(maxInputWidth, maxInputWidth, {
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  const raw = await pipeline.png().toBuffer()

  const screenBuf = await buildFeedScreen(raw)
  const L = phoneLeft(CANVAS_W)
  const T = phoneTop()
  const sLeft = L + BEZEL_X
  const sTop = T + BEZEL_TOP

  const bgBuf = await studioBackgroundPng()
  const shadowBuf = await floorShadowPng()
  const shellBuf = await phoneShellPng()
  const glossBuf = await screenGlossPng(sLeft, sTop)

  await sharp(bgBuf)
    .composite([
      { input: shadowBuf, left: 0, top: 0 },
      { input: shellBuf, left: 0, top: 0 },
      { input: screenBuf, left: sLeft, top: sTop },
      { input: glossBuf, left: 0, top: 0, blend: 'over' },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath)

  console.log('Wrote', path.relative(root, outputPath))
}

async function makeCarouselMockup(jobSpecs, outputPath) {
  const buffers = []
  for (const job of jobSpecs) {
    const inputPath = path.join(srcDir, job.src)
    let pipeline = sharp(inputPath).ensureAlpha()
    if (job.maxInputWidth) {
      pipeline = pipeline.resize(job.maxInputWidth, job.maxInputWidth, {
        fit: 'inside',
        withoutEnlargement: true,
      })
    }
    buffers.push(await pipeline.png().toBuffer())
  }

  if (buffers.length !== 5) throw new Error('Hero social mockup expects exactly 5 slide images')

  const { mediaW, mediaH, statusH, postHeadH, u } = feedMediaLayout()
  const gap = Math.max(12, Math.round(16 * u))
  const Wstrip = 5 * mediaW + 4 * gap
  const pad = Math.round(Math.min(mediaW, mediaH) * 0.05)
  const wideW = Wstrip + 2 * MARGIN_X + pad * 2

  const T1 = MARGIN_X + pad
  const screenLeft = T1 + 2 * mediaW + 2 * gap
  const L = screenLeft - BEZEL_X
  const T = phoneTop()
  const sTop = T + BEZEL_TOP
  const mediaTop = sTop + statusH + postHeadH
  const sLeft = L + BEZEL_X

  const tile1 = await stripTileWithShadow(buffers[0], mediaW, mediaH)
  const tile2 = await stripTileWithShadow(buffers[1], mediaW, mediaH)
  const tile4 = await stripTileWithShadow(buffers[3], mediaW, mediaH)
  const tile5 = await stripTileWithShadow(buffers[4], mediaW, mediaH)

  const x1 = T1 - pad
  const x2 = T1 + mediaW + gap - pad
  const x4 = screenLeft + mediaW + gap - pad
  const x5 = screenLeft + 2 * mediaW + 2 * gap - pad
  const yTiles = mediaTop - pad

  const activeInFeed = await buildFeedScreen(buffers[2], {
    captionTspan: ' Carousel — swipe for the full story.',
  })

  const bgBuf = await studioBackgroundPng(wideW, 'warm')
  const shadowBuf = await floorShadowPng(wideW)
  const shellBuf = await phoneShellPng(wideW)
  const glossBuf = await screenGlossPng(sLeft, sTop, wideW)

  await sharp(bgBuf)
    .composite([
      { input: shadowBuf, left: 0, top: 0 },
      { input: tile1, left: x1, top: yTiles },
      { input: tile2, left: x2, top: yTiles },
      { input: tile4, left: x4, top: yTiles },
      { input: tile5, left: x5, top: yTiles },
      { input: shellBuf, left: 0, top: 0 },
      { input: activeInFeed, left: sLeft, top: sTop },
      { input: glossBuf, left: 0, top: 0, blend: 'over' },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath)

  console.log('Wrote', path.relative(root, outputPath))
}

await mkdir(outDir, { recursive: true })

const jobs = [
  {
    src: 'Social Media Campaign.png',
    out: 'mockup-social-01-overview.png',
    maxInputWidth: 1800,
  },
  { src: 'Social-Media-Campaign-2.png', out: 'mockup-social-02.png' },
  { src: 'Social-Media-Campaign-3.png', out: 'mockup-social-03.png' },
  { src: 'Social-Media-Campaign-4.png', out: 'mockup-social-04.png' },
  { src: 'Social-Media-Campaign-5.png', out: 'mockup-social-05.png' },
]

for (const job of jobs) {
  const inputPath = path.join(srcDir, job.src)
  const outputPath = path.join(outDir, job.out)
  await makeMockup(inputPath, outputPath, { maxInputWidth: job.maxInputWidth })
}

await makeCarouselMockup(
  [
    { src: 'Social Media Campaign.png', maxInputWidth: 1800 },
    { src: 'Social-Media-Campaign-2.png' },
    { src: 'Social-Media-Campaign-3.png' },
    { src: 'Social-Media-Campaign-4.png' },
    { src: 'Social-Media-Campaign-5.png' },
  ],
  path.join(outDir, 'mockup-social-carousel.png'),
)

console.log('Done.')
