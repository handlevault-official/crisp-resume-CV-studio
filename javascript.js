function changeTheme(themeName) {
    const root = document.documentElement;
    const badge = document.getElementById('theme-badge'); // Yung "Sailor Moon Edition" badge mo sa taas
    
    // Halimbawa ng pagpapalit ng kulay base sa napiling theme
    if (themeName === 'cyber-cyan') {
        root.style.setProperty('--theme-primary', '#06b6d4'); // Cyan
        root.style.setProperty('--theme-accent', '#3b82f6');
        if(badge) {
            badge.innerText = "CYBER CYAN EDITION";
            badge.className = "text-xs bg-cyan-600 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    } else if (themeName === 'corporate-navy') {
        root.style.setProperty('--theme-primary', '#1e3a8a'); // Navy
        root.style.setProperty('--theme-accent', '#3b82f6');
        if(badge) {
            badge.innerText = "CORPORATE NAVY EDITION";
            badge.className = "text-xs bg-blue-900 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    } else if (themeName === 'modern-emerald') {
        root.style.setProperty('--theme-primary', '#059669'); // Emerald
        root.style.setProperty('--theme-accent', '#10b981');
        if(badge) {
            badge.innerText = "MODERN EMERALD EDITION";
            badge.className = "text-xs bg-emerald-600 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    } else {
        // Default: Sailor Moon Pink
        root.style.setProperty('--theme-primary', '#db2777');
        root.style.setProperty('--theme-accent', '#9d174d');
        if(badge) {
            badge.innerText = "SAILOR MOON EDITION";
            badge.className = "text-xs bg-pink-600 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    }
} // <--- Dito na-close ang changeTheme function

// 1. SAVE DRAFT: Isine-save ang mga nilagay mo sa form papunta sa localStorage ng browser
function saveResumeDraft() {
    const formData = {
        name: document.getElementById('inputName').value,
        title: document.getElementById('inputTitle').value,
        email: document.getElementById('inputEmail').value,
        phone: document.getElementById('inputPhone').value,
        location: document.getElementById('inputLocation').value,
        summary: document.getElementById('inputSummary').value,
        experience: document.getElementById('inputExperience').value,
        education: document.getElementById('inputEducation').value,
        skills: document.getElementById('inputSkills').value,
        certifications: document.getElementById('inputCertifications') ? document.getElementById('inputCertifications').value : '',
        publications: document.getElementById('inputPublications') ? document.getElementById('inputPublications').value : '',
        docMode: document.getElementById('docMode').value,
        paperSize: document.getElementById('paperSize').value,
        colorTheme: document.getElementById('colorTheme').value
    };

    localStorage.setItem('crisp_resume_draft', JSON.stringify(formData));
    alert('✅ Na-save na ang iyong resume draft!');
}

// 2. LOAD DRAFT: Kinukuha ang naka-save na draft at ibinabalik sa mga input fields
function loadResumeDraft() {
    const savedData = localStorage.getItem('crisp_resume_draft');
    if (!savedData) {
        alert('⚠️ Walang nakitang naka-save na draft.');
        return;
    }

    const formData = JSON.parse(savedData);
    
    document.getElementById('inputName').value = formData.name || '';
    document.getElementById('inputTitle').value = formData.title || '';
    document.getElementById('inputEmail').value = formData.email || '';
    document.getElementById('inputPhone').value = formData.phone || '';
    document.getElementById('inputLocation').value = formData.location || '';
    document.getElementById('inputSummary').value = formData.summary || '';
    document.getElementById('inputExperience').value = formData.experience || '';
    document.getElementById('inputEducation').value = formData.education || '';
    document.getElementById('inputSkills').value = formData.skills || '';
    
    if(document.getElementById('inputCertifications')) document.getElementById('inputCertifications').value = formData.certifications || '';
    if(document.getElementById('inputPublications')) document.getElementById('inputPublications').value = formData.publications || '';
    
    if(formData.docMode) {
        document.getElementById('docMode').value = formData.docMode;
        toggleMode();
    }
    if(formData.paperSize) {
        document.getElementById('paperSize').value = formData.paperSize;
        changePaperSize();
    }
    if(formData.colorTheme) {
        document.getElementById('colorTheme').value = formData.colorTheme;
        changeTheme();
    }

    updatePreview();
    alert('📂 Na-load na ang iyong resume draft!');
}

// 3. SHARE CV: Kinokopya ang link o kaya ay naglalabas ng share option
function shareMyCV() {
    if (navigator.share) {
        navigator.share({
            title: 'Professional Resume & CV Studio',
            text: 'Tignan ang aking ginawang resume gamit ang Crisp Suite!',
            url: window.location.href,
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('🔗 Na-copy na sa clipboard ang link ng page na ito para ma-share mo!');
    }
}

// 4. PRINT / PDF: Nagbubukas ng print dialog para ma-save as PDF
function printResumePDF() {
    window.print();
} // <--- Isang closing bracket na lang para sa printResumePDF
