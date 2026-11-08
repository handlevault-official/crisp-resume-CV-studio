 #!/bin/bash

# Crisp Resume Builder - Automated Setup Script (Light Modern ATS Theme)

REPO_NAME="crisp-resume-builder"
echo "[*] Initializing $REPO_NAME workspace..."

mkdir -p "$REPO_NAME"
cd "$REPO_NAME" || exit

if [ ! -d ".git" ]; then
    git init
    echo "[*] Initialized local Git repository."
fi

cat << 'EOF' > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crisp Resume Builder | HandleVault</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 20px; min-height: 100vh; }
        
        header { max-width: 1200px; margin: 0 auto 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
        h1 { color: #0f172a; font-size: 22px; letter-spacing: -0.5px; }
        .sub-header { font-size: 12px; color: #64748b; margin-top: 2px; }
        
        .header-actions { display: flex; align-items: center; gap: 12px; }
        .kofi-link { background: #ff5e5b; color: #fff; text-decoration: none; padding: 8px 14px; border-radius: 6px; font-weight: bold; font-size: 13px; transition: background 0.2s; }
        .kofi-link:hover { background: #e04845; }
        
        .btn { background: #2563eb; color: #fff; border: none; padding: 9px 18px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s; }
        .btn:hover { background: #1d4ed8; }

        .container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        
        /* Form Editor */
        .editor-card { background: #ffffff; padding: 24px; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 16px; height: fit-content; }
        .section-title { color: #2563eb; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
        .input-group { display: flex; flex-direction: column; gap: 6px; }
        label { font-size: 11px; text-transform: uppercase; color: #475569; font-weight: 700; }
        input, textarea { background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; padding: 10px; border-radius: 6px; font-size: 13px; width: 100%; font-family: inherit; }
        input:focus, textarea:focus { outline: none; border-color: #2563eb; background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        
        /* ATS Live Resume Sheet */
        .preview-card { background: #ffffff; color: #0f172a; padding: 40px; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); min-height: 700px; }
        .pv-name { font-size: 28px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: -0.5px; }
        .pv-title { font-size: 15px; color: #2563eb; font-weight: 600; margin-bottom: 6px; }
        .pv-contact { font-size: 12px; color: #475569; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #0f172a; }
        .pv-section { margin-bottom: 20px; }
        .pv-section-h2 { font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px; }
        .pv-text { font-size: 13.5px; line-height: 1.6; color: #334155; white-space: pre-line; }

        footer { max-width: 1200px; margin: 30px auto 0; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        footer a { color: #2563eb; text-decoration: none; font-weight: 600; }

        @media print {
            body { background: #fff; padding: 0; }
            header, .editor-card, footer { display: none !important; }
            .container { display: block; }
            .preview-card { border: none; box-shadow: none; padding: 0; border-radius: 0; }
        }
    </style>
</head>
<body>

    <header>
        <div>
            <h1>CRISP RESUME BUILDER</h1>
            <div class="sub-header">Modern & ATS-Friendly Developer Resume Generator</div>
        </div>
        <div class="header-actions">
            <a href="https://ko-fi.com/Handlevaultofficial" target="_blank" class="kofi-link">☕ Support on Ko-fi</a>
            <button class="btn" onclick="window.print()">Print / Save PDF</button>
        </div>
    </header>

    <div class="container">
        <!-- Input Form -->
        <div class="editor-card">
            <div class="section-title">Personal Details</div>
            <div class="input-group">
                <label>Full Name</label>
                <input type="text" id="inName" value="April Arenas" oninput="updatePreview()">
            </div>
            <div class="input-group">
                <label>Professional Title</label>
                <input type="text" id="inTitle" value="Indie Game Developer & Web Creator" oninput="updatePreview()">
            </div>
            <div class="input-group">
                <label>Contact Info (Email, Location, Links)</label>
                <input type="text" id="inContact" value="contact@handlevault.com | Baguio City, PH | github.com/handlevault-official" oninput="updatePreview()">
            </div>

            <div class="section-title">Professional Summary</div>
            <div class="input-group">
                <textarea id="inSummary" rows="3" oninput="updatePreview()">Passionate developer specializing in pixel art asset creation, lightweight web tools, and interactive applications. Experienced in vanilla web stack deployment and game design assets.</textarea>
            </div>

            <div class="section-title">Experience & Key Projects</div>
            <div class="input-group">
                <textarea id="inExperience" rows="5" oninput="updatePreview()">• Founder & Lead Creator — HandleVault Studios (2026 - Present)
  Created Crisp Suite tools including Pixel Art Scaler, Invoice Generator, and Bead Pattern Maker.

• Creator — FarmVoice-AI Project
  Developed and deployed AI tools with integrated machine learning capabilities.</textarea>
            </div>

            <div class="section-title">Skills & Technologies</div>
            <div class="input-group">
                <textarea id="inSkills" rows="3" oninput="updatePreview()">HTML5, CSS3, Vanilla JavaScript, GitHub Pages, Pixel Art Design, Prompt Engineering, Web Automation.</textarea>
            </div>
        </div>

        <!-- Live Resume Sheet -->
        <div class="preview-card">
            <div class="pv-name" id="outName">April Arenas</div>
            <div class="pv-title" id="outTitle">Indie Game Developer & Web Creator</div>
            <div class="pv-contact" id="outContact">contact@handlevault.com | Baguio City, PH | github.com/handlevault-official</div>

            <div class="pv-section">
                <div class="pv-section-h2">Summary</div>
                <div class="pv-text" id="outSummary"></div>
            </div>

            <div class="pv-section">
                <div class="pv-section-h2">Experience & Projects</div>
                <div class="pv-text" id="outExperience"></div>
            </div>

            <div class="pv-section">
                <div class="pv-section-h2">Skills & Technologies</div>
                <div class="pv-text" id="outSkills"></div>
            </div>
        </div>
    </div>

    <footer>
        Crisp Suite by <a href="https://ko-fi.com/Handlevaultofficial" target="_blank">HandleVault</a> — Clean, Fast & Single-File Utilities.
    </footer>

    <script>
        function updatePreview() {
            document.getElementById('outName').textContent = document.getElementById('inName').value || 'Your Name';
            document.getElementById('outTitle').textContent = document.getElementById('inTitle').value || 'Your Title';
            document.getElementById('outContact').textContent = document.getElementById('inContact').value || 'Contact Info';
            document.getElementById('outSummary').textContent = document.getElementById('inSummary').value;
            document.getElementById('outExperience').textContent = document.getElementById('inExperience').value;
            document.getElementById('outSkills').textContent = document.getElementById('inSkills').value;
        }

        updatePreview();
    </script>
</body>
</html>
EOF

echo "[*] Successfully updated index.html for $REPO_NAME!"
