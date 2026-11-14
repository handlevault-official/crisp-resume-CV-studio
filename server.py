# I-update ang init_db() para maglaman ng resumes table
def init_db():
    conn = sqlite3.connect("database.sqlite3")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS licenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reference_number TEXT UNIQUE NOT NULL,
            customer_email TEXT NOT NULL,
            product_id TEXT NOT NULL,
            payment_channel TEXT NOT NULL,
            license_key TEXT UNIQUE NOT NULL,
            status TEXT DEFAULT 'verified',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    # Bagong table para sa cloud resume storage
    conn.execute("""
        CREATE TABLE IF NOT EXISTS resumes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT,
            resume_data TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

# Pydantic model para sa pag-save ng resume
class ResumeSaveRequest(BaseModel):
    email: str
    name: str
    resume_data: dict

@app.post("/api/resume/save")
def save_resume(data: ResumeSaveRequest):
    """
    I-save o i-update ang resume data sa SQLite database gamit ang email.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    import json
    data_str = json.dumps(data.resume_data)
    
    try:
        cursor.execute("""
            INSERT INTO resumes (email, full_name, resume_data) 
            VALUES (?, ?, ?)
            ON CONFLICT(email) DO UPDATE SET 
            full_name=excluded.full_name, 
            resume_data=excluded.resume_data, 
            updated_at=CURRENT_TIMESTAMP
        """, (data.email, data.name, data_str))
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))
    
    conn.close()
    return {"success": True, "message": "Resume successfully saved to Crisp Suite cloud!"}

@app.get("/api/resume/{email}")
def load_resume(email: str):
    """
    Kunin ang nakaimbak na resume data mula sa server gamit ang email.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT resume_data FROM resumes WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="Walang nahanap na resume para sa email na ito.")
    
    import json
    return {"success": True, "resume_data": json.loads(row["resume_data"])}
