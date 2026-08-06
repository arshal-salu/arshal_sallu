'use client'

/**
 * components/hero/neural-network.tsx
 *
 * Animated neural network visualization built with React Three Fiber.
 *
 * Architecture:
 *   • 80 nodes arranged in clustered layers (input → hidden → output)
 *   • Dynamic connecting edges drawn as <Line> primitives
 *   • Gentle autonomous floating motion via per-node phase offsets
 *   • Cursor proximity: nodes near the pointer pulse slightly brighter
 *   • useReducedMotion: freezes animation when user prefers it
 *   • Lazy loaded (ssr: false) — Three.js cannot run on the server
 *
 * Performance:
 *   • useMemo for node/edge geometry — only recomputes on count change
 *   • useRef for cursor position to avoid React state re-renders on mousemove
 *   • instancedMesh would be optimal for 200+ nodes; at 80 individual
 *     meshes are fine and easier to cursor-interact with
 *   • frameloop="demand" is NOT used here because the animation is
 *     continuous — but each frame is very cheap (no physics, no shadows)
 */

import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion }           from 'framer-motion'
import * as THREE                     from 'three'

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const NODE_COUNT      = 80
const EDGE_THRESHOLD  = 2.2   // max distance to draw an edge
const CURSOR_RADIUS   = 2.5   // proximity radius for cursor glow
const FLOAT_AMPLITUDE = 0.12  // max float displacement per node

/* ─── COLOUR PALETTE (matching design system) ───────────────── */
const COLOR_NODE_BASE    = new THREE.Color('#4f7ef7')   // --color-primary
const COLOR_NODE_ACTIVE  = new THREE.Color('#4f7ef7')   // --color-primary active
const COLOR_EDGE         = new THREE.Color('#3a5fc8')   // primary dimmed
const COLOR_EDGE_ACTIVE  = new THREE.Color('#4f7ef7')   // primary active

/* ─── TYPE DEFINITIONS ──────────────────────────────────────── */
interface Node {
  id:         number
  basePos:    THREE.Vector3
  phase:      number      // float phase offset (0–2π)
  speed:      number      // float speed multiplier
  size:       number      // sphere radius
  layerIndex: number      // 0=input 1=hidden 2=output
}

interface Edge {
  a: number   // node index
  b: number   // node index
}

/* ─── GEOMETRY GENERATION ───────────────────────────────────── */

/**
 * Generate nodes arranged in three soft clusters representing
 * input → hidden → output network layers.
 * Positions are randomised within layer bounding volumes so the
 * result looks organic rather than perfectly grid-aligned.
 */
function generateNodes(count: number): Node[] {
  const nodes: Node[] = []
  const layers = [
    { x: -3.5, count: Math.floor(count * 0.28) },
    { x:  0,   count: Math.floor(count * 0.44) },
    { x:  3.5, count: count - Math.floor(count * 0.28) - Math.floor(count * 0.44) },
  ]

  let id = 0
  layers.forEach(({ x, count: lc }, layerIndex) => {
    for (let i = 0; i < lc; i++) {
      // Spread within the layer column with some x jitter
      const spread  = 2.8
      const xJitter = (Math.random() - 0.5) * 0.9
      const y       = (Math.random() - 0.5) * spread * 2
      const z       = (Math.random() - 0.5) * spread * 0.7

      nodes.push({
        id,
        basePos:    new THREE.Vector3(x + xJitter, y, z),
        phase:      Math.random() * Math.PI * 2,
        speed:      0.3 + Math.random() * 0.5,
        size:       0.045 + Math.random() * 0.055,
        layerIndex,
      })
      id++
    }
  })

  return nodes
}

/**
 * Generate edges — only connect nodes within EDGE_THRESHOLD distance
 * and bias toward cross-layer connections.
 */
function generateEdges(nodes: Node[]): Edge[] {
  const edges: Edge[] = []

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].basePos.distanceTo(nodes[j].basePos)
      if (dist > EDGE_THRESHOLD) continue

      // Favour cross-layer connections; limit same-layer connections
      const sameLayer = nodes[i].layerIndex === nodes[j].layerIndex
      if (sameLayer && Math.random() > 0.25) continue
      if (!sameLayer && Math.random() > 0.45) continue

      edges.push({ a: i, b: j })
    }
  }

  return edges
}

/* ─── CURSOR POSITION TRACKER ────────────────────────────────── */
// Stored outside React to avoid setState on every mousemove.
const cursorNDC = new THREE.Vector2(999, 999)   // start offscreen

/* ─── SINGLE NODE MESH ───────────────────────────────────────── */
interface NodeMeshProps {
  node:       Node
  cursorWorld: React.MutableRefObject<THREE.Vector3>
  reduced:    boolean
}

function NodeMesh({ node, cursorWorld, reduced }: NodeMeshProps) {
  const ref   = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!ref.current || !matRef.current) return
    const t = clock.getElapsedTime()

    // Floating motion
    if (!reduced) {
      const offsetY = Math.sin(t * node.speed + node.phase) * FLOAT_AMPLITUDE
      const offsetX = Math.cos(t * node.speed * 0.6 + node.phase) * FLOAT_AMPLITUDE * 0.4
      ref.current.position.set(
        node.basePos.x + offsetX,
        node.basePos.y + offsetY,
        node.basePos.z,
      )
    } else {
      ref.current.position.copy(node.basePos)
    }

    // Cursor proximity glow
    const dist = ref.current.position.distanceTo(cursorWorld.current)
    const t2   = Math.max(0, 1 - dist / CURSOR_RADIUS)
    matRef.current.color.lerpColors(COLOR_NODE_BASE, COLOR_NODE_ACTIVE, t2)

    // Gentle pulse opacity
    const pulse = reduced ? 0.75 : 0.55 + 0.2 * Math.sin(t * node.speed + node.phase)
    matRef.current.opacity = pulse + t2 * 0.4
  })

  return (
    <mesh ref={ref} position={node.basePos.toArray()}>
      <sphereGeometry args={[node.size, 8, 8]} />
      <meshBasicMaterial
        ref={matRef}
        color={COLOR_NODE_BASE}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

/* ─── SINGLE EDGE LINE ───────────────────────────────────────── */
interface EdgeLineProps {
  nodeA:      Node
  nodeB:      Node
  posA:       React.MutableRefObject<THREE.Vector3>
  posB:       React.MutableRefObject<THREE.Vector3>
  cursorWorld: React.MutableRefObject<THREE.Vector3>
  reduced:    boolean
}

/**
 * Draws a line segment between two nodes using a BufferGeometry.
 * Entirely imperative — avoids R3F JSX bufferAttribute type issues.
 * The THREE.Line and its geometry/material are created once via useMemo.
 */
function EdgeLine({ nodeA, nodeB, posA, posB, cursorWorld, reduced }: EdgeLineProps) {
  // Pre-allocated — created once, never reallocated per frame
  const midVec = useMemo(() => new THREE.Vector3(), [])

  const { line, mat, posAttr } = useMemo(() => {
    const positions = new Float32Array(6)   // 2 vertices × 3 components
    const geom      = new THREE.BufferGeometry()
    const attr      = new THREE.BufferAttribute(positions, 3)
    geom.setAttribute('position', attr)

    const material = new THREE.LineBasicMaterial({
      color:       COLOR_EDGE,
      transparent: true,
      opacity:     0.08,
      linewidth:   1,
    })

    return { line: new THREE.Line(geom, material), mat: material, posAttr: attr }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime()
    const arr = posAttr.array as Float32Array

    const applyFloat = (node: Node, base: THREE.Vector3, out: THREE.Vector3) => {
      if (reduced) { out.copy(base); return }
      const oy = Math.sin(t * node.speed + node.phase) * FLOAT_AMPLITUDE
      const ox = Math.cos(t * node.speed * 0.6 + node.phase) * FLOAT_AMPLITUDE * 0.4
      out.set(base.x + ox, base.y + oy, base.z)
    }

    applyFloat(nodeA, nodeA.basePos, posA.current)
    applyFloat(nodeB, nodeB.basePos, posB.current)

    arr[0] = posA.current.x; arr[1] = posA.current.y; arr[2] = posA.current.z
    arr[3] = posB.current.x; arr[4] = posB.current.y; arr[5] = posB.current.z
    posAttr.needsUpdate = true

    midVec.set(
      (posA.current.x + posB.current.x) / 2,
      (posA.current.y + posB.current.y) / 2,
      (posA.current.z + posB.current.z) / 2,
    )
    const dist = midVec.distanceTo(cursorWorld.current)
    const t2   = Math.max(0, 1 - dist / CURSOR_RADIUS)

    mat.color.lerpColors(COLOR_EDGE, COLOR_EDGE_ACTIVE, t2)
    mat.opacity = 0.08 + t2 * 0.25
  })

  return <primitive object={line} />
}

/* ─── CURSOR WORLD POSITION ──────────────────────────────────── */
/**
 * Converts NDC mouse position to world space at z=0.
 * Updates a shared ref on every frame (no React state).
 */
function CursorTracker({
  cursorWorld,
}: {
  cursorWorld: React.MutableRefObject<THREE.Vector3>
}) {
  const { camera } = useThree()
  const raycaster  = useMemo(() => new THREE.Raycaster(), [])
  const plane      = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const target     = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    raycaster.setFromCamera(cursorNDC, camera)
    raycaster.ray.intersectPlane(plane, target)
    if (target) cursorWorld.current.copy(target)
  })

  return null
}

/* ─── SCENE CONTENT ─────────────────────────────────────────── */
function Scene({ reduced }: { reduced: boolean }) {
  const cursorWorld = useRef(new THREE.Vector3(999, 999, 0))

  // Memoize geometry — only generates once
  const nodes = useMemo(() => generateNodes(NODE_COUNT), [])
  const edges = useMemo(() => generateEdges(nodes), [nodes])

  // Per-edge position refs shared between NodeMesh and EdgeLine
  const posRefs = useMemo(
    () => nodes.map(() => ({ ref: { current: new THREE.Vector3() } })),
    [nodes]
  )

  return (
    <>
      <CursorTracker cursorWorld={cursorWorld} />

      {/* Edges rendered first (behind nodes) */}
      {edges.map((edge, i) => (
        <EdgeLine
          key={i}
          nodeA={nodes[edge.a]}
          nodeB={nodes[edge.b]}
          posA={posRefs[edge.a].ref}
          posB={posRefs[edge.b].ref}
          cursorWorld={cursorWorld}
          reduced={reduced}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <NodeMesh
          key={node.id}
          node={node}
          cursorWorld={cursorWorld}
          reduced={reduced}
        />
      ))}
    </>
  )
}

/* ─── CANVAS WRAPPER ─────────────────────────────────────────── */
interface NeuralNetworkProps {
  className?: string
}

export function NeuralNetwork({ className }: NeuralNetworkProps) {
  const reduced = useReducedMotion() ?? false

  // Update NDC cursor on mousemove over the canvas element
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    cursorNDC.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
    cursorNDC.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
  }, [])

  const handleMouseLeave = useCallback(() => {
    cursorNDC.set(999, 999)
  }, [])

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{
          antialias:              true,
          alpha:                  true,
          powerPreference:        'high-performance',
          preserveDrawingBuffer:  false,
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  )
}
