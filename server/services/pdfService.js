import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

/**
 * Generates an authentic, rich Handwritten Notebook-styled PDF Buffer.
 * Matches the exact OmniStudy AI web app experience:
 * - Ruled notebook styling (cream background, red vertical margin line, horizontal guidelines)
 * - 4-color pen styling (Royal Blue, Crimson Red, Forest Green, Slate Black)
 * - Real SVG Blackboard Diagrams rendered with SVGtoPDF
 * - Sticky notes for Cornell Cues & Teacher Memory Tips
 * - Solved Examples & Step-by-step Numerical Derivations
 * - University & Board Exam PYQs with 4 options and answers
 * - Formula Cheat Sheets & Common Mistakes
 */
export async function generateNotePdfBuffer(note) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        bufferPages: true,
        size: 'A4',
        margins: { top: 36, bottom: 40, left: 36, right: 36 },
        info: {
          Title: note.title || 'OmniStudy AI Master Notes',
          Author: 'OmniStudy AI (Topper Notes)',
          Subject: note.subject || note.chapter || 'Academic Study Notes',
          Keywords: 'Handwritten Notes, PYQs, Formula Sheet, OmniStudy AI'
        }
      });

      const buffers = [];
      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', err => reject(err));

      // Theme Colors
      const PAPER_BG = '#FAF8F5';      // Authentic Cream Notebook Paper
      const MARGIN_RED = '#FCA5A5';    // Notebook Red Margin Line
      const INK_BLUE = '#1E3A8A';      // Royal Blue Pen (Main Notes)
      const INK_BLACK = '#0F172A';     // Black Pen (Headings & Structure)
      const INK_RED = '#991B1B';       // Red Pen (Formulas, Warnings, Alert)
      const INK_GREEN = '#065F46';     // Green Pen (Teacher Tips & Shortcuts)
      const STICKY_BG = '#FEF3C7';     // Sticky Note Yellow
      const STICKY_BORDER = '#F59E0B'; // Sticky Note Border
      const CARD_BG = '#F1F5F9';       // Subdued card background

      const CONTENT_LEFT = 78;         // Text starts right of red margin
      const CONTENT_WIDTH = 480;       // Max printable width

      // Helper: Draw Ruled Paper Background
      function drawNotebookBackground() {
        const width = doc.page.width;
        const height = doc.page.height;

        // 1. Paper tint
        doc.save();
        doc.rect(0, 0, width, height).fill(PAPER_BG);

        // 2. Red double vertical margin line (Left Margin)
        doc.strokeColor(MARGIN_RED).lineWidth(1);
        doc.moveTo(68, 0).lineTo(68, height).stroke();
        doc.moveTo(71, 0).lineTo(71, height).stroke();

        // 3. Subtle horizontal notebook ruling lines
        doc.strokeColor('#E2E8F0').lineWidth(0.5);
        for (let y = 50; y < height - 30; y += 22) {
          doc.moveTo(72, y).lineTo(width - 25, y).stroke();
        }
        doc.restore();
      }

      // Draw background on first page
      drawNotebookBackground();

      // Whenever a new page is added, draw notebook background
      doc.on('pageAdded', () => {
        drawNotebookBackground();
      });

      // Natural Mathematical cleaner - replaces LaTeX code markup with clear unicode/text
      function cleanMathText(str) {
        if (!str || typeof str !== 'string') return '';
        return str
          .replace(/\$\$/g, '')
          .replace(/\$/g, '')
          .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
          .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
          .replace(/\\vec\{([^}]+)\}/g, '$1')
          .replace(/\\mathbf\{([^}]+)\}/g, '$1')
          .replace(/\\cdot/g, ' * ')
          .replace(/\\times/g, ' × ')
          .replace(/\\div/g, ' / ')
          .replace(/\\pm/g, ' ± ')
          .replace(/\\leq/g, ' <= ')
          .replace(/\\geq/g, ' >= ')
          .replace(/\\theta/g, 'θ')
          .replace(/\\pi/g, 'π')
          .replace(/\\Delta/g, 'Δ')
          .replace(/\\rightarrow/g, ' -> ')
          .replace(/\\to/g, ' -> ')
          .replace(/\\left\(/g, '(')
          .replace(/\\right\)/g, ')')
          .replace(/\\left\[/g, '[')
          .replace(/\\right\]/g, ']')
          .replace(/\^2/g, '²')
          .replace(/\^3/g, '³')
          .replace(/\\/g, '');
      }

      // Safe page break helper - allows natural flow up to 785 without premature empty gaps
      function checkPageBreak(neededHeight = 50) {
        if (doc.y + neededHeight > 785) {
          doc.addPage();
          doc.y = 50;
        }
      }

      // ════════════════════════════════════════════════════════════
      // 1. NOTEBOOK COVER / HEADER BANNER (Dynamic Height, ZERO Overlap)
      // ════════════════════════════════════════════════════════════
      const headerStartY = 42;
      const cleanTitle = cleanMathText(note.title || 'Lecture Master Notes');
      const subjectText = cleanMathText(note.subject || note.chapter || 'Core Academic Lecture');
      const examText = cleanMathText(note.targetExam && note.targetExam !== 'Auto-detect' ? note.targetExam : 'University & Board Exam');
      const subLineText = `📚 Subject: ${subjectText}  |  🎯 Target: ${examText}  |  🌐 https://omni-study-ai-lilac.vercel.app/`;

      // Pre-measure title text height
      doc.fontSize(13);
      const titleHeight = doc.heightOfString(cleanTitle, { width: CONTENT_WIDTH - 28 });
      doc.fontSize(8.5);
      const subLineHeight = doc.heightOfString(subLineText, { width: CONTENT_WIDTH - 28 });
      
      const headerCardHeight = 12 + 14 + titleHeight + 6 + subLineHeight + 12;

      // Draw Header Card with dynamic height
      doc.rect(CONTENT_LEFT, headerStartY, CONTENT_WIDTH, headerCardHeight).fillAndStroke('#EEF2FF', '#C7D2FE');

      // 1. Branding row
      doc.fillColor('#4338CA').fontSize(9).text(
        '⚡ OMNISTUDY AI • CLASSROOM COPY • DEVELOPED BY: AKANKSHA MAURYA',
        CONTENT_LEFT + 14,
        headerStartY + 8,
        { width: CONTENT_WIDTH - 28 }
      );

      // 2. Title
      const titleY = headerStartY + 24;
      doc.fillColor(INK_BLUE).fontSize(13).text(
        cleanTitle,
        CONTENT_LEFT + 14,
        titleY,
        { width: CONTENT_WIDTH - 28 }
      );

      // 3. Subject and Exam metadata row
      const subLineY = titleY + titleHeight + 5;
      doc.fillColor('#4B5563').fontSize(8.5).text(
        subLineText,
        CONTENT_LEFT + 14,
        subLineY,
        { width: CONTENT_WIDTH - 28 }
      );

      // Set doc.y safely below the header card
      doc.y = headerStartY + headerCardHeight + 16;

      // ════════════════════════════════════════════════════════════
      // 2. CORE SUMMARY & CORNELL CUE COLUMN (Dynamic Card Height, ZERO Overlap)
      // ════════════════════════════════════════════════════════════
      let overviewRaw = '';
      if (typeof note.overview === 'string' && note.overview.trim()) {
        overviewRaw = note.overview.trim();
      } else if (typeof note.summary === 'string' && note.summary.trim()) {
        overviewRaw = note.summary.trim();
      } else if (Array.isArray(note.quickSummary) && note.quickSummary.length > 0) {
        overviewRaw = note.quickSummary.join(' • ');
      } else if (typeof note.quickSummary === 'string') {
        overviewRaw = note.quickSummary;
      }

      if (overviewRaw) {
        const cleanOverview = cleanMathText(overviewRaw.slice(0, 450));
        doc.fontSize(9).lineGap(1.5);
        const overviewHeight = doc.heightOfString(cleanOverview, { width: CONTENT_WIDTH - 24, lineGap: 1.5 });
        const summaryCardHeight = 24 + overviewHeight + 14;

        checkPageBreak(summaryCardHeight + 10);
        const summaryStartY = doc.y;

        doc.rect(CONTENT_LEFT, summaryStartY, CONTENT_WIDTH, summaryCardHeight).fillAndStroke(STICKY_BG, STICKY_BORDER);
        
        doc.fillColor('#B45309').fontSize(10.5).text('📌 CORE CHAPTER SUMMARY (Topper Notes)', CONTENT_LEFT + 12, summaryStartY + 8);
        doc.fillColor(INK_BLACK).fontSize(9).lineGap(1.5).text(
          cleanOverview,
          CONTENT_LEFT + 12,
          summaryStartY + 24,
          { width: CONTENT_WIDTH - 24 }
        );

        doc.y = summaryStartY + summaryCardHeight + 14;
      }

      // Cornell Cues if present
      if (Array.isArray(note.cueColumn) && note.cueColumn.length > 0) {
        checkPageBreak(50);
        doc.fillColor(INK_BLUE).fontSize(10).text('💡 Key Questions & Cues:', CONTENT_LEFT, doc.y);
        doc.moveDown(0.3);
        note.cueColumn.slice(0, 4).forEach(cue => {
          doc.fillColor('#475569').fontSize(9).text(`  ❓ ${cue}`, CONTENT_LEFT, doc.y, { width: CONTENT_WIDTH });
          doc.moveDown(0.2);
        });
        doc.moveDown(0.6);
      }

      // ════════════════════════════════════════════════════════════
      // 3. KEY CONCEPTS & BLACKBOARD DIAGRAMS
      // ════════════════════════════════════════════════════════════
      const concepts = Array.isArray(note.keyConcepts) ? note.keyConcepts : [];

      if (concepts.length > 0) {
        checkPageBreak(60);
        doc.fillColor(INK_BLACK).fontSize(14).text('✍️ COMPLETE LECTURE CONCEPTS & BLACKBOARD DERIVATIONS', CONTENT_LEFT, doc.y, { underline: true });
        doc.moveDown(0.8);

        concepts.forEach((concept, idx) => {
          checkPageBreak(90);

          // Concept Heading
          const heading = concept.heading || `Concept #${idx + 1}`;
          const timeRange = (concept.timestamp_start && concept.timestamp_end) ? ` [${concept.timestamp_start} - ${concept.timestamp_end}]` : '';

          doc.fillColor(INK_BLACK).fontSize(12).text(`${idx + 1}. ${heading}${timeRange}`);
          doc.moveDown(0.3);

          if (concept.subheading) {
            doc.fillColor('#64748B').fontSize(9.5).text(`Sub-topic: ${concept.subheading}`, CONTENT_LEFT + 6, doc.y);
            doc.moveDown(0.3);
          }

          // Bullet points / Definitions in Royal Blue ink
          const points = (Array.isArray(concept.points) && concept.points.length > 0)
            ? concept.points
            : (Array.isArray(concept.definitions) ? concept.definitions : []);

          if (points.length > 0) {
            points.forEach(pt => {
              checkPageBreak(25);
              const cleanPt = cleanMathText(String(pt).replace(/^•\s*/, ''));
              doc.fillColor(INK_BLUE).fontSize(9.5).lineGap(1.5).text(`  • ${cleanPt}`, CONTENT_LEFT + 4, doc.y, { width: CONTENT_WIDTH - 8 });
              doc.moveDown(0.3);
            });
          }

          // Teacher Memory Tip in Green Ink
          const tips = Array.isArray(concept.teacher_tips) ? concept.teacher_tips : (concept.memoryTip ? [concept.memoryTip] : []);
          if (tips.length > 0) {
            checkPageBreak(35);
            doc.rect(CONTENT_LEFT + 10, doc.y, CONTENT_WIDTH - 20, 26).fillAndStroke('#ECFDF5', '#10B981');
            doc.fillColor(INK_GREEN).fontSize(9).text(
              `💡 Teacher Memory Tip: ${cleanMathText(tips.join(' | '))}`,
              CONTENT_LEFT + 18,
              doc.y + 6,
              { width: CONTENT_WIDTH - 36 }
            );
            doc.y += 34;
          }

          // Solved Numerical / Derivation Example
          if (concept.solved_example && concept.solved_example.steps) {
            checkPageBreak(70);
            const ex = concept.solved_example;
            doc.rect(CONTENT_LEFT + 10, doc.y, CONTENT_WIDTH - 20, 58).fillAndStroke('#F8FAFC', '#94A3B8');
            doc.fillColor(INK_BLACK).fontSize(9.5).text('📝 Solved Blackboard Example:', CONTENT_LEFT + 16, doc.y + 6);
            if (ex.given) doc.fillColor('#475569').fontSize(8.5).text(`Given: ${cleanMathText(ex.given)}`, CONTENT_LEFT + 16, doc.y + 20);
            if (Array.isArray(ex.steps)) {
              doc.fillColor(INK_BLUE).fontSize(8.5).text(`Steps: ${cleanMathText(ex.steps.slice(0, 2).join(' ➔ '))}`, CONTENT_LEFT + 16, doc.y + 32);
            }
            if (ex.finalAnswer) {
              doc.fillColor(INK_RED).fontSize(9).text(`Answer: ${cleanMathText(ex.finalAnswer)}`, CONTENT_LEFT + 16, doc.y + 44);
            }
            doc.y += 66;
          }

          // ── REAL SVG DIAGRAM RENDERING ──
          if (concept.diagram && concept.diagram.svg_or_mermaid) {
            const rawSvg = concept.diagram.svg_or_mermaid.trim();
            if (rawSvg.startsWith('<svg') || rawSvg.includes('<svg')) {
              checkPageBreak(170);

              const diagStartY = doc.y;
              const diagBoxHeight = 155;

              // Diagram Frame (Chalkboard / Notebook border)
              doc.rect(CONTENT_LEFT + 15, diagStartY, CONTENT_WIDTH - 30, diagBoxHeight)
                 .fillAndStroke('#FFFFFF', '#CBD5E1');

              // Diagram Header
              doc.fillColor(INK_BLACK).fontSize(9).text(
                `📐 Blackboard Diagram: ${concept.diagram.heading || heading}`,
                CONTENT_LEFT + 25,
                diagStartY + 8,
                { width: CONTENT_WIDTH - 50 }
              );

              // Render SVG inside the box
              try {
                // Extract clean svg substring if mixed with markdown
                const svgStart = rawSvg.indexOf('<svg');
                const svgEnd = rawSvg.lastIndexOf('</svg>') + 6;
                const cleanSvg = rawSvg.slice(svgStart, svgEnd);

                SVGtoPDF(doc, cleanSvg, CONTENT_LEFT + 30, diagStartY + 24, {
                  width: CONTENT_WIDTH - 60,
                  height: 105,
                  preserveAspectRatio: 'xMidYMid meet'
                });
              } catch (svgErr) {
                doc.fillColor('#64748B').fontSize(9).text(
                  `[Schematic Diagram: ${concept.diagram.description || 'System diagram'}]`,
                  CONTENT_LEFT + 30,
                  diagStartY + 60
                );
              }

              // Diagram caption at bottom of box
              if (concept.diagram.description) {
                doc.fillColor('#64748B').fontSize(8).text(
                  `Caption: ${concept.diagram.description.slice(0, 110)}`,
                  CONTENT_LEFT + 25,
                  diagStartY + 138,
                  { width: CONTENT_WIDTH - 50 }
                );
              }

              doc.y = diagStartY + diagBoxHeight + 12;
            }
          }

          doc.moveDown(0.8);
        });
      }

      // ════════════════════════════════════════════════════════════
      // 4. IMPORTANT FORMULA SHEET & CHEAT SHEET
      // ════════════════════════════════════════════════════════════
      const formulas = Array.isArray(note.formulas) ? note.formulas : [];
      if (formulas.length > 0) {
        checkPageBreak(80);
        doc.fillColor(INK_RED).fontSize(14).text('⚡ FORMULA CHEAT SHEET & GOVERNING EQUATIONS', CONTENT_LEFT, doc.y, { underline: true });
        doc.moveDown(0.5);

        formulas.forEach((item, fIdx) => {
          checkPageBreak(30);
          const fName = typeof item === 'string' ? item : (item.name || item.title || `Formula #${fIdx + 1}`);
          const fEquation = cleanMathText(typeof item === 'object' ? (item.formula || item.equation || '') : '');
          const fWhen = typeof item === 'object' && item.whenToUse ? ` (Use: ${cleanMathText(item.whenToUse)})` : '';

          doc.rect(CONTENT_LEFT, doc.y, CONTENT_WIDTH, 24).fillAndStroke('#FEF2F2', '#FECACA');
          doc.fillColor(INK_RED).fontSize(9.5).text(
            `[${fIdx + 1}] ${fName}:  ${fEquation} ${fWhen}`,
            CONTENT_LEFT + 10,
            doc.y + 6,
            { width: CONTENT_WIDTH - 20 }
          );
          doc.y += 28;
        });
        doc.moveDown(0.8);
      }

      // ════════════════════════════════════════════════════════════
      // 5. PREVIOUS YEAR QUESTIONS (PYQs) & SOLUTIONS
      // ════════════════════════════════════════════════════════════
      const pyqs = (Array.isArray(note.importantPYQs) && note.importantPYQs.length > 0)
        ? note.importantPYQs
        : (Array.isArray(note.pyqs) ? note.pyqs : []);

      if (pyqs.length > 0) {
        checkPageBreak(90);
        doc.fillColor(INK_BLACK).fontSize(14).text('🎯 EXAM PYQS (PREVIOUS YEAR QUESTIONS) WITH DETAILED SOLUTIONS', CONTENT_LEFT, doc.y, { underline: true });
        doc.moveDown(0.6);

        pyqs.slice(0, 8).forEach((q, qIdx) => {
          checkPageBreak(70);

          const examTag = q.exam || q.targetExam || note.targetExam || 'University Exam';
          const yearTag = q.year ? `(${q.year})` : '';
          const marksTag = q.marks ? `[${q.marks} Marks]` : '';

          doc.fillColor('#7C3AED').fontSize(9.5).text(`Q${qIdx + 1}. [${examTag} ${yearTag} ${marksTag}]`, CONTENT_LEFT, doc.y);
          doc.moveDown(0.2);

          doc.fillColor(INK_BLACK).fontSize(9.5).lineGap(1.2).text(cleanMathText(q.question || q.q || ''), CONTENT_LEFT + 6, doc.y, { width: CONTENT_WIDTH - 12 });
          doc.moveDown(0.3);

          // Options if MCQ
          if (Array.isArray(q.options) && q.options.length > 0) {
            q.options.forEach((opt, oIdx) => {
              const letter = ['A', 'B', 'C', 'D'][oIdx] || `(${oIdx + 1})`;
              doc.fillColor('#475569').fontSize(8.5).text(`    ${letter}) ${cleanMathText(opt)}`, CONTENT_LEFT + 8, doc.y);
              doc.moveDown(0.2);
            });
          }

          // Answer & Explanation
          if (q.answer || q.solution || q.correctAnswer) {
            checkPageBreak(30);
            const ans = cleanMathText(q.correctAnswer || q.answer || '');
            if (ans) {
              doc.fillColor(INK_GREEN).fontSize(9).text(`  ✅ Correct Answer: ${ans}`, CONTENT_LEFT + 6, doc.y);
              doc.moveDown(0.2);
            }
            const sol = cleanMathText(q.explanation || q.solution || '');
            if (sol) {
              doc.fillColor('#334155').fontSize(8.5).text(`  💡 Solution Steps: ${sol}`, CONTENT_LEFT + 6, doc.y, { width: CONTENT_WIDTH - 12 });
            }
          }

          doc.moveDown(0.6);
        });
      }

      // ════════════════════════════════════════════════════════════
      // 6. SHORTCUTS & COMMON MISTAKES
      // ════════════════════════════════════════════════════════════
      const shortcuts = Array.isArray(note.shortcutsAndTricks) ? note.shortcutsAndTricks : [];
      const mistakes = Array.isArray(note.commonMistakes) ? note.commonMistakes : [];

      if (shortcuts.length > 0 || mistakes.length > 0) {
        checkPageBreak(70);
        doc.fillColor(INK_BLACK).fontSize(12).text('⚡ SPEED TRICKS & COMMON MISTAKES TO AVOID', CONTENT_LEFT, doc.y, { underline: true });
        doc.moveDown(0.4);

        if (shortcuts.length > 0) {
          doc.fillColor(INK_GREEN).fontSize(9.5).text(`🚀 Pro Exam Shortcut: ${shortcuts.slice(0, 2).join(' | ')}`, CONTENT_LEFT + 6, doc.y, { width: CONTENT_WIDTH - 12 });
          doc.moveDown(0.3);
        }

        if (mistakes.length > 0) {
          doc.fillColor(INK_RED).fontSize(9.5).text(`⚠️ Student Mistake to Avoid: ${mistakes.slice(0, 2).join(' | ')}`, CONTENT_LEFT + 6, doc.y, { width: CONTENT_WIDTH - 12 });
          doc.moveDown(0.4);
        }
      }

      // ════════════════════════════════════════════════════════════
      // 7. FOOTER NUMBERING ACROSS ALL PAGES
      // ════════════════════════════════════════════════════════════
      try {
        const pages = doc.bufferedPageRange();
        const start = typeof pages.start === 'number' ? pages.start : 0;
        const total = typeof pages.count === 'number' ? pages.count : 0;
        for (let i = start; i < start + total; i++) {
          try {
            doc.switchToPage(i);
            doc.fillColor('#64748B').fontSize(8).text(
              `⚡ OmniStudy AI Topper Notes (Akanksha Maurya)  •  Page ${i - start + 1} of ${total}  •  https://omni-study-ai-lilac.vercel.app/`,
              CONTENT_LEFT,
              800,
              { align: 'center', width: CONTENT_WIDTH }
            );
          } catch (pErr) {
            // Safe ignore if page out of buffer range
          }
        }
      } catch (fErr) {
        console.warn('[pdfService] Footer numbering notice:', fErr.message);
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
