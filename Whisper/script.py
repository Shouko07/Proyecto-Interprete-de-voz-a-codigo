from fastapi import FastAPI, File, UploadFile
import uvicorn
import whisper
import io
import tempfile
from pydub import AudioSegment

app = FastAPI()
model = whisper.load_model("base")

@app.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    audio_bytes = await audio.read()
    
    # Guardar temporalmente el archivo
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
        temp_audio.write(audio_bytes)
        temp_audio_path = temp_audio.name
    
    # Procesar con Whisper
    result = model.transcribe(temp_audio_path)
    
    return {"text": result["text"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
