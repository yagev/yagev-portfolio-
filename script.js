// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // offset for navbar
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Accordion Toggle for Service Cards
function toggleAccordion(button) {
    const hiddenDiv = button.nextElementSibling;
    const isHebrew = document.documentElement.lang === 'he';
    
    if (!button.dataset.originalText) {
        button.dataset.originalText = button.innerHTML;
    }
    
    hiddenDiv.classList.toggle('open');
    if (hiddenDiv.classList.contains('open')) {
        button.innerHTML = isHebrew ? "הסתר המלצות" : "Hide Quotes";
    } else {
        button.innerHTML = button.dataset.originalText;
    }
}

// Dynamic Resource Loading for Netlify CMS
document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/resources.json')
        .then(response => {
            if (!response.ok) throw new Error("No payload");
            return response.json();
        })
        .then(data => {
            if (data && data.items && data.items.length > 0) {
                const categories = ['Leadership Development', 'Change Management', 'Post-Merger Integration'];
                categories.forEach(cat => {
                    let container = document.getElementById('res-' + cat);
                    if (container) container.innerHTML = '';
                });
                
                data.items.forEach(item => {
                    let container = document.getElementById('res-' + item.category);
                    if (container) {
                        let link = document.createElement('a');
                        link.href = item.filepath;
                        link.setAttribute('download', '');
                        link.innerHTML = `<i class="fa-regular fa-file-pdf" style="margin-right: 8px; color: #ef4444;"></i> ` + item.title;
                        link.style.display = 'block';
                        link.style.padding = '8px 12px';
                        link.style.marginBottom = '5px';
                        link.style.background = '#f8fafc';
                        link.style.borderRadius = '5px';
                        link.style.textDecoration = 'none';
                        link.style.color = '#1e293b';
                        link.style.fontWeight = '500';
                        link.style.border = '1px solid #e2e8f0';
                        
                        link.onmouseover = () => link.style.borderColor = '#94a3b8';
                        link.onmouseout = () => link.style.borderColor = '#e2e8f0';
                        
                        container.appendChild(link);
                    }
                });
                
                categories.forEach(cat => {
                    let container = document.getElementById('res-' + cat);
                    if (container && container.innerHTML === '') {
                        container.innerHTML = `<span class="empty-state" style="color: #94a3b8; font-size: 0.85rem;">No files uploaded yet.</span>`;
                    }
                });
            }
        })
        .catch(err => console.log('CMS resources not found or empty:', err));
});
