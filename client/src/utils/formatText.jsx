import React from 'react';

/**
 * Normalizes and cleans raw mathematical and LaTeX symbols into clean,
 * natural, readable Unicode characters.
 */
export function cleanMathSymbols(str) {
  if (!str || typeof str !== 'string') return '';

  let res = str
    // Remove wrapping $$ or $ delimiters
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    // LaTeX text macros: \text{something}, \mathrm{something}, \mathbf{something}
    .replace(/\\(text|mathrm|mathbf|mathit|boldsymbol)\{([^}]+)\}/g, '$2')
    // Fractions: \frac{a}{b} -> (a / b)
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    // Square roots: \sqrt{a} -> √(a)
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    // Common math relations & operators
    .replace(/\\(approx|sim)/g, '≈')
    .replace(/\\(neq|ne)/g, '≠')
    .replace(/\\(leq|le)/g, '≤')
    .replace(/\\(geq|ge)/g, '≥')
    .replace(/\\(pm)/g, '±')
    .replace(/\\(mp)/g, '∓')
    .replace(/\\(times)/g, '×')
    .replace(/\\(cdot)/g, '·')
    .replace(/\\(div)/g, '÷')
    .replace(/\\(degree|circ)/g, '°')
    .replace(/\^\\circ/g, '°')
    .replace(/\\(infty)/g, '∞')
    // Greek letters
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\Gamma/g, 'Γ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\epsilon|\\varepsilon/g, 'ε')
    .replace(/\\zeta/g, 'ζ')
    .replace(/\\eta/g, 'η')
    .replace(/\\theta/g, 'θ')
    .replace(/\\Theta/g, 'Θ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\Lambda/g, 'Λ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\nu/g, 'ν')
    .replace(/\\xi/g, 'ξ')
    .replace(/\\pi/g, 'π')
    .replace(/\\Pi/g, 'Π')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\phi|\\varphi/g, 'φ')
    .replace(/\\Phi/g, 'Φ')
    .replace(/\\chi/g, 'χ')
    .replace(/\\psi/g, 'ψ')
    .replace(/\\Psi/g, 'Ψ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\Omega/g, 'Ω')
    // Arrows & Logic
    .replace(/\\(to|rightarrow)/g, ' → ')
    .replace(/\\(leftarrow)/g, ' ← ')
    .replace(/\\(leftrightarrow)/g, ' ↔ ')
    .replace(/\\(implies|Rightarrow)/g, ' ⇒ ')
    .replace(/\\(iff|Leftrightarrow)/g, ' ⇔ ')
    // Sets & Calculus
    .replace(/\\in/g, '∈')
    .replace(/\\notin/g, '∉')
    .replace(/\\subset/g, '⊂')
    .replace(/\\subseteq/g, '⊆')
    .replace(/\\cap/g, '∩')
    .replace(/\\cup/g, '∪')
    .replace(/\\forall/g, '∀')
    .replace(/\\exists/g, '∃')
    .replace(/\\sum/g, '∑')
    .replace(/\\prod/g, '∏')
    .replace(/\\int/g, '∫')
    .replace(/\\partial/g, '∂')
    .replace(/\\nabla/g, '∇')
    // Common brackets & cleanup
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\\left\\\{/g, '{')
    .replace(/\\right\\\}/g, '}')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    // Common superscripts
    .replace(/\^2\b/g, '²')
    .replace(/\^3\b/g, '³')
    .replace(/\^0\b/g, '⁰')
    .replace(/\^1\b/g, '¹')
    .replace(/\^4\b/g, '⁴')
    .replace(/\^n\b/g, 'ⁿ')
    .replace(/\^\+/g, '⁺')
    .replace(/\^-/g, '⁻')
    // Spacing commands
    .replace(/\\(quad|qquad|,|;|!)/g, ' ')
    // Remove stray leftover backslashes followed by letters
    .replace(/\\([a-zA-Z]+)/g, '$1')
    .replace(/\\/g, '')
    // HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Remove Unicode replacement character artifacts (corrupted symbols)
    .replace(/\uFFFD+/g, '')
    // Collapse multiple whitespace
    .replace(/[ \t]+/g, ' ')
    .trim();

  return res;
}

/**
 * Cleans plain text completely by stripping any raw markdown asterisks,
 * hashes, and strange symbols, returning plain text suitable for speech,
 * search indexes, or clean labels.
 */
export function cleanNoteText(str) {
  if (!str || typeof str !== 'string') return '';
  let cleaned = cleanMathSymbols(str);
  // Remove markdown headers
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
  // Remove triple, double, single asterisks while keeping the text inside
  cleaned = cleaned.replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1');
  // Remove backtick code blocks
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  // Clean dangling asterisks
  cleaned = cleaned.replace(/\*+/g, '');
  return cleaned.trim();
}

/**
 * Converts text into clean HTML with <strong>, <em>, and <code> tags
 * without any raw asterisks or unparsed symbols. Used for PDF generation,
 * copy-to-clipboard, etc.
 */
export function cleanNoteHtml(str) {
  if (!str) return '';
  let s = cleanMathSymbols(String(str));

  // Strip leading heading markers
  s = s.replace(/^#{1,6}\s+/gm, '');

  // 1. Triple asterisks ***text*** or ***text:*** -> bold + italic
  s = s.replace(/\*{3}([^*]+)\*{3}/g, '<strong style="font-weight: 700;">$1</strong>');

  // 2. Double asterisks **text** -> bold
  s = s.replace(/\*{2}([^*]+)\*{2}/g, '<strong style="font-weight: 700;">$1</strong>');

  // 3. Single asterisk *text* -> em
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // 4. Backticks `code` -> code tag
  s = s.replace(/`([^`]+)`/g, '<code style="font-family: monospace; font-size: 0.9em; background: rgba(0,0,0,0.06); padding: 1px 4px; border-radius: 4px;">$1</code>');

  // 5. Clean up any leftover stray asterisks
  s = s.replace(/\*+/g, '');

  return s;
}

/**
 * High-performance, safe React component that parses Markdown bold (*** or **),
 * italics (*), code backticks (`...`), and math symbols into clean, accessible JSX.
 * Eliminates all "***" artifacts, stray symbols, and raw markup.
 */
export function FormattedText({ text, className = '' }) {
  if (!text) return null;

  const raw = String(text);
  const cleaned = cleanMathSymbols(raw);

  // Regex that captures:
  // 1. ***bold*** or **bold**
  // 2. `code`
  // 3. *italic*
  const tokenRegex = /(\*{2,3}[^*]+\*{2,3}|`[^`]+`|\*[^*]+\*)/g;
  const parts = cleaned.split(tokenRegex);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (!part) return null;

        // Triple or double asterisks: ***text*** or **text**
        if ((part.startsWith('***') && part.endsWith('***')) ||
            (part.startsWith('**') && part.endsWith('**'))) {
          const inner = part.replace(/^\*{2,3}/, '').replace(/\*{2,3}$/, '').trim();
          return (
            <strong
              key={idx}
              className="font-bold text-slate-900 dark:text-white"
            >
              {inner}
            </strong>
          );
        }

        // Single asterisk: *italic*
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          const inner = part.slice(1, -1).trim();
          return (
            <em key={idx} className="italic text-slate-800 dark:text-slate-200">
              {inner}
            </em>
          );
        }

        // Backtick code: `code`
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          const inner = part.slice(1, -1);
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {inner}
            </code>
          );
        }

        // Clean any stray asterisks from plain text segment
        const safeText = part.replace(/\*+/g, '');
        return <React.Fragment key={idx}>{safeText}</React.Fragment>;
      })}
    </span>
  );
}

export default FormattedText;
