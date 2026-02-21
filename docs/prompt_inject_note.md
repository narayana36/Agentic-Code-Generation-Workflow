# Prompt Injection Prevention in Code Generation

## Introduction
Prompt injection is one of the most critical risks in agentic code generation workflows. It occurs when malicious or unintended instructions are embedded in user input or model output, causing the system to bypass rules, ignore design tokens, or generate unsafe code. In the context of this project, prompt injection could lead to Angular components that ignore the design system, introduce arbitrary styles, or even attempt to execute harmful commands.

## Prevention Strategies
1. **Strict Context Isolation**
   - Only allow the model to see the design system JSON and the user’s natural language description.
   - Strip out any suspicious tokens such as `system prompt`, `ignore previous instructions`, or shell commands like `rm -rf`.

2. **Validator Enforcement**
   - Even if the model tries to bypass rules, the validator ensures compliance.
   - For example, if a user prompt says “use red instead of the primary color,” the validator will reject the output because it violates the design system.

3. **Controlled Prompt Engineering**
   - The generator prompt explicitly instructs the model to output raw Angular code only, with no explanations or comments.
   - This reduces the attack surface for injection attempts that rely on conversational filler.

4. **Self-Correction Loop**
   - If the validator detects non-compliance, the agentic loop re-prompts the model with error logs.
   - This ensures that even if the first attempt is compromised, subsequent attempts are guided back to compliance.

5. **Sandboxed Execution**
   - Generated code is never executed directly in the host environment.
   - It is treated as text, validated, and only then saved to an output file.

## Scaling to Full-Page Applications
To scale this workflow beyond single components:
- **Component Modularity:** Break down pages into composable units (header, sidebar, card, footer). Each unit is generated and validated independently.
- **Hierarchical Validation:** Apply design token checks at both the component level and the page level to ensure consistency.
- **Multi-Turn Editing:** Allow iterative refinement (“Now make the button rounded”), while maintaining validator enforcement at each step.
- **Governed Assembly:** Stitch validated components together into full-page layouts, ensuring that no injection can override the design system globally.

## Conclusion
By combining strict prompt engineering, validator enforcement, and self-correction loops, this workflow creates a resilient defense against prompt injection. Scaling to full-page applications requires modular generation and hierarchical validation, but the same principles apply: every piece of code must be governed, validated, and corrected before it becomes part of the final output.