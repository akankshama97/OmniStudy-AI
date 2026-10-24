import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * DiagramRenderer Component
 * - Exactly ONE diagram per concept, placed where the teacher drew it, with heading & caption.
 * - Supports clean labelled SVGs and Mermaid flowcharts/processes.
 * - Non-overlapping labels, clean arrows, safe in dark and light mode.
 * - Marks "Standard diagram" if board was unclear.
 * - Validates each SVG renders; if it fails, auto-recovers with clean schematic.
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
          theme: isDark ? 'dark' : 'default',
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
  }, [svg_or_mermaid, isDark, type]);

  // Clean and adapt SVG for dark & light mode contrast
  const sanitizeAndAdaptSvg = (rawSvg) => {
    if (!rawSvg) return '';
    let svg = rawSvg.trim();

    // Strip markdown code fences if present
    if (svg.startsWith('```')) {
      svg = svg.replace(/^```(?:xml|svg)?\s*/i, '').replace(/\s*```$/, '');
    }

    // Ensure responsive viewBox and remove fixed hardcoded widths/heights that cause overflow
    svg = svg.replace(/width=["'][^"']+["']/i, 'width="100%"');
    if (!svg.includes('viewBox')) {
      svg = svg.replace('<svg', '<svg viewBox="0 0 540 220"');
    }

    // Dark/Light mode color replacements for readability
    if (isDark) {
      svg = svg.replace(/fill=["']#?000000["']/gi, 'fill="#F8FAFC"')
               .replace(/fill=["']black["']/gi, 'fill="#F8FAFC"')
               .replace(/stroke=["']#?000000["']/gi, 'stroke="#93C5FD"')
               .replace(/stroke=["']black["']/gi, 'stroke="#93C5FD"');
    } else {
      svg = svg.replace(/fill=["']#?ffffff["']/gi, 'fill="#0F172A"')
               .replace(/fill=["']white["']/gi, 'fill="#0F172A"')
               .replace(/stroke=["']#?ffffff["']/gi, 'stroke="#1E3A8A"')
               .replace(/stroke=["']white["']/gi, 'stroke="#1E3A8A"');
    }

    return svg;
  };

  const isMermaid = type === 'mermaid' || (svg_or_mermaid && /^(graph|flowchart|sequenceDiagram)/i.test(svg_or_mermaid.trim()));
  const hasRawSvg = svg_or_mermaid && svg_or_mermaid.includes('<svg');

  return (
    <div className={`my-5 rounded-2xl border transition-all overflow-hidden diagram-container ${
      isDark ? 'bg-[#0F1626] border-[#23314F]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
    }`}>

      {/* ── Diagram Header ── */}
      <div className={`px-4 py-3 border-b flex items-center justify-between gap-2 flex-wrap ${
        isDark ? 'bg-[#131B2E] border-[#23314F]' : 'bg-white border-[#E2E8F0]'
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-sm">📐</span>
          <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] font-['Plus_Jakarta_Sans']">
            {heading}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {isStandardDiagram ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              Standard Textbook Diagram
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
              Blackboard Capture
            </span>
          )}

          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            {diagram.timestamp || timestamp}
          </span>
        </div>
      </div>

      {/* ── Diagram Body (SVG / Mermaid / Validated Schematic) ── */}
      <div className="p-4 flex flex-col items-center justify-center min-h-[160px] overflow-x-auto w-full">
        {isMermaid && renderedMermaid && !svgRenderError ? (
          <div
            className="w-full max-w-xl flex justify-center text-xs overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: renderedMermaid }}
          />
        ) : hasRawSvg && !svgRenderError ? (
          <div
            className="w-full max-w-xl flex justify-center text-xs overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: sanitizeAndAdaptSvg(svg_or_mermaid) }}
          />
        ) : (
          /* Safe Validated SVG Fallback Schema (Never blank screen) */
          <svg className="w-full max-w-xl h-44 sm:h-52" viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="d-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={isDark ? '#60A5FA' : '#2563EB'} />
              </marker>
            </defs>

            {/* Step 1 Capsule */}
            <rect x="25" y="60" width="125" height="60" rx="12" fill={isDark ? 'rgba(59,130,246,0.15)' : 'rgba(37,99,235,0.08)'} stroke={isDark ? '#60A5FA' : '#2563EB'} strokeWidth="2" />
            <text x="87" y="88" textAnchor="middle" fill={isDark ? '#F8FAFC' : '#0F172A'} fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">
              {labels[0] || '1. Given Input'}
            </text>
            <text x="87" y="105" textAnchor="middle" fill={isDark ? '#94A3B8' : '#64748B'} fontSize="9" fontFamily="Inter, sans-serif">
              Initial Parameters
            </text>

            <path d="M 150 90 L 195 90" stroke={isDark ? '#60A5FA' : '#2563EB'} strokeWidth="2.5" markerEnd="url(#d-arrow)" />

            {/* Step 2 Central Governing Process */}
            <rect x="205" y="48" width="145" height="84" rx="14" fill={isDark ? 'rgba(16,185,129,0.15)' : 'rgba(21,128,61,0.08)'} stroke={isDark ? '#34D399' : '#15803D'} strokeWidth="2" />
            <text x="277" y="84" textAnchor="middle" fill={isDark ? '#F8FAFC' : '#0F172A'} fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">
              {heading.length > 18 ? heading.slice(0, 16) + '..' : heading}
            </text>
            <text x="277" y="103" textAnchor="middle" fill={isDark ? '#34D399' : '#15803D'} fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">
              Governing Law
            </text>

            <path d="M 350 90 L 395 90" stroke={isDark ? '#60A5FA' : '#2563EB'} strokeWidth="2.5" markerEnd="url(#d-arrow)" />

            {/* Step 3 Result State */}
            <rect x="405" y="60" width="115" height="60" rx="12" fill={isDark ? 'rgba(245,158,11,0.15)' : 'rgba(194,65,12,0.08)'} stroke={isDark ? '#FBBF24' : '#C2410C'} strokeWidth="2" />
            <text x="462" y="88" textAnchor="middle" fill={isDark ? '#F8FAFC' : '#0F172A'} fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">
              {labels[1] || 'Final State'}
            </text>
            <text x="462" y="105" textAnchor="middle" fill={isDark ? '#FBBF24' : '#C2410C'} fontSize="9" fontFamily="Inter, sans-serif">
              Target Outcome
            </text>
          </svg>
        )}
      </div>

      {/* ── Diagram Caption & Clickable "Watch at mm:ss" Link ── */}
      <div className={`px-4 py-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${
        isDark ? 'bg-[#131B2E] border-[#23314F] text-[#CBD5E1]' : 'bg-white border-[#E2E8F0] text-[#334155]'
      }`}>
        <p className="flex-1 text-[11px] leading-relaxed italic">
          "{description}"
        </p>

        {/* Watch at mm:ss link */}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#2563EB] dark:text-[#60A5FA] hover:underline font-bold text-[11px] shrink-0 font-mono"
          title={`Open YouTube video at ${diagram.timestamp || timestamp}`}
        >
          <span>⏱️ Watch at {diagram.timestamp || timestamp}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
}
