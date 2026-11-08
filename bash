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
        .editor-card { background: #ffffff; padding: 24px; border-radius
        
