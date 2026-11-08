#!/bin/bash

# Crisp Resume Builder - Automated Setup Script
# Run this in your terminal to initialize the repo structure and files.

REPO_NAME="crisp-resume-builder"
echo "[*] Initializing $REPO_NAME workspace..."

# Create project directory
mkdir -p "$REPO_NAME"
cd "$REPO_NAME" || exit

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "[*] Initialized local Git repository."
fi

# Create index.html with the complete Resume Builder code
cat << 'EOF' > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crisp Resume Builder</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
        header { max-width: 1200px; margin: 0 auto 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #38bdf8; padding-bottom: 15px; }
        h1 { color: #38bdf8; font-size: 22px; letter-spacing: 1px; }
        .container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .editor-card { background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; display: flex; flex-direction: column; gap: 15px; height: fit-content; }
        .section-title { color: #ffdd00; font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px dashed #334155; padding-bottom: 5px; }
        .input-group { display: flex; flex-direction: column; gap: 5px; }
        label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: bold; }
        input, textarea { background: #0f172a; border: 1px solid #334155; color: #fff; padding: 9px; border-radius: 6px; font-size: 13px; width: 100%; }
        input:focus, textarea:focus { outline: none; border-color: #38bdf8; }
        .preview-card { background: #ffffff; color: #1e293b; padding: 35px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); min-height: 600px; }
        .pv-name { font-size: 26px; font-weight: bold; color: #0f172a; text-transform: uppercase; }
        .pv-title { font-size: 14px; color: #0284c7; font-weight: bold; margin-bottom: 8px; }
        .pv-contact { font-size: 12px; color: #64748b; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
        .pv-section { margin-bottom: 18px; }
        .pv-section-h2 { font-size: 13px; font-weight: bold; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px; }
        .pv-text { font-size: 13px; line-height: 1.5; color: #334155; white-space: pre-line; }
        .btn { background: #38bdf8; color: #0f172a; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
        .btn:hover { background: #7dd3fc; }
        @media print {
            body { background: #fff; padding: 0; }
            header, .editor-card { display: none !important; }
            .container { display: block; }
            .preview-card { box-shadow: none; padding: 0; border-radius: 0; }
        }
    </style>
</head>
<body>
    <header>
        <div>
            <h1>CRISP RESUME BUILDER</h1>
            <p style="font-size: 12px; color: #94a3b8;">ATS-Friendly Live Resume Generator</p>
        </div>
        <button class="btn" onclick="window.print()">Print / Save PDF</button>
    </header>
    <div class="container">
        <div class="editor-card">
            <div class="section-title">Personal Details</div>
            <div class="input-group"><label>Full Name</label><input
