export interface Formula {
  id: number;
  question: string;
  formula: string;
  options: string[];
  correct: number;
  category: 'algebra' | 'trigonometry' | 'identities' | 'miscellaneous' | 'conversions';
}

export const formulas: Formula[] = [
  // Algebra
  {
    id: 1,
    question: "What is the quadratic formula?",
    formula: "x = (-b ± √(b²-4ac)) / 2a",
    options: [
      "x = (-b ± √(b²-4ac)) / 2a",
      "x = (-b ± √(b²+4ac)) / 2a",
      "x = (b ± √(b²-4ac)) / 2a"
    ],
    correct: 0,
    category: 'algebra'
  },
  {
    id: 2,
    question: "What is the formula for the difference of squares?",
    formula: "a² - b² = (a+b)(a-b)",
    options: [
      "a² - b² = (a-b)²",
      "a² - b² = (a+b)(a-b)",
      "a² - b² = a²b²"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 3,
    question: "What is the perfect square trinomial formula (a+b)²?",
    formula: "(a+b)² = a² + 2ab + b²",
    options: [
      "(a+b)² = a² + b²",
      "(a+b)² = a² + 2ab + b²",
      "(a+b)² = a² - 2ab + b²"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 4,
    question: "What is the slope-intercept form of a line?",
    formula: "y = mx + b",
    options: [
      "y = mx + b",
      "x = my + b",
      "y = m + bx"
    ],
    correct: 0,
    category: 'algebra'
  },
  {
    id: 5,
    question: "What is the distance formula between two points?",
    formula: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
    options: [
      "d = (x₂-x₁)² + (y₂-y₁)²",
      "d = √[(x₂-x₁)² + (y₂-y₁)²]",
      "d = √[(x₂+x₁)² + (y₂+y₁)²]"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 6,
    question: "What is the formula for arithmetic sequence nth term?",
    formula: "aₙ = a₁ + (n-1)d",
    options: [
      "aₙ = a₁ + nd",
      "aₙ = a₁ + (n-1)d",
      "aₙ = a₁ × (n-1)d"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 7,
    question: "What is the formula for geometric sequence nth term?",
    formula: "aₙ = a₁ × r^(n-1)",
    options: [
      "aₙ = a₁ × r^n",
      "aₙ = a₁ × r^(n-1)",
      "aₙ = a₁ + r^(n-1)"
    ],
    correct: 1,
    category: 'algebra'
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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

  // Trigonometry
  {
    id: 12,
    question: "What is the Pythagorean theorem?",
    formula: "a² + b² = c²",
    options: [
      "a + b = c",
      "a² + b² = c²",
      "a² - b² = c²"
    ],
    correct: 1,
    category: 'trigonometry'
  },
  {
    id: 13,
    question: "What is sin²θ + cos²θ equal to?",
    formula: "sin²θ + cos²θ = 1",
    options: [
      "sin²θ + cos²θ = 0",
      "sin²θ + cos²θ = 1",
      "sin²θ + cos²θ = 2"
    ],
    correct: 1,
    category: 'trigonometry'
  },
  {
    id: 14,
    question: "What is the formula for sin(A + B)?",
    formula: "sin(A + B) = sinA cosB + cosA sinB",
    options: [
      "sin(A + B) = sinA + sinB",
      "sin(A + B) = sinA cosB + cosA sinB",
      "sin(A + B) = sinA cosB - cosA sinB"
    ],
    correct: 1,
    category: 'trigonometry'
  },
  {
    id: 15,
    question: "What is the formula for cos(A + B)?",
    formula: "cos(A + B) = cosA cosB - sinA sinB",
    options: [
      "cos(A + B) = cosA cosB + sinA sinB",
      "cos(A + B) = cosA cosB - sinA sinB",
      "cos(A + B) = cosA + cosB"
    ],
    correct: 1,
    category: 'trigonometry'
  },
  {
    id: 16,
    question: "What is the law of cosines?",
    formula: "c² = a² + b² - 2ab cos(C)",
    options: [
      "c² = a² + b² + 2ab cos(C)",
      "c² = a² + b² - 2ab cos(C)",
      "c = a + b - 2ab cos(C)"
    ],
    correct: 1,
    category: 'trigonometry'
  },
  {
    id: 17,
    question: "What is the law of sines?",
    formula: "a/sin(A) = b/sin(B) = c/sin(C)",
    options: [
      "a×sin(A) = b×sin(B) = c×sin(C)",
      "a/sin(A) = b/sin(B) = c/sin(C)",
      "a/cos(A) = b/cos(B) = c/cos(C)"
    ],
    correct: 1,
    category: 'trigonometry'
  },

  // Identities
  {
    id: 18,
    question: "What is tan θ in terms of sin and cos?",
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
    id: 19,
    question: "What is the double angle formula for sin(2θ)?",
    formula: "sin(2θ) = 2sin θ cos θ",
    options: [
      "sin(2θ) = 2sin θ cos θ",
      "sin(2θ) = sin²θ + cos²θ",
      "sin(2θ) = 2sin θ"
    ],
    correct: 0,
    category: 'identities'
  },
  {
    id: 20,
    question: "What is the double angle formula for cos(2θ)?",
    formula: "cos(2θ) = cos²θ - sin²θ",
    options: [
      "cos(2θ) = cos²θ + sin²θ",
      "cos(2θ) = cos²θ - sin²θ",
      "cos(2θ) = 2cos θ"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 21,
    question: "What is 1 + tan²θ equal to?",
    formula: "1 + tan²θ = sec²θ",
    options: [
      "1 + tan²θ = csc²θ",
      "1 + tan²θ = sec²θ",
      "1 + tan²θ = cos²θ"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 22,
    question: "What is 1 + cot²θ equal to?",
    formula: "1 + cot²θ = csc²θ",
    options: [
      "1 + cot²θ = sec²θ",
      "1 + cot²θ = csc²θ",
      "1 + cot²θ = sin²θ"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 23,
    question: "What is the formula for sin(A - B)?",
    formula: "sin(A - B) = sinA cosB - cosA sinB",
    options: [
      "sin(A - B) = sinA cosB + cosA sinB",
      "sin(A - B) = sinA cosB - cosA sinB",
      "sin(A - B) = sinA - sinB"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 24,
    question: "What is the formula for cos(A - B)?",
    formula: "cos(A - B) = cosA cosB + sinA sinB",
    options: [
      "cos(A - B) = cosA cosB - sinA sinB",
      "cos(A - B) = cosA cosB + sinA sinB",
      "cos(A - B) = cosA - cosB"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 25,
    question: "What is the fundamental trigonometric identity?",
    formula: "cos²θ + sin²θ = 1",
    options: [
      "cos²θ + sin²θ = 0",
      "cos²θ + sin²θ = 1",
      "cos²θ - sin²θ = 1"
    ],
    correct: 1,
    category: 'identities'
  },
  {
    id: 26,
    question: "What is cot θ in terms of sin and cos?",
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
    id: 27,
    question: "What is sin θ × csc θ equal to?",
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
    id: 28,
    question: "What is cos θ × sec θ equal to?",
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
    id: 29,
    question: "What is tan θ × cot θ equal to?",
    formula: "tan θ × cot θ = 1",
    options: [
      "tan θ × cot θ = 0",
      "tan θ × cot θ = 1",
      "tan θ × cot θ = 2"
    ],
    correct: 1,
    category: 'identities'
  },

  // Miscellaneous Formulas
  {
    id: 30,
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
    id: 31,
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
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
    question: "How do you convert gradians to degrees?",
    formula: "degrees = (9/10) × gradians",
    options: [
      "degrees = (10/9) × gradians",
      "degrees = (9/10) × gradians",
      "degrees = 9 × gradians"
    ],
    correct: 1,
    category: 'conversions'
  },
  {
    id: 36,
    question: "How do you convert radians to gradians?",
    formula: "gradians = (200/π) × radians",
    options: [
      "gradians = (π/200) × radians",
      "gradians = (200/π) × radians",
      "gradians = 200 × radians"
    ],
    correct: 1,
    category: 'conversions'
  },
  {
    id: 37,
    question: "How do you convert gradians to radians?",
    formula: "radians = (π/200) × gradians",
    options: [
      "radians = (200/π) × gradians",
      "radians = (π/200) × gradians",
      "radians = π × gradians"
    ],
    correct: 1,
    category: 'conversions'
  }
];
