/**
 * Sample Demo Notes for Instant 1-Click Showcase with Multi-language (Hinglish, Hindi, English) support.
 * Enhanced with 4 colour pen copy notes, KaTeX formulas, 5 PYQs with 4 options, SVG diagrams, and comparison tables.
 */
import { DSTL_EBOOK_NOTE } from './dstlPlaylistEBookData';

const NLM_DIAGRAM_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-n" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
    <marker id="arrow-g" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444" />
    </marker>
    <marker id="arrow-f" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
    </marker>
    <marker id="arrow-fr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" />
    </marker>
  </defs>
  <!-- Floor Surface -->
  <line x1="50" y1="160" x2="490" y2="160" stroke="#64748B" stroke-width="3" />
  <line x1="70" y1="165" x2="60" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="120" y1="165" x2="110" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="170" y1="165" x2="160" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="220" y1="165" x2="210" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="270" y1="165" x2="260" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="320" y1="165" x2="310" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="370" y1="165" x2="360" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="420" y1="165" x2="410" y2="175" stroke="#94A3B8" stroke-width="1.5" />
  <line x1="470" y1="165" x2="460" y2="175" stroke="#94A3B8" stroke-width="1.5" />

  <!-- Mass Block -->
  <rect x="220" y="80" width="100" height="80" rx="8" fill="rgba(37,99,235,0.12)" stroke="#2563EB" stroke-width="2.5" />
  <text x="270" y="125" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="14" font-weight="bold" fill="#2563EB">Mass (m)</text>

  <!-- Normal Force Vector (Upwards) -->
  <line x1="270" y1="80" x2="270" y2="25" stroke="#2563EB" stroke-width="2.5" marker-end="url(#arrow-n)" />
  <text x="285" y="35" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#2563EB">N (Normal)</text>

  <!-- Gravity Force Vector (Downwards) -->
  <line x1="270" y1="160" x2="270" y2="210" stroke="#EF4444" stroke-width="2.5" marker-end="url(#arrow-g)" />
  <text x="285" y="205" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#EF4444">W = mg (Weight)</text>

  <!-- Applied Pulling Force (Right) -->
  <line x1="320" y1="120" x2="430" y2="120" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-f)" />
  <text x="390" y="110" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#10B981">F_applied</text>

  <!-- Friction Force (Left) -->
  <line x1="220" y1="158" x2="110" y2="158" stroke="#F59E0B" stroke-width="2.5" marker-end="url(#arrow-fr)" />
  <text x="125" y="148" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#F59E0B">f_s (Friction)</text>
</svg>`;

const BST_DIAGRAM_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="bst-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" />
    </marker>
  </defs>
  <!-- Root Node 50 -->
  <circle cx="270" cy="40" r="24" fill="rgba(37,99,235,0.15)" stroke="#2563EB" stroke-width="2.5"/>
  <text x="270" y="46" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="14" font-weight="bold" fill="#2563EB">50</text>
  <text x="270" y="12" text-anchor="middle" font-size="10" font-weight="bold" fill="#64748B">ROOT</text>

  <!-- Left Child 30 -->
  <line x1="250" y1="56" x2="160" y2="100" stroke="#3B82F6" stroke-width="2" marker-end="url(#bst-arr)" />
  <circle cx="150" cy="110" r="22" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="2.5"/>
  <text x="150" y="115" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#10B981">30</text>

  <!-- Right Child 70 -->
  <line x1="290" y1="56" x2="380" y2="100" stroke="#3B82F6" stroke-width="2" marker-end="url(#bst-arr)" />
  <circle cx="390" cy="110" r="22" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" stroke-width="2.5"/>
  <text x="390" y="115" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#F59E0B">70</text>

  <!-- Leaves of 30: 20 and 40 -->
  <line x1="135" y1="126" x2="90" y2="165" stroke="#3B82F6" stroke-width="1.8" marker-end="url(#bst-arr)" />
  <circle cx="80" cy="175" r="18" fill="rgba(147,197,253,0.2)" stroke="#3B82F6" stroke-width="2"/>
  <text x="80" y="179" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563EB">20</text>

  <line x1="165" y1="126" x2="205" y2="165" stroke="#3B82F6" stroke-width="1.8" marker-end="url(#bst-arr)" />
  <circle cx="215" cy="175" r="18" fill="rgba(147,197,253,0.2)" stroke="#3B82F6" stroke-width="2"/>
  <text x="215" y="179" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563EB">40</text>

  <!-- Leaves of 70: 60 and 80 -->
  <line x1="375" y1="126" x2="335" y2="165" stroke="#3B82F6" stroke-width="1.8" marker-end="url(#bst-arr)" />
  <circle cx="325" cy="175" r="18" fill="rgba(147,197,253,0.2)" stroke="#3B82F6" stroke-width="2"/>
  <text x="325" y="179" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563EB">60</text>

  <line x1="405" y1="126" x2="450" y2="165" stroke="#3B82F6" stroke-width="1.8" marker-end="url(#bst-arr)" />
  <circle cx="460" cy="175" r="18" fill="rgba(147,197,253,0.2)" stroke="#3B82F6" stroke-width="2"/>
  <text x="460" y="179" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563EB">80</text>
</svg>`;

const CELL_CYCLE_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="cc-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
    </marker>
  </defs>
  <!-- Main Cycle Circle -->
  <circle cx="160" cy="110" r="80" fill="none" stroke="#CBD5E1" stroke-width="14" stroke-dasharray="125 15 150 15 90 15 60 15" />
  <text x="160" y="105" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="14" font-weight="bold" fill="#2563EB">CELL CYCLE</text>
  <text x="160" y="125" text-anchor="middle" font-size="11" fill="#64748B">24 Hours (Human)</text>

  <!-- Phase Labels -->
  <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">S-Phase (DNA Synthesis)</text>
  <text x="260" y="115" font-size="12" font-weight="bold" fill="#F59E0B">G2 Phase</text>
  <text x="60" y="115" font-size="12" font-weight="bold" fill="#10B981">G1 Phase</text>
  <text x="160" y="210" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">M-Phase (Mitosis / 1 hr)</text>

  <!-- Mitosis Stage Boxes on Right -->
  <rect x="330" y="20" width="180" height="35" rx="8" fill="rgba(59,130,246,0.1)" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="340" y="42" font-size="11" font-weight="bold" fill="#2563EB">1. Prophase: Chromatin condenses</text>

  <rect x="330" y="65" width="180" height="35" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10B981" stroke-width="1.5"/>
  <text x="340" y="87" font-size="11" font-weight="bold" fill="#15803D">2. Metaphase: Equator plate align</text>

  <rect x="330" y="110" width="180" height="35" rx="8" fill="rgba(245,158,11,0.1)" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="340" y="132" font-size="11" font-weight="bold" fill="#C2410C">3. Anaphase: Chromatids split</text>

  <rect x="330" y="155" width="180" height="35" rx="8" fill="rgba(239,68,68,0.1)" stroke="#EF4444" stroke-width="1.5"/>
  <text x="340" y="177" font-size="11" font-weight="bold" fill="#B91C1C">4. Telophase: Nuclear envelope</text>
</svg>`;

const COA_ARCH_VS_ORG_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="coaArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Architecture Level -->
  <rect x="30" y="25" width="480" height="75" rx="12" fill="rgba(37,99,235,0.12)" stroke="#2563EB" stroke-width="2"/>
  <text x="50" y="52" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#2563EB">COMPUTER ARCHITECTURE (Programmer's View - "WHAT")</text>
  <text x="50" y="74" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" fill="#475569">Instruction Set (ISA), Addressing Modes, Word Length, Data Formats &amp; CPU Registers</text>
  <line x1="270" y1="100" x2="270" y2="120" stroke="#2563EB" stroke-width="2.5" marker-end="url(#coaArr)"/>
  <!-- Organization Level -->
  <rect x="30" y="125" width="480" height="75" rx="12" fill="rgba(16,185,129,0.12)" stroke="#10B981" stroke-width="2"/>
  <text x="50" y="152" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#059669">COMPUTER ORGANIZATION (Hardware Realization - "HOW")</text>
  <text x="50" y="174" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" fill="#475569">ALU Design, Control Unit Signals, Bus Interconnects, Memory Technology &amp; Clock Cycles</text>
</svg>`;

const COA_FUNCTIONAL_UNITS_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="fArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Input Unit -->
  <rect x="20" y="75" width="95" height="70" rx="8" fill="rgba(59,130,246,0.12)" stroke="#3B82F6" stroke-width="2"/>
  <text x="67" y="110" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#2563EB">Input Unit</text>
  <text x="67" y="126" text-anchor="middle" font-size="9" fill="#64748B">Keyboard/Mouse</text>
  <line x1="115" y1="110" x2="160" y2="110" stroke="#2563EB" stroke-width="2.5" marker-end="url(#fArr)"/>
  <!-- CPU Boundary Box -->
  <rect x="165" y="30" width="205" height="160" rx="12" fill="rgba(99,102,241,0.06)" stroke="#6366F1" stroke-width="2" stroke-dasharray="5 5"/>
  <text x="267" y="52" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#4F46E5">CPU (Central Processing Unit)</text>
  <!-- ALU -->
  <rect x="180" y="65" width="175" height="42" rx="6" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="1.8"/>
  <text x="267" y="90" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#059669">ALU (Arithmetic &amp; Logic)</text>
  <!-- CU -->
  <rect x="180" y="120" width="175" height="42" rx="6" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="267" y="145" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#D97706">Control Unit (CU / Timing)</text>
  <!-- Output Unit -->
  <line x1="370" y1="110" x2="415" y2="110" stroke="#2563EB" stroke-width="2.5" marker-end="url(#fArr)"/>
  <rect x="420" y="75" width="100" height="70" rx="8" fill="rgba(59,130,246,0.12)" stroke="#3B82F6" stroke-width="2"/>
  <text x="470" y="110" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#2563EB">Output Unit</text>
  <text x="470" y="126" text-anchor="middle" font-size="9" fill="#64748B">Monitor/Display</text>
</svg>`;

const COA_SYSTEM_BUS_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <!-- Devices Top -->
  <rect x="35" y="20" width="110" height="55" rx="8" fill="rgba(37,99,235,0.15)" stroke="#2563EB" stroke-width="2"/>
  <text x="90" y="52" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#2563EB">CPU</text>
  <rect x="215" y="20" width="110" height="55" rx="8" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="2"/>
  <text x="270" y="52" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#059669">MEMORY</text>
  <rect x="395" y="20" width="110" height="55" rx="8" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" stroke-width="2"/>
  <text x="450" y="52" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#D97706">I/O SYSTEM</text>
  <!-- Buses Horizontal -->
  <rect x="20" y="100" width="500" height="20" rx="4" fill="#3B82F6"/>
  <text x="270" y="115" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF">ADDRESS BUS (Uni-directional from CPU)</text>
  <rect x="20" y="135" width="500" height="20" rx="4" fill="#10B981"/>
  <text x="270" y="150" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF">DATA BUS (Bi-directional 16/32/64-bit)</text>
  <rect x="20" y="170" width="500" height="20" rx="4" fill="#F59E0B"/>
  <text x="270" y="185" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF">CONTROL BUS (Bi-directional Signals: Read/Write/Clock)</text>
</svg>`;

const COA_BUS_ARBITRATION_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="dcArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Controller -->
  <rect x="20" y="50" width="100" height="120" rx="8" fill="rgba(99,102,241,0.15)" stroke="#6366F1" stroke-width="2"/>
  <text x="70" y="105" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#4F46E5">Bus</text>
  <text x="70" y="122" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#4F46E5">Controller</text>
  <!-- Device 1 -->
  <rect x="160" y="65" width="95" height="90" rx="8" fill="rgba(37,99,235,0.12)" stroke="#2563EB" stroke-width="2"/>
  <text x="207" y="105" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#2563EB">Device 1</text>
  <text x="207" y="122" text-anchor="middle" font-size="9" fill="#10B981">High Priority</text>
  <!-- Device 2 -->
  <rect x="295" y="65" width="95" height="90" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10B981" stroke-width="2"/>
  <text x="342" y="105" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#059669">Device 2</text>
  <text x="342" y="122" text-anchor="middle" font-size="9" fill="#64748B">Medium</text>
  <!-- Device 3 -->
  <rect x="430" y="65" width="95" height="90" rx="8" fill="rgba(245,158,11,0.12)" stroke="#F59E0B" stroke-width="2"/>
  <text x="477" y="105" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#D97706">Device 3</text>
  <text x="477" y="122" text-anchor="middle" font-size="9" fill="#EF4444">Lowest</text>
  <!-- Bus Grant Daisy Chain Line -->
  <line x1="120" y1="85" x2="160" y2="85" stroke="#2563EB" stroke-width="2.5" marker-end="url(#dcArr)"/>
  <line x1="255" y1="85" x2="295" y2="85" stroke="#2563EB" stroke-width="2.5" marker-end="url(#dcArr)"/>
  <line x1="390" y1="85" x2="430" y2="85" stroke="#2563EB" stroke-width="2.5" marker-end="url(#dcArr)"/>
  <text x="270" y="45" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#2563EB">Bus Grant (BG) Serial Propagation Line</text>
</svg>`;

const COA_TRISTATE_BUFFER_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="tArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Tri-State Buffer Triangle Symbol -->
  <polygon points="120,50 120,150 210,100" fill="rgba(37,99,235,0.15)" stroke="#2563EB" stroke-width="2.5"/>
  <line x1="50" y1="100" x2="120" y2="100" stroke="#2563EB" stroke-width="2.5"/>
  <text x="75" y="90" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#2563EB">Input A</text>
  <line x1="165" y1="30" x2="165" y2="75" stroke="#EF4444" stroke-width="2.5" marker-end="url(#tArr)"/>
  <text x="175" y="45" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#EF4444">Control C</text>
  <line x1="210" y1="100" x2="280" y2="100" stroke="#2563EB" stroke-width="2.5" marker-end="url(#tArr)"/>
  <text x="240" y="90" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#2563EB">Output Y</text>
  <!-- Truth Table Box on Right -->
  <rect x="310" y="35" width="200" height="135" rx="10" fill="rgba(15,23,42,0.04)" stroke="#CBD5E1" stroke-width="1.5"/>
  <text x="410" y="60" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#0F172A">TRUTH TABLE</text>
  <line x1="320" y1="70" x2="500" y2="70" stroke="#CBD5E1" stroke-width="1"/>
  <text x="340" y="88" font-family="monospace" font-size="11" font-weight="bold" fill="#64748B">C=1, A=0 → Y = 0</text>
  <text x="340" y="112" font-family="monospace" font-size="11" font-weight="bold" fill="#64748B">C=1, A=1 → Y = 1</text>
  <text x="340" y="136" font-family="monospace" font-size="11" font-weight="bold" fill="#DC2626">C=0, A=X → Y = Hi-Z (Open)</text>
</svg>`;

const COA_REGISTERS_MEMORY_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="regArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Left Column Registers -->
  <rect x="30" y="30" width="120" height="40" rx="6" fill="rgba(37,99,235,0.12)" stroke="#2563EB" stroke-width="2"/>
  <text x="90" y="55" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#2563EB">PC (Prog Counter)</text>
  <line x1="150" y1="50" x2="200" y2="50" stroke="#2563EB" stroke-width="2" marker-end="url(#regArr)"/>
  <rect x="205" y="30" width="120" height="40" rx="6" fill="rgba(37,99,235,0.12)" stroke="#2563EB" stroke-width="2"/>
  <text x="265" y="55" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#2563EB">MAR (Address Reg)</text>
  <!-- Center Memory Unit -->
  <rect x="380" y="30" width="130" height="150" rx="10" fill="rgba(16,185,129,0.12)" stroke="#10B981" stroke-width="2.5"/>
  <text x="445" y="65" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#059669">MAIN MEMORY</text>
  <text x="445" y="90" text-anchor="middle" font-family="monospace" font-size="10" fill="#64748B">[0000] Instruction</text>
  <text x="445" y="115" text-anchor="middle" font-family="monospace" font-size="10" fill="#64748B">[0001] Operand</text>
  <!-- Bottom MBR & IR -->
  <rect x="205" y="130" width="120" height="40" rx="6" fill="rgba(245,158,11,0.12)" stroke="#F59E0B" stroke-width="2"/>
  <text x="265" y="155" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#D97706">MBR (Data Buffer)</text>
  <line x1="380" y1="150" x2="325" y2="150" stroke="#F59E0B" stroke-width="2" marker-end="url(#regArr)"/>
  <rect x="30" y="130" width="120" height="40" rx="6" fill="rgba(99,102,241,0.12)" stroke="#6366F1" stroke-width="2"/>
  <text x="90" y="155" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#4F46E5">IR (Instruction Reg)</text>
  <line x1="205" y1="150" x2="150" y2="150" stroke="#6366F1" stroke-width="2" marker-end="url(#regArr)"/>
</svg>`;

const COA_STACK_ORGANIZATION_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="stkArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Stack Memory Column -->
  <rect x="70" y="25" width="160" height="170" rx="8" fill="rgba(37,99,235,0.06)" stroke="#2563EB" stroke-width="2"/>
  <rect x="80" y="35" width="140" height="30" fill="rgba(16,185,129,0.2)" stroke="#10B981" stroke-width="1.5"/>
  <text x="150" y="55" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#059669">Item C (TOS)</text>
  <rect x="80" y="70" width="140" height="30" fill="rgba(37,99,235,0.15)" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="150" y="90" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#2563EB">Item B</text>
  <rect x="80" y="105" width="140" height="30" fill="rgba(37,99,235,0.15)" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="150" y="125" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#2563EB">Item A</text>
  <rect x="80" y="140" width="140" height="30" fill="rgba(100,116,139,0.1)" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="150" y="160" text-anchor="middle" font-family="monospace" font-size="10" fill="#94A3B8">[ Empty Slot ]</text>
  <!-- Stack Pointer Arrow -->
  <line x1="30" y1="50" x2="70" y2="50" stroke="#EF4444" stroke-width="2.5" marker-end="url(#stkArr)"/>
  <text x="25" y="45" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#EF4444">SP</text>
  <!-- Operation Rules Box Right -->
  <rect x="270" y="35" width="230" height="150" rx="10" fill="rgba(15,23,42,0.04)" stroke="#CBD5E1" stroke-width="1.5"/>
  <text x="385" y="62" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13" font-weight="bold" fill="#0F172A">STACK OPERATIONS</text>
  <line x1="285" y1="72" x2="485" y2="72" stroke="#CBD5E1" stroke-width="1"/>
  <text x="290" y="95" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#2563EB">1. PUSH (Insert Item):</text>
  <text x="310" y="112" font-family="monospace" font-size="11" fill="#475569">SP ← SP - 1; M[SP] ← DR</text>
  <text x="290" y="140" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#EF4444">2. POP (Delete Item):</text>
  <text x="310" y="157" font-family="monospace" font-size="11" fill="#475569">DR ← M[SP]; SP ← SP + 1</text>
</svg>`;

const COA_ADDRESSING_MODES_SVG = `<svg viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="addrArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Instruction Box -->
  <rect x="30" y="40" width="70" height="35" fill="rgba(37,99,235,0.15)" stroke="#2563EB" stroke-width="2"/>
  <text x="65" y="62" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#2563EB">ADD</text>
  <rect x="100" y="40" width="80" height="35" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="2"/>
  <text x="140" y="62" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#059669">500</text>
  <text x="105" y="28" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#475569">Instruction [Opcode | Address]</text>
  <!-- Pointer Arrow Direct -->
  <path d="M 140 75 C 140 120, 260 90, 310 90" stroke="#2563EB" stroke-width="2" marker-end="url(#addrArr)" fill="none"/>
  <!-- Memory Block -->
  <rect x="320" y="25" width="180" height="170" rx="8" fill="rgba(15,23,42,0.04)" stroke="#94A3B8" stroke-width="2"/>
  <text x="410" y="48" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#0F172A">MEMORY</text>
  <rect x="330" y="65" width="160" height="35" fill="rgba(37,99,235,0.12)" stroke="#2563EB" stroke-width="1.5"/>
  <text x="340" y="87" font-family="monospace" font-size="11" font-weight="bold" fill="#2563EB">[500]</text>
  <text x="430" y="87" font-family="monospace" font-size="11" font-weight="bold" fill="#059669">Operand = 42</text>
  <!-- Indirect Pointer -->
  <rect x="330" y="130" width="160" height="35" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="340" y="152" font-family="monospace" font-size="11" font-weight="bold" fill="#D97706">[800]</text>
  <text x="430" y="152" font-family="monospace" font-size="10" fill="#475569">Pointer → EA</text>
  <text x="175" y="165" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#2563EB">Direct: EA = 500</text>
  <text x="175" y="185" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#D97706">Indirect: EA = M[500]</text>
</svg>`;

export const SAMPLE_NOTES_MAP = {
  // ── 1. PHYSICS (JEE Main & Class 11) ──
  'kKKM8Y-u7ds': {
    Hinglish: {
      videoId: 'kKKM8Y-u7ds',
      videoUrl: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
      title: "Newton's Laws of Motion & Friction (Mechanics Crash Course)",
      chapter: "Laws of Motion & Friction",
      subject: "Physics",
      targetExam: "JEE Main & Advanced / CBSE Class 11",
      teachingStyle: "Blackboard Derivations & FBD Solved Numericals",
      channelTitle: "Physics Galaxy / Alakh Sir",
      language: "Hinglish",
      estReadTime: "7 mins",
      createdAt: new Date().toISOString(),
      overview: "Is comprehensive lecture me Newton's Laws of Motion (NLM) aur Friction ko practical real-life examples aur blackboard Free Body Diagrams (FBD) ke saath explain kiya gaya hai. First law (Inertia), Second law (F = dp/dt = ma), aur Third law (Action-Reaction pairs) ke core derivations cover kiye gaye hain. Static vs Kinetic friction transitions, limiting friction, aur angle of repose ke common exam traps ko deeply analyze kiya gaya hai.",
      quickSummary: [
        "Inertia state of rest ya uniform motion maintain karta hai jab tak external unbalanced force na lage.",
        "F_net = m · a tabhi valid hai jab mass constant ho; variable mass systems me F = dp/dt use hota hai.",
        "Action and Reaction forces hamesha distinct interacting bodies par lagte hain aur kabhi cancel nahi hote.",
        "Static friction self-adjusting hai; iski maximum value limiting friction hoti hai (fs_max = μs · N).",
        "Angle of Repose (θ) par block just sliding shuru karta hai, where tan(θ) = μs."
      ],
      keyConcepts: [
        {
          timestamp_start: "00:00",
          timestamp_end: "12:00",
          heading: "1. Free Body Diagram (FBD) Master Technique",
          subheading: "Body isolation, contact forces & coordinate choice",
          points: [
            "Body ko isolated point mass consider karein; sirf wahi forces draw karein jo surrounding body par laga rahi hai.",
            "Normal Reaction (N) hamesha contact surface ke perpendicular pushing nature ka hota hai.",
            "Tension (T) hamesha body se dur (pulling away) point karta hai ideal massless strings me."
          ],
          definitions: [
            "Free Body Diagram (FBD): Ek isolated body ka diagrammatic sketch jisme sirf surrounding ke dwara object par lagaye gaye saare external forces show kiye jaate hain."
          ],
          teacher_tips: [
            "⭐ Yaad Rakho (Alakh Sir): 'Tension pulls, Normal pushes'. Coordinate axis hamesha acceleration ki direction ke parallel aur perpendicular select karo!"
          ],
          common_mistake: {
            mistake: "Object dusre par jo force laga raha hai, use usi body ke FBD me draw kar dena.",
            whyWrong: "Internal action-reaction pairs mix ho jate hain aur equation galat banti hai.",
            correction: "Sirf wahi force draw karo jo EXTERNAL surroundings is block par laga rahe hain."
          },
          solved_example: {
            title: "Tension in Suspended Block System",
            given: "Mass m = 4 kg, suspended by a vertical string in a lift accelerating upwards at a = 2 m/s² (g = 10 m/s²).",
            toFind: "Tension T in string",
            formula: "T - mg = m \\cdot a \\implies T = m(g + a)",
            solution: "Step 1: Write equation along vertical axis: T - (4 × 10) = 4 × 2.\nStep 2: T = 40 + 8 = 48 N.\nStep 3: Stated with standard units.",
            answer: "T = 48 N",
            short_trick: "Upward acceleration adds to effective g: g_eff = g + a = 12 m/s²."
          },
          diagram: {
            heading: "Free Body Diagram (FBD) on Horizontal Surface",
            description: "Blackboard sketch showing Normal force N upwards, Gravity mg downwards, Applied pulling force F, and opposing friction fs.",
            type: "svg",
            labels: ["Normal (N)", "Weight (mg)", "Applied Force (F)", "Friction (fs)"],
            svg_or_mermaid: NLM_DIAGRAM_SVG,
            isStandardDiagram: false,
            timestamp: "04:30"
          },
          table: {
            title: "Comparison: Static vs Kinetic Friction",
            headers: ["Feature", "Static Friction (fs)", "Kinetic Friction (fk)"],
            rows: [
              ["Nature", "Self-adjusting (0 to μs · N)", "Constant (μk · N)"],
              ["Relative Motion", "No relative slipping", "Surfaces actively sliding"],
              ["Coefficient Magnitude", "Higher (μs > μk)", "Slightly lower (μk < μs)"]
            ]
          }
        }
      ],
      formulas: [
        {
          name: "Newton's Second Law",
          formula: "F_{net} = \\frac{dp}{dt} = m \\cdot a",
          variables: "F = Net Force (N), p = momentum (kg m/s), m = mass (kg), a = acceleration (m/s²)",
          units: "Newtons (N)",
          conditions: "Valid in inertial frames with constant mass",
          teacher_tip: "Variable mass systems me F = m(dv/dt) + v(dm/dt) use karein!"
        },
        {
          name: "Limiting Static Friction",
          formula: "f_{s,max} = \\mu_s \\cdot N",
          variables: "fs,max = Limiting friction (N), μs = static coefficient, N = normal reaction (N)",
          units: "Newtons (N)",
          conditions: "At the threshold of impending relative motion",
          teacher_tip: "Horizontal floor par N = mg, inclined plane par N = mg cos(θ)!"
        }
      ],
      importantPYQs: [
        {
          examName: "JEE Main",
          year: "2023 (April Session)",
          question: "A block of mass 5 kg rests on a rough horizontal surface with μs = 0.4 and μk = 0.3. A horizontal force of 15 N is applied. The frictional force acting on the block is (take g = 10 m/s²):",
          options: ["20 N", "15 N", "12 N", "0 N"],
          correctAnswer: "Option B: 15 N",
          solution: "Step 1: Calculate limiting friction fs_max = μs · N = 0.4 · (5 · 10) = 20 N.\nStep 2: Applied force (15 N) < fs_max (20 N). Therefore the block does NOT move.\nStep 3: In static equilibrium, friction matches applied force exactly = 15 N.",
          shortTrick: "Never blindly mark μs · N! Check if applied force overcomes limiting threshold first.",
          difficulty: "Medium"
        },
        {
          examName: "JEE Main",
          year: "2022",
          question: "A body of mass 2 kg is placed on an inclined plane of 30°. If μs = 0.6, find the friction force acting on the block (g = 10 m/s²):",
          options: ["10 N", "10.4 N", "17.32 N", "20 N"],
          correctAnswer: "Option A: 10 N",
          solution: "Downplane force = mg sin(30°) = 2 × 10 × 0.5 = 10 N.\nMax friction = μs mg cos(30°) = 0.6 × 20 × 0.866 = 10.39 N.\nSince 10 N < 10.39 N, body does not slide. Friction = 10 N.",
          shortTrick: "If tan(θ) < μs, body remains stationary and friction = mg sin(θ).",
          difficulty: "Medium"
        },
        {
          examName: "CBSE Class 11",
          year: "2021",
          question: "State Newton's second law and show that it contains the first law as a special case.",
          options: [
            "F = ma implies if F = 0, a = 0 (velocity remains constant)",
            "Action equals reaction under all circumstances",
            "Friction is always proportional to acceleration",
            "Momentum is zero in the absence of external energy"
          ],
          correctAnswer: "Option A: F = ma implies if F = 0, a = 0 (velocity remains constant)",
          solution: "From F = ma, when F_net = 0 and mass m ≠ 0, acceleration a = 0.\nThis means velocity remains unchanged (state of rest or uniform motion is preserved), which is the First Law.",
          shortTrick: "First law is the qualitative definition of force; second law is the quantitative formula.",
          difficulty: "Easy"
        },
        {
          examName: "JEE Main",
          year: "Exam-pattern based",
          question: "Three blocks of masses 2 kg, 3 kg, and 5 kg are in contact on a frictionless table. A force of 20 N pushes the 2 kg block. The contact force between 3 kg and 5 kg is:",
          options: ["20 N", "10 N", "6 N", "4 N"],
          correctAnswer: "Option B: 10 N",
          solution: "Total mass M = 2 + 3 + 5 = 10 kg.\nCommon acceleration a = F / M = 20 / 10 = 2 m/s².\nContact force between 3 kg and 5 kg accelerates the 5 kg block: F_contact = 5 × 2 = 10 N.",
          shortTrick: "Contact force = (mass ahead) × a = 5 × 2 = 10 N.",
          difficulty: "Medium"
        },
        {
          examName: "JEE Main",
          year: "Exam-pattern based",
          question: "A monkey of mass 40 kg climbs on a rope which can stand a maximum tension of 600 N. In which case will the rope break?",
          options: [
            "Climbs up with an acceleration of 6 m/s²",
            "Climbs down with an acceleration of 4 m/s²",
            "Climbs up with a uniform speed of 5 m/s",
            "Falls freely down the rope"
          ],
          correctAnswer: "Option A: Climbs up with an acceleration of 6 m/s²",
          solution: "When climbing up with acceleration a: T = m(g + a) = 40(10 + 6) = 640 N.\nSince 640 N > 600 N (max tension), the rope will break.",
          shortTrick: "Climbing up adds mg + ma; test the upward acceleration option first.",
          difficulty: "Hard"
        }
      ],
      mindMapNodes: [
        "Newton's Laws -> 1st Law (Inertia of Rest & Motion)",
        "Newton's Laws -> 2nd Law (F = dp/dt = ma)",
        "2nd Law -> Constant Mass (F = ma)",
        "2nd Law -> Variable Mass (Rocket Propulsion)",
        "Newton's Laws -> 3rd Law (Action-Reaction Pairs)",
        "Friction -> Static Friction (0 <= fs <= mu_s * N)",
        "Friction -> Kinetic Friction (fk = mu_k * N)",
        "Friction -> Angle of Repose (tan theta = mu_s)"
      ]
    },
    English: {
      videoId: 'kKKM8Y-u7ds',
      videoUrl: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
      title: "Newton's Laws of Motion & Friction (Mechanics Crash Course)",
      chapter: "Laws of Motion & Friction",
      subject: "Physics",
      targetExam: "JEE Main & Advanced / CBSE Class 11",
      teachingStyle: "Blackboard Derivations & FBD Solved Numericals",
      channelTitle: "Physics Galaxy / Alakh Sir",
      language: "English",
      estReadTime: "7 mins",
      createdAt: new Date().toISOString(),
      overview: "Comprehensive classroom notes synthesized from video instructions on Newton's Laws of Motion and Friction. Covers Free Body Diagrams (FBD), inertial and non-inertial frames, static versus kinetic friction, limiting friction, and solved classroom numericals following the standard Given -> To Find -> Solution format.",
      quickSummary: [
        "Inertia preserves the uniform state of rest or motion unless compelled by a net external force.",
        "Newton's second law F = ma holds for constant mass systems; in variable mass systems F = dp/dt.",
        "Action and reaction force pairs act simultaneously on distinct interacting bodies and never cancel each other.",
        "Static friction is self-adjusting with a maximum limiting threshold fs_max = μs · N.",
        "Angle of repose tan(θ) = μs defines the inclination at which impending slipping begins."
      ],
      keyConcepts: [
        {
          timestamp_start: "00:00",
          timestamp_end: "12:00",
          heading: "1. Free Body Diagram (FBD) Methodology",
          subheading: "Body isolation, contact reactions & coordinate selection",
          points: [
            "Isolate the body as a point mass. Draw only external forces exerted ON the body by the surroundings.",
            "Normal Reaction force (N) is always perpendicular to the contact plane in a pushing sense.",
            "Tension (T) along an ideal massless string always acts away from the connected mass."
          ],
          definitions: [
            "Free Body Diagram (FBD): A graphical illustration used to visualize the applied forces, movements, and resulting reactions on a body in a given condition."
          ],
          teacher_tips: [
            "⭐ Faculty Rule: 'Tension pulls away from the body; Normal pushes perpendicular to the contact interface.' Always align axes parallel to acceleration."
          ],
          common_mistake: {
            mistake: "Drawing forces exerted BY the body onto surroundings.",
            whyWrong: "Action-reaction pairs get mixed up and corrupt the resultant equations of motion.",
            correction: "Isolate the chosen mass and include only forces acting directly upon it."
          },
          solved_example: {
            title: "Tension in Suspended Block System",
            given: "Mass m = 4 kg, suspended vertically in an elevator accelerating upward at a = 2 m/s² (g = 10 m/s²).",
            toFind: "Tension T in the cable",
            formula: "T - mg = m \\cdot a \\implies T = m(g + a)",
            solution: "Step 1: Write equation along the vertical axis: T - (4 × 10) = 4 × 2.\nStep 2: T = 40 + 8 = 48 N.\nStep 3: Stated with appropriate SI units.",
            answer: "T = 48 N",
            short_trick: "Upward acceleration yields effective g: g_eff = g + a = 12 m/s²."
          },
          diagram: {
            heading: "Free Body Diagram on Horizontal Plane",
            description: "Clear schematic illustrating Normal reaction N upwards, Weight mg downwards, Pulling force F rightward, and static friction fs leftward.",
            type: "svg",
            labels: ["Normal (N)", "Weight (mg)", "Applied Force (F)", "Friction (fs)"],
            svg_or_mermaid: NLM_DIAGRAM_SVG,
            isStandardDiagram: false,
            timestamp: "04:30"
          },
          table: {
            title: "Comparison: Static vs Kinetic Friction",
            headers: ["Parameter", "Static Friction (fs)", "Kinetic Friction (fk)"],
            rows: [
              ["Nature", "Self-adjusting (0 to μs · N)", "Constant (μk · N)"],
              ["Relative Motion", "No relative displacement", "Surfaces in relative motion"],
              ["Coefficient Magnitude", "Higher (μs > μk)", "Lower (μk < μs)"]
            ]
          }
        }
      ],
      formulas: [
        {
          name: "Newton's Second Law",
          formula: "F_{net} = \\frac{dp}{dt} = m \\cdot a",
          variables: "F = Net Force (N), p = momentum (kg m/s), m = mass (kg), a = acceleration (m/s²)",
          units: "Newtons (N)",
          conditions: "Valid in inertial frames with constant mass",
          teacher_tip: "For variable mass systems, use F = m(dv/dt) + v(dm/dt)!"
        },
        {
          name: "Limiting Static Friction",
          formula: "f_{s,max} = \\mu_s \\cdot N",
          variables: "fs,max = Limiting friction (N), μs = static coefficient, N = normal reaction (N)",
          units: "Newtons (N)",
          conditions: "At the threshold of impending relative motion",
          teacher_tip: "On horizontal floors N = mg; on inclined planes N = mg cos(θ)!"
        }
      ],
      importantPYQs: [
        {
          examName: "JEE Main",
          year: "2023 (April Session)",
          question: "A block of mass 5 kg rests on a rough horizontal surface with μs = 0.4 and μk = 0.3. A horizontal force of 15 N is applied. The frictional force acting on the block is (take g = 10 m/s²):",
          options: ["20 N", "15 N", "12 N", "0 N"],
          correctAnswer: "Option B: 15 N",
          solution: "Step 1: Calculate limiting friction fs_max = μs · N = 0.4 · (5 · 10) = 20 N.\nStep 2: Applied force (15 N) < fs_max (20 N). Therefore the block does NOT move.\nStep 3: In static equilibrium, friction matches applied force exactly = 15 N.",
          shortTrick: "Never blindly mark μs · N! Check if applied force overcomes limiting threshold first.",
          difficulty: "Medium"
        },
        {
          examName: "JEE Main",
          year: "2022",
          question: "A body of mass 2 kg is placed on an inclined plane of 30°. If μs = 0.6, find the friction force acting on the block (g = 10 m/s²):",
          options: ["10 N", "10.4 N", "17.32 N", "20 N"],
          correctAnswer: "Option A: 10 N",
          solution: "Downplane force = mg sin(30°) = 2 × 10 × 0.5 = 10 N.\nMax friction = μs mg cos(30°) = 0.6 × 20 × 0.866 = 10.39 N.\nSince 10 N < 10.39 N, body does not slide. Friction = 10 N.",
          shortTrick: "If tan(θ) < μs, body remains stationary and friction = mg sin(θ).",
          difficulty: "Medium"
        },
        {
          examName: "CBSE Class 11",
          year: "2021",
          question: "State Newton's second law and show that it contains the first law as a special case.",
          options: [
            "F = ma implies if F = 0, a = 0 (velocity remains constant)",
            "Action equals reaction under all circumstances",
            "Friction is always proportional to acceleration",
            "Momentum is zero in the absence of external energy"
          ],
          correctAnswer: "Option A: F = ma implies if F = 0, a = 0 (velocity remains constant)",
          solution: "From F = ma, when F_net = 0 and mass m ≠ 0, acceleration a = 0.\nThis means velocity remains unchanged (state of rest or uniform motion is preserved), which is the First Law.",
          shortTrick: "First law is the qualitative definition of force; second law is the quantitative formula.",
          difficulty: "Easy"
        },
        {
          examName: "JEE Main",
          year: "Exam-pattern based",
          question: "Three blocks of masses 2 kg, 3 kg, and 5 kg are in contact on a frictionless table. A force of 20 N pushes the 2 kg block. The contact force between 3 kg and 5 kg is:",
          options: ["20 N", "10 N", "6 N", "4 N"],
          correctAnswer: "Option B: 10 N",
          solution: "Total mass M = 2 + 3 + 5 = 10 kg.\nCommon acceleration a = F / M = 20 / 10 = 2 m/s².\nContact force between 3 kg and 5 kg accelerates the 5 kg block: F_contact = 5 × 2 = 10 N.",
          shortTrick: "Contact force = (mass ahead) × a = 5 × 2 = 10 N.",
          difficulty: "Medium"
        },
        {
          examName: "JEE Main",
          year: "Exam-pattern based",
          question: "A monkey of mass 40 kg climbs on a rope which can stand a maximum tension of 600 N. In which case will the rope break?",
          options: [
            "Climbs up with an acceleration of 6 m/s²",
            "Climbs down with an acceleration of 4 m/s²",
            "Climbs up with a uniform speed of 5 m/s",
            "Falls freely down the rope"
          ],
          correctAnswer: "Option A: Climbs up with an acceleration of 6 m/s²",
          solution: "When climbing up with acceleration a: T = m(g + a) = 40(10 + 6) = 640 N.\nSince 640 N > 600 N (max tension), the rope will break.",
          shortTrick: "Climbing up adds mg + ma; test the upward acceleration option first.",
          difficulty: "Hard"
        }
      ],
      mindMapNodes: [
        "Newton's Laws -> 1st Law (Inertia)",
        "Newton's Laws -> 2nd Law (F = ma)",
        "Newton's Laws -> 3rd Law (Action-Reaction)",
        "Friction -> Static vs Kinetic",
        "Friction -> Angle of Repose"
      ]
    },
    Hindi: {
      videoId: 'kKKM8Y-u7ds',
      videoUrl: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
      title: "न्यूटन के गति के नियम एवं घर्षण (मैकेनिक्स क्रैश कोर्स)",
      chapter: "गति के नियम एवं घर्षण",
      subject: "Physics",
      targetExam: "JEE Main & Advanced / CBSE Class 11",
      teachingStyle: "ब्लैकबोर्ड व्युत्पत्ति एवं FBD संख्यात्मक प्रश्न",
      channelTitle: "Physics Galaxy / Alakh Sir",
      language: "Hindi",
      estReadTime: "7 mins",
      createdAt: new Date().toISOString(),
      overview: "इस व्याख्यान में न्यूटन के गति के नियम (NLM) और घर्षण को वास्तविक जीवन के उदाहरणों और फ्री बॉडी डायग्राम (FBD) समस्या समाधान तकनीकों के साथ विस्तार से समझाया गया है। प्रथम नियम (जड़त्व), द्वितीय नियम (F = dp/dt = ma), और तृतीय नियम (क्रिया-प्रतिक्रिया युग्म) की संपूर्ण व्याख्या शामिल है।",
      quickSummary: [
        "जड़त्व (Inertia) किसी वस्तु की विरामावस्था या एकसमान गति की अवस्था को बनाए रखता है।",
        "द्रव्यमान नियत होने पर F_net = ma लागू होता है; परिवर्ती द्रव्यमान में F = dp/dt का प्रयोग होता है।",
        "क्रिया और प्रतिक्रिया बल हमेशा अलग-अलग वस्तुओं पर कार्य करते हैं और कभी एक-दूसरे को निरस्त नहीं करते।",
        "स्थैतिक घर्षण (Static Friction) एक स्वतः समायोज्य बल है जिसका अधिकतम मान fs_max = μs · N होता है।",
        "विराम कोण tan(θ) = μs वह कोण है जिस पर वस्तु फिसलना शुरू करती है।"
      ],
      keyConcepts: [
        {
          timestamp_start: "00:00",
          timestamp_end: "12:00",
          heading: "1. फ्री बॉडी डायग्राम (FBD) मास्टर नियम",
          subheading: "वस्तु का पृथक्करण एवं संपर्क बलों का निरूपण",
          points: [
            "वस्तु को एक बिंदु द्रव्यमान के रूप में अलग करें। केवल वही बल बनाएं जो परिवेश द्वारा वस्तु पर लगाए जा रहे हैं।",
            "अभिलंब प्रतिक्रिया बल (N) संपर्क सतह के लंबवत धक्का देने की प्रकृति का होता है।",
            "डोरी में तनाव बल (T) हमेशा वस्तु से दूर खींचने की दिशा में कार्य करता है।"
          ],
          definitions: [
            "फ्री बॉडी डायग्राम (FBD): किसी पिंड पर कार्य करने वाले सभी बाह्य बलों को दर्शाने वाला आरेखीय निरूपण।"
          ],
          teacher_tips: [
            "⭐ शिक्षक ट्रिक: 'तनाव हमेशा दूर खींचता है, अभिलंब हमेशा लंबवत धक्का देता है'। अक्ष हमेशा त्वरण की दिशा में चुनें।"
          ],
          common_mistake: {
            mistake: "वस्तु द्वारा दूसरों पर लगाए गए बलों को FBD में शामिल कर लेना।",
            whyWrong: "क्रिया-प्रतिक्रिया बल आपस में मिल जाते हैं और समीकरण अशुद्ध हो जाता है।",
            correction: "केवल वही बल बनाएं जो परिवेश वस्तु पर आरोपित कर रहा है।"
          },
          solved_example: {
            title: "लिफ्ट में लटके गुटके का तनाव",
            given: "द्रव्यमान m = 4 kg, ऊर्ध्वाधर लिफ्ट में त्वरण a = 2 m/s² ऊपर की ओर (g = 10 m/s²)।",
            toFind: "डोरी में तनाव T",
            formula: "T - mg = m \\cdot a \\implies T = m(g + a)",
            solution: "चरण 1: ऊर्ध्वाधर समीकरण लिखें: T - (4 × 10) = 4 × 2.\nचरण 2: T = 40 + 8 = 48 N.\nचरण 3: SI मात्रक सहित उत्तर।",
            answer: "T = 48 N",
            short_trick: "ऊपर की ओर गति में g_eff = g + a = 12 m/s²।"
          },
          diagram: {
            heading: "क्षैतिज तल पर फ्री बॉडी डायग्राम (FBD)",
            description: "अभिलंब बल N ऊपर, भार mg नीचे, प्रयुक्त बल F दाईं ओर तथा घर्षण fs बाईं ओर।",
            type: "svg",
            labels: ["अभिलंब बल (N)", "भार (mg)", "प्रयुक्त बल (F)", "घर्षण बल (fs)"],
            svg_or_mermaid: NLM_DIAGRAM_SVG,
            isStandardDiagram: false,
            timestamp: "04:30"
          },
          table: {
            title: "तुलना: स्थैतिक बनाम गतिक घर्षण",
            headers: ["लक्षण", "स्थैतिक घर्षण (fs)", "गतिक घर्षण (fk)"],
            rows: [
              ["प्रकृति", "स्वतः समायोज्य (0 से μs · N)", "नियत मान (μk · N)"],
              ["सापेक्ष गति", "कोई गति नहीं", "सतहों में सापेक्ष गति जारी"],
              ["गुणांक मान", "अधिक (μs > μk)", "अपेक्षाकृत कम (μk < μs)"]
            ]
          }
        }
      ],
      formulas: [
        {
          name: "गति का द्वितीय नियम",
          formula: "F_{net} = m \\cdot a",
          variables: "F = बल (न्यूटन), m = द्रव्यमान (किग्रा), a = त्वरण (मी/से²)",
          units: "न्यूटन (N)",
          conditions: "नियत द्रव्यमान जड़त्वीय निर्देश तंत्र में",
          teacher_tip: "परिवर्ती द्रव्यमान में F = dp/dt का प्रयोग करें!"
        }
      ],
      importantPYQs: [
        {
          examName: "JEE Main",
          year: "2023",
          question: "5 किग्रा का गुटका क्षैतिज सतह पर रखा है (μs = 0.4, μk = 0.3)। 15 N का बल लगाया जाता है। घर्षण बल ज्ञात कीजिए (g = 10 m/s²):",
          options: ["20 N", "15 N", "12 N", "0 N"],
          correctAnswer: "Option B: 15 N",
          solution: "सीमांत घर्षण = 0.4 × 50 = 20 N। चूंकि 15 N < 20 N, वस्तु स्थिर रहेगी। अतः घर्षण = 15 N होगा।",
          shortTrick: "यदि प्रयुक्त बल सीमांत घर्षण से कम हो तो घर्षण प्रयुक्त बल के बराबर होता है।",
          difficulty: "Medium"
        },
        {
          examName: "JEE Main",
          year: "2022",
          question: "30° आनत तल पर 2 किग्रा का गुटका रखा है (μs = 0.6)। घर्षण बल का मान ज्ञात करें:",
          options: ["10 N", "10.4 N", "17.32 N", "20 N"],
          correctAnswer: "Option A: 10 N",
          solution: "नीचे की ओर बल = mg sin(30°) = 10 N। सीमांत घर्षण = 10.39 N। अतः घर्षण = 10 N।",
          shortTrick: "यदि tan(θ) < μs तो घर्षण = mg sin(θ)।",
          difficulty: "Medium"
        },
        {
          examName: "CBSE 11th",
          year: "2021",
          question: "न्यूटन के द्वितीय नियम से प्रथम नियम सिद्ध कीजिए:",
          options: [
            "F = ma में F = 0 होने पर a = 0 (गति अवस्था स्थिर)",
            "क्रिया और प्रतिक्रिया हमेशा बराबर",
            "संवेग संरक्षण नियम",
            "घर्षण ऊर्जा हास"
          ],
          correctAnswer: "Option A: F = ma में F = 0 होने पर a = 0",
          solution: "जब F = 0 तो a = 0, अर्थात वस्तु अपनी विरामावस्था या गति की अवस्था बनाए रखती है।",
          shortTrick: "द्वितीय नियम से F=0 रखने पर प्रथम नियम स्वतः सिद्ध हो जाता है।",
          difficulty: "Easy"
        },
        {
          examName: "JEE Main",
          year: "Exam-pattern based",
          question: "2 किग्रा, 3 किग्रा और 5 किग्रा के तीन गुटके संपर्क में हैं। 20 N का धक्का लगाने पर 3 किग्रा और 5 किग्रा के बीच संपर्क बल:",
          options: ["20 N", "10 N", "6 N", "4 N"],
          correctAnswer: "Option B: 10 N",
          solution: "त्वरण a = 20 / 10 = 2 m/s²। संपर्क बल = 5 × 2 = 10 N।",
          shortTrick: "संपर्क बल = (आगे का द्रव्यमान) × a = 5 × 2 = 10 N।",
          difficulty: "Medium"
        },
        {
          examName: "JEE Main",
          year: "Exam-pattern based",
          question: "40 किग्रा का एक बंदर 600 N सहने वाली रस्सी पर चढ़ता है। किस स्थिति में रस्सी टूट जाएगी?",
          options: [
            "6 m/s² के त्वरण से ऊपर चढ़ने पर",
            "4 m/s² के त्वरण से नीचे उतरने पर",
            "5 m/s की एकसमान चाल से चढ़ने पर",
            "मुक्त रूप से नीचे गिरने पर"
          ],
          correctAnswer: "Option A: 6 m/s² के त्वरण से ऊपर चढ़ने पर",
          solution: "ऊपर चढ़ने पर तनाव T = m(g + a) = 40(10 + 6) = 640 N। चूंकि 640 N > 600 N, रस्सी टूट जाएगी।",
          shortTrick: "ऊपर की गति में त्वरण जुड़ता है: T = m(g + a)।",
          difficulty: "Hard"
        }
      ],
      mindMapNodes: [
        "गति के नियम -> प्रथम नियम (जड़त्व)",
        "गति के नियम -> द्वितीय नियम (F = ma)",
        "गति के नियम -> तृतीय नियम (क्रिया-प्रतिक्रिया)",
        "घर्षण -> स्थैतिक बनाम गतिक",
        "घर्षण -> विराम कोण"
      ]
    }
  },

  // ── 2. COMPUTER SCIENCE (GATE & Semester) ──
  'RBSGKlAoi3w': {
    Hinglish: {
      videoId: 'RBSGKlAoi3w',
      videoUrl: 'https://www.youtube.com/watch?v=RBSGKlAoi3w',
      title: "Binary Trees, BST & Tree Traversals",
      chapter: "Binary Search Trees & Traversals",
      subject: "Computer Science",
      targetExam: "GATE CS & University B.Tech",
      teachingStyle: "Whiteboard Data Structure Visualizer & Recursion Trees",
      channelTitle: "Striver / Gate Smashers",
      language: "Hinglish",
      estReadTime: "8 mins",
      createdAt: new Date().toISOString(),
      overview: "Is lecture me Binary Search Tree (BST) property, in-order / pre-order / post-order / level-order traversals, search, insert, and delete operations ko recursion tree memory trace ke saath cover kiya gaya hai. Inorder traversal of BST gives sorted order property aur balanced BST (AVL/Red-Black) complexity comparisons thoroughly explained hain.",
      quickSummary: [
        "BST Property: Left subtree nodes < Root node < Right subtree nodes for every subtree.",
        "Inorder Traversal of BST hamesha strictly sorted (ascending) order yield karta hai.",
        "Search & Insert operations take O(h) time, where h is height. Best case O(log n), Worst case O(n) for skewed trees.",
        "Deletion involves 3 cases: Node with 0 children (leaf), 1 child, or 2 children (replace with Inorder Successor/Predecessor).",
        "Level-order traversal uses a Queue (BFS approach) while DFS uses call stack / recursion."
      ],
      keyConcepts: [
        {
          timestamp_start: "00:00",
          timestamp_end: "14:00",
          heading: "1. BST Property & Inorder Sorted Invariant",
          subheading: "Recursive definition & search mechanics",
          points: [
            "Har node ke liye: Left child aur uska pura subtree strictly smaller key contain karta hai.",
            "Right child aur uska pura subtree strictly greater key contain karta hai.",
            "Duplicates generally BST me allow nahi kiye jaate ya special frequency counters use hote hain."
          ],
          definitions: [
            "Binary Search Tree (BST): Ek binary tree jisme har node par left subtree elements < node < right subtree elements ki property hold karti hai."
          ],
          teacher_tips: [
            "⭐ Striver's Golden Rule: 'Jab bhi BST question aaye, pehle socho kya Inorder Traversal se sorted array banakar do pointers lag sakte hain?'"
          ],
          common_mistake: {
            mistake: "Checking only immediate children instead of the entire subtree range (min, max).",
            whyWrong: "Agar root 50 hai aur right child 70 ke left me 40 aa jaye toh wo local parent 70 se chota hai par root 50 se chota hokar invalid ho jayega.",
            correction: "ValidateBST me hamesha valid range (low, high) carry karein."
          },
          solved_example: {
            title: "Find Inorder Successor in BST",
            given: "BST with root 50, target node = 30 (which has right child 40).",
            toFind: "Inorder successor of 30",
            formula: "Successor = \\min(\\text{right subtree})",
            solution: "Step 1: Node 30 has a right child (40).\nStep 2: Go to right child 40 and find leftmost descendant.\nStep 3: 40 has no left child, so 40 is the inorder successor.",
            answer: "Inorder Successor = 40",
            short_trick: "If right subtree exists: minimum in right subtree. Else: lowest ancestor whose left subtree contains the node."
          },
          diagram: {
            heading: "Binary Search Tree (BST) Structure",
            description: "Binary tree schematic showing Root 50, Left child 30, Right child 70, with leaves 20, 40, 60, 80 satisfying BST ordering.",
            type: "svg",
            labels: ["Root (50)", "Left Subtree (30)", "Right Subtree (70)"],
            svg_or_mermaid: BST_DIAGRAM_SVG,
            isStandardDiagram: false,
            timestamp: "05:15"
          },
          table: {
            title: "Time Complexities: Array vs BST vs Balanced BST",
            headers: ["Data Structure", "Search", "Insert", "Delete"],
            rows: [
              ["Sorted Array", "O(log n) via Binary Search", "O(n) shift", "O(n) shift"],
              ["Standard BST (Skewed)", "O(n) worst case", "O(n) worst case", "O(n) worst case"],
              ["Balanced BST (AVL / RB)", "O(log n)", "O(log n)", "O(log n)"]
            ]
          }
        }
      ],
      formulas: [
        {
          name: "Tree Height to Node Count Relation",
          formula: "h = \\lfloor \\log_2(n) \\rfloor \\implies 2^h - 1 \\ge n",
          variables: "h = tree height, n = total number of nodes",
          units: "Unitless dimension",
          conditions: "Applicable to complete / balanced binary trees",
          teacher_tip: "Skewed BST me h = n ho jata hai jisse complexity O(n) degenerate ho jati hai!"
        }
      ],
      importantPYQs: [
        {
          examName: "GATE CS",
          year: "2023",
          question: "Which traversal of a Binary Search Tree produces the elements in non-decreasing sorted order?",
          options: ["Pre-order", "In-order", "Post-order", "Level-order"],
          correctAnswer: "Option B: In-order",
          solution: "Inorder traversal visits Left Subtree -> Root -> Right Subtree. In a BST, Left < Root < Right, which precisely produces strictly sorted ascending sequence.",
          shortTrick: "Inorder of BST is ALWAYS sorted.",
          difficulty: "Easy"
        },
        {
          examName: "GATE CS",
          year: "2022",
          question: "The worst case running time to search for an element in a balanced binary search tree with n elements is:",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctAnswer: "Option B: O(log n)",
          solution: "In a balanced BST (like AVL or Red-Black tree), the maximum height is strictly bounded by O(log n). Each comparison halves the remaining search space.",
          shortTrick: "Balanced height = log2(n).",
          difficulty: "Easy"
        },
        {
          examName: "GATE CS",
          year: "Exam-pattern based",
          question: "How many distinct binary search trees can be constructed with 3 distinct keys?",
          options: ["5", "6", "9", "12"],
          correctAnswer: "Option A: 5",
          solution: "Number of unique BSTs with n keys is given by the nth Catalan Number: C_n = (2n)! / ((n+1)! * n!). For n = 3: C_3 = 6! / (4! * 3!) = 720 / (24 * 6) = 5.",
          shortTrick: "Catalan series: 1, 1, 2, 5, 14. For n=3 answer is 5.",
          difficulty: "Medium"
        },
        {
          examName: "University Semester",
          year: "Exam-pattern based",
          question: "When deleting a node with two children in a BST, we replace it with its:",
          options: ["Leftmost node in left subtree", "Inorder Successor or Inorder Predecessor", "Root of tree", "Immediate parent"],
          correctAnswer: "Option B: Inorder Successor or Inorder Predecessor",
          solution: "Replacing with Inorder Successor (minimum in right subtree) or Inorder Predecessor (maximum in left subtree) preserves the BST property for both subtrees.",
          shortTrick: "Successor is the immediate next larger element in sorted order.",
          difficulty: "Medium"
        },
        {
          examName: "GATE CS",
          year: "2021",
          question: "A binary search tree is generated by inserting in order: 50, 15, 62, 5, 20, 58, 91, 3, 8, 37, 60, 24. The number of leaf nodes in the resulting tree is:",
          options: ["4", "5", "6", "3"],
          correctAnswer: "Option B: 5",
          solution: "Trace insertions: Leaves are 3, 8, 24, 60, 91. Total leaf nodes = 5.",
          shortTrick: "Quickly sketch the 3 levels and count terminal nodes with degree 0.",
          difficulty: "Hard"
        }
      ],
      mindMapNodes: [
        "Binary Tree -> BST Definition (L < Root < R)",
        "BST -> Traversals (Inorder = Sorted)",
        "BST -> Operations (Search / Insert O(h))",
        "Operations -> Deletion (0, 1, 2 Children Cases)",
        "BST -> Balanced Variants (AVL / Red-Black Tree)"
      ]
    },
    English: {
      videoId: 'RBSGKlAoi3w',
      videoUrl: 'https://www.youtube.com/watch?v=RBSGKlAoi3w',
      title: "Binary Trees, BST & Tree Traversals",
      chapter: "Binary Search Trees & Traversals",
      subject: "Computer Science",
      targetExam: "GATE CS & University B.Tech",
      teachingStyle: "Whiteboard Data Structure Visualizer & Recursion Trees",
      channelTitle: "Striver / Gate Smashers",
      language: "English",
      estReadTime: "8 mins",
      createdAt: new Date().toISOString(),
      overview: "In-depth lecture notes on Binary Search Trees (BST), tree traversals (Inorder, Preorder, Postorder, Level-order), and complexity trade-offs between linear arrays, skewed trees, and balanced search trees.",
      quickSummary: [
        "BST Property: Left subtree keys < Root key < Right subtree keys recursively.",
        "Inorder traversal of any BST guarantees strictly non-decreasing sorted order.",
        "Search and insertion take O(h) time, bounded by O(log n) in balanced trees.",
        "Node deletion handles three distinct topologies: leaf nodes, single-child nodes, and two-child nodes.",
        "Level-order traversal employs a queue data structure (Breadth-First Search)."
      ],
      keyConcepts: [
        {
          timestamp_start: "00:00",
          timestamp_end: "14:00",
          heading: "1. BST Invariant & Recursive Search",
          subheading: "Properties, sorted traversal and recursive descent",
          points: [
            "Every node's left subtree holds strictly lesser values.",
            "Every node's right subtree holds strictly greater values.",
            "BST enables binary search logic on non-contiguous dynamic node structures."
          ],
          definitions: [
            "Binary Search Tree (BST): A node-based binary tree data structure where each node has a key greater than all keys in its left subtree and less than all keys in its right subtree."
          ],
          teacher_tips: [
            "⭐ Top Tip: Whenever BST problems require verification or two-sum patterns, consider using Inorder Traversal."
          ],
          common_mistake: {
            mistake: "Checking only immediate children instead of tracking full valid interval (min, max).",
            whyWrong: "A node might satisfy its immediate parent but violate an ancestor further up the hierarchy.",
            correction: "Pass down lower and upper bounds during recursive tree traversal."
          },
          solved_example: {
            title: "Find Inorder Successor in BST",
            given: "BST with root 50, target node = 30 (which has right child 40).",
            toFind: "Inorder successor of 30",
            formula: "Successor = \\min(\\text{right subtree})",
            solution: "Step 1: Target node 30 possesses a non-empty right subtree.\nStep 2: Navigate to right child 40 and follow left pointers to leaf.\nStep 3: Node 40 has no left child, hence 40 is the immediate successor.",
            answer: "Inorder Successor = 40",
            short_trick: "If right subtree exists: minimum in right subtree. Else: lowest ancestor whose left subtree contains the node."
          },
          diagram: {
            heading: "Binary Search Tree (BST) Schematic",
            description: "Diagram illustrating Root 50 with Left subtree 30 and Right subtree 70 conforming to BST ordering rules.",
            type: "svg",
            labels: ["Root (50)", "Left Subtree (30)", "Right Subtree (70)"],
            svg_or_mermaid: BST_DIAGRAM_SVG,
            isStandardDiagram: false,
            timestamp: "05:15"
          },
          table: {
            title: "Time Complexities: Array vs BST vs Balanced BST",
            headers: ["Data Structure", "Search", "Insert", "Delete"],
            rows: [
              ["Sorted Array", "O(log n)", "O(n)", "O(n)"],
              ["Skewed BST", "O(n)", "O(n)", "O(n)"],
              ["Balanced BST", "O(log n)", "O(log n)", "O(log n)"]
            ]
          }
        }
      ],
      formulas: [
        {
          name: "Tree Height to Node Count Relation",
          formula: "h = \\lfloor \\log_2(n) \\rfloor \\implies 2^h - 1 \\ge n",
          variables: "h = tree height, n = total number of nodes",
          units: "Dimensionless",
          conditions: "Valid for balanced binary trees",
          teacher_tip: "Skewed BST degenerates to linked list with h = n."
        }
      ],
      importantPYQs: [
        {
          examName: "GATE CS",
          year: "2023",
          question: "Which traversal of a Binary Search Tree produces the elements in non-decreasing sorted order?",
          options: ["Pre-order", "In-order", "Post-order", "Level-order"],
          correctAnswer: "Option B: In-order",
          solution: "Inorder traversal visits Left Subtree -> Root -> Right Subtree. In a BST, Left < Root < Right, which precisely produces strictly sorted ascending sequence.",
          shortTrick: "Inorder of BST is ALWAYS sorted.",
          difficulty: "Easy"
        },
        {
          examName: "GATE CS",
          year: "2022",
          question: "The worst case running time to search for an element in a balanced binary search tree with n elements is:",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctAnswer: "Option B: O(log n)",
          solution: "In a balanced BST (like AVL or Red-Black tree), the maximum height is strictly bounded by O(log n). Each comparison halves the remaining search space.",
          shortTrick: "Balanced height = log2(n).",
          difficulty: "Easy"
        },
        {
          examName: "GATE CS",
          year: "Exam-pattern based",
          question: "How many distinct binary search trees can be constructed with 3 distinct keys?",
          options: ["5", "6", "9", "12"],
          correctAnswer: "Option A: 5",
          solution: "Number of unique BSTs with n keys is given by the nth Catalan Number: C_n = (2n)! / ((n+1)! * n!). For n = 3: C_3 = 6! / (4! * 3!) = 720 / (24 * 6) = 5.",
          shortTrick: "Catalan series: 1, 1, 2, 5, 14. For n=3 answer is 5.",
          difficulty: "Medium"
        },
        {
          examName: "University Semester",
          year: "Exam-pattern based",
          question: "When deleting a node with two children in a BST, we replace it with its:",
          options: ["Leftmost node in left subtree", "Inorder Successor or Inorder Predecessor", "Root of tree", "Immediate parent"],
          correctAnswer: "Option B: Inorder Successor or Inorder Predecessor",
          solution: "Replacing with Inorder Successor (minimum in right subtree) or Inorder Predecessor (maximum in left subtree) preserves the BST property for both subtrees.",
          shortTrick: "Successor is the immediate next larger element in sorted order.",
          difficulty: "Medium"
        },
        {
          examName: "GATE CS",
          year: "2021",
          question: "A binary search tree is generated by inserting in order: 50, 15, 62, 5, 20, 58, 91, 3, 8, 37, 60, 24. The number of leaf nodes in the resulting tree is:",
          options: ["4", "5", "6", "3"],
          correctAnswer: "Option B: 5",
          solution: "Trace insertions: Leaves are 3, 8, 24, 60, 91. Total leaf nodes = 5.",
          shortTrick: "Quickly sketch the 3 levels and count terminal nodes with degree 0.",
          difficulty: "Hard"
        }
      ],
      mindMapNodes: [
        "Binary Tree -> BST Definition (L < Root < R)",
        "BST -> Traversals (Inorder = Sorted)",
        "BST -> Operations (Search / Insert O(h))",
        "Operations -> Deletion (0, 1, 2 Children Cases)",
        "BST -> Balanced Variants (AVL / Red-Black Tree)"
      ]
    }
  },

  // ── 3. BIOLOGY (NEET UG) ──
  'Cq_z9x6tWzA': {
    Hinglish: {
      videoId: 'Cq_z9x6tWzA',
      videoUrl: 'https://www.youtube.com/watch?v=Cq_z9x6tWzA',
      title: "Cell Cycle, Mitosis & Meiosis (NEET lines)",
      chapter: "Cell Cycle and Cell Division",
      subject: "Biology (NEET)",
      targetExam: "NEET UG & CBSE Class 11",
      teachingStyle: "NCERT Line-by-Line & Diagrammatic Microscopic Stages",
      channelTitle: "Dr. Anand Mani / Unacademy NEET",
      language: "Hinglish",
      estReadTime: "6 mins",
      createdAt: new Date().toISOString(),
      overview: "NEET biology lecture covering Cell Cycle phases (G1, S, G2, M phase), Mitosis stages (Prophase, Metaphase, Anaphase, Telophase), and Cytokinesis. Special emphasis placed on exact NCERT textbook lines: chromosome condensation, kinetochore spindle attachment, equatorial plate alignment, and centromere splitting.",
      quickSummary: [
        "Human cells in culture divide once every ~24 hours; M phase lasts only ~1 hour (interphase is >95% duration).",
        "S phase (Synthesis) me DNA amount double hota hai (2C -> 4C), lekin chromosome number constant rehta hai (2n -> 2n).",
        "Metaphase me chromosomes thickest hote hain; morphology best study Metaphase me hoti hai.",
        "Anaphase me centromere split hota hai aur sister chromatids opposite poles ki taraf move karti hain.",
        "Plant cytokinesis cell plate method (centrifugal) se hota hai; animal cytokinesis furrow method (centripetal) se."
      ],
      keyConcepts: [
        {
          timestamp_start: "00:00",
          timestamp_end: "12:00",
          heading: "1. Mitosis Stages & Metaphasic Plate (NCERT line)",
          subheading: "Prophase, Metaphase, Anaphase & Telophase sequencing",
          points: [
            "Prophase: Chromosomal material condenses, centrosomes move to opposite poles, nuclear envelope dissolves.",
            "Metaphase: Spindle fibres attach to kinetochores; chromosomes lie at equator (metaphase plate).",
            "Anaphase: Centromeres split simultaneously; sister chromatids separate toward opposite poles."
          ],
          definitions: [
            "Metaphase Plate: The equatorial plane along which chromosomes align at metaphase, perpendicular to the spindle axis."
          ],
          teacher_tips: [
            "⭐ NEET Alert (Dr. Anand Mani): 'Morphology of chromosome is studied at Metaphase, whereas shape (V, L, J, I) is studied at Anaphase!' Yaad rakhna!"
          ],
          common_mistake: {
            mistake: "Confusing DNA content doubling with chromosome number doubling.",
            whyWrong: "In S-phase, DNA replicates from 2C to 4C, but chromosome number remains 2n.",
            correction: "Chromosome count doubles only in Anaphase when centromeres split!"
          },
          solved_example: {
            title: "Calculate Chromosome and Chromatid Count",
            given: "A diploid human cell has 2n = 46 chromosomes at G1 phase.",
            toFind: "Number of chromosomes and chromatids at G2 phase",
            formula: "\\text{G2: Chromosomes} = 2n, \\text{Chromatids} = 4n",
            solution: "Step 1: S phase doubles DNA, but sister chromatids remain attached at single centromere.\nStep 2: Number of chromosomes = 46.\nStep 3: Number of chromatids = 46 × 2 = 92.",
            answer: "46 Chromosomes, 92 Chromatids",
            short_trick: "Centromere count = Chromosome count. At G2, centromere count remains 46."
          },
          diagram: {
            heading: "Cell Cycle Phases & Mitotic Stages",
            description: "Circular cell cycle showing G1, S (DNA replication), G2, and M phase with Prophase, Metaphase, Anaphase, Telophase breakdown.",
            type: "svg",
            labels: ["G1 Phase", "S Phase (DNA x2)", "G2 Phase", "M Phase (Mitosis)"],
            svg_or_mermaid: CELL_CYCLE_SVG,
            isStandardDiagram: true,
            timestamp: "03:40"
          },
          table: {
            title: "NCERT Comparison: Mitosis vs Meiosis I",
            headers: ["Feature", "Mitosis (Equational)", "Meiosis I (Reductional)"],
            rows: [
              ["Chromosome Number", "Remains same (2n -> 2n)", "Halved (2n -> n)"],
              ["Crossing Over (Pachytene)", "Absent", "Present between non-sister chromatids"],
              ["Centromere Splitting", "Splits at Anaphase", "Does NOT split at Anaphase I"]
            ]
          }
        }
      ],
      formulas: [
        {
          name: "DNA Content vs Chromosome Ploidy",
          formula: "G_1 (2n, 2C) \\xrightarrow{S\\text{-phase}} G_2 (2n, 4C) \\xrightarrow{\\text{Anaphase}} (4n, 4C) \\xrightarrow{\\text{Telophase}} 2 \\times (2n, 2C)",
          variables: "n = haploid chromosome set, C = DNA mass constant",
          units: "Picograms / Ploidy",
          conditions: "Standard diploid somatic eukaryotic cell cycle",
          teacher_tip: "NCERT question: If onion root tip cell has 16 chromosomes in G1, after S phase chromosomes = 16, DNA = 4C."
        }
      ],
      importantPYQs: [
        {
          examName: "NEET UG",
          year: "2023",
          question: "Which of the following stages of meiosis involves division of centromere?",
          options: ["Metaphase I", "Anaphase II", "Telophase II", "Metaphase II"],
          correctAnswer: "Option B: Anaphase II",
          solution: "In Meiosis I (Anaphase I), homologous chromosomes separate without centromere division. Centromere splits during Anaphase II (similar to mitotic anaphase).",
          shortTrick: "Centromere splits in Anaphase of Mitosis and Anaphase II of Meiosis.",
          difficulty: "Medium"
        },
        {
          examName: "NEET UG",
          year: "2022",
          question: "During which phase of the cell cycle does DNA replication take place?",
          options: ["G1 phase", "S phase", "G2 phase", "M phase"],
          correctAnswer: "Option B: S phase",
          solution: "Direct NCERT line: In animal cells, during the S phase, DNA replication begins in the nucleus, and the centriole duplicates in the cytoplasm.",
          shortTrick: "S stands for Synthesis of DNA.",
          difficulty: "Easy"
        },
        {
          examName: "NEET UG",
          year: "2021",
          question: "The fruit fly has 8 chromosomes (2n) in each cell. During interphase, what is the number of chromosomes at the end of S phase?",
          options: ["8", "16", "4", "32"],
          correctAnswer: "Option A: 8",
          solution: "Direct NCERT Line (Page 163): S phase doubles DNA amount (from 2C to 4C), but there is NO increase in chromosome number. If cell has 8 chromosomes at G1, even after S phase chromosomes remain 8.",
          shortTrick: "Chromosome count never changes in S phase.",
          difficulty: "Medium"
        },
        {
          examName: "NEET UG",
          year: "Exam-pattern based",
          question: "Attachment of spindle fibres to kinetochores of chromosomes becomes clearly visible in:",
          options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
          correctAnswer: "Option B: Metaphase",
          solution: "NCERT line: Kinetochores serve as the sites of attachment of spindle fibres to the chromosomes that are moved into position at the centre of the cell during Metaphase.",
          shortTrick: "Metaphase = Middle alignment + Kinetochore attachment.",
          difficulty: "Medium"
        },
        {
          examName: "NEET UG",
          year: "Exam-pattern based",
          question: "Dissolution of the synaptonemal complex occurs during which stage of Prophase I?",
          options: ["Leptotene", "Zygotene", "Pachytene", "Diplotene"],
          correctAnswer: "Option D: Diplotene",
          solution: "NCERT line: The beginning of diplotene is recognized by the dissolution of the synaptonemal complex and the tendency of recombined homologous chromosomes to separate, forming X-shaped chiasmata.",
          shortTrick: "Mnemonic: 'L-Z-P-D-D' -> Leptotene (Condensation), Zygotene (Synapsis), Pachytene (Crossing over), Diplotene (Dissolution/Chiasmata), Diakinesis (Terminalization).",
          difficulty: "Hard"
        }
      ],
      mindMapNodes: [
        "Cell Cycle -> Interphase (>95% duration)",
        "Interphase -> G1 (Growth & RNA)",
        "Interphase -> S Phase (DNA 2C -> 4C)",
        "Interphase -> G2 (Protein synthesis)",
        "Cell Cycle -> M Phase (Mitosis)",
        "M Phase -> Karyokinesis (P-M-A-T)",
        "Karyokinesis -> Metaphase (Equator Plate)",
        "Karyokinesis -> Anaphase (Centromere Splits)",
        "M Phase -> Cytokinesis (Furrow vs Cell Plate)"
      ]
    },
    English: {
      videoId: 'Cq_z9x6tWzA',
      videoUrl: 'https://www.youtube.com/watch?v=Cq_z9x6tWzA',
      title: "Cell Cycle, Mitosis & Meiosis (NEET lines)",
      chapter: "Cell Cycle and Cell Division",
      subject: "Biology (NEET)",
      targetExam: "NEET UG & CBSE Class 11",
      teachingStyle: "NCERT Line-by-Line & Diagrammatic Microscopic Stages",
      channelTitle: "Dr. Anand Mani / Unacademy NEET",
      language: "English",
      estReadTime: "6 mins",
      createdAt: new Date().toISOString(),
      overview: "Standard high-yield notes on Cell Cycle and Division with NCERT citation lines, mitosis phases, chromosome mechanics, and top 5 NEET exam pattern questions.",
      quickSummary: [
        "Interphase comprises >95% of cell cycle duration; M-phase lasts ~1 hour in human cells.",
        "S-phase duplicates DNA content (2C to 4C) without altering chromosome number (2n remains 2n).",
        "Metaphase is optimal for morphological analysis; chromosomes align at the equatorial plate.",
        "Centromeres divide synchronously during Anaphase, pulling chromatids poleward.",
        "Plant cytokinesis proceeds centrifugally via cell plate formation; animal cells cleave centripetally."
      ],
      keyConcepts: [
        {
          timestamp_start: "00:00",
          timestamp_end: "12:00",
          heading: "1. Mitosis Phases & Metaphase Alignment",
          subheading: "Prophase, Metaphase, Anaphase, Telophase sequencing",
          points: [
            "Chromatin condenses into distinct chromosomes during Prophase.",
            "Spindle apparatus attaches to kinetochores during Metaphase.",
            "Sister chromatids disjoin and migrate toward opposite poles at Anaphase."
          ],
          definitions: [
            "Kinetochore: Disc-shaped protein structures on the centromere of chromosomes serving as spindle fiber attachment sites."
          ],
          teacher_tips: [
            "⭐ Top NEET Tip: Chromosome morphology is best observed at Metaphase; chromosome shape (V, L, J, I) at Anaphase."
          ],
          common_mistake: {
            mistake: "Assuming chromosome count doubles in S phase.",
            whyWrong: "Only DNA content doubles (2C to 4C); chromosome ploidy remains 2n until Anaphase.",
            correction: "Count centromeres: centromere count equals chromosome count."
          },
          solved_example: {
            title: "Calculate Chromosome and Chromatid Count",
            given: "Human somatic diploid cell has 2n = 46 chromosomes in G1 phase.",
            toFind: "Number of chromosomes and chromatids in G2 phase",
            formula: "\\text{G2 Chromosomes} = 46, \\text{Chromatids} = 92",
            solution: "Step 1: In S-phase, DNA replicates to form two sister chromatids joined at one centromere.\nStep 2: Number of chromosomes = 46.\nStep 3: Number of chromatids = 46 × 2 = 92.",
            answer: "46 Chromosomes, 92 Chromatids",
            short_trick: "Centromeres do not divide in S-phase."
          },
          diagram: {
            heading: "Cell Cycle Diagram",
            description: "Circular diagram displaying G1, S, G2 interphase segments alongside M-phase mitotic progression.",
            type: "svg",
            labels: ["G1 Phase", "S Phase (DNA x2)", "G2 Phase", "M Phase (Mitosis)"],
            svg_or_mermaid: CELL_CYCLE_SVG,
            isStandardDiagram: true,
            timestamp: "03:40"
          },
          table: {
            title: "NCERT Comparison: Mitosis vs Meiosis I",
            headers: ["Feature", "Mitosis", "Meiosis I"],
            rows: [
              ["Chromosome Number", "Preserved (2n -> 2n)", "Halved (2n -> n)"],
              ["Crossing Over", "Absent", "Occurs at Pachytene"],
              ["Centromere Division", "Occurs at Anaphase", "Does NOT occur at Anaphase I"]
            ]
          }
        }
      ],
      formulas: [
        {
          name: "DNA Content vs Chromosome Ploidy",
          formula: "G_1 (2n, 2C) \\xrightarrow{S\\text{-phase}} G_2 (2n, 4C) \\xrightarrow{\\text{Anaphase}} (4n, 4C) \\xrightarrow{\\text{Telophase}} 2 \\times (2n, 2C)",
          variables: "n = haploid chromosome set, C = DNA mass constant",
          units: "Picograms / Ploidy",
          conditions: "Standard diploid somatic eukaryotic cell cycle",
          teacher_tip: "NCERT question: If cell has 16 chromosomes in G1, after S phase chromosomes = 16, DNA = 4C."
        }
      ],
      importantPYQs: [
        {
          examName: "NEET UG",
          year: "2023",
          question: "Which of the following stages of meiosis involves division of centromere?",
          options: ["Metaphase I", "Anaphase II", "Telophase II", "Metaphase II"],
          correctAnswer: "Option B: Anaphase II",
          solution: "In Meiosis I (Anaphase I), homologous chromosomes separate without centromere division. Centromere splits during Anaphase II (similar to mitotic anaphase).",
          shortTrick: "Centromere splits in Anaphase of Mitosis and Anaphase II of Meiosis.",
          difficulty: "Medium"
        },
        {
          examName: "NEET UG",
          year: "2022",
          question: "During which phase of the cell cycle does DNA replication take place?",
          options: ["G1 phase", "S phase", "G2 phase", "M phase"],
          correctAnswer: "Option B: S phase",
          solution: "Direct NCERT line: In animal cells, during the S phase, DNA replication begins in the nucleus, and the centriole duplicates in the cytoplasm.",
          shortTrick: "S stands for Synthesis of DNA.",
          difficulty: "Easy"
        },
        {
          examName: "NEET UG",
          year: "2021",
          question: "The fruit fly has 8 chromosomes (2n) in each cell. During interphase, what is the number of chromosomes at the end of S phase?",
          options: ["8", "16", "4", "32"],
          correctAnswer: "Option A: 8",
          solution: "Direct NCERT Line (Page 163): S phase doubles DNA amount (from 2C to 4C), but there is NO increase in chromosome number. If cell has 8 chromosomes at G1, even after S phase chromosomes remain 8.",
          shortTrick: "Chromosome count never changes in S phase.",
          difficulty: "Medium"
        },
        {
          examName: "NEET UG",
          year: "Exam-pattern based",
          question: "Attachment of spindle fibres to kinetochores of chromosomes becomes clearly visible in:",
          options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
          correctAnswer: "Option B: Metaphase",
          solution: "NCERT line: Kinetochores serve as the sites of attachment of spindle fibres to the chromosomes that are moved into position at the centre of the cell during Metaphase.",
          shortTrick: "Metaphase = Middle alignment + Kinetochore attachment.",
          difficulty: "Medium"
        },
        {
          examName: "NEET UG",
          year: "Exam-pattern based",
          question: "Dissolution of the synaptonemal complex occurs during which stage of Prophase I?",
          options: ["Leptotene", "Zygotene", "Pachytene", "Diplotene"],
          correctAnswer: "Option D: Diplotene",
          solution: "NCERT line: The beginning of diplotene is recognized by the dissolution of the synaptonemal complex and the tendency of recombined homologous chromosomes to separate, forming X-shaped chiasmata.",
          shortTrick: "Mnemonic: 'L-Z-P-D-D' -> Leptotene (Condensation), Zygotene (Synapsis), Pachytene (Crossing over), Diplotene (Dissolution/Chiasmata), Diakinesis (Terminalization).",
          difficulty: "Hard"
        }
      ],
      mindMapNodes: [
        "Cell Cycle -> Interphase (>95% duration)",
        "Interphase -> G1 (Growth & RNA)",
        "Interphase -> S Phase (DNA 2C -> 4C)",
        "Interphase -> G2 (Protein synthesis)",
        "Cell Cycle -> M Phase (Mitosis)",
        "M Phase -> Karyokinesis (P-M-A-T)",
        "Karyokinesis -> Metaphase (Equator Plate)",
        "Karyokinesis -> Anaphase (Centromere Splits)",
        "M Phase -> Cytokinesis (Furrow vs Cell Plate)"
      ]
    }
  },

  // ── 4. COMPUTER SCIENCE: COA UNIT 1 (AKTU B.Tech & GATE CS) ──
  'coa-unit-1': {
    Hinglish: {
      videoId: 'coa-unit-1',
      videoUrl: 'https://www.youtube.com/watch?v=coa-unit-1',
      title: "COA Unit 1: Computer Organization & Architecture One-Shot (AKTU B.Tech BCS302)",
      chapter: "Computer Organization & Architecture (Unit 1)",
      subject: "Computer Science & Engineering",
      targetExam: "AKTU B.Tech (BCS302) / GATE CS",
      teachingStyle: "Blackboard Block Diagrams, Bus Timing & Micro-operation Derivations",
      channelTitle: "Gate Smashers / Knowledge Gate",
      language: "Hinglish",
      estReadTime: "12 mins read",
      createdAt: new Date().toISOString(),
      overview: "Yeh complete one-shot lecture AKTU B.Tech 2nd Year Computer Science (BCS302) ke Unit 1 ko cover karta hai. Isme Computer Architecture (programmer-visible features jaise instruction sets, addressing modes) aur Computer Organization (hardware components jaise control signals, memory interfaces) ka fundamental difference clear kiya gaya hai. Digital computer ke functional units (Input, CPU, ALU, Memory hierarchy, Output), Bus Interconnection structures, Bus Arbitration (Daisy Chaining vs Polling), Three-State Bus Buffers, CPU Registers (PC, IR, MAR, MDR, AC), Stack Memory (PUSH/POP micro-operations with SP), aur sabhi 8 Addressing Modes ko with numericals aur board derivations thoroughly explain kiya gaya hai.",
      quickSummary: [
        "Architecture = 'What computer does' (programmer visible, e.g. instruction set, addressing modes). Organization = 'How computer does it' (internal hardware signals, bus interface).",
        "Primary Memory (RAM) temporary aur high-speed hoti hai jo directly CPU se interact karti hai; Secondary Memory (HDD/SSD) permanent aur slower hoti hai.",
        "System Bus me Data Bus (Bi-directional), Address Bus (Uni-directional from CPU to memory), aur Control Bus (Bi-directional control timing signals) hote hain.",
        "Daisy Chaining serial priority arbitration hai (fewer control lines, but slowest priority to last device); Polling centralized arbitration hai jo programmable priority offer karti hai.",
        "Three-state buffer high-impedance state (Hi-Z) provide karta hai taaki multiple devices bina electrical conflict ke ek common bus wire share kar sakein.",
        "Program Counter (PC) next instruction ka address hold karta hai, jabki Instruction Register (IR) current executing opcode ko hold karta hai.",
        "Stack Memory LIFO (Last-In-First-Out) principle par kaam karti hai jisme PUSH micro-operation SP ko decrement/increment karti hai aur POP data retrieve karta hai.",
        "Addressing Modes determine karte hain ki operand kahan stored hai. Immediate mode me operand instruction me hi hota hai (Fastest); Indirect mode me memory pointer use hota hai."
      ],
      keyConcepts: [
        {
          timestamp_start: "01:24",
          timestamp_end: "06:52",
          heading: "1. Computer Architecture vs. Computer Organization",
          subheading: "Conceptual boundary, user-visible attributes vs hardware implementation",
          definitions: [
            "Computer Architecture refers to the logical design, structure, and programmer-visible attributes of a computer system (e.g. instruction set architecture, addressing modes, data types, register bits).",
            "Computer Organization refers to the physical implementation, operational units, and internal hardware interconnections that realize the architectural specifications (e.g. control signals, memory interfaces, bus technology)."
          ],
          points: [
            "Architecture answer karti hai 'Computer me kya-kya capabilities hain', jabki Organization answer karti hai 'Hardware physically kaise kaam kar raha hai'.",
            "Ek single Computer Architecture (jaise x86 ya ARM) ke multiple alag-alag Computer Organizations ho sakte hain (jaise Intel Core i5 vs i7 vs i9).",
            "Programmer ko architecture visible hoti hai (jaise instruction formats, register set, memory addressing), jabki internal clock speed, bus width, aur hardware circuitry organization ka part hain.",
            "Exam comparison rule: Agar instruction set badalta hai toh architecture change hoti hai; agar bus technology ya cache size badalti hai toh sirf organization modify hoti hai."
          ],
          table: {
            title: "Comparison: Computer Architecture vs Computer Organization (AKTU 5-Mark Must-Know)",
            headers: ["Parameter", "Computer Architecture", "Computer Organization"],
            rows: [
              ["Definition", "Logical design & user-visible features", "Physical hardware interconnection"],
              ["Visibility", "Visible to programmer / assembly developer", "Transparent / invisible to programmer"],
              ["Example", "Instruction Set, Addressing Modes, Data Formats", "Clock frequency, Bus arbitration, Control unit logic"],
              ["Change Impact", "Changes entire software compatibility", "Upgrades hardware performance without changing code"]
            ]
          },
          diagram: {
            heading: "Computer Architecture vs Computer Organization Layered Model",
            description: "Teacher's blackboard diagram distinguishing programmer-visible instruction set specifications from internal hardware realization modules.",
            type: "svg",
            labels: ["Programmer ISA View", "Hardware Realization View"],
            svg_or_mermaid: COA_ARCH_VS_ORG_SVG,
            isStandardDiagram: false,
            timestamp: "01:24"
          },
          teacher_tips: [
            "AKTU 2-mark & 5-mark question: Hamesha Intel x86 family ka example dena — Architecture same rehti hai lekin har generation me Organization improve hoti hai!"
          ],
          common_mistake: {
            mistake: "Architecture aur Organization ko interchangeable samajhna.",
            whyWrong: "AKTU exams me 5 marks deduct ho jate hain.",
            correction: "Clearly state: Architecture is 'WHAT to do' (Design), Organization is 'HOW to do' (Implementation)."
          }
        },
        {
          timestamp_start: "09:34",
          timestamp_end: "15:47",
          heading: "2. Functional Units of a Computer & Memory Hierarchy",
          subheading: "Block diagram, CPU (ALU + Control Unit), Primary RAM vs Secondary Storage",
          definitions: [
            "Functional Units are the core modular subsystems of a digital computer: Input Unit, Central Processing Unit (ALU + CU), Memory Unit (Primary + Secondary), and Output Unit."
          ],
          points: [
            "Input Unit external data aur instructions ko binary electronic signals (0s and 1s) me convert karke system bus par bhejti hai.",
            "CPU is the brain containing ALU (Arithmetic & Logic Unit for addition, subtraction, AND, OR) aur Control Unit (CU - which generates timing and synchronization pulses).",
            "Primary Memory (RAM): Temporary, volatile storage jo direct CPU bus se connected hoti hai. Access time nanoseconds me hota hai.",
            "Secondary Memory (HDD/SSD): Permanent non-volatile storage jo bulk files store karti hai. CPU direct secondary storage access nahi kar sakta; pehle RAM me load karna padta hai.",
            "Output Unit processed binary results ko human-readable format me display karti hai (Monitor, Printer)."
          ],
          table: {
            title: "Primary Memory vs Secondary Memory (AKTU Exam Favorite)",
            headers: ["Feature", "Primary Memory (RAM / ROM)", "Secondary Memory (HDD / SSD)"],
            rows: [
              ["Nature", "Volatile (RAM loses data on power off)", "Non-volatile (Permanent data retention)"],
              ["Speed & Access", "Extremely fast (Access time in nanoseconds)", "Comparatively slower (Access time in milliseconds)"],
              ["CPU Connection", "Directly accessible via system bus", "Indirect (Transferred to RAM first via I/O channel)"],
              ["Capacity & Cost", "Limited capacity, High cost per byte", "Massive capacity, Low cost per gigabyte"]
            ]
          },
          diagram: {
            heading: "Functional Units of Digital Computer & Bus Interface",
            description: "Complete block diagram with CPU (ALU + Control Unit), Memory Hierarchy, and Input/Output with solid Data lines and dashed Control lines.",
            type: "svg",
            labels: ["Input Unit", "CPU (CU + ALU)", "Memory Unit", "Output Unit"],
            svg_or_mermaid: COA_FUNCTIONAL_UNITS_SVG,
            isStandardDiagram: false,
            timestamp: "09:34"
          },
          teacher_tips: [
            "AKTU 10-mark question: Block diagram me Control signals ko hamesha dashed line (- - ->) se draw karo aur Data signals ko solid line (——>) se!"
          ]
        },
        {
          timestamp_start: "15:57",
          timestamp_end: "25:31",
          heading: "3. Computer Bus Interconnection System",
          subheading: "Data Bus, Address Bus, Control Bus & Single vs Multiple Bus Architecture",
          definitions: [
            "A Bus is a shared communication pathway consisting of multiple physical wires that transfer binary data, addresses, and control timing signals between CPU, memory, and peripheral devices."
          ],
          points: [
            "Data Bus: Carries actual data bytes between CPU, memory, and I/O. It is strictly BI-DIRECTIONAL (CPU can read data in and write data out). Width defines word size (e.g. 32-bit or 64-bit).",
            "Address Bus: Carries memory address or I/O port address. It is strictly UNI-DIRECTIONAL (CPU generates the memory address to select a specific location). Width determines addressable memory: 2^n bytes.",
            "Control Bus: Transmits command, status, and synchronization signals (e.g. Memory Read, Memory Write, I/O Read, Bus Request, Clock, Reset). Bi-directional.",
            "Single Bus Structure: Low cost and simple, but creates a bottleneck because all devices share one pathway.",
            "Multiple Bus Structure: High bandwidth; separates high-speed CPU-Memory bus from slower peripheral I/O buses."
          ],
          formulas: [
            {
              name: "Addressable Memory Capacity",
              formula: "\\text{Capacity} = 2^k \\times W",
              variables: "k = \\text{number of address lines}, W = \\text{word size in bytes}",
              units: "Bytes / Megabytes / Gigabytes",
              conditions: "Holds for byte-addressable memory architecture"
            }
          ],
          teacher_tips: [
            "Formula shortcut: Agar 16-bit address bus hai toh capacity = 2^16 = 65,536 locations = 64 KB!"
          ],
          diagram: {
            heading: "System Tri-Bus Interconnection Architecture",
            description: "Whiteboard diagram showing Address Bus (uni-directional), Data Bus (bi-directional), and Control Bus lines interconnecting CPU, Memory, and I/O.",
            type: "svg",
            labels: ["Address Bus (Uni)", "Data Bus (Bi)", "Control Bus (Bi)"],
            svg_or_mermaid: COA_SYSTEM_BUS_SVG,
            isStandardDiagram: false,
            timestamp: "15:57"
          }
        },
        {
          timestamp_start: "25:40",
          timestamp_end: "43:20",
          heading: "4. Bus Arbitration Protocols: Daisy Chaining vs Polling",
          subheading: "Contention management, Bus Master assignment, serial vs centralized priority",
          definitions: [
            "Bus Arbitration is the mechanism used by the computer hardware to resolve conflicts when multiple master devices (CPU, DMA controller) simultaneously request access to the shared system bus."
          ],
          points: [
            "Daisy Chaining (Serial Priority Arbitration): Bus Request line (BR) sabhi devices me common hoti hai. Controller Bus Grant line (BG) bhejta hai jo Device 1 -> Device 2 -> Device 3 serial order me pass hoti hai.",
            "Daisy Chaining Advantage: Minimal hardware lines required (only 3 control lines: BR, BG, Busy).",
            "Daisy Chaining Disadvantage: Device 1 has highest priority, last device suffers starvation. Propagation delay increases with number of devices.",
            "Polling (Centralized Arbitration): Controller polling address lines generate karta hai (00, 01, 10, 11). Jo device match karta hai wo bus capture karta hai.",
            "Polling Advantage: Programmable priority (round-robin ya dynamic priority possible hai). Agar ek device fail ho jaye toh system halt nahi hota.",
            "Independent Request (Parallel Arbitration): Har device ki dedicated Request aur Grant line hoti hai. Fastest response, but maximum hardware pin count."
          ],
          teacher_tips: [
            "AKTU 7-mark question: Comparison table me 'Number of Control Lines' aur 'Failure Resilience' point zaroor likhna!"
          ],
          diagram: {
            heading: "Daisy Chaining Serial Priority Bus Arbitration Schematic",
            description: "Serial Bus Grant (BG) propagation line through Device 1 (Highest priority) to Device 3 (Lowest priority), connected with common Bus Request (BR) and Bus Busy (BBSY) lines.",
            type: "svg",
            labels: ["Bus Controller", "Device 1 (Highest)", "Device 2", "Device 3 (Lowest)"],
            svg_or_mermaid: COA_BUS_ARBITRATION_SVG,
            isStandardDiagram: false,
            timestamp: "25:40"
          },
          common_mistake: {
            mistake: "Daisy chaining me agar device 1 request nahi kar raha toh sochna ki grant ruk jayega.",
            whyWrong: "Device 1 grant ko aage Device 2 ko pass on kar deta hai.",
            correction: "Device only consumes the grant if it actively requested the bus; otherwise it propagates the signal forward."
          }
        },
        {
          timestamp_start: "43:23",
          timestamp_end: "47:02",
          heading: "5. Three-State Bus Buffer Logic & Bus Contention Resolution",
          subheading: "Tri-state gate operation, High-Impedance state (Hi-Z), preventing short circuits",
          definitions: [
            "A Three-State Buffer (Tri-state buffer) is a digital logic gate that exhibits three distinct output states: Logic 0 (Low), Logic 1 (High), and High-Impedance (Hi-Z or floating open-circuit)."
          ],
          points: [
            "Jab multiple registers ek hi bus wire se jude hote hain, agar do registers simultaneously 0 aur 1 output karein toh direct short-circuit (bus contention) ho jayega.",
            "Tri-state buffer me ek data input line (A), ek control/enable input (E), aur output (Y) hoti hai.",
            "When Enable E = 1: Buffer acts as a normal closed switch, passing Input to Output (Y = A).",
            "When Enable E = 0: Output goes into High-Impedance State (Hi-Z). Device electrically disconnect ho jata hai bus se.",
            "Decoders are used to ensure that at any given nanosecond, EXACTLY ONE register's tri-state buffer is enabled (E = 1) onto the common bus."
          ],
          teacher_tips: [
            "Hi-Z state ko 'Open Switch' ki tarah visualize karo — circuit physically disconnected lagta hai!"
          ],
          diagram: {
            heading: "Three-State Bus Buffer Logic & Hi-Z Isolation",
            description: "Tri-state gate operation showing Input A, Enable line C, Output Y, and Truth Table with normal vs High-Impedance (Hi-Z) open-switch states.",
            type: "svg",
            labels: ["Input A", "Control C", "Output Y", "Hi-Z State"],
            svg_or_mermaid: COA_TRISTATE_BUFFER_SVG,
            isStandardDiagram: false,
            timestamp: "43:23"
          }
        },
        {
          timestamp_start: "58:24",
          timestamp_end: "1:04:07",
          heading: "6. Basic Computer Registers & Word Formats",
          subheading: "PC, IR, MAR, MDR, AC, TR, INPR, OUTR with bit specifications",
          definitions: [
            "Registers are high-speed, temporary electronic storage cells inside the CPU fabricated using D-flip-flops, providing zero wait-state access to operational data."
          ],
          points: [
            "Program Counter (PC): 12-bit register jo memory se fetch hone wali agli instruction ka address store karta hai.",
            "Memory Address Register (MAR): 12-bit register jo address bus se connected hota hai, defining which memory cell to read/write.",
            "Instruction Register (IR): 16-bit register jo current instruction code (Opcode + Addressing Mode + Operand Address) ko hold karta hai.",
            "Accumulator (AC): 16-bit general processor register jo ALU operations ke intermediate results store karta hai.",
            "Memory Buffer Register (MBR/MDR): 16-bit data holding register between CPU internal bus and memory data bus.",
            "Temporary Register (TR): 16-bit storage for scratchpad arithmetic data."
          ],
          teacher_tips: [
            "Mano Basic Computer architecture me: Address registers (PC, MAR) = 12 bits; Data registers (AC, IR, DR, TR) = 16 bits!"
          ],
          diagram: {
            heading: "Basic Computer Registers & Memory Interconnect Flow",
            description: "Register transfer architecture showing PC, MAR, Memory Unit, MBR, and IR data path coordination.",
            type: "svg",
            labels: ["PC", "MAR", "Memory Unit", "MBR", "IR"],
            svg_or_mermaid: COA_REGISTERS_MEMORY_SVG,
            isStandardDiagram: false,
            timestamp: "58:24"
          }
        },
        {
          timestamp_start: "1:08:33",
          timestamp_end: "1:15:36",
          heading: "7. General Register File & Stack Organization",
          subheading: "LIFO mechanism, Stack Pointer (SP), PUSH and POP micro-operations",
          definitions: [
            "Stack Organization is a memory structure operating on Last-In-First-Out (LIFO) protocol where data is inserted (PUSH) and retrieved (POP) strictly through one access point called the Top of Stack (TOS)."
          ],
          points: [
            "Stack Pointer (SP): Special register that stores the binary address of the current top element of the stack.",
            "PUSH Micro-operation: SP is decremented (or incremented depending on stack growth), then data from processor register is written to Memory[SP]. SP <- SP - 1, M[SP] <- DR.",
            "POP Micro-operation: Data from Memory[SP] is read into processor register, then SP is incremented. DR <- M[SP], SP <- SP + 1.",
            "Full Stack vs Empty Stack: Full stack me SP directly valid data point karta hai; Empty stack me SP next available empty slot point karta hai.",
            "Stack applications: Subroutine / function call return addresses, nested interrupts, and postfix arithmetic evaluation (Reverse Polish Notation)."
          ],
          formulas: [
            {
              name: "Stack PUSH Micro-operation",
              formula: "SP \\leftarrow SP - 1, \\quad M[SP] \\leftarrow R1",
              variables: "SP = \\text{Stack Pointer}, M[SP] = \\text{Top of Stack}, R1 = \\text{Source Register}",
              units: "Register Transfer Language (RTL)",
              conditions: "Stack grow downwards in memory"
            },
            {
              name: "Stack POP Micro-operation",
              formula: "R1 \\leftarrow M[SP], \\quad SP \\leftarrow SP + 1",
              variables: "SP = \\text{Stack Pointer}, R1 = \\text{Destination Register}",
              units: "Register Transfer Language (RTL)",
              conditions: "Valid data present on stack"
            }
          ],
          teacher_tips: [
            "AKTU exam question: 'How is return address saved during a function call?' Answer: Return address PC is pushed onto the stack!"
          ],
          diagram: {
            heading: "Hardware Stack Organization & PUSH/POP Operations",
            description: "LIFO memory column showing Stack Pointer (SP) pointing to Top of Stack (TOS) with PUSH (SP decrement) and POP (SP increment) operations.",
            type: "svg",
            labels: ["TOS", "Stack Pointer (SP)", "PUSH (SP-1)", "POP (SP+1)"],
            svg_or_mermaid: COA_STACK_ORGANIZATION_SVG,
            isStandardDiagram: false,
            timestamp: "1:08:33"
          }
        },
        {
          timestamp_start: "1:15:36",
          timestamp_end: "1:26:54",
          heading: "8. Comprehensive 8 Addressing Modes & Effective Address Calculation",
          subheading: "Immediate, Direct, Indirect, Register, Register Indirect, Relative, Indexed, Base Register",
          definitions: [
            "Addressing Modes specify the rule and mathematical formula by which the CPU interprets the address field of an instruction to locate the Effective Address (EA) of the actual operand."
          ],
          points: [
            "1. Implied / Implicit Mode: Operands are implicitly specified in opcode (e.g. CLA - Clear Accumulator, CMA - Complement AC). No address field needed.",
            "2. Immediate Mode: Operand is part of the instruction itself (e.g. ADD 5). Fastest execution because no memory access is required.",
            "3. Direct Addressing Mode: Address field contains the exact memory address where operand resides. EA = Address Field. Requires 1 memory reference.",
            "4. Indirect Addressing Mode: Address field points to a memory location that contains the pointer to the real operand. EA = M[Address Field]. Requires 2 memory references.",
            "5. Register Mode: Operand is stored in a CPU register (e.g. ADD R1, R2). Extremely fast zero-wait memory execution.",
            "6. Register Indirect Mode: Register holds the memory address of the operand. EA = [R]. Used heavily in array loops.",
            "7. Relative Addressing Mode: Effective address is calculated by adding address field to Program Counter: EA = PC + Address Field. Used for branch/jump instructions.",
            "8. Indexed Addressing Mode: Effective address is calculated by adding address field to Index Register XR: EA = XR + Address Field. Used for accessing arrays and lookup tables."
          ],
          formulas: [
            {
              name: "PC-Relative Effective Address",
              formula: "EA = PC + \\text{Address Field}",
              variables: "EA = \\text{Effective Address}, PC = \\text{Program Counter}",
              units: "Memory Address Word",
              conditions: "Branch and loop jumps"
            },
            {
              name: "Indexed Mode Effective Address",
              formula: "EA = XR + A",
              variables: "XR = \\text{Index Register value}, A = \\text{Base offset in instruction}",
              units: "Memory Address Word",
              conditions: "Array index traversal"
            }
          ],
          solved_example: {
            title: "AKTU Numerical: Calculate Effective Address (EA) across Addressing Modes",
            given: "PC = 200, XR = 100, Instruction at Address 200 has Address Field A = 500. Memory[500] = 800, Memory[800] = 1000.",
            toFind: "Calculate Effective Address (EA) and Operand for Direct, Indirect, Relative, and Indexed Modes.",
            formula: "Direct: EA = A; Indirect: EA = M[A]; Relative: EA = PC + A; Indexed: EA = XR + A",
            solution: "1. Direct Mode: EA = 500. Operand = Memory[500] = 800.\n2. Indirect Mode: EA = Memory[500] = 800. Operand = Memory[800] = 1000.\n3. Relative Mode: EA = PC + A = 200 + 500 = 700. Operand = Memory[700].\n4. Indexed Mode: EA = XR + A = 100 + 500 = 600. Operand = Memory[600].",
            answer: "Direct: EA=500; Indirect: EA=800; Relative: EA=700; Indexed: EA=600",
            shortTrick: "Hamesha yaad rakho: Indirect me 'pointer ka pointer' hota hai (2 memory references)."
          },
          teacher_tips: [
            "AKTU 10-mark compulsory question: Har saal ye numerical ya table aati hai. EA ka formula likhte hi examiner pure marks de deta hai!"
          ],
          diagram: {
            heading: "Addressing Modes: Direct vs Indirect Memory Pointer Diagram",
            description: "Visual memory addressing comparison showing Direct mode 1 memory lookup vs Indirect mode 2 memory lookups via pointer to effective address.",
            type: "svg",
            labels: ["Instruction [Opcode|Addr]", "Direct Access", "Indirect Pointer", "Effective Address"],
            svg_or_mermaid: COA_ADDRESSING_MODES_SVG,
            isStandardDiagram: false,
            timestamp: "1:15:36"
          }
        }
      ],
      formulas: [
        {
          name: "Addressable Memory Capacity",
          formula: "N = 2^k \\times W",
          variables: "k = \\text{Address bits}, W = \\text{Word width in bytes}",
          units: "Bytes",
          conditions: "Binary address bus scaling"
        },
        {
          name: "Relative Addressing Mode EA",
          formula: "EA = PC + A",
          variables: "PC = \\text{Program Counter}, A = \\text{Displacement / Offset}",
          units: "Address Location",
          conditions: "Branch displacement calculation"
        },
        {
          name: "Indexed Addressing Mode EA",
          formula: "EA = XR + A",
          variables: "XR = \\text{Index Register}, A = \\text{Base Address}",
          units: "Address Location",
          conditions: "Array indexing and table traversal"
        },
        {
          name: "Base Register Addressing Mode EA",
          formula: "EA = BR + A",
          variables: "BR = \\text{Base Register}, A = \\text{Displacement}",
          units: "Address Location",
          conditions: "Relocatable program code in memory"
        }
      ],
      importantPYQs: [
        {
          examName: "AKTU B.Tech (BCS302)",
          year: "2023-24 (10 Marks)",
          question: "Draw and explain the functional block diagram of a digital computer. Differentiate between primary memory and secondary memory with suitable examples.",
          options: [
            "Block diagram with Input, CPU (ALU + CU), Memory Hierarchy, Output; Primary volatile vs Secondary non-volatile",
            "Single bus diagram without memory classification",
            "Microcontroller Harvard architecture with separate ROM only",
            "Analog computer operational amplifier circuit"
          ],
          correctAnswer: "Option A: Block diagram with Input, CPU (ALU + CU), Memory Hierarchy, Output; Primary volatile vs Secondary non-volatile",
          solution: "1. Draw complete block diagram: Input Unit -> CPU [ALU + CU + Registers] <-> Memory Unit [RAM + Secondary Disk] -> Output Unit.\n2. Explain role of Control Unit (generates timing pulses) and ALU (performs 2's complement arithmetic and bitwise logic).\n3. Differentiate Primary (RAM/ROM: High speed, low latency, volatile, nanosecond access) vs Secondary (HDD/SSD: Non-volatile, mass storage, block-based I/O access via bus).",
          shortTrick: "Draw the functional block diagram first with clean labels; it secures 4 out of 10 marks instantly.",
          marks: "10 Marks",
          difficulty: "Medium"
        },
        {
          examName: "AKTU B.Tech (BCS302)",
          year: "2022-23 (7 Marks)",
          question: "What do you understand by Bus Arbitration? Differentiate between Daisy Chaining and Polling methods with circuit schematics.",
          options: [
            "Daisy Chaining: Serial priority with 3 control lines; Polling: Centralized controller with programmable address polling",
            "Both use parallel lines with equal priority round-robin",
            "Daisy chaining uses software interrupt vectors only",
            "Polling is strictly asynchronous with zero hardware lines"
          ],
          correctAnswer: "Option A: Daisy Chaining: Serial priority with 3 control lines; Polling: Centralized controller with programmable address polling",
          solution: "1. Bus Arbitration is the mechanism to resolve bus contention when multiple bus masters request access.\n2. Daisy Chaining: Devices connected in serial chain. Controller issues Bus Grant (BG). Device 1 has highest priority; if it doesn't need the bus, it passes grant to Device 2. Needs only 3 lines (BR, BG, Busy). Disadvantage: Starvation for last device.\n3. Polling: Controller uses log2(N) poll address lines to query devices. Priority can be altered dynamically in software. No starvation.",
          shortTrick: "Daisy Chain = Simple & cheap (serial), Polling = Smart & fair (programmable).",
          marks: "7 Marks",
          difficulty: "Medium"
        },
        {
          examName: "AKTU B.Tech (BCS302)",
          year: "2023 (10 Marks)",
          question: "Define Addressing Modes. Explain Immediate, Direct, Indirect, Relative, and Indexed addressing modes with effective address formulas and numerical examples.",
          options: [
            "Immediate (Operand in instruction), Direct (EA=A), Indirect (EA=M[A]), Relative (EA=PC+A), Indexed (EA=XR+A)",
            "All modes access memory through indirect pointers only",
            "Direct mode requires 3 memory references",
            "Immediate mode is strictly used for branch instructions"
          ],
          correctAnswer: "Option A: Immediate (Operand in instruction), Direct (EA=A), Indirect (EA=M[A]), Relative (EA=PC+A), Indexed (EA=XR+A)",
          solution: "1. Definition: Rule for calculating Effective Address (EA) where the actual operand is stored.\n2. Immediate: Operand = A (0 memory accesses, fastest).\n3. Direct: EA = A, Operand = M[A] (1 memory access).\n4. Indirect: EA = M[A], Operand = M[M[A]] (2 memory accesses, pointer).\n5. Relative: EA = PC + A (used in relative jumps/loops).\n6. Indexed: EA = XR + A (used in array element indexing).",
          shortTrick: "Direct has 1 memory lookup; Indirect has 2 lookups; Immediate has 0 lookups.",
          marks: "10 Marks",
          difficulty: "Hard"
        },
        {
          examName: "AKTU B.Tech (BCS302)",
          year: "2021-22 (7 Marks)",
          question: "Explain the construction and operation of a Three-State Bus Buffer. How does it resolve bus contention when multiple registers share a common bus line?",
          options: [
            "Provides 3 states: Logic 0, Logic 1, and High-Impedance (Hi-Z); when disabled (E=0), device electrically disconnects from bus",
            "Acts as a 3-input AND gate with parity check",
            "Stores 3 bits of data simultaneously inside a flip-flop",
            "Increases bus voltage by a factor of 3"
          ],
          correctAnswer: "Option A: Provides 3 states: Logic 0, Logic 1, and High-Impedance (Hi-Z); when disabled (E=0), device electrically disconnects from bus",
          solution: "1. Tri-state buffer has data input A, control/enable input E, and output Y.\n2. When E = 1, Y = A (active transmission).\n3. When E = 0, output is in High-Impedance state (Hi-Z), behaving as an open circuit.\n4. When multiple register outputs are connected to a common bus line, a decoder enables only ONE buffer at a time. The rest remain in Hi-Z, preventing short-circuit conflicts.",
          shortTrick: "Hi-Z = Open switch. Only one gate is 'closed' onto the bus at any moment.",
          marks: "7 Marks",
          difficulty: "Medium"
        },
        {
          examName: "AKTU B.Tech (BCS302)",
          year: "2022 (7 Marks)",
          question: "Describe Stack Organization in a computer CPU. Explain the micro-operations executed during PUSH and POP with the help of a Stack Pointer (SP).",
          options: [
            "PUSH: SP <- SP - 1, M[SP] <- DR; POP: DR <- M[SP], SP <- SP + 1; LIFO access structure",
            "PUSH: SP <- SP + 1, M[SP] <- DR; POP: SP <- SP - 1 with FIFO queue",
            "Stack is strictly implemented using magnetic hard disk sectors",
            "Stack pointer remains static and data is shifted downward"
          ],
          correctAnswer: "Option A: PUSH: SP <- SP - 1, M[SP] <- DR; POP: DR <- M[SP], SP <- SP + 1; LIFO access structure",
          solution: "1. Stack is a LIFO storage structure referenced by Stack Pointer (SP).\n2. PUSH micro-operation:\n   SP <- SP - 1 (decrement SP to point to next lower memory address)\n   M[SP] <- DR (write data register contents into top of stack)\n3. POP micro-operation:\n   DR <- M[SP] (read top of stack into data register)\n   SP <- SP + 1 (increment SP to release memory slot)\n4. Used for subroutine return address handling and expression evaluation.",
          shortTrick: "PUSH decrements SP before write; POP reads before incrementing SP.",
          marks: "7 Marks",
          difficulty: "Medium"
        },
        {
          examName: "GATE CS",
          year: "2022 (4 Marks)",
          question: "Consider a 16-bit instruction format where the address field contains relative displacement -25. If the current Program Counter (PC) value during execution is 400, what is the Effective Address (EA)?",
          options: ["375", "425", "400", "350"],
          correctAnswer: "Option A: 375",
          solution: "In PC-Relative addressing mode:\nEA = PC + Displacement\nEA = 400 + (-25) = 375.\nThe CPU branches to memory address 375.",
          shortTrick: "Relative mode is simple signed algebraic addition: 400 - 25 = 375.",
          marks: "4 Marks",
          difficulty: "Easy"
        }
      ],
      practiceMCQs: [
        {
          id: 1,
          question: "Which of the following is an attribute of Computer Architecture rather than Computer Organization?",
          options: [
            "Option A: Addressing modes and instruction set format",
            "Option B: Memory bus clock frequency",
            "Option C: Type of memory buffer flip-flops used",
            "Option D: Bus arbitration daisy chain circuitry"
          ],
          correctAnswer: "Option A: Addressing modes and instruction set format",
          correctOptionIndex: 0,
          solution: "Computer Architecture encompasses attributes visible to the programmer (instruction formats, addressing modes, registers). Clock frequency, circuit design, and bus hardware are parts of Computer Organization.",
          topicTag: "Architecture vs Organization",
          difficulty: "Easy"
        },
        {
          id: 2,
          question: "In a digital computer system, the Address Bus is strictly:",
          options: [
            "Option A: Bi-directional between CPU and Memory",
            "Option B: Uni-directional from CPU to Memory/IO",
            "Option C: Uni-directional from Memory to CPU",
            "Option D: Tri-directional including secondary storage"
          ],
          correctAnswer: "Option B: Uni-directional from CPU to Memory/IO",
          correctOptionIndex: 1,
          solution: "The CPU initiates the memory access by outputting the target address. Memory does not generate addresses for the CPU; hence the Address Bus is uni-directional.",
          topicTag: "Bus System",
          difficulty: "Easy"
        },
        {
          id: 3,
          question: "A computer has a 24-bit address bus. What is the maximum byte-addressable memory capacity it can support directly?",
          options: [
            "Option A: 16 Megabytes (16 MB)",
            "Option B: 64 Kilobytes (64 KB)",
            "Option C: 1 Gigabyte (1 GB)",
            "Option D: 4 Megabytes (4 MB)"
          ],
          correctAnswer: "Option A: 16 Megabytes (16 MB)",
          correctOptionIndex: 0,
          solution: "Capacity = 2^24 bytes = (2^4) × (2^20) bytes = 16 × 1 MB = 16 Megabytes.",
          topicTag: "Bus System",
          difficulty: "Medium"
        },
        {
          id: 4,
          question: "What is the primary drawback of the Daisy Chaining bus arbitration method?",
          options: [
            "Option A: Devices positioned furthest from the arbiter suffer priority starvation and propagation delay",
            "Option B: It requires an excessive number of control lines (proportional to N^2)",
            "Option C: It cannot work with DMA controllers",
            "Option D: It requires a software polling address bus"
          ],
          correctAnswer: "Option A: Devices positioned furthest from the arbiter suffer priority starvation and propagation delay",
          correctOptionIndex: 0,
          solution: "In Daisy Chaining, priority is hardwired by physical position. Device 1 gets first pick; if higher priority devices constantly request, distant devices starve.",
          topicTag: "Bus Arbitration",
          difficulty: "Medium"
        },
        {
          id: 5,
          question: "When the enable line (E) of a Three-State Bus Buffer is deactivated (E = 0), its output state is:",
          options: [
            "Option A: High-Impedance (Hi-Z), acting as an open electrical switch",
            "Option B: Ground (Logic 0) pulling the bus down",
            "Option C: High Voltage (Logic 1)",
            "Option D: Inverted logic of the input line"
          ],
          correctAnswer: "Option A: High-Impedance (Hi-Z), acting as an open electrical switch",
          correctOptionIndex: 0,
          solution: "The third state (Hi-Z) isolates the gate from the bus, allowing another active buffer to drive the bus without short circuits.",
          topicTag: "Three-State Buffer",
          difficulty: "Easy"
        },
        {
          id: 6,
          question: "Which register holds the memory address of the next instruction waiting to be fetched and executed?",
          options: [
            "Option A: Program Counter (PC)",
            "Option B: Instruction Register (IR)",
            "Option C: Accumulator (AC)",
            "Option D: Memory Buffer Register (MBR)"
          ],
          correctAnswer: "Option A: Program Counter (PC)",
          correctOptionIndex: 0,
          solution: "The Program Counter (PC) automatically increments after each instruction fetch to point to the next consecutive instruction address in memory.",
          topicTag: "Computer Registers",
          difficulty: "Easy"
        },
        {
          id: 7,
          question: "In Mano's Basic Computer model, what is the bit width of the Program Counter (PC) and the Accumulator (AC) respectively?",
          options: [
            "Option A: PC is 12 bits, AC is 16 bits",
            "Option B: PC is 16 bits, AC is 12 bits",
            "Option C: Both are 16 bits",
            "Option D: PC is 8 bits, AC is 32 bits"
          ],
          correctAnswer: "Option A: PC is 12 bits, AC is 16 bits",
          correctOptionIndex: 0,
          solution: "Address space is 4096 words (2^12 = 4096), so address registers (PC, MAR) are 12 bits. Word size is 16 bits, so data registers (AC, IR, DR) are 16 bits.",
          topicTag: "Computer Registers",
          difficulty: "Medium"
        },
        {
          id: 8,
          question: "In a CPU with Stack Organization, what micro-operations execute during a PUSH operation?",
          options: [
            "Option A: SP <- SP - 1, followed by M[SP] <- DR",
            "Option B: M[SP] <- DR, followed by SP <- SP + 1",
            "Option C: SP <- SP + 1, followed by DR <- M[SP]",
            "Option D: SP <- 0, followed by M[SP] <- AC"
          ],
          correctAnswer: "Option A: SP <- SP - 1, followed by M[SP] <- DR",
          correctOptionIndex: 0,
          solution: "In standard computer stack implementation, the stack grows toward lower memory addresses. First SP is decremented, then data is stored into M[SP].",
          topicTag: "Stack Organization",
          difficulty: "Medium"
        },
        {
          id: 9,
          question: "Which addressing mode requires ZERO memory access references to fetch the operand?",
          options: [
            "Option A: Immediate Addressing Mode",
            "Option B: Direct Addressing Mode",
            "Option C: Indirect Addressing Mode",
            "Option D: Relative Addressing Mode"
          ],
          correctAnswer: "Option A: Immediate Addressing Mode",
          correctOptionIndex: 0,
          solution: "In Immediate Mode, the operand value is embedded directly inside the instruction byte itself. Hence no separate memory access is required.",
          topicTag: "Addressing Modes",
          difficulty: "Easy"
        },
        {
          id: 10,
          question: "In Indirect Addressing Mode, how many total memory read references are required to fetch the final operand?",
          options: [
            "Option A: Two memory references (one for pointer address, one for operand)",
            "Option B: One memory reference",
            "Option C: Zero memory references",
            "Option D: Three memory references"
          ],
          correctAnswer: "Option A: Two memory references (one for pointer address, one for operand)",
          correctOptionIndex: 0,
          solution: "First reference reads memory at address A to fetch the Effective Address (pointer). Second reference reads memory at EA to fetch the actual operand.",
          topicTag: "Addressing Modes",
          difficulty: "Medium"
        },
        {
          id: 11,
          question: "An instruction uses PC-Relative Addressing with an offset of +40. If PC currently points to address 350, what is the Effective Address (EA)?",
          options: [
            "Option A: 390",
            "Option B: 310",
            "Option C: 350",
            "Option D: 1400"
          ],
          correctAnswer: "Option A: 390",
          correctOptionIndex: 0,
          solution: "EA = PC + Offset = 350 + 40 = 390.",
          topicTag: "Addressing Modes",
          difficulty: "Easy"
        },
        {
          id: 12,
          question: "Which addressing mode is ideally suited for indexing elements of an array in memory?",
          options: [
            "Option A: Indexed Addressing Mode (EA = XR + A)",
            "Option B: Immediate Mode",
            "Option C: Implied Mode",
            "Option D: Direct Mode"
          ],
          correctAnswer: "Option A: Indexed Addressing Mode (EA = XR + A)",
          correctOptionIndex: 0,
          solution: "The base address of the array is specified in the instruction (A), and the index register (XR) holds the element offset, which can be easily incremented in a loop.",
          topicTag: "Addressing Modes",
          difficulty: "Medium"
        },
        {
          id: 13,
          question: "What is the primary difference between Register Mode and Register Indirect Mode?",
          options: [
            "Option A: In Register Mode, the register holds the operand; in Register Indirect Mode, the register holds the memory address of the operand",
            "Option B: Register Mode is slower than Register Indirect Mode",
            "Option C: Register Indirect Mode does not use the CPU register file",
            "Option D: Register Mode requires two memory read cycles"
          ],
          correctAnswer: "Option A: In Register Mode, the register holds the operand; in Register Indirect Mode, the register holds the memory address of the operand",
          correctOptionIndex: 0,
          solution: "Register Mode: Operand = R. Register Indirect Mode: EA = [R], Operand = Memory[[R]].",
          topicTag: "Addressing Modes",
          difficulty: "Medium"
        },
        {
          id: 14,
          question: "When a subroutine call (CALL instruction) executes, the return address is saved in:",
          options: [
            "Option A: The Stack Memory pointed to by Stack Pointer (SP)",
            "Option B: The Instruction Register (IR)",
            "Option C: Secondary Storage Disk",
            "Option D: The Output Buffer Register (OUTR)"
          ],
          correctAnswer: "Option A: The Stack Memory pointed to by Stack Pointer (SP)",
          correctOptionIndex: 0,
          solution: "The CPU pushes the contents of PC onto the stack. When the subroutine finishes, a RET instruction pops the return address back into PC.",
          topicTag: "Stack Organization",
          difficulty: "Easy"
        },
        {
          id: 15,
          question: "Why does the Control Unit in a digital computer use timing signals?",
          options: [
            "Option A: To synchronize micro-operations and avoid bus data collisions",
            "Option B: To increase the voltage capacity of RAM",
            "Option C: To convert analog audio signals to digital binary",
            "Option D: To permanently store program files"
          ],
          correctAnswer: "Option A: To synchronize micro-operations and avoid bus data collisions",
          correctOptionIndex: 0,
          solution: "The Control Unit issues clocked timing pulses (T0, T1, T2...) to ensure micro-operations occur in strict sequential order without contention.",
          topicTag: "Functional Units",
          difficulty: "Medium"
        },
        {
          id: 16,
          question: "In Polling bus arbitration with 8 potential bus masters, how many polling address lines are required from the controller?",
          options: [
            "Option A: 3 lines (since 2^3 = 8)",
            "Option B: 8 lines",
            "Option C: 1 line",
            "Option D: 16 lines"
          ],
          correctAnswer: "Option A: 3 lines (since 2^3 = 8)",
          correctOptionIndex: 0,
          solution: "Number of poll lines = log2(N) = log2(8) = 3 binary lines (000 to 111).",
          topicTag: "Bus Arbitration",
          difficulty: "Hard"
        },
        {
          id: 17,
          question: "What happens if two tri-state bus buffers connected to the same bus wire are simultaneously enabled with E = 1?",
          options: [
            "Option A: Bus contention and electrical short-circuit occur, potentially damaging hardware",
            "Option B: The data values are automatically averaged without error",
            "Option C: Both buffers automatically switch into high-impedance mode",
            "Option D: The bus speed doubles"
          ],
          correctAnswer: "Option A: Bus contention and electrical short-circuit occur, potentially damaging hardware",
          correctOptionIndex: 0,
          solution: "If one buffer drives 5V (Logic 1) and another drives 0V (Logic 0) on the same wire, high current flows between them causing bus contention.",
          topicTag: "Three-State Buffer",
          difficulty: "Hard"
        },
        {
          id: 18,
          question: "Consider an instruction at memory location 500: 'ADD @600'. Memory location 600 contains 900, and location 900 contains 45. What is the operand value?",
          options: [
            "Option A: 45 (Indirect Mode: EA = 900)",
            "Option B: 900",
            "Option C: 600",
            "Option D: 500"
          ],
          correctAnswer: "Option A: 45 (Indirect Mode: EA = 900)",
          correctOptionIndex: 0,
          solution: "Symbol '@' designates Indirect Addressing. Memory[600] = 900 (Effective Address). Memory[900] = 45 (Operand).",
          topicTag: "Addressing Modes",
          difficulty: "Hard"
        },
        {
          id: 19,
          question: "Which of the following instructions represents Implied (Implicit) Addressing Mode?",
          options: [
            "Option A: CMA (Complement Accumulator)",
            "Option B: ADD 250",
            "Option C: MOV R1, R2",
            "Option D: LDA 1000"
          ],
          correctAnswer: "Option A: CMA (Complement Accumulator)",
          correctOptionIndex: 0,
          solution: "In CMA, the accumulator operand is inherent in the opcode itself. No explicit address or register operand field is specified in the instruction.",
          topicTag: "Addressing Modes",
          difficulty: "Medium"
        },
        {
          id: 20,
          question: "Why is Primary Memory (RAM) incapable of replacing Secondary Memory (HDD/SSD) entirely in modern computers?",
          options: [
            "Option A: RAM is volatile (loses all data upon power loss) and has much higher cost per gigabyte",
            "Option B: RAM is too slow to store operating system boot files",
            "Option C: CPU cannot read instructions directly from RAM",
            "Option D: RAM does not support binary data representation"
          ],
          correctAnswer: "Option A: RAM is volatile (loses all data upon power loss) and has much higher cost per gigabyte",
          correctOptionIndex: 0,
          solution: "RAM capacitors/transistors require continuous power refresh (volatility). For permanent storage across reboots, non-volatile magnetic or flash storage is essential.",
          topicTag: "Functional Units",
          difficulty: "Easy"
        }
      ],
      mindMapNodes: [
        "COA Unit 1 -> Architecture vs Organization",
        "Architecture vs Organization -> Definition: What vs How",
        "Architecture vs Organization -> Example: x86 ISA vs i5/i7 hardware",
        "COA Unit 1 -> Functional Units",
        "Functional Units -> CPU: ALU & Control Unit",
        "Functional Units -> Memory: Primary (RAM) vs Secondary (Disk)",
        "COA Unit 1 -> Bus System",
        "Bus System -> Data Bus: Bidirectional data transfer",
        "Bus System -> Address Bus: Unidirectional 2^k locations",
        "Bus System -> Control Bus: Timing & Read/Write strobe",
        "COA Unit 1 -> Bus Arbitration",
        "Bus Arbitration -> Daisy Chaining: Serial priority (3 lines)",
        "Bus Arbitration -> Polling: Centralized controller address",
        "COA Unit 1 -> Three-State Buffer",
        "Three-State Buffer -> Hi-Z: Open circuit isolation",
        "COA Unit 1 -> Basic Registers",
        "Basic Registers -> PC: 12-bit next instruction",
        "Basic Registers -> IR: 16-bit current instruction",
        "Basic Registers -> MAR: 12-bit address bus",
        "Basic Registers -> AC: 16-bit arithmetic accumulator",
        "COA Unit 1 -> Stack Organization",
        "Stack Organization -> Protocol: LIFO top of stack",
        "Stack Organization -> PUSH: SP <- SP - 1, M[SP] <- DR",
        "Stack Organization -> POP: DR <- M[SP], SP <- SP + 1",
        "COA Unit 1 -> Addressing Modes",
        "Addressing Modes -> Immediate: Operand in instruction (Fastest)",
        "Addressing Modes -> Direct: EA = A (1 memory ref)",
        "Addressing Modes -> Indirect: EA = M[A] (2 memory refs)",
        "Addressing Modes -> Relative: EA = PC + A (Branch jumps)",
        "Addressing Modes -> Indexed: EA = XR + A (Array lookup)"
      ]
    }
  },
  'dstl-full-playlist-ebook': {
    Hinglish: DSTL_EBOOK_NOTE,
    English: DSTL_EBOOK_NOTE,
    Hindi: DSTL_EBOOK_NOTE
  }
};

export function getSampleNote(videoIdOrIndex = 'dstl-full-playlist-ebook', language = 'Hinglish') {
  const ids = ['dstl-full-playlist-ebook', 'coa-unit-1', 'kKKM8Y-u7ds', 'RBSGKlAoi3w'];
  let id = videoIdOrIndex;
  if (typeof videoIdOrIndex === 'number') {
    id = ids[videoIdOrIndex] || ids[0];
  } else if (!SAMPLE_NOTES_MAP[id]) {
    if (id && (id.includes('dstl') || id.includes('playlist') || id.includes('ebook'))) {
      id = 'dstl-full-playlist-ebook';
    } else {
      const found = ids.find(k => id && id.includes(k));
      id = found || ids[0];
    }
  }

  const langLower = (language || 'Hinglish').toLowerCase();
  const normalizedLang = langLower.includes('hindi')
    ? 'Hindi'
    : langLower.includes('eng')
    ? 'English'
    : 'Hinglish';

  const entry = SAMPLE_NOTES_MAP[id];
  if (entry && entry[normalizedLang]) {
    return entry[normalizedLang];
  }
  if (entry) {
    return entry['Hinglish'] || entry['English'] || Object.values(entry)[0];
  }
  return SAMPLE_NOTES_MAP['dstl-full-playlist-ebook']['Hinglish'];
}

export const SAMPLE_NOTES = [
  SAMPLE_NOTES_MAP['dstl-full-playlist-ebook']['Hinglish'],
  SAMPLE_NOTES_MAP['coa-unit-1']['Hinglish'],
  SAMPLE_NOTES_MAP['kKKM8Y-u7ds']['Hinglish'],
  SAMPLE_NOTES_MAP['RBSGKlAoi3w']['Hinglish'],
  SAMPLE_NOTES_MAP['Cq_z9x6tWzA']['Hinglish']
];
