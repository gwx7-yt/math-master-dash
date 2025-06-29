
export interface Formula {
  id: number;
  question: string;
  formula: string;
  options: string[];
  correct: number;
  category: 'algebra' | 'trigonometry' | 'identities' | 'miscellaneous' | 'conversions';
}

export const formulas: Formula[] = [
  // Trigonometric Identities
  {
    id: 1,
    question: "What is the Pythagorean identity?",
    formula: "cos²θ + sin²θ = 1",
    options: [
      "cos²θ + sin²θ = 1",
      "cos²θ - sin²θ = 1",
      "cos²θ + sin²θ = 2"
    ],
    correct: 0,
    category: 'identities'
  },
  {
    id: 2,
    question: "What is the tangent-secant identity?",
    formula: "1 + tan²θ = sec²θ",
    options: [
      "1 + tan²θ = csc²θ",
      "1 + tan²θ = sec²θ",
      "1 - tan²θ = sec²θ"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 3,
    question: "What is the cotangent-cosecant identity?",
    formula: "1 + cot²θ = csc²θ",
    options: [
      "1 + cot²θ = sec²θ",
      "1 + cot²θ = csc²θ",
      "1 - cot²θ = csc²θ"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 4,
    question: "What is tangent in terms of sine and cosine?",
    formula: "tan θ = sin θ / cos θ",
    options: [
      "tan θ = cos θ / sin θ",
      "tan θ = sin θ / cos θ",
      "tan θ = sin θ × cos θ"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 5,
    question: "What is cotangent in terms of sine and cosine?",
    formula: "cot θ = cos θ / sin θ",
    options: [
      "cot θ = sin θ / cos θ",
      "cot θ = cos θ / sin θ",
      "cot θ = sin θ × cos θ"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 6,
    question: "What is the sine-cosecant identity?",
    formula: "sin θ × csc θ = 1",
    options: [
      "sin θ × csc θ = 0",
      "sin θ × csc θ = 1",
      "sin θ × csc θ = 2"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 7,
    question: "What is the cosine-secant identity?",
    formula: "cos θ × sec θ = 1",
    options: [
      "cos θ × sec θ = 0",
      "cos θ × sec θ = 1",
      "cos θ × sec θ = 2"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 8,
    question: "What is the tangent-cotangent identity?",
    formula: "tan θ × cot θ = 1",
    options: [
      "tan θ × cot θ = 0",
      "tan θ × cot θ = 1",
      "tan θ × cot θ = 2"
    ],
    correct: 1,
    category: 'identities'
  },

  // Algebraic Identities / Expansions
  {
    id: 9,
    question: "What is the expansion of (a + b)²?",
    formula: "(a + b)² = a² + 2ab + b²",
    options: [
      "(a + b)² = a² + b²",
      "(a + b)² = a² + 2ab + b²",
      "(a + b)² = a² - 2ab + b²"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 10,
    question: "What is the expansion of (a - b)²?",
    formula: "(a - b)² = a² - 2ab + b²",
    options: [
      "(a - b)² = a² + 2ab + b²",
      "(a - b)² = a² - 2ab + b²",
      "(a - b)² = a² - b²"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 11,
    question: "What is the difference of squares formula?",
    formula: "a² - b² = (a + b)(a - b)",
    options: [
      "a² - b² = (a - b)²",
      "a² - b² = (a + b)(a - b)",
      "a² - b² = a²b²"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 12,
    question: "What is the expansion of (a + b)³?",
    formula: "(a + b)³ = a³ + 3a²b + 3ab² + b³",
    options: [
      "(a + b)³ = a³ + b³",
      "(a + b)³ = a³ + 3a²b + 3ab² + b³",
      "(a + b)³ = a³ + 3ab + b³"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 13,
    question: "What is the expansion of (a - b)³?",
    formula: "(a - b)³ = a³ - 3a²b + 3ab² - b³",
    options: [
      "(a - b)³ = a³ - b³",
      "(a - b)³ = a³ - 3a²b + 3ab² - b³",
      "(a - b)³ = a³ - 3ab - b³"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 14,
    question: "What is the expansion of (a + b + c)²?",
    formula: "(a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca",
    options: [
      "(a + b + c)² = a² + b² + c²",
      "(a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca",
      "(a + b + c)² = a² + b² + c² + ab + bc + ca"
    ],
    correct: 1,
    category: 'algebra'
  },

  // Miscellaneous Formulas
  {
    id: 15,
    question: "What is the formula for angle in radians?",
    formula: "θ = l / r",
    options: [
      "θ = l × r",
      "θ = l / r",
      "θ = r / l"
    ],
    correct: 1,
    category: 'miscellaneous'
  },
  {
    id: 16,
    question: "What is the division algorithm formula?",
    formula: "Dividend = Divisor × Quotient + Remainder",
    options: [
      "Dividend = Divisor + Quotient × Remainder",
      "Dividend = Divisor × Quotient + Remainder",
      "Dividend = Divisor × Quotient - Remainder"
    ],
    correct: 1,
    category: 'miscellaneous'
  },

  // Conversion Formulas
  {
    id: 17,
    question: "How do you convert degrees to radians?",
    formula: "radians = (π/180) × degrees",
    options: [
      "radians = (180/π) × degrees",
      "radians = (π/180) × degrees",
      "radians = π × degrees"
    ],
    correct: 1,
    category: 'conversions'
  },
  {
    id: 18,
    question: "How do you convert radians to degrees?",
    formula: "degrees = (180/π) × radians",
    options: [
      "degrees = (π/180) × radians",
      "degrees = (180/π) × radians",
      "degrees = π × radians"
    ],
    correct: 1,
    category: 'conversions'
  },
  {
    id: 19,
    question: "How do you convert degrees to gradians?",
    formula: "gradians = (10/9) × degrees",
    options: [
      "gradians = (9/10) × degrees",
      "gradians = (10/9) × degrees",
      "gradians = 10 × degrees"
    ],
    correct: 1,
    category: 'conversions'
  },
  {
    id: 20,
    question: "How do you convert gradians to degrees?",
    formula: "degrees = (9/10) × gradians",
    options: [
      "degrees = (10/9) × gradians",
      "degrees = (9/10) × gradians",
      "degrees = 9 × gradians"
    ],
    correct: 1,
    category: 'conversions'
  }
];
