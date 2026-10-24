import React from 'react';

/**
 * HandDrawnDiagram Component
 * Generates organic, hand-sketched SVGs with handwritten fonts, rough arrows, and node shapes.
 * Fully responsive and overflow-contained.
 */
export default function HandDrawnDiagram({ nodes = [], title = "Concept Diagram", isDarkMode = false }) {
  if (!nodes || nodes.length === 0) return null;

  // Colors for light/dark notebook mode
  const strokeColor = isDarkMode ? '#38bdf8' : '#1e293b'; // cyan or dark slate
  const highlightBg = isDarkMode ? 'rgba(56, 189, 248, 0.15)' : 'rgba(254, 240, 138, 0.7)'; // yellow/cyan highlight
  const textColor = isDarkMode ? '#f8fafc' : '#0f172a';
  const accentColor = isDarkMode ? '#fbbf24' : '#d97706'; // amber arrow/accent

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border-2 border-dashed ${isDarkMode ? 'border-slate-700 bg-slate-900/90' : 'border-slate-300 bg-amber-50/50'} shadow-md my-6 w-full max-w-full overflow-hidden`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-300/40 pb-2">
        <span className="text-xs font-bold uppercase tracking-widest font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
          ✏️ Hand-Drawn Lecture Diagram / Mindmap
        </span>
        <span className="text-[11px] font-kalam text-slate-500 font-semibold">
          Sketch Sheet
        </span>
      </div>

      {/* Responsive scroll container for diagram */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[540px] max-w-full flex flex-col items-center py-2">
          {/* SVG Canvas for Organic Hand-sketched Diagram */}
          <svg className="w-full max-w-2xl h-56 sm:h-64" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={accentColor} />
              </marker>
            </defs>

            {/* Render Flowchart / Mindmap Nodes dynamically */}
            {nodes.map((nodeText, idx) => {
              const count = Math.min(nodes.length, 4);
              const startX = 65;
              const gapX = (600 - 130) / Math.max(count - 1, 1);
              const cx = startX + (idx % 4) * gapX;
              const cy = (idx % 2 === 0) ? 65 : 155;
              const prevCx = idx > 0 ? startX + ((idx - 1) % 4) * gapX : null;
              const prevCy = idx > 0 ? (((idx - 1) % 2 === 0) ? 65 : 155) : null;

              return (
                <g key={idx}>
                  {/* Connector Arrow */}
                  {prevCx !== null && (
                    <path
                      d={`M ${prevCx + 45} ${prevCy} Q ${(prevCx + cx)/2} ${(prevCy + cy)/2 - 15} ${cx - 50} ${cy}`}
                      fill="none"
                      stroke={accentColor}
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      markerEnd="url(#arrow)"
                    />
                  )}

                  {/* Hand-drawn Capsule Box */}
                  <rect
                    x={cx - 55}
                    y={cy - 25}
                    width="110"
                    height="50"
                    rx="15"
                    ry="15"
                    fill={highlightBg}
                    stroke={strokeColor}
                    strokeWidth="2.5"
                    transform={`rotate(${(idx % 3 - 1) * 1.5}, ${cx}, ${cy})`}
                  />

                  {/* Handwritten Label */}
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="'Kalam', 'Caveat', cursive"
                  >
                    {nodeText.length > 14 ? nodeText.substring(0, 12) + '..' : nodeText}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend / Step breakdown list with safe word wrapping */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-3 border-t border-dashed border-slate-300/40">
        {nodes.map((nodeText, i) => (
          <div key={i} className="text-xs font-kalam font-medium flex items-start gap-2 break-words">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-slate-800 dark:text-slate-200 break-words flex-1 min-w-0">{nodeText}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
