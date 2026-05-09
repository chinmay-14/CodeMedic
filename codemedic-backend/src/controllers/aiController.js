const analyzeCode = async (req, res) => {

  try {

    const { code } = req.body;

    if (!code) {

      return res.status(400).json({
        success: false,
        analysis: "Please provide code.",
      });

    }

    let mockResponse = "";

    // EMPTY CONSOLE.LOG
    if (code.includes("console.log()")) {

      mockResponse = `
#  Error Found

\`console.log()\` is incomplete.

#  Root Cause

You did not pass any value inside \`console.log()\`.

#  Fix

\`\`\`javascript
console.log("Hello World");
\`\`\`

#  Explanation

\`console.log()\` requires a value to display output in the console.
`;

    }

    // UNDEFINED VARIABLE
    else if (
      code.includes("console.log(name)") ||
      code.includes("name")
    ) {

      mockResponse = `
#  Undefined Variable Error

Variable \`name\` is not defined.

#  Root Cause

You are trying to use a variable before declaring it.

#  Correct Code

\`\`\`javascript
const name = "CodeMedic";

console.log(name);
\`\`\`

#  Explanation

Variables must be declared before they are used.
`;

    }

    // DIVISION BY ZERO
    else if (
      code.includes("/0") ||
      code.includes("/ 0")
    ) {

      mockResponse = `
#  Division By Zero

Your code attempts to divide a number by zero.

#  Root Cause

Division by zero causes runtime issues in many languages.

#  Safe Solution

\`\`\`javascript
if (b !== 0) {
  console.log(a / b);
}
\`\`\`

#  Explanation

Always validate denominators before division.
`;

    }

    // MISSING FUNCTION
    else if (
      code.includes("hello()") &&
      !code.includes("function hello")
    ) {

      mockResponse = `
#  Function Not Found

Function \`hello()\` is being called but not defined.

#  Root Cause

You called a function before creating it.

#  Correct Code

\`\`\`javascript
function hello() {
  console.log("Hello");
}

hello();
\`\`\`

#  Explanation

Functions must exist before invocation.
`;

    }

    // INFINITE LOOP
    else if (
      code.includes("while(true)")
    ) {

      mockResponse = `
#  Infinite Loop Detected

Your loop may run forever.

#  Root Cause

\`while(true)\` creates a loop with no stopping condition.

#  Better Approach

\`\`\`javascript
let i = 0;

while(i < 5){
  console.log(i);
  i++;
}
\`\`\`

#  Explanation

Always provide loop exit conditions.
`;

    }

    // DEFAULT
    else {

      mockResponse = `
#  Code Analysis Complete

No major errors detected.

#  Suggestions

- Improve variable naming
- Add comments
- Handle edge cases
- Optimize loops
- Use meaningful function names

#  Optimization Tip

Break large functions into smaller reusable functions.

#  CodeMedic AI Mock Analysis Completed Successfully
`;

    }

    return res.status(200).json({
      success: true,
      analysis: mockResponse,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      analysis: "Server error occurred.",
    });

  }

};

export {
  analyzeCode,
};