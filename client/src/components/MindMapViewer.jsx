import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  ZoomIn, ZoomOut, Maximize2, Download, RefreshCw, FolderPlus, FolderMinus, Sparkles,
  BookOpen, Calculator, Lightbulb, AlertTriangle, CheckCircle, Eye, Network, LayoutGrid, ChevronRight, ChevronDown
} from 'lucide-react';

// Color palette for branches
const BRANCH_COLORS = [
  { stroke: '#3B82F6', bg: 'rgba(59,130,246,0.12)', text: '#2563EB', darkText: '#60A5FA', badge: '#2563EB' },
  { stroke: '#10B981', bg: 'rgba(16,185,129,0.12)', text: '#059669', darkText: '#34D399', badge: '#059669' },
  { stroke: '#F59E0B', bg: 'rgba(245,158,11,0.12)', text: '#D97706', darkText: '#FBBF24', badge: '#D97706' },
  { stroke: '#EC4899', bg: 'rgba(236,72,153,0.12)', text: '#DB2777', darkText: '#F472B6', badge: '#DB2777' },
  { stroke: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', text: '#7C3AED', darkText: '#A78BFA', badge: '#7C3AED' },
  { stroke: '#06B6D4', bg: 'rgba(6,182,212,0.12)',  text: '#0891B2', darkText: '#22D3EE', badge: '#0891B2' },
];

/**
 * Categorizes a leaf node to determine icon, badge, and color
 */
function getNodeType(label = '') {
  const l = label.toLowerCase();
  if (/formula|equation|f_net|latex|\$|\\vec/i.test(l)) return { type: 'formula', icon: '⚡', label: 'Formula', color: '#10B981' };
  if (/def|definition|law\b|rule|principle/i.test(l)) return { type: 'definition', icon: '📌', label: 'Definition', color: '#EF4444' };
  if (/example|problem|solved|numerical|elevator|lift|ball/i.test(l)) return { type: 'example', icon: '✍️', label: 'Worked Example', color: '#3B82F6' };
  if (/tip|trick|trap|warning|blunder|shortcut|yaad/i.test(l)) return { type: 'tip', icon: '💡', label: 'Exam Trap & Tip', color: '#F59E0B' };
  return { type: 'concept', icon: '🔷', label: 'Concept', color: '#8B5CF6' };
}

export default function MindMapViewer({
  nodes = [],
  title = 'Lecture Concept Mind Map',
  keyConcepts = [],
  formulas = [],
  isDark = false,
  onSelectTopic = null
}) {
  const svgRef = useRef(null);
  const markmapSvgRef = useRef(null);
  const containerRef = useRef(null);
  const markmapInstanceRef = useRef(null);

  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'markmap'
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(null);
  const [collapsedBranches, setCollapsedBranches] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const cleanTitle = useMemo(() => (title || 'Lecture Master Topic').replace(/[-–|:].*$/, '').trim(), [title]);

  // Build structured graph tree from nodes and concepts
  const mindMapTree = useMemo(() => {
    const root = {
      id: 'root',
      label: cleanTitle,
      type: 'root',
      children: []
    };

    // 1. Build hierarchy from string chains "A -> B -> C"
    const topicMap = new Map();

    // First seed with keyConcepts if available
    if (Array.isArray(keyConcepts) && keyConcepts.length > 0) {
      keyConcepts.forEach((kc, i) => {
        const topicName = kc.heading || `Topic ${i + 1}`;
        if (!topicMap.has(topicName)) {
          const topicNode = {
            id: `topic_${i}`,
            label: topicName,
            type: 'topic',
            timestamp: kc.timestamp_start,
            children: []
          };

          // Add definitions
          if (Array.isArray(kc.definitions)) {
            kc.definitions.forEach((d, dIdx) => {
              topicNode.children.push({
                id: `top_${i}_def_${dIdx}`,
                label: `Definition: ${d.slice(0, 45)}${d.length > 45 ? '...' : ''}`,
                fullText: d,
                type: 'definition'
              });
            });
          }

          // Add formulas
          if (Array.isArray(kc.formulas)) {
            kc.formulas.forEach((f, fIdx) => {
              topicNode.children.push({
                id: `top_${i}_form_${fIdx}`,
                label: `Formula: ${f.name || f.formula}`,
                formula: f.formula,
                fullText: `${f.name}: ${f.formula}`,
                type: 'formula'
              });
            });
          }

          // Add Solved numerical
          if (kc.solved_example && kc.solved_example.title) {
            topicNode.children.push({
              id: `top_${i}_ex`,
              label: `Example: ${kc.solved_example.title.slice(0, 40)}`,
              fullText: `${kc.solved_example.title}\nGiven: ${kc.solved_example.given || ''}\nAnswer: ${kc.solved_example.answer || ''}`,
              type: 'example'
            });
          }

          // Add Teacher Tip
          if (Array.isArray(kc.teacher_tips) && kc.teacher_tips.length > 0) {
            topicNode.children.push({
              id: `top_${i}_tip`,
              label: `Tip: ${kc.teacher_tips[0].slice(0, 45)}`,
              fullText: kc.teacher_tips[0],
              type: 'tip'
            });
          }

          // Add Core Spoken Points as concepts
          if (Array.isArray(kc.points)) {
            kc.points.slice(0, 3).forEach((p, pIdx) => {
              topicNode.children.push({
                id: `top_${i}_pt_${pIdx}`,
                label: p.slice(0, 48) + (p.length > 48 ? '...' : ''),
                fullText: p,
                type: 'concept'
              });
            });
          }

          topicMap.set(topicName, topicNode);
          root.children.push(topicNode);
        }
      });
    }

    // 2. Also incorporate any extra branches from nodes array
    if (Array.isArray(nodes)) {
      nodes.forEach((chain, cIdx) => {
        if (!chain || typeof chain !== 'string') return;
        const parts = chain.split('->').map(p => p.trim()).filter(Boolean);
        if (parts.length < 2) return;

        const mainTopic = parts[0] === cleanTitle && parts.length > 2 ? parts[1] : parts[0];
        const subtopic = parts[0] === cleanTitle && parts.length > 2 ? parts[2] : (parts[1] || '');

        if (!topicMap.has(mainTopic)) {
          const tNode = {
            id: `chain_topic_${cIdx}`,
            label: mainTopic,
            type: 'topic',
            children: []
          };
          topicMap.set(mainTopic, tNode);
          root.children.push(tNode);
        }

        if (subtopic) {
          const tNode = topicMap.get(mainTopic);
          const alreadyExists = tNode.children.some(c => c.label.toLowerCase() === subtopic.toLowerCase());
          if (!alreadyExists) {
            tNode.children.push({
              id: `chain_sub_${cIdx}`,
              label: subtopic,
              fullText: subtopic,
              type: getNodeType(subtopic).type
            });
          }
        }
      });
    }

    // Fallback if empty
    if (root.children.length === 0) {
      root.children.push({
        id: 'f1',
        label: 'Core Definitions & Laws',
        type: 'topic',
        children: [
          { id: 'f1_1', label: 'Fundamental Axiom', type: 'definition' },
          { id: 'f1_2', label: 'Governing Equations', type: 'formula' }
        ]
      });
      root.children.push({
        id: 'f2',
        label: 'Problem Solving & Numericals',
        type: 'topic',
        children: [
          { id: 'f2_1', label: 'Standard Classroom Example', type: 'example' },
          { id: 'f2_2', label: 'Common Student Trap', type: 'tip' }
        ]
      });
    }

    return root;
  }, [cleanTitle, nodes, keyConcepts, formulas]);

  // Convert tree into Markmap Markdown
  const markdownText = useMemo(() => {
    let md = `# 🎯 ${cleanTitle}\n`;
    mindMapTree.children.forEach(topic => {
      md += `## 🔷 ${topic.label}\n`;
      topic.children.forEach(leaf => {
        const typeInfo = getNodeType(leaf.label);
        md += `### ${typeInfo.icon} **${typeInfo.label}:** ${leaf.label}\n`;
      });
    });
    return md;
  }, [cleanTitle, mindMapTree]);

  // Markmap integration
  useEffect(() => {
    if (viewMode !== 'markmap') return;
    if (typeof window === 'undefined' || !markmapSvgRef.current) return;

    if (window.markmap && window.markmap.Markmap && window.markmap.Transformer) {
      try {
        const transformer = new window.markmap.Transformer();
        const { root } = transformer.transform(markdownText);
        if (markmapInstanceRef.current) markmapInstanceRef.current.destroy();
        markmapSvgRef.current.innerHTML = '';
        const mm = window.markmap.Markmap.create(markmapSvgRef.current, {
          duration: 300,
          spacingHorizontal: 80,
          spacingVertical: 18,
          autoFit: true,
          colorFreezeLevel: 2
        }, root);
        markmapInstanceRef.current = mm;
        setTimeout(() => mm.fit && mm.fit(), 150);
      } catch (e) {
        console.warn('Markmap error:', e);
      }
    }
  }, [viewMode, markdownText]);

  // Pan & Zoom controls
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('.interactive-node')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(prev => Math.min(Math.max(prev * zoomFactor, 0.4), 2.5));
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev * 0.8, 0.4));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleCollapseBranch = (topicId) => {
    setCollapsedBranches(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  // Download Mind Map as PNG
  const handleDownloadPNG = () => {
    const el = svgRef.current;
    if (!el) return;
    try {
      const svgString = new XMLSerializer().serializeToString(el);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 1600;
        canvas.height = 1000;
        ctx.fillStyle = isDark ? '#080D1A' : '#F8FAFC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const png = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${cleanTitle.replace(/[^a-zA-Z0-9]/g, '_')}_MindMap.png`;
        link.href = png;
        link.click();
        URL.revokeObjectURL(blobURL);
      };
      img.src = blobURL;
    } catch (e) {
      alert('Could not export PNG directly.');
    }
  };

  // Download SVG
  const handleDownloadSVG = () => {
    const el = svgRef.current;
    if (!el) return;
    const svgString = new XMLSerializer().serializeToString(el);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cleanTitle.replace(/[^a-zA-Z0-9]/g, '_')}_MindMap.svg`;
    link.click();
  };

  // Layout calculations for Radial/Bilateral Mind Map Canvas
  const layout = useMemo(() => {
    const totalTopics = mindMapTree.children.length;
    const rightTopics = mindMapTree.children.slice(0, Math.ceil(totalTopics / 2));
    const leftTopics = mindMapTree.children.slice(Math.ceil(totalTopics / 2));

    const cx = 900;
    const cy = 650;

    const calcSide = (topics, isRight) => {
      const direction = isRight ? 1 : -1;
      const startX = cx + (direction * 190);
      const count = topics.length;

      // Calculate dynamic non-overlapping heights for each branch
      const branchHeights = topics.map(topic => {
        const isCollapsed = collapsedBranches[topic.id];
        const leafCount = isCollapsed ? 0 : (topic.children || []).length;
        return Math.max(76, leafCount * 44 + 20);
      });

      const gapBetweenBranches = 38;
      const totalBranchHeight = branchHeights.reduce((acc, h) => acc + h, 0) + Math.max(0, count - 1) * gapBetweenBranches;
      let runningY = Math.max(70, cy - (totalBranchHeight / 2));

      return topics.map((topic, i) => {
        const blockHeight = branchHeights[i];
        const topicX = startX + (direction * 75);
        const topicY = runningY + (blockHeight / 2);
        runningY += blockHeight + gapBetweenBranches;

        const isCollapsed = collapsedBranches[topic.id];
        const leaves = isCollapsed ? [] : (topic.children || []);
        const leafCount = leaves.length;
        const leafSpacingY = 44; // Guaranteed 16px vertical gap between 28px card heights
        const leafTotalH = Math.max(0, leafCount - 1) * leafSpacingY;
        const leafStartY = topicY - (leafTotalH / 2);

        const leafNodes = leaves.map((leaf, li) => {
          const leafX = topicX + (direction * 245);
          const leafY = leafStartY + (li * leafSpacingY);
          return {
            ...leaf,
            x: leafX,
            y: leafY,
            isRight
          };
        });

        return {
          ...topic,
          x: topicX,
          y: topicY,
          isRight,
          color: BRANCH_COLORS[(isRight ? i : i + rightTopics.length) % BRANCH_COLORS.length],
          leaves: leafNodes
        };
      });
    };

    return {
      cx,
      cy,
      rightSide: calcSide(rightTopics, true),
      leftSide: calcSide(leftTopics, false)
    };
  }, [mindMapTree, collapsedBranches]);

  return (
    <div className={`rounded-3xl border shadow-2xl p-4 sm:p-6 transition-all ${
      isDark ? 'bg-[#0B0F17] border-[#1F293D] text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
    }`}>

      {/* ── Header Toolbar ── */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" /> Cognitive Mind Map
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {mindMapTree.children.length} Major Branches • {mindMapTree.children.reduce((acc, t) => acc + t.children.length, 0)} Cognitive Leaves
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] mt-1 break-words">
            {cleanTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any node to inspect details • Click <span className="font-bold text-blue-500">[+/-]</span> to collapse/expand branches • Drag canvas to pan
          </p>
        </div>

        {/* View Mode Toggle & Canvas Actions */}
        <div className="flex items-center gap-2 flex-wrap self-stretch sm:self-auto justify-end">
          
          {/* Dual Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'visual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Radial Mind Map</span>
            </button>
            <button
              onClick={() => setViewMode('markmap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'markmap'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Markmap D3</span>
            </button>
          </div>

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131B2E] hover:bg-slate-100 text-xs transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-blue-500" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131B2E] hover:bg-slate-100 text-xs transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-blue-500" />
          </button>

          {/* Reset View */}
          <button
            onClick={handleResetView}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131B2E] hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Reset Pan & Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{Math.round(zoom * 100)}%</span>
          </button>

          {/* Download PNG */}
          <button
            onClick={handleDownloadPNG}
            className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            title="Download PNG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PNG</span>
          </button>

          {/* Download SVG */}
          <button
            onClick={handleDownloadSVG}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131B2E] hover:bg-slate-100 text-xs font-mono font-bold transition-all"
            title="Download SVG"
          >
            SVG
          </button>

        </div>
      </div>

      {/* ── Interactive Viewport ── */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`w-full h-[580px] rounded-2xl border overflow-hidden relative select-none cursor-grab active:cursor-grabbing transition-colors ${
          isDark ? 'bg-[#070B14] border-[#1B253B]' : 'bg-[#F8FAFC] border-slate-200'
        }`}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#3B82F6' : '#94A3B8'} 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* ── MODE 1: NATIVE RADIAL MIND MAP SVG CANVAS ── */}
        {viewMode === 'visual' && (
          <svg
            ref={svgRef}
            viewBox="0 0 1850 1300"
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            <defs>
              <filter id="hubGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="centralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>

            {/* Render Branches (Right & Left) */}
            {[...layout.rightSide, ...layout.leftSide].map((topic) => {
              const cx = layout.cx;
              const cy = layout.cy;
              const tx = topic.x;
              const ty = topic.y;
              const color = topic.color;

              // Cubic bezier from center to topic
              const midX = (cx + tx) / 2;
              const mainPath = `M ${cx} ${cy} C ${midX} ${cy}, ${midX} ${ty}, ${tx} ${ty}`;

              return (
                <g key={topic.id} className="branch-group">
                  {/* Connector from Central Hub to Main Topic */}
                  <path
                    d={mainPath}
                    fill="none"
                    stroke={color.stroke}
                    strokeWidth="3.5"
                    strokeOpacity={isDark ? 0.75 : 0.65}
                    strokeLinecap="round"
                  />

                  {/* Connectors from Topic to Leaves */}
                  {topic.leaves.map((leaf) => {
                    const lx = leaf.x;
                    const ly = leaf.y;
                    const leafMidX = (tx + lx) / 2;
                    const leafPath = `M ${tx} ${ty} C ${leafMidX} ${ty}, ${leafMidX} ${ly}, ${lx} ${ly}`;
                    const nodeType = getNodeType(leaf.label);

                    return (
                      <g key={leaf.id}>
                        <path
                          d={leafPath}
                          fill="none"
                          stroke={nodeType.color}
                          strokeWidth="2"
                          strokeOpacity={isDark ? 0.6 : 0.5}
                          strokeDasharray="4 2"
                        />

                        {/* Leaf Node Box */}
                        <g
                          transform={`translate(${lx}, ${ly})`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNode(leaf);
                          }}
                          className="interactive-node cursor-pointer group"
                        >
                          <rect
                            x={leaf.isRight ? 0 : -220}
                            y={-14}
                            width="220"
                            height="28"
                            rx="14"
                            fill={isDark ? '#0F1626' : '#FFFFFF'}
                            stroke={nodeType.color}
                            strokeWidth="1.8"
                            className="transition-all group-hover:stroke-width-3"
                          />
                          <circle
                            cx={leaf.isRight ? 12 : -208}
                            cy={0}
                            r="5"
                            fill={nodeType.color}
                          />
                          <text
                            x={leaf.isRight ? 26 : -194}
                            y={4}
                            fontFamily="'Plus Jakarta Sans', sans-serif"
                            fontSize="11"
                            fontWeight="600"
                            fill={isDark ? '#F1F5F9' : '#0F172A'}
                          >
                            {leaf.label.slice(0, 24)}
                            {leaf.label.length > 24 ? '…' : ''}
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Main Topic Node Pill */}
                  <g
                    transform={`translate(${tx}, ${ty})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(topic);
                      if (onSelectTopic) onSelectTopic(topic.label);
                    }}
                    className="interactive-node cursor-pointer group"
                  >
                    <rect
                      x={topic.isRight ? -10 : -190}
                      y={-22}
                      width="200"
                      height="44"
                      rx="16"
                      fill={isDark ? '#111A2E' : '#FFFFFF'}
                      stroke={color.stroke}
                      strokeWidth="2.5"
                      className="transition-all group-hover:scale-105"
                    />
                    <circle
                      cx={topic.isRight ? 14 : -166}
                      cy={0}
                      r="10"
                      fill={color.stroke}
                    />
                    <text
                      x={topic.isRight ? 14 : -166}
                      y={4}
                      textAnchor="middle"
                      fontFamily="'Plus Jakarta Sans', sans-serif"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#FFFFFF"
                    >
                      {topic.leaves.length}
                    </text>
                    <text
                      x={topic.isRight ? 32 : -148}
                      y={-3}
                      fontFamily="'Plus Jakarta Sans', sans-serif"
                      fontSize="12"
                      fontWeight="bold"
                      fill={isDark ? '#F8FAFC' : '#0F172A'}
                    >
                      {topic.label.slice(0, 18)}
                      {topic.label.length > 18 ? '…' : ''}
                    </text>
                    <text
                      x={topic.isRight ? 32 : -148}
                      y={12}
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="9.5"
                      fontWeight="600"
                      fill={color.darkText || color.text}
                    >
                      {topic.timestamp ? `⏱ ${topic.timestamp}` : 'Topic Branch'}
                    </text>

                    {/* Collapse / Expand Toggle Button */}
                    <g
                      transform={`translate(${topic.isRight ? 172 : -8}, 0)`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCollapseBranch(topic.id);
                      }}
                      className="cursor-pointer hover:opacity-80"
                    >
                      <circle cx="0" cy="0" r="8" fill={color.stroke} />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontSize="11"
                        fontWeight="bold"
                        fill="#FFFFFF"
                      >
                        {collapsedBranches[topic.id] ? '+' : '−'}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}

            {/* Central Root Hub Node */}
            <g transform={`translate(${layout.cx}, ${layout.cy})`} className="cursor-pointer">
              <circle cx="0" cy="0" r="76" fill="rgba(37,99,235,0.18)" filter="url(#hubGlow)" />
              <rect
                x="-120"
                y="-42"
                width="240"
                height="84"
                rx="24"
                fill="url(#centralGrad)"
                stroke="#60A5FA"
                strokeWidth="3"
                className="shadow-xl"
              />
              <text
                x="0"
                y="-14"
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontSize="11"
                fontWeight="bold"
                letterSpacing="1"
                fill="#93C5FD"
              >
                🎯 CENTRAL UNIT
              </text>
              <text
                x="0"
                y="12"
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontSize="15"
                fontWeight="800"
                fill="#FFFFFF"
              >
                {cleanTitle.slice(0, 22)}
                {cleanTitle.length > 22 ? '…' : ''}
              </text>
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="9"
                fontWeight="600"
                fill="#BFDBFE"
              >
                Master Knowledge Core
              </text>
            </g>
          </svg>
        )}

        {/* ── MODE 2: MARKMAP D3 COLLAPSIBLE TREE ── */}
        {viewMode === 'markmap' && (
          <svg
            ref={markmapSvgRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          />
        )}

        {/* ── Node Detail Popup Modal ── */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all z-20 bg-white/95 dark:bg-[#111A2E]/95 border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                getNodeType(selectedNode.label).color === '#10B981'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : getNodeType(selectedNode.label).color === '#EF4444'
                  ? 'bg-red-500/15 text-red-600 dark:text-red-400'
                  : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
              }`}>
                {getNodeType(selectedNode.label).icon} {getNodeType(selectedNode.label).label}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white px-1.5 py-0.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
              {selectedNode.label}
            </h4>

            {selectedNode.fullText && (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap font-sans bg-slate-50 dark:bg-[#0B0F17] p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                {selectedNode.fullText}
              </p>
            )}

            {selectedNode.formula && (
              <div className="mt-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center">
                {selectedNode.formula}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── Legend Bar ── */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Unit Core</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>⚡ Formula</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>📌 Definition</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>✍️ Solved Problem</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>💡 Exam Trap & Tip</span>
          </span>
        </div>

        <div className="text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">
          Scroll to Zoom • Drag to Explore
        </div>
      </div>

    </div>
  );
}
