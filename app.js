/*
 * Jeppiaar Engineering College AI Information Assistant
 * Application Logic & Theme Controls (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initFloatingAIButton();
    initChatPortal();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        // Toggle mobile menu active state
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Hamburger icon animation
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navMenu.classList.contains('active')) {
                mobileToggle.style.transform = 'rotate(90deg)';
            } else {
                mobileToggle.style.transform = 'none';
            }
        });

        // Close menu if clicked outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.style.transform = 'none';
            }
        });
    }

    // Set current active navigation link based on URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================================================
   2. LIGHT / DARK THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector('i');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        if (icon) {
            icon.className = 'fa-solid fa-sun';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (icon) {
            icon.className = 'fa-solid fa-moon';
        }
    }
    
    // Click event handler
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        if (icon) {
            icon.className = isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    });
}

/* ==========================================================================
   3. FLOATING ASK AI ASSISTANT BUTTON
   ========================================================================== */
function initFloatingAIButton() {
    const floatingBtn = document.getElementById('floating-ai-button');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', () => {
            window.location.href = "chat.html";
        });
    }
}

/* ==========================================================================
   4. CHAT PAGE SIDEBAR SUGGESTIONS DIRECTORY
   ========================================================================== */
function initChatPortal() {
    const topicBtns = document.querySelectorAll('.chat-topic-btn, .chat-mobile-topic-btn, .chat-chip');
    
    // Map topic keys to recommended vocal questions for ElevenLabs
    const suggestions = {
        admissions: "What are the engineering admission criteria and counseling codes?",
        courses: "What B.E. and B.Tech. courses are offered at Jeppiaar?",
        placements: "Tell me about placement statistics, average packages, and top recruiters.",
        hostel: "What are the hostel facilities, dining arrangements, and menu options?",
        transport: "Show me transport bus routes, suburbs covered, and regulations.",
        contact: "What is the official admissions helpline phone number and office address?"
    };

    topicBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.getAttribute('data-topic');
            const query = btn.getAttribute('data-query');
            const targetQuery = query || suggestions[topic];
            
            if (targetQuery) {
                // Display prompt guidance alert to assist user speech query
                alert(`Voice Assistant Guidance:\n\nYou can ask the Voice AI:\n"${targetQuery}"`);
            }
        });
    });
}
