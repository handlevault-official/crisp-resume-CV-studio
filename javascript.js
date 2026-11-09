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

// 1. Toggle Mode (Resume vs CV)
function toggleMode() {
    const mode = document.getElementById('docMode').value;
    const extraSection = document.getElementById('cvExtraSection');
    const extraBlock = document.getElementById('cvExtraBlock');

    if (mode === 'resume') {
        if(extraSection) extraSection.style.display = 'none';
        if(extraBlock) extraBlock.style.display = 'none';
    } else {
        if(extraSection) extraSection.style.display = 'block';
        if(extraBlock) extraBlock.style.display = 'block';
    }
}

// 2. Change Paper Size
function changePaperSize() {
    const size = document.getElementById('paperSize').value;
    const container = document.getElementById('previewContainer');
    if (size === 'letter') {
        container.classList.remove('paper-a4');
        container.classList.add('paper-letter');
    } else {
        container.classList.remove('paper-letter');
        container.classList.add('paper-a4');
    }
}

// 3. Change Theme & Badge
function changeTheme() {
    const theme = document.getElementById('colorTheme').value;
    const root = document.getElementById('bodyRoot');
    const badge = document.getElementById('theme-badge');

    root.className = theme + ' bg-slate-100 text-slate-800 font-sans antialiased min-h-screen flex flex-col';

    if (theme === 'theme-cyan') {
        if(badge) {
            badge.innerText = "CYBER CYAN EDITION";
            badge.className = "text-xs bg-cyan-600 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    } else if (theme === 'theme-navy') {
        if(badge) {
            badge.innerText = "CORPORATE NAVY EDITION";
            badge.className = "text-xs bg-blue-900 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    } else if (theme === 'theme-emerald') {
        if(badge) {
            badge.innerText = "MODERN EMERALD EDITION";
            badge.className = "text-xs bg-emerald-600 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    } else {
        if(badge) {
            badge.innerText = "SAILOR MOON EDITION";
            badge.className = "text-xs bg-pink-600 text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold";
        }
    }
}

// 4. Update Live Preview
function updatePreview() {
    document.getElementById('prevName').innerText = document.getElementById('inputName').value || 'Your Name';
    document.getElementById('prevTitle').innerText = document.getElementById('inputTitle').value || 'Professional Title';
    document.getElementById('prevEmail').innerText = document.getElementById('inputEmail').value || 'email@example.com';
    document.getElementById('prevPhone').innerText = document.getElementById('inputPhone').value || '+63 900 000 0000';
    document.getElementById('prevLocation').innerText = document.getElementById('inputLocation').value || 'City, Country';

    document.getElementById('prevSummary').innerText = document.getElementById('inputSummary').value || 'Write a summary to see it formatted cleanly here.';
    document.getElementById('prevExperience').innerText = document.getElementById('inputExperience').value || 'Detail your work experience on the left panel.';
    document.getElementById('prevEducation').innerText = document.getElementById('inputEducation').value || 'List your academic history on the left panel.';
    document.getElementById('prevSkills').innerText = document.getElementById('inputSkills').value || 'List core skills separated by commas.';
    
    const certEl = document.getElementById('inputCertifications');
    const pubEl = document.getElementById('inputPublications');
    const prevCert = document.getElementById('prevCertifications');
    const prevPub = document.getElementById('prevPublications');

    if(prevCert && certEl) prevCert.innerText = certEl.value || 'Add your certifications here.';
    if(prevPub && pubEl) prevPub.innerText = pubEl.value || 'Add notable publications or projects here.';
}

// 5. SAVE DRAFT (Siguraduhing walang kulang na IDs)
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
    console.log('Saved data:', formData);
}

// 6. LOAD DRAFT
function loadResumeDraft() {
    const savedData = localStorage.getItem('crisp_resume_draft');
    if (!savedData) {
        alert('⚠️ Walang nakitang naka-save na draft. Mag-save muna po kayo.');
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
        document.getElementById('colorTheme').value = formData.colorTheme;
        changeTheme();
    }

    updatePreview();
    alert('📂 Na-load na ang iyong resume draft!');
}

// 7. SHARE CV
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

// 8. PRINT / PDF
function printResumePDF() {
    window.print();
}

// Initial call
toggleMode();
    
