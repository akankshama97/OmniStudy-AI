/**
 * DSTL Complete 5-Unit Subject Master Handwritten E-Booklet
 * Aligned with AKTU B.Tech Syllabus (KCS-303)
 */

export const DSTL_HASSE_SVG = `<svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hasseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.04" />
    </linearGradient>
  </defs>
  <rect x="20" y="10" width="500" height="240" rx="12" fill="url(#hasseGrad)" stroke="#3B82F6" stroke-width="1.5" />
  <text x="270" y="32" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#1E3A8A">Hasse Diagram: Poset (D30, |) Divisors of 30</text>
  
  <line x1="270" y1="210" x2="150" y2="150" stroke="#64748B" stroke-width="2" />
  <line x1="270" y1="210" x2="270" y2="150" stroke="#64748B" stroke-width="2" />
  <line x1="270" y1="210" x2="390" y2="150" stroke="#64748B" stroke-width="2" />
  
  <line x1="150" y1="150" x2="200" y2="90" stroke="#64748B" stroke-width="2" />
  <line x1="150" y1="150" x2="340" y2="90" stroke="#64748B" stroke-width="2" />
  <line x1="270" y1="150" x2="200" y2="90" stroke="#64748B" stroke-width="2" />
  <line x1="270" y1="150" x2="270" y2="90" stroke="#64748B" stroke-width="2" />
  <line x1="390" y1="150" x2="270" y2="90" stroke="#64748B" stroke-width="2" />
  <line x1="390" y1="150" x2="340" y2="90" stroke="#64748B" stroke-width="2" />
  
  <line x1="200" y1="90" x2="270" y2="50" stroke="#64748B" stroke-width="2" />
  <line x1="270" y1="90" x2="270" y2="50" stroke="#64748B" stroke-width="2" />
  <line x1="340" y1="90" x2="270" y2="50" stroke="#64748B" stroke-width="2" />
  
  <circle cx="270" cy="210" r="14" fill="#FFFFFF" stroke="#2563EB" stroke-width="2.5" />
  <text x="270" y="215" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#1E3A8A">1</text>
  
  <circle cx="150" cy="150" r="14" fill="#FFFFFF" stroke="#10B981" stroke-width="2.5" />
  <text x="150" y="155" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#047857">2</text>
  <circle cx="270" cy="150" r="14" fill="#FFFFFF" stroke="#10B981" stroke-width="2.5" />
  <text x="270" y="155" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#047857">3</text>
  <circle cx="390" cy="150" r="14" fill="#FFFFFF" stroke="#10B981" stroke-width="2.5" />
  <text x="390" y="155" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#047857">5</text>
  
  <circle cx="200" cy="90" r="14" fill="#FFFFFF" stroke="#F59E0B" stroke-width="2.5" />
  <text x="200" y="95" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#B45309">6</text>
  <circle cx="270" cy="90" r="14" fill="#FFFFFF" stroke="#F59E0B" stroke-width="2.5" />
  <text x="270" y="95" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#B45309">15</text>
  <circle cx="340" cy="90" r="14" fill="#FFFFFF" stroke="#F59E0B" stroke-width="2.5" />
  <text x="340" y="95" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#B45309">10</text>
  
  <circle cx="270" cy="50" r="14" fill="#FFFFFF" stroke="#EF4444" stroke-width="2.5" />
  <text x="270" y="55" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="12" font-weight="bold" fill="#B91C1C">30</text>
</svg>`;

export const DSTL_ALGEBRA_HIERARCHY_SVG = `<svg viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="algArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
    </marker>
  </defs>
  <rect x="15" y="45" width="85" height="55" rx="8" fill="rgba(37,99,235,0.08)" stroke="#2563EB" stroke-width="2"/>
  <text x="57" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#1E3A8A">Groupoid</text>
  <text x="57" y="86" text-anchor="middle" font-size="9" fill="#64748B">Closure</text>

  <line x1="100" y1="72" x2="125" y2="72" stroke="#2563EB" stroke-width="2" marker-end="url(#algArr)" />

  <rect x="125" y="45" width="95" height="55" rx="8" fill="rgba(16,185,129,0.08)" stroke="#10B981" stroke-width="2"/>
  <text x="172" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#047857">Semigroup</text>
  <text x="172" y="86" text-anchor="middle" font-size="9" fill="#64748B">+ Associativity</text>

  <line x1="220" y1="72" x2="245" y2="72" stroke="#2563EB" stroke-width="2" marker-end="url(#algArr)" />

  <rect x="245" y="45" width="85" height="55" rx="8" fill="rgba(245,158,11,0.08)" stroke="#F59E0B" stroke-width="2"/>
  <text x="287" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#B45309">Monoid</text>
  <text x="287" y="86" text-anchor="middle" font-size="9" fill="#64748B">+ Identity (e)</text>

  <line x1="330" y1="72" x2="355" y2="72" stroke="#2563EB" stroke-width="2" marker-end="url(#algArr)" />

  <rect x="355" y="45" width="80" height="55" rx="8" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6" stroke-width="2"/>
  <text x="395" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="11" font-weight="bold" fill="#6D28D9">Group</text>
  <text x="395" y="86" text-anchor="middle" font-size="9" fill="#64748B">+ Inverse (a⁻¹)</text>

  <line x1="435" y1="72" x2="455" y2="72" stroke="#2563EB" stroke-width="2" marker-end="url(#algArr)" />

  <rect x="455" y="45" width="75" height="55" rx="8" fill="rgba(239,68,68,0.08)" stroke="#EF4444" stroke-width="2"/>
  <text x="492" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="10" font-weight="bold" fill="#B91C1C">Abelian</text>
  <text x="492" y="86" text-anchor="middle" font-size="9" fill="#64748B">+ Commutative</text>
</svg>`;

export const DSTL_EBOOK_NOTE = {
  id: 'dstl-full-playlist-ebook',
  videoId: 'dstl-full-playlist-ebook',
  isPlaylist: true,
  isEBook: true,
  totalUnits: 5,
  title: "Discrete Structures & Theory of Logic (DSTL / KCS-303) — Full 5-Unit Subject Master E-Booklet",
  subject: "Discrete Mathematics (DSTL)",
  chapter: "DSTL (KCS-303): Complete 5-Unit Subject Master Handwritten E-Booklet",
  channelTitle: "Gate Smashers / Knowledge Gate",
  targetExam: "AKTU B.Tech (KCS-303 / 2nd Year CSE/IT)",
  teachingStyle: "Blackboard Derivations, Proofs & Hasse Diagrams",
  estReadTime: "45 mins master read",
  overview: "This complete 5-unit subject master e-booklet compiles all foundational concepts of Discrete Structures & Theory of Logic (DSTL / KCS-303) strictly aligned with the AKTU semester examination blueprint. Covers Unit 1 (Set Theory, Relations, Equivalence Classes, Partial Orders & Hashing), Unit 2 (Algebraic Structures, Semigroups, Monoids, Groups, Lagrange's Theorem, Rings & Fields), Unit 3 (Posets, Hasse Diagrams, Lattices as Posets & Algebraic Systems, Complemented & Distributive Lattices, Boolean Algebra), Unit 4 (Propositional Logic, Tautology, Truth Tables, Inference Rules, Normal Forms CNF/DNF & Predicate Calculus), and Unit 5 (Combinatorics, Pigeonhole Principle, Permutations & Combinations, Generating Functions, and Linear Recurrence Relations with Constant Coefficients).",
  quickSummary: [
    "Unit 1: Relations are reflexive, symmetric, and transitive. Equivalence relation partitions set into disjoint equivalence classes.",
    "Unit 2: Group satisfies 4 axioms (Closure, Associativity, Identity, Inverse). Lagrange's theorem states subgroup order divides group order.",
    "Unit 3: Poset (S, ≤) satisfies Reflexivity, Antisymmetry, Transitivity. A Lattice is a Poset where every pair has unique LUB (join) and GLB (meet).",
    "Unit 4: Propositional tautology verified via truth tables and natural deduction. Universal (∀) and Existential (∃) quantifiers formalize predicates.",
    "Unit 5: Pigeonhole Principle guarantees collision (⌈n/k⌉). Linear recurrence solved via characteristic roots r₁ and r₂."
  ],
  units: [
    {
      unitNumber: 1,
      unitTitle: "Unit 1: Set Theory, Relations, Functions & Hashing",
      examWeightage: "20-25 Marks (Section B & C)",
      overview: "Sets, multisets, Venn diagrams, Cartesian products, binary relations, equivalence relations, matrix of relation, and hashing collision resolution."
    },
    {
      unitNumber: 2,
      unitTitle: "Unit 2: Algebraic Structures, Groups, Rings & Fields",
      examWeightage: "20-25 Marks (Section B & C)",
      overview: "Binary operations, Groupoids, Semigroups, Monoids, Groups, Abelian & Cyclic groups, Subgroups, Cosets, Lagrange's Theorem, Homomorphism, Rings & Fields."
    },
    {
      unitNumber: 3,
      unitTitle: "Unit 3: Posets, Lattices, Boolean Algebra & Hasse Diagrams",
      examWeightage: "20-25 Marks (Section B & C)",
      overview: "Partial Ordered Sets (POSETs), Hasse diagrams, Maximal/Minimal elements, Lattices (LUB/GLB), Distributive, Complemented, Bounded Lattices and Boolean Algebra."
    },
    {
      unitNumber: 4,
      unitTitle: "Unit 4: Propositional Logic, Truth Tables & Predicate Calculus",
      examWeightage: "20-25 Marks (Section B & C)",
      overview: "Propositions, logical connectives (AND, OR, NOT, IMPLIES, BICONDITIONAL), truth tables, tautologies, rules of inference, normal forms (CNF/DNF), and quantifiers."
    },
    {
      unitNumber: 5,
      unitTitle: "Unit 5: Combinatorics, Generating Functions & Recurrence Relations",
      examWeightage: "20-25 Marks (Section B & C)",
      overview: "Counting principles, permutations, combinations, Pigeonhole Principle, Principle of Inclusion-Exclusion, generating functions, and homogeneous/non-homogeneous recurrence relations."
    }
  ],
  keyConcepts: [
    // UNIT 1
    {
      unitNumber: 1,
      timestamp_start: "00:00",
      timestamp_end: "14:20",
      heading: "1. Set Operations, Cartesian Product & Power Sets",
      subheading: "Subsets, Power Set cardinality 2^n, Cartesian Product A × B",
      definitions: [
        "A Set is a well-defined collection of distinct objects.",
        "Power Set P(A) is the set of all subsets of set A. If |A| = n, then |P(A)| = 2^n."
      ],
      points: [
        "Cartesian product A × B = {(a, b) | a ∈ A and b ∈ B}. |A × B| = |A| × |B|.",
        "Complement of set A with respect to universal set U: A' = {x ∈ U | x ∉ A}.",
        "De Morgan's Laws of Sets: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'.",
        "Principle of Inclusion-Exclusion for two sets: |A ∪ B| = |A| + |B| - |A ∩ B|."
      ],
      formulas: [
        {
          name: "Power Set Cardinality",
          formula: "|P(A)| = 2^n",
          variables: "n = \\text{Number of elements in set } A",
          units: "Cardinality Count",
          conditions: "Valid for any finite set"
        }
      ],
      teacher_tips: [
        "AKTU 2-mark question: Empty set ∅ is a subset of every set, and ∅ ∈ P(A) always!"
      ]
    },
    {
      unitNumber: 1,
      timestamp_start: "14:20",
      timestamp_end: "28:50",
      heading: "2. Binary Relations: Reflexive, Symmetric, Transitive & Equivalence",
      subheading: "Properties of relations on set A, relation matrix, equivalence classes",
      definitions: [
        "A Binary Relation R from set A to B is a subset of Cartesian product A × B (R ⊆ A × B). Total number of relations is 2^(m × n).",
        "An Equivalence Relation is a relation that is Reflexive (aRa ∀ a), Symmetric (aRb ⇒ bRa), and Transitive (aRb ∧ bRc ⇒ aRc)."
      ],
      points: [
        "Reflexive: (a, a) ∈ R for all a ∈ A. Number of reflexive relations on set of size n is 2^(n(n-1)).",
        "Symmetric: If (a, b) ∈ R then (b, a) ∈ R. Number of symmetric relations is 2^(n(n+1)/2).",
        "Antisymmetric: If (a, b) ∈ R and (b, a) ∈ R, then a = b.",
        "Equivalence Classes: Given an equivalence relation R, the equivalence class of an element a is [a] = {x ∈ A | (x, a) ∈ R}. Equivalence classes partition set A into mutually disjoint non-empty subsets."
      ],
      formulas: [
        {
          name: "Total Relations on Set A",
          formula: "N_{rel} = 2^{n^2}",
          variables: "n = |A|",
          units: "Integer Count",
          conditions: "Binary relations on set of n elements"
        },
        {
          name: "Total Reflexive Relations",
          formula: "N_{refl} = 2^{n(n-1)}",
          variables: "n = |A|",
          units: "Integer Count",
          conditions: "Diagonal pairs fixed to 1"
        }
      ],
      solved_example: {
        title: "AKTU Numerical: Verify Equivalence Relation & Partition",
        given: "Let Z be integers and R = {(a, b) ∈ Z × Z | a ≡ b (mod 3)} (i.e. 3 divides a - b).",
        toFind: "Show R is an Equivalence Relation and find all equivalence classes.",
        formula: "Reflexive: 3 | (a-a); Symmetric: 3 | (a-b) => 3 | (b-a); Transitive: 3 | (a-b) and 3 | (b-c) => 3 | (a-c)",
        solution: "1. Reflexive: a - a = 0 = 3 × 0, so (a, a) ∈ R ∀ a ∈ Z.\n2. Symmetric: If a - b = 3k, then b - a = 3(-k). Hence (b, a) ∈ R.\n3. Transitive: If a - b = 3k and b - c = 3m, adding gives a - c = 3(k + m). Hence (a, c) ∈ R.\nTherefore, R is an equivalence relation.\nEquivalence classes: [0] = {..., -3, 0, 3, 6, ...}, [1] = {..., -2, 1, 4, 7, ...}, [2] = {..., -1, 2, 5, 8, ...}.",
        answer: "R is Equivalence Relation with 3 disjoint classes [0], [1], [2].",
        short_trick: "Modulo n equivalence relation always produces exactly n disjoint equivalence classes."
      },
      teacher_tips: [
        "AKTU 10-Mark Sure-Shot: Kongruence modulo n par equivalence relation ka proof har doosre saal aata hai!"
      ]
    },
    {
      unitNumber: 1,
      timestamp_start: "28:50",
      timestamp_end: "41:10",
      heading: "3. Hashing Techniques & Collision Resolution Strategies",
      subheading: "Hash functions (Division, Mid-square, Folding), Chaining vs Open Addressing",
      definitions: [
        "Hashing is a technique used to map large-range search keys into a smaller, fixed-size address space (hash table) using a mathematical hash function h(k).",
        "A Collision occurs when two distinct keys k₁ ≠ k₂ map to the exact same hash address: h(k₁) = h(k₂)."
      ],
      points: [
        "Common Hash Functions: Division method h(k) = k mod m (where m is prime), Mid-Square method, and Folding method.",
        "Collision Resolution Strategy 1: Separate Chaining (Open Hashing) — Each bucket in hash table maintains a linked list of colliding elements.",
        "Collision Resolution Strategy 2: Open Addressing (Closed Hashing) — Colliding elements are stored in alternate open slots in table.",
        "Linear Probing: h'(k, i) = (h(k) + i) mod m. Problem: Causes Primary Clustering.",
        "Quadratic Probing: h'(k, i) = (h(k) + c₁·i + c₂·i²) mod m. Eliminates primary clustering.",
        "Double Hashing: h'(k, i) = (h₁(k) + i·h₂(k)) mod m. Best open addressing technique."
      ],
      formulas: [
        {
          name: "Division Hash Function",
          formula: "h(k) = k \\pmod{m}",
          variables: "k = \\text{Key value}, m = \\text{Hash table size (prime)}",
          units: "Bucket index [0, m-1]",
          conditions: "m should not be a power of 2"
        },
        {
          name: "Linear Probing Formula",
          formula: "h'(k, i) = (h(k) + i) \\pmod{m}",
          variables: "i = \\text{Probe index } [0, 1, 2, \\dots]",
          units: "Table Slot Address",
          conditions: "Step size = 1"
        }
      ],
      teacher_tips: [
        "DSTL Unit 1 ka last topic Hashing hai. Examiner 10 marks me key sequence de kar linear probing ka table banwata hai!"
      ]
    },

    // UNIT 2
    {
      unitNumber: 2,
      timestamp_start: "41:10",
      timestamp_end: "58:00",
      heading: "4. Algebraic Structures: Groupoid, Semigroup, Monoid & Groups",
      subheading: "Axioms: Closure, Associativity, Identity existence, Inverse existence",
      definitions: [
        "An Algebraic Structure is a non-empty set G equipped with one or more binary operations * denoted as (G, *).",
        "A Group (G, *) is an algebraic structure that satisfies Closure, Associativity, Existence of Identity, and Existence of Inverse."
      ],
      points: [
        "1. Groupoid: Satisfies only Closure property: ∀ a, b ∈ G, a * b ∈ G.",
        "2. Semigroup: Satisfies Closure + Associativity: ∀ a, b, c ∈ G, (a * b) * c = a * (b * c).",
        "3. Monoid: Semigroup that contains an Identity element e ∈ G such that a * e = e * a = a ∀ a ∈ G.",
        "4. Group: Monoid where every element a ∈ G has a unique inverse a⁻¹ ∈ G such that a * a⁻¹ = a⁻¹ * a = e.",
        "5. Abelian Group: A Group that additionally satisfies Commutativity: a * b = b * a ∀ a, b ∈ G."
      ],
      diagram: {
        heading: "Algebraic Structure Hierarchy from Groupoid to Abelian Group",
        description: "Visual progression showing cumulative mathematical axioms from Closure to Commutativity.",
        type: "svg",
        labels: ["Groupoid", "Semigroup", "Monoid", "Group", "Abelian"],
        svg_or_mermaid: DSTL_ALGEBRA_HIERARCHY_SVG,
        isStandardDiagram: true,
        timestamp: "45:30"
      },
      teacher_tips: [
        "Remember: Set of natural numbers (N, +) is a Semigroup, (N, ·) is a Monoid (identity 1), (Z, +) is an Abelian Group!"
      ]
    },
    {
      unitNumber: 2,
      timestamp_start: "58:00",
      timestamp_end: "1:15:20",
      heading: "5. Subgroups, Cosets & Lagrange's Theorem Proof",
      subheading: "Left and right cosets, order of element, Lagrange's Theorem derivation",
      definitions: [
        "A subset H of a group G is called a Subgroup of G (H ≤ G) if H itself forms a group under the same operation as G.",
        "Lagrange's Theorem: The order of every subgroup H of a finite group G divides the order of G. That is, |G| / |H| is an integer."
      ],
      points: [
        "One-Step Subgroup Test: Non-empty subset H is a subgroup if and only if ∀ a, b ∈ H, a * b⁻¹ ∈ H.",
        "Cosets: For subgroup H ≤ G and a ∈ G, Left Coset aH = {a * h | h ∈ H} and Right Coset Ha = {h * a | h ∈ H}.",
        "Properties of Cosets: Any two left (or right) cosets are either disjoint or completely identical.",
        "Index of Subgroup [G : H]: The number of distinct left (or right) cosets of H in G. [G : H] = |G| / |H|."
      ],
      formulas: [
        {
          name: "Lagrange's Theorem Equation",
          formula: "|G| = [G : H] \\cdot |H|",
          variables: "|G| = \\text{Order of group}, |H| = \\text{Order of subgroup}, [G:H] = \\text{Index}",
          units: "Integer Divisibility",
          conditions: "Finite group G"
        }
      ],
      solved_example: {
        title: "AKTU Theorem Proof: Prove Lagrange's Theorem",
        given: "Let G be a finite group of order n, and H be a subgroup of G of order m.",
        toFind: "Prove that m divides n (|H| divides |G|).",
        formula: "|G| = k \\cdot |H| \\implies |H| \\text{ divides } |G|",
        solution: "Step 1: Let the distinct left cosets of H in G be a₁H, a₂H, ..., a_kH.\nStep 2: Since cosets partition G, G is the union of disjoint cosets: G = a₁H ∪ a₂H ∪ ... ∪ a_kH.\nStep 3: Since distinct cosets are mutually disjoint: |G| = |a₁H| + |a₂H| + ... + |a_kH|.\nStep 4: Each coset has exactly the same number of elements as H, so |a_iH| = |H| = m for all i.\nStep 5: Hence |G| = m + m + ... (k times) = k × m = k × |H|.\nStep 6: Therefore, |H| divides |G|, and k = [G : H] = |G| / |H|.",
        answer: "Q.E.D. Order of subgroup divides order of group.",
        short_trick: "Always mention two lemmas: (1) bijection between H and aH, (2) cosets form a partition of G."
      },
      teacher_tips: [
        "AKTU 10-Mark Compulsory Question: Lagrange's theorem statement & proof is asked almost EVERY year!"
      ]
    },

    // UNIT 3
    {
      unitNumber: 3,
      timestamp_start: "1:15:20",
      timestamp_end: "1:32:40",
      heading: "6. Partially Ordered Sets (POSET) & Hasse Diagram Construction",
      subheading: "Reflexive, Antisymmetric, Transitive relation; drawing Hasse diagrams without loops",
      definitions: [
        "A Partially Ordered Set (POSET) is a pair (S, ≤) where S is a set and ≤ is a binary relation that is Reflexive, Antisymmetric, and Transitive.",
        "A Hasse Diagram is a simplified graphical representation of a finite POSET where self-loops (reflexivity) and transitive edges are eliminated, and directions are implied upwards."
      ],
      points: [
        "Step 1: Start with the directed graph (digraph) of the partial order relation.",
        "Step 2: Remove all self-loops (since reflexivity a ≤ a is understood for every vertex).",
        "Step 3: Remove all transitive edges (if a ≤ b and b ≤ c, remove direct edge a → c).",
        "Step 4: Arrange vertices so that if a ≤ b, then b is positioned vertically above a.",
        "Step 5: Replace directed arrows with simple undirected upward line segments."
      ],
      diagram: {
        heading: "Hasse Diagram of Divisors of 30 (D30, |)",
        description: "Classic 4-level Boolean lattice cube showing divisors {1, 2, 3, 5, 6, 10, 15, 30}.",
        type: "svg",
        labels: ["Bottom: 1", "Primes: 2, 3, 5", "Products: 6, 10, 15", "Top: 30"],
        svg_or_mermaid: DSTL_HASSE_SVG,
        isStandardDiagram: true,
        timestamp: "1:22:15"
      },
      teacher_tips: [
        "AKTU Top Sure-Shot: D12, D30, D36 ya D45 ka Hasse diagram draw karne ka 10-mark question aata hi aata hai!"
      ]
    },
    {
      unitNumber: 3,
      timestamp_start: "1:32:40",
      timestamp_end: "1:48:10",
      heading: "7. Lattices as Posets & Algebraic Structures",
      subheading: "LUB (Least Upper Bound / Join ∨), GLB (Greatest Lower Bound / Meet ∧)",
      definitions: [
        "A Lattice is a POSET (L, ≤) in which every pair of elements {a, b} has a unique Least Upper Bound (LUB or Join: a ∨ b) and a unique Greatest Lower Bound (GLB or Meet: a ∧ b).",
        "A Distributive Lattice satisfies: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c) and a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)."
      ],
      points: [
        "Join (∨): In divisibility lattice, a ∨ b = LCM(a, b). In subset lattice, a ∨ b = A ∪ B.",
        "Meet (∧): In divisibility lattice, a ∧ b = GCD(a, b). In subset lattice, a ∧ b = A ∩ B.",
        "Bounded Lattice: Contains a least element 0 (bottom) and a greatest element 1 (top).",
        "Complement of element a: An element a' such that a ∨ a' = 1 and a ∧ a' = 0.",
        "Complemented Lattice: A bounded lattice where every element has at least one complement.",
        "Boolean Algebra: A lattice that is BOTH Distributive and Complemented."
      ],
      formulas: [
        {
          name: "Lattice Absorption Laws",
          formula: "a \\wedge (a \\vee b) = a, \\quad a \\vee (a \\wedge b) = a",
          variables: "a, b \\in L",
          units: "Algebraic Law",
          conditions: "Holds in every lattice"
        }
      ],
      teacher_tips: [
        "Remember: If a Hasse diagram contains pentagon (N5) or diamond (M3) sublattices, check distributivity carefully!"
      ]
    },

    // UNIT 4
    {
      unitNumber: 4,
      timestamp_start: "1:48:10",
      timestamp_end: "2:04:30",
      heading: "8. Propositional Logic, Truth Tables & Logical Equivalence",
      subheading: "Connectives (¬, ∧, ∨, →, ↔), Tautology, Contradiction, CNF & DNF",
      definitions: [
        "A Proposition is a declarative statement that is either strictly True (T) or False (F), but not both.",
        "A Tautology is a compound statement that evaluates to True for every possible truth assignment of its propositional variables."
      ],
      points: [
        "Conditional Statement P → Q: False ONLY when P is True and Q is False; True in all other cases.",
        "Converse: Q → P; Inverse: ¬P → ¬Q; Contrapositive: ¬Q → ¬P. A conditional is logically equivalent to its contrapositive: P → Q ≡ ¬Q → ¬P.",
        "Biconditional P ↔ Q: True when both P and Q have identical truth values.",
        "Conjunctive Normal Form (CNF): Product of sums (conjunction of clauses, where each clause is a disjunction of literals).",
        "Disjunctive Normal Form (DNF): Sum of products (disjunction of clauses, where each clause is a conjunction of literals)."
      ],
      formulas: [
        {
          name: "Implication Equivalence Law",
          formula: "P \\rightarrow Q \\equiv \\neg P \\vee Q",
          variables: "P, Q = \\text{Propositions}",
          units: "Logical Equivalence",
          conditions: "Fundamental rewrite rule"
        },
        {
          name: "De Morgan's Propositional Laws",
          formula: "\\neg(P \\wedge Q) \\equiv \\neg P \\vee \\neg Q, \\quad \\neg(P \\vee Q) \\equiv \\neg P \\wedge \\neg Q",
          variables: "P, Q = \\text{Propositions}",
          units: "Logical Equivalence",
          conditions: "Negation distribution"
        }
      ],
      solved_example: {
        title: "AKTU Numerical: Prove Tautology via Truth Table",
        given: "Formula: [(P → Q) ∧ (Q → R)] → (P → R) (Hypothetical Syllogism).",
        toFind: "Construct truth table and verify if formula is a Tautology.",
        formula: "Evaluate truth column for all 8 combinations of (P, Q, R)",
        solution: "Row 1 (T,T,T): P->Q=T, Q->R=T, Conj=T, P->R=T => Result=T\nRow 2 (T,T,F): P->Q=T, Q->R=F, Conj=F, P->R=F => Result=T\nRow 3 (T,F,T): P->Q=F, Q->R=T, Conj=F, P->R=T => Result=T\nRow 4 (T,F,F): P->Q=F, Q->R=T, Conj=F, P->R=F => Result=T\nRow 5 (F,T,T): P->Q=T, Q->R=T, Conj=T, P->R=T => Result=T\nRow 6 (F,T,F): P->Q=T, Q->R=F, Conj=F, P->R=T => Result=T\nRow 7 (F,F,T): P->Q=T, Q->R=T, Conj=T, P->R=T => Result=T\nRow 8 (F,F,F): P->Q=T, Q->R=T, Conj=T, P->R=T => Result=T.\nSince all rows in the final column are T, the formula is a Tautology.",
        answer: "Formula is a Verified Tautology (Law of Hypothetical Syllogism).",
        short_trick: "Premise false hone par conditional statement automatically True ho jata hai (vacuous truth)."
      },
      teacher_tips: [
        "Truth table draw karte time column headers par step-by-step intermediate expressions likhein for full step marks."
      ]
    },

    // UNIT 5
    {
      unitNumber: 5,
      timestamp_start: "2:04:30",
      timestamp_end: "2:22:00",
      heading: "9. Pigeonhole Principle & Combinatorics Principles",
      subheading: "Generalized Pigeonhole Principle ceil(n/k), Permutations and Combinations",
      definitions: [
        "Pigeonhole Principle (PHP): If n items are put into k pigeonholes and n > k, then at least one pigeonhole must contain more than one item.",
        "Generalized Pigeonhole Principle: If n items are distributed into k boxes, then at least one box must contain at least ⌈n / k⌉ items."
      ],
      points: [
        "Permutations: Number of ways to arrange r elements from n distinct objects: P(n, r) = n! / (n - r)!.",
        "Combinations: Number of ways to select r elements from n distinct objects: C(n, r) = n! / (r! · (n - r)!).",
        "Principle of Inclusion-Exclusion (PIE) for 3 sets: |A ∪ B ∪ C| = |A| + |B| + |C| - (|A ∩ B| + |B ∩ C| + |C ∩ A|) + |A ∩ B ∩ C|.",
        "Derangements: Number of permutations where no element appears in its original position: D_n = n! · ∑_{i=0}^n (-1)^i / i!."
      ],
      formulas: [
        {
          name: "Generalized Pigeonhole Bound",
          formula: "m = \\left\\lceil \\frac{n}{k} \\right\\rceil",
          variables: "n = \\text{Pigeons (objects)}, k = \\text{Pigeonholes (boxes)}",
          units: "Minimum Count",
          conditions: "Guaranteed maximum bucket density"
        }
      ],
      solved_example: {
        title: "AKTU Numerical: Application of Generalized Pigeonhole Principle",
        given: "A box contains 10 red, 20 blue, 30 green, and 40 yellow balls.",
        toFind: "Find minimum balls to pick blindly to guarantee at least 12 balls of the same colour.",
        formula: "Worst-case scenario: pick maximum possible balls without reaching the target (12-1=11) in any category.",
        solution: "Step 1: Worst-case picks from each category:\n- Red: only 10 exist, pick all 10.\n- Blue: pick 11 balls.\n- Green: pick 11 balls.\n- Yellow: pick 11 balls.\nStep 2: Total balls picked without achieving 12 of same colour = 10 + 11 + 11 + 11 = 43 balls.\nStep 3: The very next ball (44th ball) MUST be either Green or Yellow, completing 12 balls of that colour.\nTherefore, minimum balls required = 43 + 1 = 44.",
        answer: "Minimum 44 balls must be selected.",
        short_trick: "Formula: Sum of min(available, target - 1) + 1."
      },
      teacher_tips: [
        "Pigeonhole questions are common in Section A (2 marks) and Section B (7 marks) of AKTU exams."
      ]
    },
    {
      unitNumber: 5,
      timestamp_start: "2:22:00",
      timestamp_end: "2:40:00",
      heading: "10. Solving Linear Recurrence Relations with Constant Coefficients",
      subheading: "Characteristic equation, homogeneous solution, repeated roots, non-homogeneous particular solution",
      definitions: [
        "A Linear Homogeneous Recurrence Relation of degree k with constant coefficients has the form: a_n = c₁ a_{n-1} + c₂ a_{n-2} + ... + c_k a_{n-k}, where c_k ≠ 0.",
        "Characteristic Equation: Obtained by assuming solution of form a_n = r^n, yielding polynomial r^k - c₁ r^{k-1} - ... - c_k = 0."
      ],
      points: [
        "Case 1 (Distinct Real Roots r₁ ≠ r₂): General solution is a_n = A · (r₁)^n + B · (r₂)^n.",
        "Case 2 (Repeated Real Roots r₁ = r₂ = r): General solution is a_n = (A + B · n) · r^n.",
        "Case 3 (Complex Conjugate Roots r = α ± iβ): Convert to polar form a_n = R^n (A cos(nθ) + B sin(nθ)).",
        "Initial Conditions: Substitute n = 0, n = 1 to solve for arbitrary constants A and B.",
        "Non-Homogeneous Recurrence: Total solution a_n = a_n^(h) + a_n^(p), where particular solution a_n^(p) matches driving function F(n)."
      ],
      formulas: [
        {
          name: "Second-Order Characteristic Equation",
          formula: "r^2 - c_1 r - c_2 = 0",
          variables: "c_1, c_2 = \\text{Recurrence coefficients}",
          units: "Algebraic Quadratic",
          conditions: "Second order homogeneous relation"
        },
        {
          name: "Distinct Roots General Solution",
          formula: "a_n = A(r_1)^n + B(r_2)^n",
          variables: "r_1, r_2 = \\text{Roots}, A, B = \\text{Constants from initial values}",
          units: "Closed-form Sequence Term",
          conditions: "r_1 \\neq r_2"
        }
      ],
      solved_example: {
        title: "AKTU 10-Mark Compulsory Numerical: Solve Recurrence Relation",
        given: "Recurrence: a_n - 7 a_{n-1} + 10 a_{n-2} = 0 for n >= 2, with a_0 = 1, a_1 = 2.",
        toFind: "Find the explicit closed-form formula for a_n.",
        formula: "Characteristic equation: r^2 - 7r + 10 = 0",
        solution: "Step 1: Write characteristic equation: r^2 - 7r + 10 = 0.\nStep 2: Factorize: (r - 2)(r - 5) = 0 => Roots r₁ = 2, r₂ = 5 (distinct real roots).\nStep 3: General solution form: a_n = A(2)^n + B(5)^n.\nStep 4: Use initial conditions:\nFor n = 0: a_0 = A(1) + B(1) = 1 => A + B = 1.\nFor n = 1: a_1 = 2A + 5B = 2.\nStep 5: Multiply (A + B = 1) by 2: 2A + 2B = 2. Subtract from (2A + 5B = 2): 3B = 0 => B = 0.\nThen A = 1 - B = 1 - 0 = 1.\nStep 6: Substitute A and B: a_n = 1 · (2)^n + 0 · (5)^n = 2^n.",
        answer: "Closed form: a_n = 2^n for all n >= 0.",
        short_trick: "Check n = 2: a_2 = 7(2) - 10(1) = 14 - 10 = 4 = 2^2. Verified!"
      },
      teacher_tips: [
        "AKTU 10 Marks Guarantee: Recurrence relation numerical har semester paper ke Section C me compulsory hota hai!"
      ]
    }
  ],
  formulas: [
    {
      unitNumber: 1,
      name: "Total Relations on Set A",
      formula: "N_{rel} = 2^{n^2}",
      variables: "n = |A|",
      units: "Count",
      conditions: "Binary relations on set of size n"
    },
    {
      unitNumber: 1,
      name: "Total Reflexive Relations",
      formula: "N_{refl} = 2^{n(n-1)}",
      variables: "n = |A|",
      units: "Count",
      conditions: "All diagonal pairs (a,a) must belong to R"
    },
    {
      unitNumber: 1,
      name: "Total Symmetric Relations",
      formula: "N_{sym} = 2^{\\frac{n(n+1)}{2}}",
      variables: "n = |A|",
      units: "Count",
      conditions: "Upper triangle determines lower triangle"
    },
    {
      unitNumber: 2,
      name: "Lagrange's Theorem Formula",
      formula: "|G| = [G : H] \\cdot |H|",
      variables: "|G| = \\text{Order of Group}, |H| = \\text{Order of Subgroup}, [G:H] = \\text{Index}",
      units: "Divisibility",
      conditions: "Finite groups only"
    },
    {
      unitNumber: 2,
      name: "Order of Element Divides Group Order",
      formula: "O(a) \\mid |G| \\implies a^{|G|} = e",
      variables: "a \\in G, e = \\text{Identity element}",
      units: "Exponent",
      conditions: "Corollary to Lagrange's theorem"
    },
    {
      unitNumber: 3,
      name: "Lattice Absorption Laws",
      formula: "a \\wedge (a \\vee b) = a, \\quad a \\vee (a \\wedge b) = a",
      variables: "a, b \\in L",
      units: "Axiom",
      conditions: "Dual absorption in all lattices"
    },
    {
      unitNumber: 4,
      name: "Implication Law",
      formula: "P \\rightarrow Q \\equiv \\neg P \\vee Q",
      variables: "P, Q = \\text{Propositions}",
      units: "Equivalence",
      conditions: "Converts conditional into disjunction"
    },
    {
      unitNumber: 4,
      name: "De Morgan's Propositional Laws",
      formula: "\\neg(P \\wedge Q) \\equiv \\neg P \\vee \\neg Q, \\quad \\neg(P \\vee Q) \\equiv \\neg P \\wedge \\neg Q",
      variables: "P, Q = \\text{Propositions}",
      units: "Equivalence",
      conditions: "Negation distribution over connectives"
    },
    {
      unitNumber: 5,
      name: "Generalized Pigeonhole Principle",
      formula: "m = \\left\\lceil \\frac{n}{k} \\right\\rceil",
      variables: "n = \\text{Objects}, k = \\text{Boxes}",
      units: "Count",
      conditions: "Pigeonhole capacity bound"
    },
    {
      unitNumber: 5,
      name: "Second-Order Homogeneous Recurrence",
      formula: "a_n = A(r_1)^n + B(r_2)^n",
      variables: "r_1, r_2 = \\text{Roots of } r^2 - c_1 r - c_2 = 0",
      units: "Sequence Term",
      conditions: "Distinct real characteristic roots"
    }
  ],
  importantPYQs: [
    {
      unitNumber: 3,
      examName: "AKTU B.Tech (KCS-303)",
      year: "2023-24 (10 Marks)",
      question: "Draw the Hasse Diagram of (D30, |), where D30 is the set of positive divisors of 30 and | denotes the divisibility relation. Determine: (i) Maximal and Minimal elements, (ii) Greatest and Least elements, (iii) Is (D30, |) a Lattice? Justify.",
      options: [
        "Yes, (D30, |) is a distributive and complemented lattice with least 1 and greatest 30",
        "No, because GCD does not exist for prime pairs",
        "It is a Poset but not a Lattice",
        "It has no maximal elements"
      ],
      correctAnswer: "Option A: Yes, (D30, |) is a distributive and complemented lattice with least 1 and greatest 30",
      solution: "Divisors of 30 = {1, 2, 3, 5, 6, 10, 15, 30}.\nLevel 0: 1 (Least / Minimal)\nLevel 1: 2, 3, 5 (Prime factors)\nLevel 2: 6, 10, 15 (Pairwise products)\nLevel 3: 30 (Greatest / Maximal).\nSince every pair has unique LUB = LCM and GLB = GCD, it is a Lattice. Since 30 = 2 × 3 × 5 (square-free), it is isomorphic to Boolean algebra B3.",
      shortTrick: "Divisors of square-free integers (e.g. 30 = 2·3·5) always form a Boolean Lattice of 2^k elements.",
      difficulty: "Medium"
    },
    {
      unitNumber: 2,
      examName: "AKTU B.Tech (KCS-303)",
      year: "2022-23 (10 Marks)",
      question: "State and prove Lagrange's Theorem for finite groups. Show that the order of every subgroup of a finite group divides the order of the group.",
      options: [
        "|G| = [G:H] * |H|, hence |H| divides |G|",
        "|G| = |H| + [G:H], hence |H| divides |G|",
        "Only valid for abelian groups",
        "Subgroup order must be a prime number"
      ],
      correctAnswer: "Option A: |G| = [G:H] * |H|, hence |H| divides |G|",
      solution: "Let H be a subgroup of finite group G. The left cosets aH partition G into mutually disjoint subsets of equal cardinality |H|. Hence |G| = k * |H|, where k = [G:H]. Therefore, |H| divides |G|.",
      shortTrick: "Bijection f(h) = ah proves each coset has equal cardinality |H|.",
      difficulty: "Medium"
    },
    {
      unitNumber: 5,
      examName: "AKTU B.Tech (KCS-303)",
      year: "2023-24 (10 Marks)",
      question: "Solve the recurrence relation a_n - 7a_{n-1} + 10a_{n-2} = 0 with initial conditions a_0 = 1, a_1 = 2.",
      options: [
        "a_n = 2^n",
        "a_n = 5^n",
        "a_n = 2(2^n) - 5^n",
        "a_n = (1 + n) 2^n"
      ],
      correctAnswer: "Option A: a_n = 2^n",
      solution: "Characteristic equation: r^2 - 7r + 10 = 0 => (r - 2)(r - 5) = 0 => r = 2, 5.\nGeneral solution: a_n = A(2)^n + B(5)^n.\na_0 = A + B = 1.\na_1 = 2A + 5B = 2.\nSolving gives B = 0, A = 1. Hence a_n = 2^n.",
      shortTrick: "Substitute n = 0, 1 into options to find matching coefficients in 5 seconds.",
      difficulty: "Easy"
    },
    {
      unitNumber: 1,
      examName: "AKTU B.Tech (KCS-303)",
      year: "2021-22 (10 Marks)",
      question: "Show that the relation R on the set of integers Z defined by aRb iff (a - b) is divisible by 5 is an equivalence relation. Find its equivalence classes.",
      options: [
        "R is equivalence relation with 5 disjoint equivalence classes [0], [1], [2], [3], [4]",
        "R is only reflexive and symmetric, not transitive",
        "R is a partial order relation",
        "R has infinite equivalence classes"
      ],
      correctAnswer: "Option A: R is equivalence relation with 5 disjoint equivalence classes [0], [1], [2], [3], [4]",
      solution: "1. Reflexive: a - a = 0 is divisible by 5.\n2. Symmetric: If 5 divides (a - b), 5 divides -(a - b) = (b - a).\n3. Transitive: If 5 | (a - b) and 5 | (b - c), then 5 | ((a - b) + (b - c)) = (a - c).\nEquivalence classes partition Z into [0], [1], [2], [3], [4].",
      shortTrick: "Congruence modulo m always yields m partition classes { [0], [1], ..., [m-1] }.",
      difficulty: "Medium"
    },
    {
      unitNumber: 4,
      examName: "AKTU B.Tech (KCS-303)",
      year: "2022-23 (10 Marks)",
      question: "Determine whether the following argument is valid using rules of inference: 'If it rains, the grass is wet. The grass is not wet. Therefore, it did not rain.'",
      options: [
        "Valid argument by Modus Tollens (MT)",
        "Invalid argument (Fallacy of affirming the consequent)",
        "Valid argument by Modus Ponens (MP)",
        "Invalid argument (Fallacy of denying the antecedent)"
      ],
      correctAnswer: "Option A: Valid argument by Modus Tollens (MT)",
      solution: "Premise 1: P -> Q (If it rains, grass is wet)\nPremise 2: ¬Q (Grass is not wet)\nConclusion: ¬P (It did not rain)\nBy Modus Tollens: [ (P -> Q) ∧ ¬Q ] => ¬P is a valid rule of inference.",
      shortTrick: "P -> Q and not Q immediately implies not P (Modus Tollens).",
      difficulty: "Easy"
    }
  ],
  mindMapNodes: [
    "DSTL (KCS-303) Master Syllabus",
    "DSTL -> Unit 1: Set Theory & Relations",
    "Unit 1 -> Set Operations & Venn Diagrams",
    "Unit 1 -> Equivalence Relations (Refl, Symm, Trans)",
    "Unit 1 -> Hashing & Collision Strategies",
    "DSTL -> Unit 2: Algebraic Structures",
    "Unit 2 -> Groupoid -> Semigroup -> Monoid -> Group",
    "Unit 2 -> Lagrange's Theorem (|H| divides |G|)",
    "Unit 2 -> Cyclic Groups & Generators",
    "DSTL -> Unit 3: Posets & Lattices",
    "Unit 3 -> Poset (Refl, Antisymm, Trans)",
    "Unit 3 -> Hasse Diagrams Construction",
    "Unit 3 -> Lattices (LUB/Join, GLB/Meet)",
    "Unit 3 -> Distributive & Complemented Lattices",
    "DSTL -> Unit 4: Propositional Logic",
    "Unit 4 -> Connectives & Truth Tables",
    "Unit 4 -> Tautology & Logical Equivalence",
    "Unit 4 -> Normal Forms (CNF / DNF)",
    "Unit 4 -> Predicate Calculus & Quantifiers (∀, ∃)",
    "DSTL -> Unit 5: Combinatorics & Recurrence",
    "Unit 5 -> Pigeonhole Principle (ceil(n/k))",
    "Unit 5 -> Principle of Inclusion-Exclusion",
    "Unit 5 -> Solving Linear Recurrence Relations"
  ]
};
