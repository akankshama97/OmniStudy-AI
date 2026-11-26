import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * DiagramRenderer Component
 * - Authentic Classroom Blackboard / Chalkboard Illustration
 * - Deep chalkboard slate background (#15231D) with wooden frame & chalk tray
 * - High-contrast chalk pastel strokes (white, chalk yellow, cyan, pastel green)
 * - Handwritten chalk font ('Kalam', 'Caveat', cursive)
 * - Clickable "Watch at mm:ss" link under each diagram.
 */
export default function DiagramRenderer({
  diagram,
  timestamp = '00:00',
  videoUrl = '',
  isDark = false
}) {
  if (!diagram) return null;

  const [svgRenderError, setSvgRenderError] = useState(false);
  const [renderedMermaid, setRenderedMermaid] = useState(null);
  const containerRef = useRef(null);

  const {
    heading = 'Lecture Concept Diagram',
    description = 'Visual representation of board illustration and key spatial relationships.',
    type = 'svg',
    labels = [],
    svg_or_mermaid = '',
    isStandardDiagram = false,
  } = diagram;

  // Convert timestamp to seconds for YouTube jump link
  const getSecondsFromTimestamp = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
  };

  const jumpSeconds = getSecondsFromTimestamp(diagram.timestamp || timestamp);
  const watchUrl = videoUrl
    ? (videoUrl.includes('?') ? `${videoUrl}&t=${jumpSeconds}s` : `${videoUrl}?t=${jumpSeconds}s`)
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(heading)}`;

  // Mermaid render effect if type is mermaid
  useEffect(() => {
    const isMermaid = type === 'mermaid' || (svg_or_mermaid && /^(graph|flowchart|sequenceDiagram|classDiagram)/i.test(svg_or_mermaid.trim()));
    if (isMermaid && typeof window !== 'undefined' && window.mermaid) {
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          flowchart: { curve: 'basis', htmlLabels: true }
        });
        const id = `mermaid_${Math.random().toString(36).substr(2, 9)}`;
        window.mermaid.render(id, svg_or_mermaid.trim()).then(({ svg }) => {
          setRenderedMermaid(svg);
        }).catch(err => {
          console.warn('Mermaid render error, falling back to SVG:', err);
          setSvgRenderError(true);
        });
      } catch (e) {
        setSvgRenderError(true);
      }
    }
  }, [svg_or_mermaid, type]);

  // Adapt SVG specifically for authentic Chalkboard / Blackboard drawing
  const adaptForBlackboard = (rawSvg) => {
    if (!rawSvg) return '';
    let svg = rawSvg.trim();

    // Strip markdown code fences if present
    if (svg.startsWith('```')) {
      svg = svg.replace(/^```(?:xml|svg)?\s*/i, '').replace(/\s*```$/, '');
    }

    // Ensure responsive viewBox and full width
    svg = svg.replace(/width=["'][^"']+["']/i, 'width="100%"');
    if (!svg.includes('viewBox')) {
      svg = svg.replace('<svg', '<svg viewBox="0 0 540 220"');
    }

    // Inject chalk styling into SVG: handwritten font and chalk pastel colors
    svg = svg
      // Replace backgrounds with subtle chalk translucency
      .replace(/fill=["'](?:#ffffff|#faf8f5|#f8fafc|#f1f5f9|white)["']/gi, 'fill="rgba(255,255,255,0.08)"')
      .replace(/fill=["']rgba\(15,\s*23,\s*42,\s*0\.04\)["']/gi, 'fill="rgba(255,255,255,0.08)"')
      // Text fills become chalk white or chalk yellow
      .replace(/fill=["']#(?:000000|0f172a|1e293b|334155|475569|111827|1e3a8a|0f1626)["']/gi, 'fill="#FEF08A"')
      .replace(/fill=["']black["']/gi, 'fill="#FEF08A"')
      // Dark strokes become chalk white or chalk cyan
      .replace(/stroke=["']#(?:000000|0f172a|1e293b|334155|475569|cbd5e1|e2e8f0)["']/gi, 'stroke="#F8FAFC"')
      .replace(/stroke=["']black["']/gi, 'stroke="#F8FAFC"')
      // Blue strokes become vibrant chalk cyan
      .replace(/stroke=["']#(?:2563eb|3b82f6|1d4ed8|1e40af|4f46e5)["']/gi, 'stroke="#7DD3FC"')
      .replace(/fill=["']#(?:2563eb|3b82f6|1d4ed8)["']/gi, 'fill="#7DD3FC"')
      // Red strokes become chalk pink/coral
      .replace(/stroke=["']#(?:ef4444|dc2626|b91c1c)["']/gi, 'stroke="#F472B6"')
      .replace(/fill=["']#(?:ef4444|dc2626|b91c1c)["']/gi, 'fill="#F472B6"')
      // Green strokes become pastel chalk green
      .replace(/stroke=["']#(?:10b981|059669|15803d|16a34a)["']/gi, 'stroke="#86EFAC"')
      .replace(/fill=["']#(?:10b981|059669|15803d)["']/gi, 'fill="#86EFAC"');

    // Add chalk font-family to text tags if not present
    svg = svg.replace(/<text(?![^>]*font-family)/gi, '<text font-family="\'Kalam\', \'Caveat\', cursive"');

    return svg;
  };

  const isMermaid = type === 'mermaid' || (svg_or_mermaid && /^(graph|flowchart|sequenceDiagram)/i.test(svg_or_mermaid.trim()));
  const hasRawSvg = svg_or_mermaid && svg_or_mermaid.includes('<svg');

  return (
    <div className="my-6 rounded-2xl transition-all overflow-hidden shadow-2xl border-[5px] border-[#3E2818] bg-[#14231C] text-[#F8FAFC]">

      {/* ── Wooden Blackboard Frame Top Bar ── */}
      <div className="px-4 py-2.5 bg-[#2A1B10] border-b-2 border-[#1E120A] flex items-center justify-between gap-2 flex-wrap shadow-inner">
        <div className="flex items-center gap-2">
          <span className="text-base">🏫</span>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#FEF08A] font-kalam tracking-wide flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>{heading}</span>
            </h4>
            <span className="text-[10px] text-emerald-300/80 font-mono">
              Classroom Blackboard Capture • कक्षा ब्लैकबोर्ड चित्र
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isStandardDiagram ? (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-kalam">
              Standard Board Sketch
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-kalam">
              Teacher Blackboard Derivation
            </span>
          )}

          <span className="text-[10px] font-mono text-amber-200/80 bg-black/40 px-2 py-0.5 rounded border border-amber-500/20">
            ⏱️ {diagram.timestamp || timestamp}
          </span>
        </div>
      </div>

      {/* ── Blackboard Slate Canvas (Deep Chalk Slate with Chalk Drawings) ── */}
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[180px] overflow-x-auto w-full bg-radial from-[#1A2E25] via-[#14231C] to-[#0E1813] relative select-none">
        
        {/* Subtle chalkboard texture grid & corner chalk markings */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#F8FAFC_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-2 left-3 text-[11px] font-kalam text-white/20 select-none pointer-events-none">
          OmniStudy Chalkboard • Fig. 1
        </div>

        {isMermaid && renderedMermaid && !svgRenderError ? (
          <div
            className="w-full max-w-xl flex justify-center text-xs overflow-x-auto relative z-10"
            dangerouslySetInnerHTML={{ __html: renderedMermaid }}
          />
        ) : hasRawSvg && !svgRenderError ? (
          <div
            className="w-full max-w-xl flex justify-center text-xs overflow-x-auto relative z-10"
            dangerouslySetInnerHTML={{ __html: adaptForBlackboard(svg_or_mermaid) }}
          />
        ) : (
          /* High-Fidelity Blackboard Chalk Schematic Fallback */
          <svg className="w-full max-w-xl h-44 sm:h-52 relative z-10" viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="chalk-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#FEF08A" />
              </marker>
            </defs>

            {/* Step 1 Chalk Capsule */}
            <rect x="25" y="60" width="125" height="60" rx="12" fill="rgba(255,255,255,0.06)" stroke="#F8FAFC" strokeWidth="2" strokeDasharray="6 3" />
            <text x="87" y="88" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="bold" fontFamily="'Kalam', cursive">
              {labels[0] || '1. Initial State'}
            </text>
            <text x="87" y="105" textAnchor="middle" fill="#86EFAC" fontSize="10" fontFamily="'Kalam', cursive">
              Board Given Data
            </text>

            <path d="M 150 90 L 195 90" stroke="#FEF08A" strokeWidth="2.5" markerEnd="url(#chalk-arrow)" />

            {/* Step 2 Central Governing Process */}
            <rect x="205" y="48" width="145" height="84" rx="14" fill="rgba(125,211,252,0.1)" stroke="#7DD3FC" strokeWidth="2.5" />
            <text x="277" y="84" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold" fontFamily="'Kalam', cursive">
              {heading.length > 18 ? heading.slice(0, 16) + '..' : heading}
            </text>
            <text x="277" y="105" textAnchor="middle" fill="#FEF08A" fontSize="11" fontWeight="bold" fontFamily="'Kalam', cursive">
              ✏️ Governing Law
            </text>

            <path d="M 350 90 L 395 90" stroke="#FEF08A" strokeWidth="2.5" markerEnd="url(#chalk-arrow)" />

            {/* Step 3 Result State */}
            <rect x="405" y="60" width="115" height="60" rx="12" fill="rgba(134,239,172,0.1)" stroke="#86EFAC" strokeWidth="2" strokeDasharray="6 3" />
            <text x="462" y="88" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="bold" fontFamily="'Kalam', cursive">
              {labels[1] || 'Final Output'}
            </text>
            <text x="462" y="105" textAnchor="middle" fill="#F472B6" fontSize="10" fontFamily="'Kalam', cursive">
              Exam Target
            </text>
          </svg>
        )}
      </div>

      {/* ── Bottom Wooden Chalk Tray with Chalk Sticks & Duster ── */}
      <div className="bg-[#26180E] border-t-2 border-[#1E120A] px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        {/* Realistic Chalk Tray on the left */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#180E07] border border-[#3E2818] shadow-inner">
            {/* White chalk stick */}
            <span className="w-5 h-2 rounded-xs bg-[#F8FAFC] shadow-xs" title="White Chalk" />
            {/* Yellow chalk stick */}
            <span className="w-4 h-2 rounded-xs bg-[#FEF08A] shadow-xs" title="Yellow Chalk" />
            {/* Cyan chalk stick */}
            <span className="w-4 h-2 rounded-xs bg-[#7DD3FC] shadow-xs" title="Cyan Chalk" />
            {/* Wooden Duster / Eraser */}
            <span className="w-6 h-2.5 rounded-xs bg-[#6E4726] border border-[#3D2513] shadow-xs ml-1.5" title="Chalkboard Eraser" />
          </div>
          <span className="text-[11px] font-kalam text-amber-200/90 italic hidden md:inline">
            "{description}"
          </span>
        </div>

        {/* Watch at mm:ss link */}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-yellow-300 hover:text-yellow-200 font-bold text-xs font-kalam bg-black/40 hover:bg-black/60 px-3 py-1 rounded-lg border border-yellow-500/30 transition-all cursor-pointer shadow-xs"
          title={`Watch teacher draw this on YouTube at ${diagram.timestamp || timestamp}`}
        >
          <span>🎥 Watch Teacher Draw at {diagram.timestamp || timestamp}</span>
          <ExternalLink className="w-3 h-3 text-yellow-300" />
        </a>
      </div>

    </div>
  );
}
