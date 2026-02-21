import json

def load_design_system(path="design/design-system.json"):
    with open(path, "r") as f:
        return json.load(f)

def check_design_tokens(code, design_tokens):
    errors = []
    if design_tokens["primary-color"] not in code and "bg-primary" not in code:
        errors.append("Primary color not used correctly.")
    if design_tokens["font-family"].split(",")[0] not in code and "font-inter" not in code:
        errors.append("Font not applied correctly.")
    if design_tokens["border-radius"] not in code and "rounded-lg" not in code:
        errors.append("Border radius not applied correctly.")
    return errors

def check_syntax(code):
    errors = []
    if code.count("{") != code.count("}"):
        errors.append("Unbalanced curly braces.")
    if code.count("(") != code.count(")"):
        errors.append("Unbalanced parentheses.")
    if code.count("<") != code.count(">"):
        errors.append("Unbalanced angle brackets (HTML).")
    return errors

def validate_code(code):
    design_tokens = load_design_system()
    token_errors = check_design_tokens(code, design_tokens)
    syntax_errors = check_syntax(code)

    all_errors = token_errors + syntax_errors
    return {
        "valid": len(all_errors) == 0,
        "errors": all_errors
    }
