
export interface Formula {
  id: number;
  question: string;
  formula: string;
  options: string[];
  correct: number;
  category: 'algebra' | 'trigonometry' | 'identities';
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

  // Trigonometry
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
    question: "What is the formula for cos(A - B)?",
    formula: "cos(A - B) = cosA cosB + sinA sinB",
    options: [
      "cos(A - B) = cosA cosB - sinA sinB",
      "cos(A - B) = cosA cosB + sinA sinB",
      "cos(A - B) = cosA - cosB"
    ],
    correct: 1,
    category: 'identities'
  }
];
