// AI Development Roadmap JavaScript
let completedTasks = 0;
const totalTasks = document.querySelectorAll('.task-checkbox').length;

// Initialize the AI development application
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    updateStats();
    updateProgressBars();
    
    // Open first phase by default
    const firstPhaseContent = document.querySelector('.phase-content');
    if (firstPhaseContent) {
        firstPhaseContent.style.display = 'block';
    }
    
    // Setup all features
    setupKeyboardShortcuts();
    addSearchBox();
    addTouchSupport();
    
    // Auto-save every 30 seconds
    setInterval(saveProgress, 30000);
    
    // Welcome message for new users
    if (!localStorage.getItem('ai_development_roadmap_progress')) {
        setTimeout(showWelcomeMessage, 1000);
    }
});

// Load saved progress from localStorage
function loadProgress() {
    try {
        const saved = localStorage.getItem('ai_development_roadmap_progress');
        if (saved) {
            const progress = JSON.parse(saved);
            progress.forEach(taskId => {
                const checkbox = document.getElementById(taskId);
                if (checkbox) {
                    checkbox.classList.add('checked');
                    completedTasks++;
                }
            });
        }
    } catch (error) {
        console.error('Error loading AI roadmap progress:', error);
    }
}

// Save progress to localStorage
function saveProgress() {
    try {
        const checkedTasks = Array.from(document.querySelectorAll('.task-checkbox.checked'))
            .map(checkbox => checkbox.id)
            .filter(id => id);
        
        localStorage.setItem('ai_development_roadmap_progress', JSON.stringify(checkedTasks));
        localStorage.setItem('ai_development_last_save', new Date().toISOString());
        showSaveNotice();
    } catch (error) {
        console.error('Error saving AI roadmap progress:', error);
    }
}

// Show save notification
function showSaveNotice() {
    const notice = document.getElementById('saveNotice');
    if (notice) {
        notice.classList.add('show');
        setTimeout(() => {
            notice.classList.remove('show');
        }, 2000);
    }
}

// Toggle task completion with AI milestone detection
function toggleTask(checkbox) {
    // Assign ID if doesn't exist
    if (!checkbox.id) {
        checkbox.id = 'ai_task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    if (checkbox.classList.contains('checked')) {
        checkbox.classList.remove('checked');
        completedTasks--;
    } else {
        checkbox.classList.add('checked');
        completedTasks++;
        
        // Check for AI milestones
        if (isAIMilestone(checkbox)) {
            celebrateAIMilestone(checkbox);
        }
    }
    
    updateStats();
    updateProgressBars();
    saveProgress();
}

// Check if task is an AI milestone
function isAIMilestone(checkbox) {
    const taskTitle = checkbox.closest('.task-item').querySelector('.task-title').textContent;
    const milestones = [
        'Build Command-Line Chatbot',
        'Create Chat Web Interface',
        'Build Image Recognition AI',
        'Custom Image Classifier',
        'Build Symptom Checker AI',
        'Deploy Healthcare AI Web App',
        'Create Your Own AI API',
        'Multi-Modal Healthcare AI'
    ];
    
    return milestones.some(milestone => taskTitle.includes(milestone));
}

// Celebrate AI milestone completion
function celebrateAIMilestone(checkbox) {
    const taskTitle = checkbox.closest('.task-item').querySelector('.task-title').textContent;
    
    // Create celebration overlay
    const celebration = document.createElement('div');
    celebration.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3em; margin-bottom: 15px;">🎉</div>
            <h2 style="color: white; margin-bottom: 10px;">AI Milestone Unlocked!</h2>
            <p style="color: rgba(255,255,255,0.9); font-size: 1.2em;">${taskTitle}</p>
            <p style="color: rgba(255,255,255,0.7); margin-top: 15px;">You're becoming an AI developer! 🚀</p>
        </div>
    `;
    
    celebration.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: celebrationFade 3s ease-out forwards;
        backdrop-filter: blur(10px);
    `;
    
    // Add celebration animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrationFade {
            0% { opacity: 0; transform: scale(0.5); }
            15% { opacity: 1; transform: scale(1.05); }
            85% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(celebration);
    
    // Add confetti effect
    createConfetti();
    
    // Clean up after animation
    setTimeout(() => {
        if (celebration.parentNode) celebration.parentNode.removeChild(celebration);
        if (style.parentNode) style.parentNode.removeChild(style);
    }, 3000);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#51cf66', '#ffa500'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            z-index: 1002;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
        }, 5000);
    }
    
    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    setTimeout(() => {
        if (confettiStyle.parentNode) confettiStyle.parentNode.removeChild(confettiStyle);
    }, 5000);
}

// Show welcome message for new users
function showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.innerHTML = `
        <div style="text-align: center; max-width: 500px;">
            <h2 style="color: #667eea; margin-bottom: 20px;">🤖 Welcome to AI Development!</h2>
            <p style="margin-bottom: 15px; line-height: 1.6;">You're about to start an amazing journey building AI applications!</p>
            <p style="margin-bottom: 20px; color: #666;">In 16 weeks, you'll go from beginner to building production AI systems.</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                Let's Start Building! 🚀
            </button>
        </div>
    `;
    
    welcome.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        backdrop-filter: blur(5px);
    `;
    
    const content = welcome.querySelector('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(welcome);
}

// Update statistics including completion percentage
function updateStats() {
    const tasksDoneElement = document.getElementById('tasks-done');
    const completionElement = document.getElementById('completion-percentage');
    
    if (tasksDoneElement) {
        tasksDoneElement.textContent = completedTasks;
    }
    
    if (completionElement) {
        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        completionElement.textContent = percentage + '%';
    }
}

// Update progress bars for each week
function updateProgressBars() {
    const weeks = document.querySelectorAll('.week');
    weeks.forEach(week => {
        const checkboxes = week.querySelectorAll('.task-checkbox');
        const checked = week.querySelectorAll('.task-checkbox.checked');
        const percentage = checkboxes.length > 0 ? (checked.length / checkboxes.length) * 100 : 0;
        const progressBar = week.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.setProperty('--target-width', percentage + '%');
            progressBar.style.width = percentage + '%';
            progressBar.classList.add('animate');
        }
    });
}

// Toggle week content visibility
function toggleWeek(header) {
    const week = header.closest('.week');
    if (week) {
        week.classList.toggle('expanded');
        
        // Update progress bar when week is opened
        setTimeout(() => {
            updateProgressBars();
        }, 100);
    }
}

// Toggle phase content visibility
function togglePhase(header) {
    const phase = header.closest('.phase');
    const content = phase.querySelector('.phase-content');
    if (content) {
        const isVisible = content.style.display === 'block';
        content.style.display = isVisible ? 'none' : 'block';
        
        // Update progress bars when phase is opened
        if (!isVisible) {
            setTimeout(() => {
                updateProgressBars();
            }, 100);
        }
    }
}

// Export progress as JSON file
function downloadProgress() {
    try {
        const milestones = getCompletedMilestones();
        const progress = {
            timestamp: new Date().toISOString(),
            roadmap_type: 'ai_development',
            version: '1.0',
            completed_tasks: completedTasks,
            total_tasks: totalTasks,
            completion_percentage: Math.round((completedTasks / totalTasks) * 100),
            ai_milestones: milestones,
            progress_data: JSON.parse(localStorage.getItem('ai_development_roadmap_progress') || '[]'),
            learning_stats: {
                weeks_active: calculateWeeksActive(),
                last_activity: localStorage.getItem('ai_development_last_save')
            }
        };
        
        const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-development-progress-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('🤖 AI development progress exported successfully!', 'success');
    } catch (error) {
        console.error('Error exporting AI progress:', error);
        showNotification('Error exporting progress. Please try again.', 'error');
    }
}

// Get completed AI milestones
function getCompletedMilestones() {
    const milestones = [];
    const checkedTasks = document.querySelectorAll('.task-checkbox.checked');
    
    checkedTasks.forEach(checkbox => {
        if (isAIMilestone(checkbox)) {
            const taskTitle = checkbox.closest('.task-item').querySelector('.task-title').textContent;
            const weekTitle = checkbox.closest('.week')?.querySelector('.week-title')?.textContent || 'Unknown Week';
            milestones.push({
                title: taskTitle,
                week: weekTitle,
                category: categorizeAIMilestone(taskTitle)
            });
        }
    });
    
    return milestones;
}

// Categorize AI milestones
function categorizeAIMilestone(title) {
    if (title.includes('Chatbot')) return 'Natural Language Processing';
    if (title.includes('Image') || title.includes('Vision')) return 'Computer Vision';
    if (title.includes('Healthcare') || title.includes('Medical')) return 'Healthcare AI';
    if (title.includes('API') || title.includes('Deploy')) return 'AI Engineering';
    return 'General AI';
}

// Calculate weeks active (simple estimation)
function calculateWeeksActive() {
    const firstSave = localStorage.getItem('ai_development_first_save');
    const lastSave = localStorage.getItem('ai_development_last_save');
    
    if (!firstSave) {
        localStorage.setItem('ai_development_first_save', new Date().toISOString());
        return 1;
    }
    
    if (lastSave) {
        const first = new Date(firstSave);
        const last = new Date(lastSave);
        const weeks = Math.ceil((last - first) / (7 * 24 * 60 * 60 * 1000));
        return Math.max(1, weeks);
    }
    
    return 1;
}

// Import progress from JSON file
function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            
            if (imported.roadmap_type !== 'ai_development') {
                showNotification('Invalid file: This is not an AI development roadmap backup.', 'error');
                return;
            }
            
            // Clear current progress
            document.querySelectorAll('.task-checkbox.checked').forEach(checkbox => {
                checkbox.classList.remove('checked');
            });
            
            // Load imported progress
            completedTasks = 0;
            if (imported.progress_data && Array.isArray(imported.progress_data)) {
                imported.progress_data.forEach(taskId => {
                    const checkbox = document.getElementById(taskId);
                    if (checkbox) {
                        checkbox.classList.add('checked');
                        completedTasks++;
                    }
                });
            }
            
            // Save to localStorage
            localStorage.setItem('ai_development_roadmap_progress', JSON.stringify(imported.progress_data || []));
            
            updateStats();
            updateProgressBars();
            
            let message = `🤖 AI progress imported! ${completedTasks} tasks completed.`;
            if (imported.ai_milestones && imported.ai_milestones.length > 0) {
                message += ` ${imported.ai_milestones.length} AI milestones restored!`;
            }
            
            showNotification(message, 'success');
            
        } catch (error) {
            console.error('Error importing AI progress:', error);
            showNotification('Error importing file. Please check the file format.', 'error');
        }
    };
    
    reader.readAsText(file);
    event.target.value = '';
}

// Show notification with AI-themed styling
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        backdrop-filter: blur(10px);
        ${type === 'success' ? 'background: linear-gradient(45deg, #51cf66, #40c057);' : 
          type === 'error' ? 'background: linear-gradient(45deg, #ff6b6b, #e55656);' : 
          'background: linear-gradient(45deg, #667eea, #764ba2);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    togglePhaseByIndex(0);
                    break;
                case '2':
                    e.preventDefault();
                    togglePhaseByIndex(1);
                    break;
                case '3':
                    e.preventDefault();
                    togglePhaseByIndex(2);
                    break;
                case '4':
                    e.preventDefault();
                    togglePhaseByIndex(3);
                    break;
                case 's':
                    e.preventDefault();
                    saveProgress();
                    showNotification('🤖 AI progress saved!', 'success');
                    break;
                case 'e':
                    e.preventDefault();
                    downloadProgress();
                    break;
                case 'f':
                    e.preventDefault();
                    const searchBox = document.querySelector('input[type="text"]');
                    if (searchBox) {
                        searchBox.focus();
                    }
                    break;
                case 'h':
                    e.preventDefault();
                    showHelp();
                    break;
            }
        }
    });
}

// Toggle phase by index
function togglePhaseByIndex(index) {
    const phases = document.querySelectorAll('.phase-header');
    if (phases[index]) {
        togglePhase(phases[index]);
    }
}

// Search functionality
function searchTasks(query) {
    const tasks = document.querySelectorAll('.task-item');
    const weeks = document.querySelectorAll('.week');
    
    if (!query.trim()) {
        tasks.forEach(task => task.style.display = 'flex');
        weeks.forEach(week => week.style.display = 'block');
        return;
    }
    
    const searchTerm = query.toLowerCase();
    let visibleWeeks = new Set();
    
    tasks.forEach(task => {
        const title = task.querySelector('.task-title').textContent.toLowerCase();
        const desc = task.querySelector('.task-desc').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            task.style.display = 'flex';
            const week = task.closest('.week');
            if (week) {
                visibleWeeks.add(week);
            }
        } else {
            task.style.display = 'none';
        }
    });
    
    weeks.forEach(week => {
        if (visibleWeeks.has(week)) {
            week.style.display = 'block';
            week.classList.add('expanded');
        } else {
            week.style.display = 'none';
        }
    });
}

// Add search functionality
function addSearchBox() {
    const header = document.querySelector('.header');
    if (header) {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = 'margin-top: 25px;';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Search AI tasks, projects, and concepts...';
        
        searchInput.addEventListener('input', (e) => {
            searchTasks(e.target.value);
        });
        
        searchContainer.appendChild(searchInput);
        header.appendChild(searchContainer);
    }
}

// Show help modal with AI-specific information
function showHelp() {
    const helpModal = document.createElement('div');
    helpModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
    `;
    
    const helpContent = document.createElement('div');
    helpContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 700px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;
    
    helpContent.innerHTML = `
        <h2 style="color: #667eea; margin-bottom: 20px;">🤖 AI Development Roadmap Help</h2>
        
        <h3 style="color: #333; margin: 20px 0 10px 0;">🎯 Your AI Journey:</h3>
        <ul style="margin-bottom: 20px; line-height: 1.6;">
            <li><strong>Week 3:</strong> Build your first AI chatbot 🎉</li>
            <li><strong>Week 4:</strong> Create web interface for your AI</li>
            <li><strong>Week 8:</strong> Healthcare AI project for Equitas Health</li>
            <li><strong>Week 16:</strong> Launch your AI career ($160k+ salary potential)</li>
        </ul>
        
        <h3 style="color: #333; margin: 20px 0 10px 0;">⌨️ Keyboard Shortcuts:</h3>
        <ul style="margin-bottom: 20px; line-height: 1.6;">
            <li><kbd>Ctrl+1-4</kbd> - Toggle Phases 1-4</li>
            <li><kbd>Ctrl+S</kbd> - Save Progress</li>
            <li><kbd>Ctrl+E</kbd> - Export Progress</li>
            <li><kbd>Ctrl+F</kbd> - Search Tasks</li>
            <li><kbd>Ctrl+H</kbd> - Show Help</li>
        </ul>
        
        <h3 style="color: #333; margin: 20px 0 10px 0;">🎉 AI Milestones:</h3>
        <ul style="margin-bottom: 20px; line-height: 1.6;">
            <li>🎊 Special celebrations for major AI achievements</li>
            <li>🏆 Track your progress toward becoming an AI developer</li>
            <li>📊 Visual progress tracking with completion percentages</li>
            <li>🤖 Milestone categories: NLP, Computer Vision, Healthcare AI</li>
        </ul>
        
        <h3 style="color: #333; margin: 20px 0 10px 0;">💡 Learning Tips:</h3>
        <ul style="margin-bottom: 20px; line-height: 1.6;">
            <li>🔨 Focus on building projects, not just theory</li>
            <li>⏰ Use 25-minute focused sessions (Pomodoro)</li>
            <li>📚 Complete freeCodeCamp courses for solid foundation</li>
            <li>🏥 Apply AI to healthcare problems (great for Equitas Health!)</li>
            <li>💼 Build portfolio projects that show real AI skills</li>
        </ul>
        
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                    style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1.1em;">
                Start Building AI! 🚀
            </button>
        </div>
    `;
    
    helpModal.appendChild(helpContent);
    document.body.appendChild(helpModal);
    
    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            helpModal.remove();
        }
    });
}

// Mobile touch support
function addTouchSupport() {
    let startY = 0;
    let currentY = 0;
    let isScrolling = false;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isScrolling = false;
    });
    
    document.addEventListener('touchmove', function(e) {
        currentY = e.touches[0].clientY;
        if (Math.abs(currentY - startY) > 10) {
            isScrolling = true;
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (!isScrolling) {
            const target = e.target;
            if (target.classList.contains('task-checkbox')) {
                toggleTask(target);
            }
        }
    });
}

// Get AI learning recommendations based on progress
function getAIRecommendations() {
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    const milestones = getCompletedMilestones();
    
    if (percentage < 25) {
        return "🐍 Focus on Python fundamentals and build your first chatbot. The foundation is everything in AI!";
    } else if (percentage < 50) {
        return "📊 Great progress! Now dive into data science and machine learning. Start building predictive models!";
    } else if (percentage < 75) {
        return "🚀 You're doing amazing! Focus on advanced AI applications and deployment. You're almost job-ready!";
    } else {
        return "🎉 Incredible work! You're ready to launch your AI career. Start applying for AI roles and building your business!";
    }
}

// AI-specific utility functions
function showAIRecommendation() {
    const recommendation = getAIRecommendations();
    showNotification(recommendation, 'info');
}

// Enhanced progress tracking with AI insights
function getAIInsights() {
    const milestones = getCompletedMilestones();
    const categories = {};
    
    milestones.forEach(milestone => {
        const category = milestone.category;
        categories[category] = (categories[category] || 0) + 1;
    });
    
    return {
        total_milestones: milestones.length,
        categories: categories,
        strongest_area: Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, 'General AI'),
        completion_rate: Math.round((completedTasks / totalTasks) * 100)
    };
}

// Export AI insights
function exportAIInsights() {
    const insights = getAIInsights();
    const blob = new Blob([JSON.stringify(insights, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-insights-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('🤖 AI insights exported!', 'success');
}