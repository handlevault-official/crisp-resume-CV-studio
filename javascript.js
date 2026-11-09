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
}
