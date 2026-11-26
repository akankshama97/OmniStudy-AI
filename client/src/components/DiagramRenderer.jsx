import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * DiagramRenderer Component
 * - Authentic Hand-Drawn Student Notebook Copy Diagram
 * - Drawn using Blue Gel Pen (#1D4ED8 / #2563EB) & Black Ink (#0F172A), matching
 *   exactly how toppers draw lecture blackboard illustrations into their notebook copy.
 * - Handwritten font ('Kalam', 'Caveat', cursive) for all labels, axes, and notes.
 * - Soft student highlighter accents (yellow/blue wash) and pencil guidelines.
 * - Clickable "Watch Teacher Draw at mm:ss" link under each diagram.
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

  // Adapt SVG for authentic Blue & Black Pen Student Notebook Copy Drawing
  const adaptForNotebookPen = (rawSvg) => {
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

    // Ink Palette for Student Copy:
    // Light Mode: Royal Blue Pen (#1D4ED8), Dark Black Pen (#0F172A), Soft Highlighter (#FEF08A)
    // Dark Mode: Bright Gel Blue (#60A5FA), Crisp Text (#F8FAFC)
    const penBlue = isDark ? '#60A5FA' : '#1D4ED8';
    const penBlack = isDark ? '#F8FAFC' : '#0F172A';
    const penPencil = isDark ? '#94A3B8' : '#475569';
    const highlightFill = isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(29, 78, 216, 0.05)';

    svg = svg
      // Replace opaque white/gray backgrounds with transparent/subtle notebook ink tint
      .replace(/fill=["'](?:#ffffff|#faf8f5|#f8fafc|#f1f5f9|white)["']/gi, `fill="${highlightFill}"`)
      .replace(/fill=["']rgba\(15,\s*23,\s*42,\s*0\.04\)["']/gi, `fill="${highlightFill}"`)
      // Text fills become dark black pen or deep blue pen
      .replace(/fill=["']#(?:000000|0f172a|1e293b|334155|111827|0f1626)["']/gi, `fill="${penBlack}"`)
      .replace(/fill=["']black["']/gi, `fill="${penBlack}"`)
      .replace(/fill=["']#(?:64748b|94a3b8)["']/gi, `fill="${penPencil}"`)
      // Dark strokes become student blue pen
      .replace(/stroke=["']#(?:000000|0f172a|1e293b|334155|cbd5e1|e2e8f0)["']/gi, `stroke="${penBlue}"`)
      .replace(/stroke=["']black["']/gi, `stroke="${penBlue}"`)
      // Blue strokes stay vibrant royal blue
      .replace(/stroke=["']#(?:2563eb|3b82f6|1d4ed8|1e40af|4f46e5)["']/gi, `stroke="${penBlue}"`)
      // Red pen highlights (e.g. key notations / traps)
      .replace(/stroke=["']#(?:ef4444|dc2626|b91c1c)["']/gi, isDark ? 'stroke="#F87171"' : 'stroke="#B91C1C"')
      .replace(/fill=["']#(?:ef4444|dc2626|b91c1c)["']/gi, isDark ? 'fill="#F87171"' : 'fill="#B91C1C"')
      // Green pen highlights (e.g. solved examples / formulas)
      .replace(/stroke=["']#(?:10b981|059669|15803d|16a34a)["']/gi, isDark ? 'stroke="#34D399"' : 'stroke="#15803D"')
      .replace(/fill=["']#(?:10b981|059669|15803d)["']/gi, isDark ? 'fill="#34D399"' : 'fill="#15803D"');

    // Ensure all text tags use handwritten Kalam font
    svg = svg.replace(/<text(?![^>]*font-family)/gi, '<text font-family="\'Kalam\', \'Caveat\', cursive"');

    return svg;
  };

  const isMermaid = type === 'mermaid' || (svg_or_mermaid && /^(graph|flowchart|sequenceDiagram)/i.test(svg_or_mermaid.trim()));
  const hasRawSvg = svg_or_mermaid && svg_or_mermaid.includes('<svg');

  return (
    <div className={`my-5 rounded-2xl border-2 transition-all overflow-hidden shadow-sm ${
      isDark
        ? 'bg-[#111827] border-blue-500/30 text-[#F8FAFC]'
        : 'bg-white border-blue-200 text-[#0F172A]'
    }`}>

      {/* ── Student Copy Header Bar (Drawn from Blackboard) ── */}
      <div className={`px-4 py-2.5 border-b-2 flex items-center justify-between gap-2 flex-wrap ${
        isDark
          ? 'bg-[#1F2937] border-blue-500/30 text-[#F8FAFC]'
          : 'bg-blue-50/70 border-blue-200 text-[#1E3A8A]'
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-base">✍️</span>
          <div>
            <h4 className="font-bold text-xs sm:text-sm font-kalam tracking-wide flex items-center gap-1.5 text-blue-900 dark:text-blue-200">
              <span>{heading}</span>
            </h4>
            <span className="text-[10px] text-blue-700 dark:text-blue-300 font-mono">
              Classroom Hand-Drawn Copy • ब्लैकबोर्ड से कॉपी में बनाया गया चित्र
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700 font-kalam">
            🖊️ Blue &amp; Black Pen Copy
          </span>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            ⏱️ {diagram.timestamp || timestamp}
          </span>
        </div>
      </div>

      {/* ── Student Notebook Canvas: Ruled/Parchment Drawing with Pen Ink ── */}
      <div className={`p-4 sm:p-6 flex flex-col items-center justify-center min-h-[170px] overflow-x-auto w-full relative ${
        isDark ? 'bg-[#0B1120]' : 'bg-[#FAFCFF]'
      }`}>

        {/* Subtle notebook graph grid lines in background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="absolute top-2 left-3 text-[11px] font-kalam text-slate-400 dark:text-slate-500 select-none pointer-events-none">
          Notebook Fig: Classroom Blackboard Derivation
        </div>

        {isMermaid && renderedMermaid && !svgRenderError ? (
          <div
            className="w-full max-w-xl flex justify-center text-xs overflow-x-auto relative z-10"
            dangerouslySetInnerHTML={{ __html: renderedMermaid }}
          />
        ) : hasRawSvg && !svgRenderError ? (
          <div
            className="w-full max-w-xl flex justify-center text-xs overflow-x-auto relative z-10"
            dangerouslySetInnerHTML={{ __html: adaptForNotebookPen(svg_or_mermaid) }}
          />
        ) : (
          /* Pure Blue & Black Gel Pen Student Schematic Fallback */
          <svg className="w-full max-w-xl h-44 sm:h-52 relative z-10" viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="pen-blue-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={isDark ? '#60A5FA' : '#1D4ED8'} />
              </marker>
            </defs>

            {/* Step 1 Student Box (Blue Gel Pen) */}
            <rect x="25" y="60" width="125" height="60" rx="10" fill={isDark ? 'rgba(96,165,250,0.1)' : 'rgba(29,78,216,0.05)'} stroke={isDark ? '#60A5FA' : '#1D4ED8'} strokeWidth="2" />
            <text x="87" y="88" textAnchor="middle" fill={isDark ? '#F8FAFC' : '#0F172A'} fontSize="12" fontWeight="bold" fontFamily="'Kalam', cursive">
              {labels[0] || '1. Given Input'}
            </text>
            <text x="87" y="105" textAnchor="middle" fill={isDark ? '#93C5FD' : '#2563EB'} fontSize="10" fontFamily="'Kalam', cursive">
              (Teacher's Board Data)
            </text>

            <path d="M 150 90 L 195 90" stroke={isDark ? '#60A5FA' : '#1D4ED8'} strokeWidth="2.5" markerEnd="url(#pen-blue-arrow)" />

            {/* Step 2 Central Governing Box (Black & Blue Pen) */}
            <rect x="205" y="48" width="145" height="84" rx="12" fill={isDark ? 'rgba(254,240,138,0.1)' : 'rgba(254,240,138,0.45)'} stroke={isDark ? '#FBBF24' : '#0F172A'} strokeWidth="2.5" />
            <text x="277" y="82" textAnchor="middle" fill={isDark ? '#F8FAFC' : '#0F172A'} fontSize="13" fontWeight="bold" fontFamily="'Kalam', cursive">
              {heading.length > 18 ? heading.slice(0, 16) + '..' : heading}
            </text>
            <text x="277" y="104" textAnchor="middle" fill={isDark ? '#60A5FA' : '#1D4ED8'} fontSize="11" fontWeight="bold" fontFamily="'Kalam', cursive">
              ★ Governing Formula
            </text>

            <path d="M 350 90 L 395 90" stroke={isDark ? '#60A5FA' : '#1D4ED8'} strokeWidth="2.5" markerEnd="url(#pen-blue-arrow)" />

            {/* Step 3 Result State (Green/Blue Pen Box) */}
            <rect x="405" y="60" width="115" height="60" rx="10" fill={isDark ? 'rgba(52,211,153,0.1)' : 'rgba(21,128,61,0.06)'} stroke={isDark ? '#34D399' : '#15803D'} strokeWidth="2" />
            <text x="462" y="88" textAnchor="middle" fill={isDark ? '#F8FAFC' : '#0F172A'} fontSize="12" fontWeight="bold" fontFamily="'Kalam', cursive">
              {labels[1] || 'Final Output'}
            </text>
            <text x="462" y="105" textAnchor="middle" fill={isDark ? '#34D399' : '#15803D'} fontSize="10" fontFamily="'Kalam', cursive">
              Exam Derivation
            </text>
          </svg>
        )}
      </div>

      {/* ── Student Copy Footer: Caption & Direct Lecture Link ── */}
      <div className={`px-4 py-2.5 border-t-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs ${
        isDark ? 'bg-[#1F2937] border-blue-500/30' : 'bg-blue-50/40 border-blue-200'
      }`}>
        <p className="flex-1 text-[11px] font-kalam text-slate-600 dark:text-slate-300 italic">
          "{description}"
        </p>

        {/* Watch at mm:ss link */}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-white font-bold text-xs font-kalam bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 px-3 py-1 rounded-lg border border-blue-300 dark:border-blue-600 transition-all cursor-pointer shadow-2xs shrink-0"
          title={`Watch teacher explain this on YouTube at ${diagram.timestamp || timestamp}`}
        >
          <span>🎥 Watch Teacher Draw at {diagram.timestamp || timestamp}</span>
          <ExternalLink className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        </a>
      </div>

    </div>
  );
}
