// AI Development Roadmap - Fixed Saving & Enhanced Retention Features
class AILearningTracker {
    constructor() {
        this.storageKey = 'ai_development_progress';
        this.retentionKey = 'ai_development_retention';
        this.streakKey = 'ai_development_streak';
        this.milestonesKey = 'ai_development_milestones';
        
        // Initialize on page load
        this.init();
    }

    init() {
        console.log('🤖 AI Development Tracker Initialized');
        
        // Load saved progress
        this.loadProgress();
        this.loadRetentionData();
        this.loadMilestones();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup retention features
        this.setupRetentionSystem();
        
        // Update stats
        this.updateStats();
        
        // Setup auto-save
        this.setupAutoSave();
        
        // Check daily streak
        this.checkDailyStreak();
        
        // Check for milestone achievements
        this.checkMilestones();
    }

    // FIXED SAVING SYSTEM
    saveProgress() {
        try {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const progress = {};
            
            checkboxes.forEach((checkbox, index) => {
                const taskId = checkbox.id || `ai_task_${index}`;
                progress[taskId] = checkbox.checked;
            });
            
            localStorage.setItem(this.storageKey, JSON.stringify(progress));
            console.log('✅ AI Progress saved successfully');
            
            // Update completion stats
            this.updateStats();
            
            // Show save confirmation
            this.showSaveConfirmation();
            
            // Check for milestone achievements
            this.checkMilestones();
            
            return true;
        } catch (error) {
            console.error('❌ Failed to save AI progress:', error);
            alert('Failed to save progress. Please try again.');
            return false;
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const progress = JSON.parse(saved);
                
                Object.entries(progress).forEach(([taskId, isChecked]) => {
                    const checkbox = document.getElementById(taskId) || 
                                   document.querySelector(`input[type="checkbox"]:nth-of-type(${taskId.split('_')[2] || taskId.split('_')[1]})`);
                    
                    if (checkbox) {
                        checkbox.checked = isChecked;
                    }
                });
                
                console.log('📊 AI Progress loaded successfully');
            }
        } catch (error) {
            console.error('❌ Failed to load AI progress:', error);
        }
    }

    showSaveConfirmation() {
        // Create save notification with AI theme
        const notification = document.createElement('div');
        notification.innerHTML = '🤖 AI Progress Saved!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            z-index: 1000;
            animation: aiSlideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // AI-SPECIFIC RETENTION SYSTEM
    setupRetentionSystem() {
        this.createAIRetentionPanel();
        this.scheduleReviews();
        this.setupAIQuizSystem();
    }

    createAIRetentionPanel() {
        const retentionPanel = document.createElement('div');
        retentionPanel.id = 'ai-retention-panel';
        retentionPanel.innerHTML = `
            <div class="ai-retention-header">
                <h3>🧠 AI Learning Intelligence System</h3>
                <p>Neural network-inspired spaced repetition for maximum retention!</p>
            </div>
            
            <div class="ai-retention-stats">
                <div class="ai-stat-box">
                    <div class="ai-stat-number" id="ai-retention-score">0%</div>
                    <div class="ai-stat-label">Neural Retention</div>
                </div>
                <div class="ai-stat-box">
                    <div class="ai-stat-number" id="ai-review-due">0</div>
                    <div class="ai-stat-label">Concepts Due</div>
                </div>
                <div class="ai-stat-box">
                    <div class="ai-stat-number" id="ai-streak-count">0</div>
                    <div class="ai-stat-label">Learning Streak</div>
                </div>
                <div class="ai-stat-box">
                    <div class="ai-stat-number" id="ai-projects-built">0</div>
                    <div class="ai-stat-label">AI Projects Built</div>
                </div>
            </div>

            <div class="ai-review-section">
                <h4>🔄 Neural Review Session</h4>
                <div id="ai-daily-reviews"></div>
                <button id="start-ai-review" class="ai-cta-button">
                    <span>🧠</span> Start Neural Review
                </button>
            </div>

            <div class="ai-quiz-section">
                <h4>🎯 AI Knowledge Validation</h4>
                <div id="ai-daily-quiz"></div>
                <button id="take-ai-quiz" class="ai-cta-button">
                    <span>🤖</span> Run Knowledge Test
                </button>
            </div>

            <div class="ai-milestones-section">
                <h4>🌟 AI Development Milestones</h4>
                <div id="ai-milestones-display"></div>
            </div>
        `;

        // Add AI-specific CSS
        const style = document.createElement('style');
        style.textContent = `
            #ai-retention-panel {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 25px;
                margin: 20px 0;
                border-radius: 20px;
                color: white;
                position: relative;
                overflow: hidden;
            }
            
            #ai-retention-panel::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="70" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="90" r="1" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
                pointer-events: none;
            }
            
            .ai-retention-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 15px;
                margin: 20px 0;
                position: relative;
                z-index: 1;
            }
            
            .ai-stat-box {
                background: rgba(255,255,255,0.15);
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .ai-stat-box:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            }
            
            .ai-stat-number {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 8px;
                background: linear-gradient(45deg, #fff, #f0f0f0);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .ai-stat-label {
                font-size: 13px;
                opacity: 0.9;
                font-weight: 500;
            }
            
            .ai-review-section, .ai-quiz-section, .ai-milestones-section {
                background: rgba(255,255,255,0.1);
                padding: 20px;
                margin: 15px 0;
                border-radius: 15px;
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255,255,255,0.15);
                position: relative;
                z-index: 1;
            }
            
            .ai-cta-button {
                background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 30px;
                cursor: pointer;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 15px rgba(255,107,107,0.3);
            }
            
            .ai-cta-button:hover {
                background: linear-gradient(45deg, #ff5252, #ff7979);
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(255,107,107,0.4);
            }
            
            .ai-milestone-item {
                background: rgba(255,255,255,0.1);
                padding: 10px 15px;
                margin: 8px 0;
                border-radius: 20px;
                border-left: 4px solid #4CAF50;
            }
            
            .ai-milestone-item.locked {
                opacity: 0.6;
                border-left-color: #666;
            }
            
            .ai-milestone-item.achieved {
                background: rgba(76,175,80,0.2);
                border-left-color: #4CAF50;
            }
            
            @keyframes aiSlideIn {
                from { transform: translateX(100%) scale(0.8); opacity: 0; }
                to { transform: translateX(0) scale(1); opacity: 1; }
            }
            
            @keyframes aiCelebration {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .ai-celebration {
                animation: aiCelebration 0.6s ease-in-out;
            }
        `;
        
        document.head.appendChild(style);
        
        // Insert after the header
        const container = document.querySelector('.container') || document.body;
        const header = container.querySelector('h1') || container.firstChild;
        header.parentNode.insertBefore(retentionPanel, header.nextSibling);
        
        // Setup AI retention event listeners
        this.setupAIRetentionListeners();
        
        // Initialize milestones display
        this.updateMilestonesDisplay();
    }

    setupAIRetentionListeners() {
        const startReviewBtn = document.getElementById('start-ai-review');
        const takeQuizBtn = document.getElementById('take-ai-quiz');
        
        if (startReviewBtn) {
            startReviewBtn.addEventListener('click', () => this.startAIReviewSession());
        }
        
        if (takeQuizBtn) {
            takeQuizBtn.addEventListener('click', () => this.startAIQuiz());
        }
    }

    // AI-SPECIFIC MILESTONES SYSTEM
    checkMilestones() {
        const milestones = this.getAIMilestones();
        const completedTasks = this.getCompletedTasks().length;
        const totalTasks = document.querySelectorAll('input[type="checkbox"]').length;
        const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
        
        milestones.forEach(milestone => {
            if (!milestone.achieved && completedTasks >= milestone.requiredTasks) {
                this.achieveMilestone(milestone);
            }
        });
        
        // Update projects built counter
        const projectsBuilt = this.countProjectsBuilt();
        const projectsElement = document.getElementById('ai-projects-built');
        if (projectsElement) {
            projectsElement.textContent = projectsBuilt;
        }
        
        this.updateMilestonesDisplay();
    }

    getAIMilestones() {
        return [
            {
                id: 'first_steps',
                title: '🚀 AI Journey Begins',
                description: 'Started your AI development journey',
                requiredTasks: 1,
                reward: 'Unlocked: Basic AI concepts',
                achieved: false
            },
            {
                id: 'python_master',
                title: '🐍 Python Foundation',
                description: 'Mastered Python fundamentals',
                requiredTasks: 10,
                reward: 'Unlocked: Machine Learning modules',
                achieved: false
            },
            {
                id: 'first_chatbot',
                title: '🤖 First AI Chatbot',
                description: 'Built your first conversational AI',
                requiredTasks: 20,
                reward: 'Unlocked: Advanced NLP techniques',
                achieved: false
            },
            {
                id: 'ml_explorer',
                title: '📊 ML Explorer',
                description: 'Completed machine learning fundamentals',
                requiredTasks: 35,
                reward: 'Unlocked: Deep Learning pathways',
                achieved: false
            },
            {
                id: 'healthcare_ai',
                title: '🏥 Healthcare AI Specialist',
                description: 'Built AI solutions for healthcare',
                requiredTasks: 50,
                reward: 'Unlocked: Medical AI certification path',
                achieved: false
            },
            {
                id: 'production_ready',
                title: '🚀 Production AI Developer',
                description: 'Deployed AI to production',
                requiredTasks: 65,
                reward: 'Unlocked: Enterprise AI opportunities',
                achieved: false
            },
            {
                id: 'ai_expert',
                title: '🎓 AI Expert',
                description: 'Completed the full AI development roadmap',
                requiredTasks: 80,
                reward: 'Ready for $160k+ AI developer roles!',
                achieved: false
            }
        ];
    }

    achieveMilestone(milestone) {
        milestone.achieved = true;
        this.saveMilestones();
        
        // Show celebration
        this.showMilestoneCelebration(milestone);
        
        // Update display
        this.updateMilestonesDisplay();
    }

    showMilestoneCelebration(milestone) {
        // Create celebration modal
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="milestone-celebration">
                <div class="celebration-content">
                    <div class="celebration-icon">🎉</div>
                    <h2>Milestone Achieved!</h2>
                    <h3>${milestone.title}</h3>
                    <p>${milestone.description}</p>
                    <div class="reward-box">
                        <strong>Reward Unlocked:</strong><br>
                        ${milestone.reward}
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="ai-cta-button">
                        Continue Learning! 🚀
                    </button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add celebration CSS
        const celebrationStyle = document.createElement('style');
        celebrationStyle.textContent = `
            .milestone-celebration {
                animation: aiCelebration 0.6s ease-in-out;
            }
            
            .celebration-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .celebration-icon {
                font-size: 60px;
                margin-bottom: 20px;
                animation: aiCelebration 1s ease-in-out infinite;
            }
            
            .reward-box {
                background: rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                border: 1px solid rgba(255,255,255,0.2);
            }
        `;
        
        document.head.appendChild(celebrationStyle);
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.remove();
                celebrationStyle.remove();
            }
        }, 10000);
    }

    updateMilestonesDisplay() {
        const milestonesDisplay = document.getElementById('ai-milestones-display');
        if (!milestonesDisplay) return;
        
        const milestones = this.getAIMilestones();
        const completedTasks = this.getCompletedTasks().length;
        
        milestonesDisplay.innerHTML = milestones.map(milestone => {
            const isAchieved = milestone.achieved || completedTasks >= milestone.requiredTasks;
            const isLocked = completedTasks < milestone.requiredTasks - 5;
            
            return `
                <div class="ai-milestone-item ${isAchieved ? 'achieved' : ''} ${isLocked ? 'locked' : ''}">
                    <strong>${milestone.title}</strong>
                    <br>
                    <small>${milestone.description}</small>
                    <div style="margin-top: 5px; font-size: 12px;">
                        Progress: ${Math.min(completedTasks, milestone.requiredTasks)}/${milestone.requiredTasks} tasks
                        ${isAchieved ? ' ✅' : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    countProjectsBuilt() {
        // Count major project milestones achieved
        const projectMilestones = ['first_chatbot', 'healthcare_ai', 'production_ready'];
        return projectMilestones.filter(id => {
            const milestone = this.getAIMilestones().find(m => m.id === id);
            return milestone && milestone.achieved;
        }).length;
    }

    // AI-SPECIFIC QUIZ SYSTEM
    startAIQuiz() {
        const quizQuestions = this.generateAIQuizQuestions();
        
        if (quizQuestions.length === 0) {
            alert('Complete more AI tasks to unlock quiz questions!');
            return;
        }
        
        this.createAIQuizModal(quizQuestions);
    }

    generateAIQuizQuestions() {
        // AI-specific quiz questions
        return [
            {
                question: "What does 'AI' stand for?",
                options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Interface"],
                correct: 1,
                explanation: "AI stands for Artificial Intelligence - the simulation of human intelligence in machines."
            },
            {
                question: "Which Python library is most commonly used for machine learning?",
                options: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib"],
                correct: 2,
                explanation: "Scikit-learn is the most popular general-purpose machine learning library for Python."
            },
            {
                question: "What type of learning uses labeled training data?",
                options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Transfer Learning"],
                correct: 2,
                explanation: "Supervised learning uses labeled training data to learn the mapping from inputs to outputs."
            },
            {
                question: "Which is NOT a type of neural network activation function?",
                options: ["ReLU", "Sigmoid", "Tanh", "Boolean"],
                correct: 3,
                explanation: "Boolean is not an activation function. ReLU, Sigmoid, and Tanh are common activation functions."
            },
            {
                question: "What does 'NLP' stand for in AI?",
                options: ["Neural Learning Process", "Natural Language Processing", "Network Layer Protocol", "Numeric Logic Programming"],
                correct: 1,
                explanation: "NLP stands for Natural Language Processing - the branch of AI that deals with human language."
            },
            {
                question: "Which company created the GPT language models?",
                options: ["Google", "Meta", "OpenAI", "Microsoft"],
                correct: 2,
                explanation: "OpenAI created the GPT (Generative Pre-trained Transformer) series of language models."
            },
            {
                question: "What is overfitting in machine learning?",
                options: ["Using too much data", "Model performs well on training but poorly on new data", "Model is too simple", "Training takes too long"],
                correct: 1,
                explanation: "Overfitting occurs when a model memorizes training data but fails to generalize to new, unseen data."
            },
            {
                question: "Which is the most popular deep learning framework?",
                options: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn"],
                correct: 1,
                explanation: "PyTorch has become the most popular deep learning framework, especially in research and development."
            }
        ];
    }

    createAIQuizModal(questions) {
        const modal = document.createElement('div');
        modal.id = 'ai-quiz-modal';
        
        const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        
        modal.innerHTML = `
            <div class="ai-quiz-content">
                <div class="ai-quiz-header">
                    <h3>🤖 AI Knowledge Validation Test</h3>
                    <span class="close-ai-quiz">&times;</span>
                </div>
                <div class="ai-quiz-body">
                    <div id="ai-quiz-questions">
                        ${selectedQuestions.map((q, index) => `
                            <div class="ai-quiz-question" id="question-${index}" ${index === 0 ? '' : 'style="display:none"'}>
                                <div class="question-counter">Question ${index + 1} of ${selectedQuestions.length}</div>
                                <h4>${q.question}</h4>
                                <div class="ai-quiz-options">
                                    ${q.options.map((option, optIndex) => `
                                        <button class="ai-quiz-option" onclick="aiTracker.selectQuizAnswer(${index}, ${optIndex}, ${q.correct})">${option}</button>
                                    `).join('')}
                                </div>
                                <div class="quiz-explanation" id="explanation-${index}" style="display:none">
                                    <strong>Explanation:</strong> ${q.explanation}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="ai-quiz-navigation">
                        <button id="prev-question" onclick="aiTracker.prevQuestion()" style="display:none">Previous</button>
                        <button id="next-question" onclick="aiTracker.nextQuestion()" style="display:none">Next</button>
                        <button id="finish-quiz" onclick="aiTracker.finishQuiz()" style="display:none">Finish Quiz</button>
                    </div>
                    <div id="quiz-results" style="display:none">
                        <h3>🎯 Quiz Results</h3>
                        <div id="quiz-score"></div>
                        <button onclick="document.getElementById('ai-quiz-modal').remove()" class="ai-cta-button">Continue Learning!</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add quiz CSS
        const quizStyle = document.createElement('style');
        quizStyle.textContent = `
            #ai-quiz-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .ai-quiz-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 20px;
                max-width: 600px;
                max-height: 80%;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .close-ai-quiz {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 24px;
                cursor: pointer;
                color: white;
            }
            
            .ai-quiz-question {
                margin: 20px 0;
            }
            
            .question-counter {
                background: rgba(255,255,255,0.2);
                padding: 5px 15px;
                border-radius: 15px;
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
            }
            
            .ai-quiz-options {
                margin: 15px 0;
            }
            
            .ai-quiz-option {
                display: block;
                width: 100%;
                margin: 10px 0;
                padding: 15px;
                background: rgba(255,255,255,0.1);
                color: white;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .ai-quiz-option:hover {
                background: rgba(255,255,255,0.2);
                transform: translateX(5px);
            }
            
            .ai-quiz-option.correct {
                background: rgba(76,175,80,0.3);
                border-color: #4CAF50;
            }
            
            .ai-quiz-option.incorrect {
                background: rgba(244,67,54,0.3);
                border-color: #f44336;
            }
            
            .quiz-explanation {
                background: rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 10px;
                margin-top: 15px;
                border-left: 4px solid #4CAF50;
            }
            
            .ai-quiz-navigation {
                text-align: center;
                margin: 20px 0;
            }
            
            .ai-quiz-navigation button {
                margin: 0 10px;
                padding: 10px 20px;
                background: rgba(255,255,255,0.2);
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
            }
        `;
        
        document.head.appendChild(quizStyle);
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-ai-quiz').addEventListener('click', () => {
            modal.remove();
            quizStyle.remove();
        });
        
        // Initialize quiz state
        this.currentQuestion = 0;
        this.quizAnswers = [];
        this.totalQuestions = selectedQuestions.length;
    }

    selectQuizAnswer(questionIndex, selectedOption, correctAnswer) {
        const options = document.querySelectorAll(`#question-${questionIndex} .ai-quiz-option`);
        
        // Disable all options
        options.forEach(option => option.style.pointerEvents = 'none');
        
        // Show correct/incorrect
        options[selectedOption].classList.add(selectedOption === correctAnswer ? 'correct' : 'incorrect');
        if (selectedOption !== correctAnswer) {
            options[correctAnswer].classList.add('correct');
        }
        
        // Show explanation
        document.getElementById(`explanation-${questionIndex}`).style.display = 'block';
        
        // Record answer
        this.quizAnswers[questionIndex] = selectedOption === correctAnswer;
        
        // Show navigation
        if (questionIndex < this.totalQuestions - 1) {
            document.getElementById('next-question').style.display = 'inline-block';
        } else {
            document.getElementById('finish-quiz').style.display = 'inline-block';
        }
        
        if (questionIndex > 0) {
            document.getElementById('prev-question').style.display = 'inline-block';
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions - 1) {
            document.getElementById(`question-${this.currentQuestion}`).style.display = 'none';
            this.currentQuestion++;
            document.getElementById(`question-${this.currentQuestion}`).style.display = 'block';
            
            // Update navigation
            document.getElementById('prev-question').style.display = 'inline-block';
            if (this.currentQuestion === this.totalQuestions - 1) {
                document.getElementById('next-question').style.display = 'none';
                if (this.quizAnswers[this.currentQuestion] !== undefined) {
                    document.getElementById('finish-quiz').style.display = 'inline-block';
                }
            }
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            document.getElementById(`question-${this.currentQuestion}`).style.display = 'none';
            this.currentQuestion--;
            document.getElementById(`question-${this.currentQuestion}`).style.display = 'block';
            
            // Update navigation
            document.getElementById('next-question').style.display = 'inline-block';
            if (this.currentQuestion === 0) {
                document.getElementById('prev-question').style.display = 'none';
            }
        }
    }

    finishQuiz() {
        // Hide questions
        document.getElementById('ai-quiz-questions').style.display = 'none';
        document.querySelector('.ai-quiz-navigation').style.display = 'none';
        
        // Calculate score
        const correctAnswers = this.quizAnswers.filter(answer => answer === true).length;
        const percentage = Math.round((correctAnswers / this.totalQuestions) * 100);
        
        // Show results
        const resultsDiv = document.getElementById('quiz-results');
        const scoreDiv = document.getElementById('quiz-score');
        
        let scoreMessage = '';
        if (percentage >= 90) {
            scoreMessage = '🏆 Excellent! You\'re mastering AI concepts!';
        } else if (percentage >= 70) {
            scoreMessage = '👍 Good job! Keep learning to improve further.';
        } else if (percentage >= 50) {
            scoreMessage = '📚 Not bad, but review the concepts you missed.';
        } else {
            scoreMessage = '💪 Keep studying! You\'ll get there with practice.';
        }
        
        scoreDiv.innerHTML = `
            <div style="font-size: 36px; margin: 20px 0;">${percentage}%</div>
            <p>You got ${correctAnswers} out of ${this.totalQuestions} questions correct.</p>
            <p>${scoreMessage}</p>
        `;
        
        resultsDiv.style.display = 'block';
        
        // Save quiz result
        this.saveQuizResult(percentage);
    }

    saveQuizResult(score) {
        const quizHistory = JSON.parse(localStorage.getItem('ai_quiz_history') || '[]');
        quizHistory.push({
            date: new Date().toISOString(),
            score: score
        });
        localStorage.setItem('ai_quiz_history', JSON.stringify(quizHistory));
    }

    // SPACED REPETITION SYSTEM (AI-specific)
    scheduleReviews() {
        const completedTasks = this.getCompletedTasks();
        const retentionData = this.getRetentionData();
        
        completedTasks.forEach(taskId => {
            if (!retentionData[taskId]) {
                // New completed task - schedule first review
                retentionData[taskId] = {
                    completedDate: Date.now(),
                    reviewDates: this.calculateReviewDates(Date.now()),
                    reviewCount: 0,
                    strength: 1 // 1-5 scale
                };
            }
        });
        
        this.saveRetentionData(retentionData);
        this.updateRetentionDisplay();
    }

    calculateReviewDates(completedDate) {
        // AI-optimized spaced repetition: 1 day, 3 days, 7 days, 14 days, 30 days
        const intervals = [1, 3, 7, 14, 30];
        return intervals.map(interval => 
            completedDate + (interval * 24 * 60 * 60 * 1000)
        );
    }

    startAIReviewSession() {
        const reviewItems = this.getDueReviews();
        
        if (reviewItems.length === 0) {
            alert('🎉 No AI concepts due for review today! Your neural networks are well-trained!');
            return;
        }
        
        // Create AI-themed review modal
        this.createAIReviewModal(reviewItems);
    }

    createAIReviewModal(reviewItems) {
        const modal = document.createElement('div');
        modal.id = 'ai-review-modal';
        modal.innerHTML = `
            <div class="ai-review-content">
                <div class="ai-review-header">
                    <h3>🧠 Neural Review Session</h3>
                    <span class="close-ai-review">&times;</span>
                </div>
                <div class="ai-review-body">
                    <p>Strengthen your AI knowledge through spaced repetition:</p>
                    <div id="ai-review-items">
                        ${reviewItems.map(item => `
                            <div class="ai-review-item">
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                                <div class="ai-difficulty-buttons">
                                    <button onclick="aiTracker.markAIReview('${item.id}', 'easy')" class="difficulty-easy">
                                        🟢 Easy Recall
                                    </button>
                                    <button onclick="aiTracker.markAIReview('${item.id}', 'medium')" class="difficulty-medium">
                                        🟡 Some Effort
                                    </button>
                                    <button onclick="aiTracker.markAIReview('${item.id}', 'hard')" class="difficulty-hard">
                                        🔴 Difficult
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Add AI review CSS
        const reviewStyle = document.createElement('style');
        reviewStyle.textContent = `
            #ai-review-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .ai-review-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 20px;
                max-width: 700px;
                max-height: 80%;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .close-ai-review {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 24px;
                cursor: pointer;
                color: white;
            }
            
            .ai-review-item {
                background: rgba(255,255,255,0.1);
                padding: 20px;
                margin: 15px 0;
                border-radius: 15px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            
            .ai-difficulty-buttons {
                margin-top: 15px;
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .ai-difficulty-buttons button {
                padding: 10px 20px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                flex: 1;
                min-width: 120px;
            }
            
            .difficulty-easy {
                background: #4CAF50;
                color: white;
            }
            
            .difficulty-medium {
                background: #FF9800;
                color: white;
            }
            
            .difficulty-hard {
                background: #f44336;
                color: white;
            }
            
            .ai-difficulty-buttons button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
        `;
        
        document.head.appendChild(reviewStyle);
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-ai-review').addEventListener('click', () => {
            modal.remove();
            reviewStyle.remove();
        });
    }

    markAIReview(taskId, difficulty) {
        const retentionData = this.getRetentionData();
        
        if (retentionData[taskId]) {
            retentionData[taskId].reviewCount++;
            
            // Adjust strength based on difficulty
            switch(difficulty) {
                case 'easy':
                    retentionData[taskId].strength = Math.min(5, retentionData[taskId].strength + 1);
                    break;
                case 'medium':
                    // Keep same strength
                    break;
                case 'hard':
                    retentionData[taskId].strength = Math.max(1, retentionData[taskId].strength - 1);
                    break;
            }
            
            // Reschedule next review based on strength
            const multiplier = retentionData[taskId].strength;
            const nextInterval = [1, 3, 7, 14, 30][Math.min(4, retentionData[taskId].reviewCount)] * multiplier;
            retentionData[taskId].nextReview = Date.now() + (nextInterval * 24 * 60 * 60 * 1000);
        }
        
        this.saveRetentionData(retentionData);
        
        // Remove the reviewed item from display
        const reviewItem = document.querySelector(`button[onclick*="${taskId}"]`).closest('.ai-review-item');
        reviewItem.style.opacity = '0.5';
        reviewItem.innerHTML += '<div style="text-align: center; margin-top: 10px; color: #4CAF50;">✅ Review Complete</div>';
        
        // Check if all reviews are done
        setTimeout(() => {
            const remainingItems = document.querySelectorAll('.ai-review-item:not([style*="opacity: 0.5"])');
            if (remainingItems.length === 0) {
                document.getElementById('ai-review-modal').remove();
                alert('🎉 All AI reviews complete! Your knowledge is getting stronger!');
                this.updateRetentionDisplay();
            }
        }, 1000);
    }

    // EVENT LISTENERS AND AUTO-SAVE
    setupEventListeners() {
        // Save on every checkbox change
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.saveProgress();
                this.scheduleReviews();
                this.checkMilestones();
            }
        });
        
        // AI-specific keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveProgress();
            }
            
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.startAIReviewSession();
            }
            
            if (e.ctrlKey && e.key === 'q') {
                e.preventDefault();
                this.startAIQuiz();
            }
        });
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveProgress();
        }, 30000);
        
        // Save before page unload
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });
        
        console.log('🤖 AI Auto-save system activated');
    }

    // UTILITY FUNCTIONS
    getCompletedTasks() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map((cb, index) => cb.id || `ai_task_${index}`);
    }

    updateStats() {
        const totalTasks = document.querySelectorAll('input[type="checkbox"]').length;
        const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);
        
        // Update progress displays
        const progressElements = document.querySelectorAll('.progress-percentage, .ai-progress-percentage');
        progressElements.forEach(el => {
            el.textContent = `${percentage}%`;
        });
        
        // Update AI retention score (slightly lower than completion for realism)
        const retentionScore = document.getElementById('ai-retention-score');
        if (retentionScore) {
            retentionScore.textContent = `${Math.max(percentage - 5, 0)}%`;
        }
        
        console.log(`📊 AI Progress: ${completedTasks}/${totalTasks} tasks (${percentage}%)`);
    }

    updateRetentionDisplay() {
        const dueReviews = this.getDueReviews().length;
        const reviewDueElement = document.getElementById('ai-review-due');
        if (reviewDueElement) {
            reviewDueElement.textContent = dueReviews;
        }
    }

    getDueReviews() {
        const retentionData = this.getRetentionData();
        const now = Date.now();
        const dueReviews = [];
        
        Object.entries(retentionData).forEach(([taskId, data]) => {
            const nextReviewDate = data.nextReview || data.reviewDates[data.reviewCount];
            if (nextReviewDate && now >= nextReviewDate) {
                dueReviews.push({
                    id: taskId,
                    title: this.getTaskTitle(taskId),
                    description: this.getTaskDescription(taskId)
                });
            }
        });
        
        return dueReviews;
    }

    checkDailyStreak() {
        const today = new Date().toDateString();
        const lastActive = localStorage.getItem('ai_last_active_date');
        const currentStreak = parseInt(localStorage.getItem(this.streakKey)) || 0;
        
        if (lastActive !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastActive === yesterday.toDateString()) {
                // Continued streak
                localStorage.setItem(this.streakKey, (currentStreak + 1).toString());
            } else {
                // Broken streak
                localStorage.setItem(this.streakKey, '1');
            }
            
            localStorage.setItem('ai_last_active_date', today);
        }
        
        // Update streak display
        const streakElement = document.getElementById('ai-streak-count');
        if (streakElement) {
            streakElement.textContent = localStorage.getItem(this.streakKey) || '0';
        }
    }

    // DATA PERSISTENCE
    getRetentionData() {
        try {
            return JSON.parse(localStorage.getItem(this.retentionKey)) || {};
        } catch {
            return {};
        }
    }

    saveRetentionData(data) {
        localStorage.setItem(this.retentionKey, JSON.stringify(data));
    }

    loadRetentionData() {
        this.updateRetentionDisplay();
    }

    loadMilestones() {
        const saved = localStorage.getItem(this.milestonesKey);
        if (saved) {
            const milestones = JSON.parse(saved);
            // Apply saved milestone states
            this.savedMilestones = milestones;
        }
    }

    saveMilestones() {
        const milestones = this.getAIMilestones();
        localStorage.setItem(this.milestonesKey, JSON.stringify(milestones));
    }

    getTaskTitle(taskId) {
        const checkbox = document.getElementById(taskId);
        if (checkbox) {
            const label = checkbox.closest('li') || checkbox.parentNode;
            return label.textContent.trim().substring(0, 60) + '...';
        }
        return 'AI Development Task';
    }

    getTaskDescription(taskId) {
        return 'Review this AI concept to strengthen your understanding and build neural pathways.';
    }

    // EXPORT/IMPORT FUNCTIONALITY
    exportAIProgress() {
        const progress = localStorage.getItem(this.storageKey);
        const retention = localStorage.getItem(this.retentionKey);
        const streak = localStorage.getItem(this.streakKey);
        const milestones = localStorage.getItem(this.milestonesKey);
        const quizHistory = localStorage.getItem('ai_quiz_history');
        
        const exportData = {
            progress: JSON.parse(progress || '{}'),
            retention: JSON.parse(retention || '{}'),
            milestones: JSON.parse(milestones || '[]'),
            quizHistory: JSON.parse(quizHistory || '[]'),
            streak: parseInt(streak || '0'),
            exportDate: new Date().toISOString(),
            type: 'ai_development_roadmap'
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai_development_progress_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        alert('🤖 AI progress exported successfully!');
    }

    importAIProgress(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                
                if (importData.type !== 'ai_development_roadmap') {
                    alert('⚠️ This file is not an AI development roadmap backup.');
                    return;
                }
                
                if (importData.progress) {
                    localStorage.setItem(this.storageKey, JSON.stringify(importData.progress));
                }
                if (importData.retention) {
                    localStorage.setItem(this.retentionKey, JSON.stringify(importData.retention));
                }
                if (importData.milestones) {
                    localStorage.setItem(this.milestonesKey, JSON.stringify(importData.milestones));
                }
                if (importData.quizHistory) {
                    localStorage.setItem('ai_quiz_history', JSON.stringify(importData.quizHistory));
                }
                if (importData.streak) {
                    localStorage.setItem(this.streakKey, importData.streak.toString());
                }
                
                // Reload the page to apply imported data
                alert('🎉 AI progress imported successfully! Reloading page...');
                setTimeout(() => location.reload(), 1000);
                
            } catch (error) {
                alert('❌ Failed to import AI data. Please check the file format.');
                console.error('Import error:', error);
            }
        };
        
        reader.readAsText(file);
    }
}

// Initialize the AI tracker when DOM is loaded
let aiTracker;

document.addEventListener('DOMContentLoaded', () => {
    aiTracker = new AILearningTracker();
    
    // Add AI-specific export/import buttons
    const exportBtn = document.createElement('button');
    exportBtn.textContent = '🤖 Export AI Progress';
    exportBtn.className = 'ai-cta-button';
    exportBtn.onclick = () => aiTracker.exportAIProgress();
    
    const importBtn = document.createElement('input');
    importBtn.type = 'file';
    importBtn.accept = '.json';
    importBtn.style.display = 'none';
    importBtn.onchange = (e) => aiTracker.importAIProgress(e);
    
    const importLabel = document.createElement('button');
    importLabel.textContent = '📥 Import AI Progress';
    importLabel.className = 'ai-cta-button';
    importLabel.onclick = () => importBtn.click();
    
    // Add buttons to page
    const container = document.querySelector('.container') || document.body;
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'margin: 20px 0; text-align: center; gap: 15px; display: flex; flex-wrap: wrap; justify-content: center;';
    buttonContainer.appendChild(exportBtn);
    buttonContainer.appendChild(importLabel);
    buttonContainer.appendChild(importBtn);
    
    container.appendChild(buttonContainer);
    
    console.log('🚀 AI Development Learning System Fully Loaded!');
});

// Global functions for modal interactions
window.aiTracker = aiTracker;

console.log('🤖 AI Development Learning System Loaded Successfully!');
console.log('🧠 Features: Neural Auto-save, Spaced Repetition, AI Milestones, Knowledge Quizzes');
console.log('⌨️ Shortcuts: Ctrl+S (Save), Ctrl+R (Review), Ctrl+Q (Quiz)');
console.log('🎯 Goal: Build 8 AI projects in 16 weeks → $160k+ AI developer salary!');