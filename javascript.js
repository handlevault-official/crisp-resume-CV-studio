function shareMyCV() {
    const name = document.getElementById('fullName')?.value || 'My Resume';
    const summary = document.getElementById('summary')?.value || 'Check out my professional resume.';
    
    const cvText = `RESUME: ${name}\n\nSummary:\n${summary}\n\n(Generated via HandleVault Digital Crisp Suite)`;

    if (navigator.share) {
        navigator.share({
            title: `${name} - CV`,
            text: cvText,
            url: window.location.href,
        }).catch(() => {});
    } else {
        // Fallback kung hindi suportado ang native share sa browser
        navigator.clipboard.writeText(cvText);
        alert('CV details copied to clipboard ready to share!');
    }
}
