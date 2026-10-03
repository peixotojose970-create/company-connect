import { useEffect, useRef } from "react";

export function HeroNMonolith() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Target and current mouse tilt
    let mouseX = 0;
    let mouseY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let isVisible = true;
    let isReducedMotion = false;
    let isTouch = false;

    // Check media queries
    if (typeof window !== "undefined") {
      isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    }

    // Geometry of the NEXORA "N" Monolith
    // We build 3 connected dimensional bars in 3D:
    // Left pillar, diagonal crossing bar, right pillar with bevels and metallic facet lines.
    type Point3D = [number, number, number];
    type Face = {
      pts: [number, number, number, number];
      normal?: Point3D;
      baseColor: string;
      reflect: boolean;
      cyanAccent?: boolean;
    };

    // Vertices of the 3D 'N' Monolith
    // Left column: x in [-70, -42], y in [-85, 85], z in [-18, 18]
    // Right column: x in [42, 70], y in [-85, 85], z in [-18, 18]
    // Diagonal beam connecting top-left [-42, -85, 12] to bottom-right [42, 85, -12]
    // Top-right accent fin extending from [42, -85] to [74, -85]
    const rawVertices: Point3D[] = [
      // 0..7 Left pillar
      [-70, -85, -16], // 0: L back top-left
      [-42, -85, -16], // 1: L back top-right
      [-42,  85, -16], // 2: L back btm-right
      [-70,  85, -16], // 3: L back btm-left
      [-70, -85,  16], // 4: L front top-left
      [-42, -85,  16], // 5: L front top-right
      [-42,  85,  16], // 6: L front btm-right
      [-70,  85,  16], // 7: L front btm-left

      // 8..15 Right pillar
      [ 42, -85, -16], // 8: R back top-left
      [ 70, -85, -16], // 9: R back top-right
      [ 70,  85, -16], // 10: R back btm-right
      [ 42,  85, -16], // 11: R back btm-left
      [ 42, -85,  16], // 12: R front top-left
      [ 70, -85,  16], // 13: R front top-right
      [ 70,  85,  16], // 14: R front btm-right
      [ 42,  85,  16], // 15: R front btm-left

      // 16..23 Diagonal Beam (sleek angled connector)
      [-42, -65, -12], // 16: D top-back-left
      [-26, -85, -12], // 17: D top-back-high
      [ 42,  65, -12], // 18: D btm-back-right
      [ 26,  85, -12], // 19: D btm-back-low
      [-42, -65,  12], // 20: D top-front-left
      [-26, -85,  12], // 21: D top-front-high
      [ 42,  65,  12], // 22: D btm-front-right
      [ 26,  85,  12], // 23: D btm-front-low

      // 24..27 Cyan Accent Fin on top-right (characteristic of NEXORA logo)
      [ 50, -89,  -6], // 24
      [ 78, -89,  -6], // 25
      [ 78, -89,   6], // 26
      [ 50, -89,   6], // 27
    ];

    const faces: Face[] = [
      // Left pillar front, back, sides
      { pts: [4, 5, 6, 7], baseColor: "#151b27", reflect: true },
      { pts: [1, 0, 3, 2], baseColor: "#0a0e16", reflect: false },
      { pts: [0, 4, 7, 3], baseColor: "#10141f", reflect: false },
      { pts: [5, 1, 2, 6], baseColor: "#1c2538", reflect: true },
      { pts: [0, 1, 5, 4], baseColor: "#ffffff", reflect: true }, // top cap polished white/silver
      { pts: [7, 6, 2, 3], baseColor: "#080b12", reflect: false },

      // Right pillar front, back, sides
      { pts: [12, 13, 14, 15], baseColor: "#171e2c", reflect: true },
      { pts: [9, 8, 11, 10], baseColor: "#0a0e16", reflect: false },
      { pts: [8, 12, 15, 11], baseColor: "#111722", reflect: false },
      { pts: [13, 9, 10, 14], baseColor: "#1d263a", reflect: true },
      { pts: [8, 9, 13, 12], baseColor: "#ffffff", reflect: true }, // top cap polished white/silver
      { pts: [15, 14, 10, 11], baseColor: "#080b12", reflect: false },

      // Diagonal beam
      { pts: [20, 21, 22, 23], baseColor: "#182030", reflect: true },
      { pts: [17, 16, 19, 18], baseColor: "#0b0f17", reflect: false },
      { pts: [16, 20, 23, 19], baseColor: "#0e131d", reflect: false },
      { pts: [21, 17, 18, 22], baseColor: "#1f2a3f", reflect: true },

      // Accent fin (NEXORA Cyan)
      { pts: [24, 25, 26, 27], baseColor: "#00e5ff", reflect: true, cyanAccent: true },
    ];

    // Resize observer
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);

    // Mouse movement listener (subtle 3D interaction)
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseX = Math.max(-1, Math.min(1, x));
      mouseY = Math.max(-1, Math.min(1, y));
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Intersection observer to pause rendering when not in view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    let angle = -0.3; // initial gentle isometric angle

    const render = (time: number) => {
      if (!isVisible || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tilt interpolation
      currentTiltX += (mouseX * 0.28 - currentTiltX) * 0.06;
      currentTiltY += (mouseY * 0.22 - currentTiltY) * 0.06;

      // Slow elegant continuous rotation
      if (!isReducedMotion) {
        angle += isTouch ? 0.003 : 0.0045;
      }

      const rotY = angle + currentTiltX;
      const rotX = -0.16 + currentTiltY * 0.5; // gentle downward look
      const rotZ = 0.04;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // Project vertices
      // Center of canvas
      const cx = width / 2;
      const cy = height / 2 - 8;
      const scale = Math.min(width, height) * 0.0028;

      const projPts: Array<{ x: number; y: number; z: number }> = [];

      for (let i = 0; i < rawVertices.length; i++) {
        const [vx, vy, vz] = rawVertices[i];

        // Rotation Y
        let x1 = vx * cosY + vz * sinY;
        let y1 = vy;
        let z1 = -vx * sinY + vz * cosY;

        // Rotation X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotation Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        // Camera perspective
        const fov = 420;
        const cameraZ = 340;
        const pz = z3 + cameraZ;
        const factor = fov / Math.max(pz, 80);

        projPts.push({
          x: cx + x3 * scale * factor,
          y: cy + y3 * scale * factor,
          z: z3,
        });
      }

      // Dynamic cinematic floor shadow
      const shadowGrad = ctx.createRadialGradient(
        cx + currentTiltX * 30,
        cy + 135,
        15,
        cx + currentTiltX * 30,
        cy + 135,
        130
      );
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
      shadowGrad.addColorStop(0.4, "rgba(0, 50, 120, 0.25)");
      shadowGrad.addColorStop(1, "transparent");

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx + currentTiltX * 30, cy + 135, 140, 38, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();
      ctx.restore();

      // Ambient cyan core backlight
      const glowGrad = ctx.createRadialGradient(
        cx - 20,
        cy - 10,
        20,
        cx - 20,
        cy - 10,
        180
      );
      glowGrad.addColorStop(0, "rgba(0, 229, 255, 0.2)");
      glowGrad.addColorStop(0.5, "rgba(0, 102, 255, 0.12)");
      glowGrad.addColorStop(1, "transparent");

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx - 20, cy - 10, 180, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();
      ctx.restore();

      // Sort faces by depth (Painter's algorithm)
      const sortedFaces = faces.map((face, index) => {
        let avgZ = 0;
        for (let p = 0; p < 4; p++) {
          avgZ += projPts[face.pts[p]].z;
        }
        avgZ /= 4;
        return { face, index, avgZ };
      });

      sortedFaces.sort((a, b) => a.avgZ - b.avgZ);

      // Light direction: top-left-front [ -0.5, -0.8, 0.7 ]
      const lx = -0.45;
      const ly = -0.75;
      const lz = 0.5;
      const lightLen = Math.hypot(lx, ly, lz);
      const nlx = lx / lightLen;
      const nly = ly / lightLen;
      const nlz = lz / lightLen;

      // Draw each face
      for (const { face } of sortedFaces) {
        const p0 = projPts[face.pts[0]];
        const p1 = projPts[face.pts[1]];
        const p2 = projPts[face.pts[2]];
        const p3 = projPts[face.pts[3]];

        // Calculate surface normal in screen space to cull back faces (optional)
        const v1x = p1.x - p0.x;
        const v1y = p1.y - p0.y;
        const v2x = p2.x - p0.x;
        const v2y = p2.y - p0.y;
        const cross = v1x * v2y - v1y * v2x;

        if (cross <= 0 && !face.cyanAccent) {
          // Back-facing
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        if (face.cyanAccent) {
          // Electric Cyan accent fin with self-luminescence
          const cyanGrad = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
          cyanGrad.addColorStop(0, "#00e5ff");
          cyanGrad.addColorStop(0.6, "#2982ff");
          cyanGrad.addColorStop(1, "#0066ff");
          ctx.fillStyle = cyanGrad;
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Outer halo
          ctx.save();
          ctx.shadowColor = "rgba(0, 229, 255, 0.9)";
          ctx.shadowBlur = 18;
          ctx.stroke();
          ctx.restore();
          continue;
        }

        // Metallic black / deep steel with blue specular highlights
        // Gradient along face diagonal
        const grad = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);

        if (face.baseColor === "#ffffff") {
          // Polished chrome top edge
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.4, "#d8e4f4");
          grad.addColorStop(0.8, "#5b6e8c");
          grad.addColorStop(1, "#121927");
        } else if (face.reflect) {
          // Metallic specular reflection face
          grad.addColorStop(0, "#2a374f");
          grad.addColorStop(0.3, "#192437");
          grad.addColorStop(0.7, "#0b1019");
          grad.addColorStop(1, "#04070c");
        } else {
          // Shadowed dark matte side
          grad.addColorStop(0, "#101622");
          grad.addColorStop(0.5, "#090d15");
          grad.addColorStop(1, "#030508");
        }

        ctx.fillStyle = grad;
        ctx.fill();

        // High precision bevel outline
        const edgeGlow = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        if (face.reflect) {
          edgeGlow.addColorStop(0, "rgba(0, 229, 255, 0.55)");
          edgeGlow.addColorStop(0.5, "rgba(255, 255, 255, 0.7)");
          edgeGlow.addColorStop(1, "rgba(41, 130, 255, 0.2)");
          ctx.lineWidth = 1.2;
        } else {
          edgeGlow.addColorStop(0, "rgba(255, 255, 255, 0.12)");
          edgeGlow.addColorStop(1, "rgba(0, 102, 255, 0.08)");
          ctx.lineWidth = 0.8;
        }

        ctx.strokeStyle = edgeGlow;
        ctx.stroke();
      }

      // Draw subtle precision architectural lines (laser wireframe accents)
      // Connecting left pillar top to right pillar top with glowing line
      const pTopL = projPts[5];
      const pTopR = projPts[12];
      ctx.beginPath();
      ctx.moveTo(pTopL.x, pTopL.y);
      ctx.lineTo(pTopR.x, pTopR.y);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-3d-monolith-container" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="hero-3d-monolith-canvas"
      />
    </div>
  );
}
