import os
from generator import generate_component
from validator.linter import validate_code

def agentic_loop(user_prompt, max_retries= 3):
    attempt = 0
    final_code = None

    while attempt < max_retries:
        print(f"\n--- Attempt {attempt+1} ---")
        code = generate_component(user_prompt)
        print("Generated Code:\n", code)

        validation_result = validate_code(code)

        if validation_result["valid"]:
            print(" Code is valid and compliant with design system.")
            final_code = code
            break
        else:
            print(" Validation failed with errors:")
            for err in validation_result["errors"]:
                print("-", err)

            # Re-prompt with error feedback
            error_feedback = "\n".join(validation_result["errors"])
            user_prompt = f"{user_prompt}\nFix the following issues:\n{error_feedback}"

        attempt += 1

    if final_code is None:
        print(" Failed to generate valid code after retries.")
    return final_code

if __name__ == "__main__":
    user_prompt = "A login card with a glassmorphism effect"
    final_component = agentic_loop(user_prompt)

    if final_component:
        # Ensure output folder exists
        
        os.makedirs("output", exist_ok=True)
        
        output_path = "output/login-card.component.ts"
        with open(output_path, "w") as f:
            f.write(final_component)
        print("\n🎉 Final component saved to {output_path}")

