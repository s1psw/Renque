<template>
  <!-- 鼠标拖尾特效 Canvas -->
  <canvas
    ref="trailCanvas"
    class="mouse-trail-canvas"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const trailCanvas = ref(null)
let points = []
const MAX_AGE = 66
let animationId = null
let lastAdd = 0

function resize(canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function draw(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const now = performance.now()
  points = points.filter(p => now - p.timestamp < MAX_AGE)

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]
    const age = now - p1.timestamp
    const alpha = Math.min(1, Math.max(0, 1 - age / MAX_AGE)) * 0.8 + 0.2

    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    // ctx.strokeStyle = `rgba(255, 51, 102, ${alpha})`
    ctx.lineWidth = 1.0
    ctx.lineCap = 'round'
    ctx.stroke()
    // 在 draw() 函数的循环内，为每段线段创建渐变
const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
gradient.addColorStop(0, 'rgba(255, 182, 193, 1)');   // 起点：粉红
gradient.addColorStop(1, 'rgba(200, 100, 255, 1)');   // 终点：淡紫色
ctx.strokeStyle = gradient;
  }

  animationId = requestAnimationFrame(() => draw(canvas, ctx))
}

function handleMouseMove(e) {
  const now = performance.now()
  if (now - lastAdd < 6) return
  lastAdd = now
  points.push({ x: e.clientX, y: e.clientY, timestamp: now })
  if (points.length > 500) points = points.slice(-400)
}

function handleMouseLeave() {
  points = []
}

onMounted(() => {
  const canvas = trailCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  resize(canvas)

  window.addEventListener('resize', () => resize(canvas))
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)

  animationId = requestAnimationFrame(() => draw(canvas, ctx))
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', () => resize(trailCanvas.value))
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.mouse-trail-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}
</style>
