import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  videoUrl: { type: String, required: true },
  title: { type: String, required: true },
  chapter: { type: String },
  targetExam: { type: String },
  estReadTime: { type: String },
  channelTitle: { type: String, default: 'YouTube Creator' },
  language: { type: String, default: 'Hinglish' },
  overview: { type: String, required: true },
  cueColumn: [{
    timeRange: String,
    term: String,
    question: String
  }],
  quickSummary: [String],
  keyConcepts: [{
    heading: String,
    explanation: String,
    derivation: String,
    handwrittenNotes: String,
    bulletPoints: [String]
  }],
  formulas: [{
    name: String,
    formula: String,
    variables: String,
    units: String,
    conditions: String,
    handwrittenTip: String
  }],
  solvedExamples: [{
    title: String,
    given: String,
    toFind: String,
    formula: String,
    solution: String,
    answer: String,
    examTrap: String
  }],
  diagrams: [{
    title: String,
    type: String,
    caption: String,
    explanation: String,
    svgCode: String
  }],
  shortcutsAndTricks: [String],
  commonMistakes: [{
    mistake: String,
    whyWrong: String,
    correction: String
  }],
  quickRevision: [String],
  importantPYQs: [{
    examName: String, // e.g. JEE Main, CBSE 12th, AKTU, DU, VTU
    year: String,
    question: String,
    answer: String,
    difficulty: String,
    marks: String
  }],
  practiceMCQs: [{
    id: Number,
    question: String,
    options: [String],
    correctAnswer: String,
    correctOptionIndex: Number,
    solution: String,
    topicTag: String,
    difficulty: String
  }],
  mindMapNodes: [String],
  createdAt: { type: Date, default: Date.now }
}, { strict: false });

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
