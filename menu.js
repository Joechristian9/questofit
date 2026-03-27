// Menu System
const menuState = {
    currentScreen: 'main', // main, difficulty, story
    selectedDifficulty: null,
    hasSaveData: false
};

// Story data
const storyData = {
    intro: {
        title: "Welcome to IT University",
        text: [
            "You are a new student at the prestigious IT University.",
            "Your dream is to become a master programmer and solve the world's biggest tech challenges.",
            "But first, you must learn the fundamentals...",
            "Complete missions, solve programming puzzles, and level up your skills!",
            "Your journey begins now..."
        ]
    },
    difficulties: {
        beginner: {
            name: "Beginner",
            description: "Perfect for those new to programming. Easier puzzles and more hints.",
            icon: "🌱",
            xpMultiplier: 1.5,
            hintAvailable: true
        },
        intermediate: {
            name: "Intermediate",
            description: "For students with some coding experience. Balanced challenge.",
            icon: "📚",
            xpMultiplier: 1.0,
            hintAvailable: false
        },
        advanced: {
            name: "Advanced",
            description: "Challenging puzzles for experienced coders. Less guidance.",
            icon: "💻",
            xpMultiplier: 0.8,
            hintAvailable: false
        },
        pro: {
            name: "Pro",
            description: "Expert level. Complex algorithms and minimal help. Are you ready?",
            icon: "🏆",
            xpMultiplier: 0.6,
            hintAvailable: false
        }
    }
};

// Check for save data
function checkSaveData() {
    const saveData = localStorage.getItem('questOfITHero_save');
    menuState.hasSaveData = saveData !== null;
    updateMenuButtons();
    return menuState.hasSaveData;
}

// Update menu button states
function updateMenuButtons() {
    const continueBtn = document.getElementById('continue-btn');
    
    if (menuState.hasSaveData) {
        if (continueBtn) {
            continueBtn.disabled = false;
            continueBtn.style.opacity = '1';
        }
    } else {
        if (continueBtn) {
            continueBtn.disabled = true;
            continueBtn.style.opacity = '0.5';
        }
    }
}

// Show save management screen
function showSaveManagement() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('save-management').style.display = 'flex';
    document.getElementById('difficulty-menu').style.display = 'none';
    document.getElementById('story-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';
    
    populateSaveSlots();
}

// Populate save slots
function populateSaveSlots() {
    const container = document.getElementById('save-slots');
    container.innerHTML = '';
    
    // Get save data
    const saveData = localStorage.getItem('questOfITHero_save');
    
    // Create new game slot (always first)
    const newGameSlot = document.createElement('div');
    newGameSlot.className = 'save-slot new-game-slot';
    newGameSlot.innerHTML = `
        <div class="save-slot-icon">➕</div>
        <div class="save-slot-info">
            <h3>New Game</h3>
            <p>Start a fresh adventure</p>
        </div>
    `;
    newGameSlot.onclick = () => {
        showDifficultyMenu();
    };
    container.appendChild(newGameSlot);
    
    // Show existing save if available
    if (saveData) {
        const data = JSON.parse(saveData);
        const saveSlot = document.createElement('div');
        saveSlot.className = 'save-slot';
        
        const date = new Date(data.timestamp);
        const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        const difficultyEmoji = {
            'beginner': '🌱',
            'intermediate': '📚',
            'advanced': '💻',
            'pro': '🏆'
        };
        
        saveSlot.innerHTML = `
            <div class="save-slot-icon">💾</div>
            <div class="save-slot-info">
                <h3>Level ${data.level} ${difficultyEmoji[data.difficulty] || '📚'} ${data.difficulty || 'Intermediate'}</h3>
                <p>Score: ${data.score} | Missions: ${data.completedMissions}</p>
                <p class="save-date">${dateStr}</p>
            </div>
            <div class="save-slot-actions">
                <button class="save-action-btn load-btn" onclick="event.stopPropagation(); loadSaveGame()">
                    <span>▶️</span> Load
                </button>
                <button class="save-action-btn delete-btn" onclick="event.stopPropagation(); deleteSaveData()">
                    <span>🗑️</span> Delete
                </button>
            </div>
        `;
        
        container.appendChild(saveSlot);
    }
}

// Load save game
function loadSaveGame() {
    const saveData = localStorage.getItem('questOfITHero_save');
    if (saveData) {
        const data = JSON.parse(saveData);
        
        // Hide menus
        document.getElementById('save-management').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        
        // Load save data
        gameState.player.level = data.level || 1;
        gameState.player.xp = data.xp || 0;
        gameState.player.completedMissions = data.completedMissions || 0;
        gameState.player.skills = data.skills || [];
        gameState.score = data.score || 0;
        gameState.difficulty = data.difficulty || 'intermediate';
        gameState.xpMultiplier = data.xpMultiplier || 1.0;
        
        // Initialize game
        if (typeof init === 'function') {
            init();
        }
        
        showMessage('Welcome back!');
        showMessage(`Progress loaded: Level ${gameState.player.level}`);
    }
}

// Show main menu
function showMainMenu() {
    checkSaveData();
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('save-management').style.display = 'none';
    document.getElementById('difficulty-menu').style.display = 'none';
    document.getElementById('story-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';
    
    updateMenuButtons();
}

// Show difficulty selection
function showDifficultyMenu() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('save-management').style.display = 'none';
    document.getElementById('difficulty-menu').style.display = 'flex';
    
    // Populate difficulty options
    const container = document.getElementById('difficulty-options');
    container.innerHTML = '';
    
    Object.keys(storyData.difficulties).forEach(key => {
        const diff = storyData.difficulties[key];
        const card = document.createElement('div');
        card.className = 'difficulty-card';
        card.innerHTML = `
            <div class="difficulty-icon">${diff.icon}</div>
            <h3>${diff.name}</h3>
            <p>${diff.description}</p>
            <div class="difficulty-stats">
                <span>XP: ${Math.round(diff.xpMultiplier * 100)}%</span>
                <span>Hints: ${diff.hintAvailable ? 'Yes' : 'No'}</span>
            </div>
        `;
        card.onclick = () => selectDifficulty(key);
        container.appendChild(card);
    });
}

// Select difficulty and show story
function selectDifficulty(difficulty) {
    menuState.selectedDifficulty = difficulty;
    showStoryScreen();
}

// Show story introduction
function showStoryScreen() {
    document.getElementById('save-management').style.display = 'none';
    document.getElementById('difficulty-menu').style.display = 'none';
    document.getElementById('story-screen').style.display = 'flex';
    
    const story = storyData.intro;
    document.getElementById('story-title').textContent = story.title;
    
    const textContainer = document.getElementById('story-text');
    textContainer.innerHTML = '';
    
    // Animate story text
    let lineIndex = 0;
    const showNextLine = () => {
        if (lineIndex < story.text.length) {
            const p = document.createElement('p');
            p.textContent = story.text[lineIndex];
            p.style.opacity = '0';
            textContainer.appendChild(p);
            
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transition = 'opacity 0.5s';
            }, 100);
            
            lineIndex++;
            setTimeout(showNextLine, 1000);
        } else {
            document.getElementById('start-game-btn').style.display = 'block';
        }
    };
    
    showNextLine();
}

// Start the actual game
function startGame() {
    // Hide all menus
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('save-management').style.display = 'none';
    document.getElementById('difficulty-menu').style.display = 'none';
    document.getElementById('story-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    
    // Apply difficulty settings
    const difficulty = storyData.difficulties[menuState.selectedDifficulty];
    gameState.difficulty = menuState.selectedDifficulty;
    gameState.xpMultiplier = difficulty.xpMultiplier;
    gameState.hintsAvailable = difficulty.hintAvailable;
    
    // Initialize game
    if (typeof init === 'function') {
        init();
    }
    
    // Show welcome message
    showMessage(`Difficulty: ${difficulty.name} ${difficulty.icon}`);
    showMessage('Welcome to IT University!');
}

// Continue from save
function continueGame() {
    const saveData = localStorage.getItem('questOfITHero_save');
    if (saveData) {
        const data = JSON.parse(saveData);
        
        // Hide menus
        document.getElementById('main-menu').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        
        // Load save data
        gameState.player.level = data.level || 1;
        gameState.player.xp = data.xp || 0;
        gameState.player.completedMissions = data.completedMissions || 0;
        gameState.player.skills = data.skills || [];
        gameState.score = data.score || 0;
        gameState.difficulty = data.difficulty || 'intermediate';
        gameState.xpMultiplier = data.xpMultiplier || 1.0;
        
        // Initialize game
        if (typeof init === 'function') {
            init();
        }
        
        showMessage('Welcome back!');
        showMessage(`Progress loaded: Level ${gameState.player.level}`);
    }
}

// Save game progress
function saveGame() {
    const saveData = {
        level: gameState.player.level,
        xp: gameState.player.xp,
        completedMissions: gameState.player.completedMissions,
        skills: gameState.player.skills,
        score: gameState.score,
        difficulty: gameState.difficulty,
        xpMultiplier: gameState.xpMultiplier,
        timestamp: Date.now()
    };
    
    localStorage.setItem('questOfITHero_save', JSON.stringify(saveData));
    showMessage('Game saved!');
}

// Delete save data
function deleteSaveData() {
    if (confirm('Are you sure you want to delete this save? This cannot be undone!')) {
        localStorage.removeItem('questOfITHero_save');
        menuState.hasSaveData = false;
        updateMenuButtons();
        
        // Refresh save management screen if open
        const saveManagement = document.getElementById('save-management');
        if (saveManagement.style.display === 'flex') {
            populateSaveSlots();
        }
        
        alert('Save data deleted successfully!');
    }
}

// Quit to menu
function quitToMenu() {
    const shouldSave = confirm('Do you want to save your progress before quitting?');
    
    if (shouldSave) {
        saveGame();
    }
    
    // Stop game loop
    if (gameState.gameLoop) {
        clearInterval(gameState.gameLoop);
        gameState.gameLoop = null;
    }
    
    // Reset game state
    gameState.keys = {};
    
    // Show main menu
    showMainMenu();
}

// Remove auto-save interval
// Auto-save has been disabled - user must manually save or save on quit

// Initialize menu on page load
window.addEventListener('DOMContentLoaded', () => {
    showMainMenu();
});
