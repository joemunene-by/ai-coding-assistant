interface MockResponse {
  text: string;
}

const codeSnippets: Record<string, string> = {
  react: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;`,

  fetch: `async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}`,

  sort: `function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,

  css: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: #2a2a3c;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #363649;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}`,
};

function getResponseForMessage(message: string): string {
  const lower = message.toLowerCase();

  // Create / build / make patterns
  if (
    lower.match(/\b(create|build|make|generate|write)\b/) &&
    lower.match(/\b(component|function|class|app|page|form)\b/)
  ) {
    const isReact = lower.includes("react") || lower.includes("component");
    return `Sure! Here's what I've put together for you:

${
  isReact
    ? `\`\`\`jsx
${codeSnippets.react}
\`\`\``
    : `\`\`\`javascript
${codeSnippets.fetch}
\`\`\``
}

**Key features:**
- Clean, modular structure
- Error handling included
- Easy to extend and customize

Would you like me to modify anything or add more features?`;
  }

  // Fix / debug / error patterns
  if (lower.match(/\b(fix|debug|error|bug|issue|problem|broken|wrong)\b/)) {
    return `I can see the issue. Here are the most common causes and fixes:

**1. Check for typos in variable names**
Make sure all variable references match their declarations.

**2. Verify data types**
\`\`\`javascript
// Instead of:
if (value == null) { ... }

// Use strict equality:
if (value === null || value === undefined) { ... }
\`\`\`

**3. Add error boundaries**
\`\`\`javascript
try {
  // Your code here
  const result = riskyOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error.message);
  // Handle gracefully
  return fallbackValue;
}
\`\`\`

**4. Check the console** for the exact error message and stack trace.

Would you like me to look at a specific piece of code?`;
  }

  // Explain patterns
  if (lower.match(/\b(explain|what|how|why|understand|describe|mean)\b/)) {
    return `Great question! Let me break this down:

**Overview:**
This concept is fundamental in modern web development. Here's how it works:

1. **The Basics** - At its core, this pattern separates concerns and makes code more maintainable. Each piece handles one responsibility.

2. **How it works** - When data flows through your application, it follows a predictable path:
   - Input is received and validated
   - Processing logic transforms the data
   - Output is rendered or returned

3. **Example:**
\`\`\`javascript
// A clean, well-structured approach
const processData = (input) => {
  // Step 1: Validate
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid input');
  }

  // Step 2: Transform
  const transformed = Object.entries(input)
    .map(([key, value]) => ({ key, value }));

  // Step 3: Return result
  return transformed;
};
\`\`\`

4. **Best practices:**
   - Keep functions small and focused
   - Use meaningful variable names
   - Add error handling at boundaries
   - Write tests for critical paths

Does this help clarify things? Feel free to ask follow-up questions!`;
  }

  // Style / CSS / design patterns
  if (lower.match(/\b(style|css|design|layout|responsive|grid|flex)\b/)) {
    return `Here's a modern CSS approach for that:

\`\`\`css
${codeSnippets.css}
\`\`\`

**Tips for modern CSS:**
- Use CSS Grid for 2D layouts, Flexbox for 1D
- \`clamp()\` is great for responsive typography: \`font-size: clamp(1rem, 2.5vw, 2rem)\`
- CSS custom properties (variables) make theming easy
- Use \`gap\` instead of margins between flex/grid children

Want me to adjust the layout or add animations?`;
  }

  // Sort / algorithm patterns
  if (lower.match(/\b(sort|algorithm|search|optimize|performance)\b/)) {
    return `Here's an efficient implementation:

\`\`\`javascript
${codeSnippets.sort}
\`\`\`

**Algorithm Analysis:**
- **Time Complexity:** O(n log n) average case, O(n^2) worst case
- **Space Complexity:** O(n) due to the recursive calls and array creation
- **When to use:** Great for general-purpose sorting when average performance matters

**Optimization tips:**
1. Use a random pivot selection to avoid worst-case scenarios
2. For small arrays (< 10 elements), insertion sort can be faster
3. Consider using the built-in \`Array.sort()\` for most cases - it's highly optimized

Need help with a specific algorithm or optimization?`;
  }

  // API / fetch / data patterns
  if (lower.match(/\b(api|fetch|request|http|endpoint|rest|data)\b/)) {
    return `Here's a robust API integration pattern:

\`\`\`javascript
${codeSnippets.fetch}

// Usage with error handling
async function loadUserData(userId) {
  const data = await fetchData(\`/api/users/\${userId}\`);
  return {
    ...data,
    fullName: \`\${data.firstName} \${data.lastName}\`,
    isActive: data.status === 'active',
  };
}
\`\`\`

**Best practices for API calls:**
- Always handle errors gracefully
- Add loading states in your UI
- Consider caching frequently requested data
- Use abort controllers for cancellation
- Add request timeouts

\`\`\`javascript
// With timeout and cancellation
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

const response = await fetch(url, {
  signal: controller.signal,
});
clearTimeout(timeout);
\`\`\`

Want me to add authentication headers or pagination?`;
  }

  // Default / greeting / general
  if (lower.match(/\b(hello|hi|hey|help|start)\b/)) {
    return `Hello! I'm your AI coding assistant. I can help you with:

- **Creating code** - "Create a React component for..."
- **Debugging** - "Fix this error in my code..."
- **Explaining concepts** - "Explain how async/await works"
- **Styling** - "Style this with modern CSS"
- **Algorithms** - "Write a sorting algorithm"
- **APIs** - "Help me fetch data from an API"

Just describe what you need and I'll provide code, explanations, and best practices. What would you like to work on?`;
  }

  // Fallback response
  return `That's a great question! Here's my take on it:

Based on what you're describing, I'd recommend this approach:

\`\`\`javascript
// A clean, modular solution
class Solution {
  constructor(config = {}) {
    this.config = { ...this.defaults, ...config };
  }

  get defaults() {
    return {
      debug: false,
      maxRetries: 3,
      timeout: 5000,
    };
  }

  async execute(input) {
    try {
      const validated = this.validate(input);
      const result = await this.process(validated);
      return { success: true, data: result };
    } catch (error) {
      if (this.config.debug) {
        console.error('Execution failed:', error);
      }
      return { success: false, error: error.message };
    }
  }

  validate(input) {
    if (!input) throw new Error('Input is required');
    return input;
  }

  async process(data) {
    // Implement your processing logic here
    return data;
  }
}
\`\`\`

**Key principles applied:**
1. Configuration with sensible defaults
2. Input validation
3. Error handling with context
4. Async-ready architecture

Would you like me to expand on any part of this, or adapt it for your specific use case?`;
}

export async function getMockAIResponse(message: string): Promise<MockResponse> {
  // Simulate network delay (1-2 seconds)
  const delay = 1000 + Math.random() * 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  return {
    text: getResponseForMessage(message),
  };
}
