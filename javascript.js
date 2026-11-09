// Save Resume Data to Browser Storage
function saveResumeDraft() {
    const resumeData = {
        fullName: document.getElementById('fullName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        summary: document.getElementById('summary')?.value || '',
        experience: document.getElementById('experience')?.value || '',
        education: document.getElementById('education')?.value || ''
        // Pwede mong idagdag ang iba pang input IDs dito kung marami pa ang fields mo
    };
    localStorage.setItem('crisp_resume_draft', JSON.stringify(resumeData));
    alert('Resume draft saved successfully!');
}

// Load Resume Data from Browser Storage
function loadResumeDraft() {
    const saved = localStorage.getItem('crisp_resume_draft');
    if (!saved) {
        alert('No saved resume draft found.');
        return;
    }
    const data = JSON.parse(saved);
    if (document.getElementById('fullName')) document.getElementById('fullName').value = data.fullName;
    if (document.getElementById('email')) document.getElementById('email').value = data.email;
    if (document.getElementById('phone')) document.getElementById('phone').value = data.phone;
    if (document.getElementById('summary')) document.getElementById('summary').value = data.summary;
    if (document.getElementById('experience')) document.getElementById('experience').value = data.experience;
    if (document.getElementById('education')) document.getElementById('education').value = data.education;
    
    alert('Resume draft loaded successfully!');
}

// Print or Export PDF
function printResumePDF() {
    window.print();
}

// Share App Link
function shareResumeLink() {
    if (navigator.share) {
        navigator.share({
            title: 'Crisp Resume Builder',
            text: 'Check out this free Resume Builder utility under Crisp Suite!',
            url: window.location.href,
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Resume app link copied to clipboard!');
    }
}
