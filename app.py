from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import PlainTextResponse
from src import agentic_loop
from src.agentic_loop import agentic_loop
import os

app = FastAPI(title="Guided Component Architect")

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate", response_class=PlainTextResponse)
def generate_components(request: PromptRequest):
    try:
        final_code = agentic_loop(request.prompt)
        if final_code is None:
            raise Exception("Agentic loop returned None")
            # raise HTTPException(status_code=500, detail="Failed to generate a valid component.")
        # return {"component_code": final_code}

        os.makedirs("output", exist_ok=True)
        
        output_path = "output/generate_code.ts"
        with open(output_path, "w",encoding="utf-8") as f:
            f.write(final_code)
        return final_code
    except Exception as e:
        print("ERROR:",e)
        raise HTTPException(status_code=500, detail=str(e))