// Game Configuration
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Camera (will be initialized by map.js)
let camera = { x: 0, y: 0 };

// Performance optimization - cache rendered tiles
let tileCache = new Map();
let lastCameraX = 0;
let lastCameraY = 0;

// Game State
const gameState = {
    player: {
        x: 800,
        y: 650,
        width: 32,
        height: 32,
        speed: 3,
        level: 1,
        xp: 0,
        xpToLevel: 100,
        color: '#00ff00',
        direction: 'down',
        completedMissions: 0,
        skills: [],
        codingLanguage: 'Learning',
        currentArea: 'Digital Hub'
    },
    items: [],
    npcs: [],
    portals: [],
    missionPoints: [],
    tiles: [],
    backgroundColor: '#1a1a1a',
    keys: {},
    gameLoop: null,
    messages: [],
    score: 0,
    mapWidth: 800,
    mapHeight: 600,
    mapName: 'Digital Hub',
    activeQuest: 'Explore the Digital World',
    questProgress: 0,
    difficulty: 'intermediate',
    xpMultiplier: 1.0,
    hintsAvailable: false
};

// Mission Point class - areas where players complete tasks
class MissionPoint {
    constructor(x, y, data) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.type = data.type || 'quiz';
        this.title = data.title;
        this.completed = false;
        this.color = data.color || '#ffaa00';
        this.icon = data.icon || '📝';
    }

    draw() {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;
        
        // Pulsing effect
        const pulse = Math.sin(Date.now() / 400) * 3;
        
        // Draw mission point
        ctx.fillStyle = this.completed ? '#00ff00' : this.color;
        ctx.fillRect(screenX - pulse, screenY - pulse, this.width + pulse * 2, this.height + pulse * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
        
        // Draw icon
        ctx.font = '24px Arial';
        ctx.fillText(this.icon, screenX + 8, screenY + 28);
        
        // Draw title
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(this.title, screenX - 10, screenY - 10);
        
        // Draw interaction hint
        const player = gameState.player;
        const distance = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
        if (distance < 60 && !this.completed) {
            ctx.fillStyle = '#ffff00';
            ctx.fillText('[E] Start Mission', screenX - 20, screenY + this.height + 15);
        } else if (this.completed) {
            ctx.fillStyle = '#00ff00';
            ctx.font = '12px monospace';
            ctx.fillText('✓ Complete', screenX - 10, screenY + this.height + 15);
        }
    }

    interact() {
        if (!this.completed) {
            startMission(this);
        }
    }
}

// Initialize game
let gameInitialized = false;

function init() {
    console.log('Game initializing...');
    
    // Initialize camera if not already done
    if (!camera) {
        camera = { x: 0, y: 0 };
    }
    
    // Load starting map (defined in map.js)
    if (typeof loadMap === 'function') {
        console.log('Loading map...');
        loadMap('school_entrance');
    } else {
        console.error('loadMap function not found!');
    }
    
    showMessage('Welcome to Quest of the IT Hero!');
    showMessage('Explore and complete missions to learn IT!');
    
    // Only set up event listeners once
    if (!gameInitialized) {
        console.log('Setting up event listeners...');
        
        // Event listeners on window instead of document
        window.addEventListener('keydown', (e) => {
            console.log('Key pressed:', e.key, 'Target:', e.target);
            gameState.keys[e.key] = true;
            
            if (e.key === 'e' || e.key === 'E') {
                e.preventDefault();
                e.stopPropagation();
                console.log('E key detected, calling interactWithWorld');
                interactWithWorld();
                return false;
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                quitToMenu();
                return false;
            }
        }, true); // Use capture phase
        
        window.addEventListener('keyup', (e) => {
            gameState.keys[e.key] = false;
        }, true);
        
        // Also add click handler to ensure canvas has focus
        canvas.addEventListener('click', () => {
            console.log('Canvas clicked, focusing...');
            canvas.focus();
        });
        
        // Make canvas focusable
        canvas.tabIndex = 1;
        canvas.focus();
        
        gameInitialized = true;
        console.log('Event listeners set up successfully');
    }
    
    // Start game loop (stop old one first if exists)
    if (gameState.gameLoop) {
        clearInterval(gameState.gameLoop);
    }
    console.log('Starting game loop...');
    gameState.gameLoop = setInterval(update, 1000 / 60);
    
    // Force first render
    render();
    
    console.log('Init complete');
}

function interactWithWorld() {
    const player = gameState.player;
    
    console.log('Interact pressed! Player at:', player.x, player.y);
    console.log('Mission points:', gameState.missionPoints.length);
    
    // Check NPCs
    gameState.npcs.forEach(npc => {
        const distance = Math.sqrt((player.x - npc.x) ** 2 + (player.y - npc.y) ** 2);
        if (distance < 60) {
            console.log('Interacting with NPC:', npc.name);
            if (typeof npc.interact === 'function') {
                npc.interact();
            }
        }
    });
    
    // Check portals
    gameState.portals.forEach(portal => {
        const distance = Math.sqrt((player.x - portal.x) ** 2 + (player.y - portal.y) ** 2);
        if (distance < 60) {
            console.log('Using portal:', portal.label);
            if (typeof portal.use === 'function') {
                portal.use();
            }
        }
    });
    
    // Check mission points
    gameState.missionPoints.forEach(mission => {
        const distance = Math.sqrt((player.x - mission.x) ** 2 + (player.y - mission.y) ** 2);
        console.log('Mission:', mission.title, 'Distance:', distance);
        if (distance < 60) {
            console.log('Close enough to mission:', mission.title);
            if (typeof mission.interact === 'function') {
                mission.interact();
            }
        }
    });
}

function showMessage(text) {
    gameState.messages.push({ text, time: Date.now() });
    setTimeout(() => {
        gameState.messages.shift();
    }, 3000);
}

function startMission(missionPoint) {
    console.log('Starting mission:', missionPoint);
    // This will be handled by missions.js
    if (typeof showPuzzle === 'function') {
        console.log('showPuzzle function found, calling it...');
        showPuzzle(missionPoint);
    } else {
        console.error('showPuzzle function not found!');
    }
}

// Update game state
function update() {
    handleInput();
    if (typeof updateCamera === 'function') updateCamera();
    render();
    updateUI();
}

function handleInput() {
    const player = gameState.player;
    const oldX = player.x;
    const oldY = player.y;
    
    if (gameState.keys['ArrowUp'] || gameState.keys['w']) {
        player.y -= player.speed;
        player.direction = 'up';
    }
    if (gameState.keys['ArrowDown'] || gameState.keys['s']) {
        player.y += player.speed;
        player.direction = 'down';
    }
    if (gameState.keys['ArrowLeft'] || gameState.keys['a']) {
        player.x -= player.speed;
        player.direction = 'left';
    }
    if (gameState.keys['ArrowRight'] || gameState.keys['d']) {
        player.x += player.speed;
        player.direction = 'right';
    }
    
    // Check collision with tiles
    if (checkTileCollision(player)) {
        // Revert movement if collision detected
        player.x = oldX;
        player.y = oldY;
    }
    
    // Keep player in map bounds
    player.x = Math.max(0, Math.min(gameState.mapWidth - player.width, player.x));
    player.y = Math.max(0, Math.min(gameState.mapHeight - player.height, player.y));
}

// Check collision with solid tiles
function checkTileCollision(player) {
    const solidTypes = ['wall', 'desk', 'computer', 'shelf', 'board', 'server', 'table', 'fountain', 'trophy', 'plant'];
    
    for (let tile of gameState.tiles) {
        if (solidTypes.includes(tile.type)) {
            if (isColliding(player, tile)) {
                return true;
            }
        }
    }
    return false;
}

// Collision detection helper
function isColliding(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}



function gainXP(amount) {
    const adjustedXP = Math.floor(amount * (gameState.xpMultiplier || 1.0));
    gameState.player.xp += adjustedXP;
    if (gameState.player.xp >= gameState.player.xpToLevel) {
        levelUp();
    }
}

function levelUp() {
    gameState.player.level++;
    gameState.player.xp = 0;
    gameState.player.xpToLevel = Math.floor(gameState.player.xpToLevel * 1.5);
    
    // Learn new skills
    const skills = ['Python Basics', 'JavaScript Syntax', 'SQL Queries', 'HTML/CSS', 'Debugging', 'Algorithms', 'Data Structures'];
    const newSkill = skills[Math.floor(Math.random() * skills.length)];
    if (!gameState.player.skills.includes(newSkill)) {
        gameState.player.skills.push(newSkill);
        showMessage(`LEVEL UP! Learned: ${newSkill}`);
    }
}

// Render game
function render() {
    try {
        // Clear canvas with background color
        ctx.fillStyle = gameState.backgroundColor || '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw floor pattern (optimized - only visible area)
        drawFloorPattern();
        
        // Draw tiles (walls, floors, furniture) - only visible ones
        if (gameState.tiles && Array.isArray(gameState.tiles)) {
            gameState.tiles.forEach(tile => {
                const screenX = tile.x - camera.x;
                const screenY = tile.y - camera.y;
                
                // Culling - skip if not visible
                if (screenX + tile.width < 0 || screenX > canvas.width || 
                    screenY + tile.height < 0 || screenY > canvas.height) {
                    return;
                }
                
                // Draw base tile with shadow
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                
                ctx.fillStyle = tile.color;
                ctx.fillRect(screenX, screenY, tile.width, tile.height);
                
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                
                // Add realistic textures and details based on type
                switch(tile.type) {
                    case 'wall':
                        drawBrickWall(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'floor':
                        drawTileFloor(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'computer':
                        drawComputer(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'desk':
                        drawDesk(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'shelf':
                        drawBookshelf(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'server':
                        drawServerRack(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'board':
                        drawBulletinBoard(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'table':
                        drawTable(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'debug':
                        drawDebugStation(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'plant':
                        drawPlant(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'fountain':
                        drawWaterFountain(screenX, screenY, tile.width, tile.height);
                        break;
                    case 'trophy':
                        drawTrophyCase(screenX, screenY, tile.width, tile.height);
                        break;
                }
            });
        }
        
        // Draw portals with glow effect
        if (gameState.portals) {
            gameState.portals.forEach(portal => {
                if (portal && typeof portal.draw === 'function') {
                    portal.draw();
                }
            });
        }
        
        // Draw NPCs with shadows
        if (gameState.npcs) {
            gameState.npcs.forEach(npc => {
                if (npc && typeof npc.draw === 'function') {
                    npc.draw();
                }
            });
        }
        
        // Draw mission points with glow
        if (gameState.missionPoints) {
            gameState.missionPoints.forEach(mission => {
                if (mission && typeof mission.draw === 'function') {
                    mission.draw();
                }
            });
        }
        
        // Draw player (enhanced pixel art)
        drawPlayer();
        
        // Draw UI overlays
        drawMapLabel();
        drawMessages();
        
    } catch (error) {
        console.error('Render error:', error);
    }
}

// Draw player with enhanced details
function drawPlayer() {
    const player = gameState.player;
    const screenX = player.x - camera.x;
    const screenY = player.y - camera.y;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(screenX + 16, screenY + 38, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Backpack (behind body)
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(screenX + 5, screenY + 18, 7, 10);
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(screenX + 6, screenY + 20, 5, 3);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(screenX + 5, screenY + 18, 7, 10);
    
    // Body (shirt)
    const bodyGradient = ctx.createLinearGradient(screenX + 8, screenY + 16, screenX + 24, screenY + 28);
    bodyGradient.addColorStop(0, '#3498db');
    bodyGradient.addColorStop(1, '#2980b9');
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(screenX + 8, screenY + 16, 16, 12);
    
    // Shirt collar
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(screenX + 12, screenY + 16, 8, 3);
    
    // Arms
    ctx.fillStyle = '#3498db';
    ctx.fillRect(screenX + 6, screenY + 18, 4, 8);
    ctx.fillRect(screenX + 22, screenY + 18, 4, 8);
    
    // Hands
    ctx.fillStyle = '#ffdbac';
    ctx.fillRect(screenX + 6, screenY + 24, 4, 4);
    ctx.fillRect(screenX + 22, screenY + 24, 4, 4);
    
    // Head
    ctx.fillStyle = '#ffdbac';
    ctx.fillRect(screenX + 10, screenY + 4, 12, 12);
    
    // Hair
    ctx.fillStyle = '#654321';
    ctx.fillRect(screenX + 10, screenY + 2, 12, 7);
    ctx.fillRect(screenX + 9, screenY + 4, 2, 4);
    ctx.fillRect(screenX + 21, screenY + 4, 2, 4);
    
    // Face details
    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(screenX + 12, screenY + 8, 3, 3);
    ctx.fillRect(screenX + 17, screenY + 8, 3, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(screenX + 13, screenY + 9, 2, 2);
    ctx.fillRect(screenX + 18, screenY + 9, 2, 2);
    
    // Smile
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(screenX + 16, screenY + 12, 3, 0, Math.PI);
    ctx.stroke();
    
    // Legs (pants)
    const pantsGradient = ctx.createLinearGradient(screenX + 10, screenY + 28, screenX + 22, screenY + 36);
    pantsGradient.addColorStop(0, '#34495e');
    pantsGradient.addColorStop(1, '#2c3e50');
    ctx.fillStyle = pantsGradient;
    ctx.fillRect(screenX + 10, screenY + 28, 5, 8);
    ctx.fillRect(screenX + 17, screenY + 28, 5, 8);
    
    // Shoes
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(screenX + 9, screenY + 34, 6, 4);
    ctx.fillRect(screenX + 17, screenY + 34, 6, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(screenX + 10, screenY + 35, 4, 1);
    ctx.fillRect(screenX + 18, screenY + 35, 4, 1);
    
    // Outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(screenX + 8, screenY + 4, 16, 34);
    
    // Name label with background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(screenX - 8, screenY - 10, 48, 14);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Student', screenX + 16, screenY - 1);
    ctx.textAlign = 'left';
}

// Draw map label
function drawMapLabel() {
    const gradient = ctx.createLinearGradient(5, 5, 5, 35);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(5, 5, 320, 35);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(5, 5, 320, 35);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('📍 ' + gameState.mapName, 15, 28);
}

// Draw messages
function drawMessages() {
    gameState.messages.forEach((msg, i) => {
        const msgY = 50 + i * 32;
        
        const gradient = ctx.createLinearGradient(5, msgY, 5, msgY + 28);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = gradient;
        ctx.fillRect(5, msgY, 480, 28);
        
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(5, msgY, 480, 28);
        
        ctx.fillStyle = '#ffff00';
        ctx.font = 'bold 15px Arial';
        ctx.fillText('💬 ' + msg.text, 15, msgY + 18);
    });
}

// Draw realistic floor pattern (optimized)
function drawFloorPattern() {
    const tileSize = 40;
    const startX = Math.floor(camera.x / tileSize) * tileSize;
    const startY = Math.floor(camera.y / tileSize) * tileSize;
    const endX = camera.x + canvas.width;
    const endY = camera.y + canvas.height;
    
    // Only draw visible tiles
    for (let x = startX; x < endX; x += tileSize) {
        for (let y = startY; y < endY; y += tileSize) {
            const screenX = x - camera.x;
            const screenY = y - camera.y;
            
            // Checkerboard pattern
            const isLight = ((x / tileSize) + (y / tileSize)) % 2 === 0;
            ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(screenX, screenY, tileSize, tileSize);
        }
    }
}

// Draw brick wall texture (simplified)
function drawBrickWall(x, y, w, h) {
    const brickW = 30;
    const brickH = 15;
    
    // Simplified brick pattern
    for (let by = 0; by < h; by += brickH) {
        const offset = (Math.floor(by / brickH) % 2) * (brickW / 2);
        for (let bx = -offset; bx < w; bx += brickW) {
            // Brick with simple shadow
            ctx.fillStyle = 'rgba(100, 50, 20, 0.3)';
            ctx.fillRect(x + bx + 1, y + by + 1, brickW - 2, brickH - 2);
        }
    }
    
    // Single border
    ctx.strokeStyle = 'rgba(80, 80, 80, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
}

// Draw tile floor (simplified)
function drawTileFloor(x, y, w, h) {
    // Simple checkerboard
    const tileSize = 20;
    for (let ty = 0; ty < h; ty += tileSize) {
        for (let tx = 0; tx < w; tx += tileSize) {
            const isLight = ((tx / tileSize) + (ty / tileSize)) % 2 === 0;
            ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(x + tx, y + ty, tileSize, tileSize);
        }
    }
}

// Draw computer with monitor
function drawComputer(x, y, w, h) {
    // Desk surface
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    
    // Monitor stand
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(x + w/2 - 5, y + h - 20, 10, 20);
    
    // Monitor
    ctx.fillStyle = '#34495e';
    ctx.fillRect(x + 15, y + 10, w - 30, h - 35);
    
    // Screen
    const gradient = ctx.createLinearGradient(x + 20, y + 15, x + 20, y + h - 40);
    gradient.addColorStop(0, '#00ff88');
    gradient.addColorStop(1, '#00aa55');
    ctx.fillStyle = gradient;
    ctx.fillRect(x + 20, y + 15, w - 40, h - 45);
    
    // Screen reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(x + 22, y + 17, w - 44, 10);
    
    // Code on screen
    ctx.fillStyle = '#000000';
    ctx.font = '6px monospace';
    ctx.fillText('if(learn){', x + 25, y + 35);
    ctx.fillText('  code();', x + 25, y + 42);
    ctx.fillText('}', x + 25, y + 49);
    
    // Keyboard
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(x + 10, y + h - 15, w - 20, 10);
    for (let i = 0; i < 8; i++) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x + 12 + i * 10, y + h - 13, 8, 6);
    }
}

// Draw desk (optimized)
function drawDesk(x, y, w, h) {
    // Desk top
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x, y, w, h);
    
    // Simple wood grain (reduced lines)
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + i * (h / 3));
        ctx.lineTo(x + w, y + i * (h / 3));
        ctx.stroke();
    }
    
    // Edge shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(x, y + h - 5, w, 5);
}

// Draw bookshelf (optimized)
function drawBookshelf(x, y, w, h) {
    // Shelf frame
    ctx.fillStyle = '#654321';
    ctx.fillRect(x, y, w, h);
    
    // Shelves
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x, y + h/3, w, 3);
    ctx.fillRect(x, y + 2*h/3, w, 3);
    
    // Simplified books (fewer, static)
    const bookColors = ['#ff6347', '#4169e1', '#32cd32', '#ffd700'];
    for (let shelf = 0; shelf < 2; shelf++) {
        for (let book = 0; book < 4; book++) {
            const bookX = x + 10 + book * 18;
            const bookY = y + 15 + shelf * (h / 3);
            
            ctx.fillStyle = bookColors[book % bookColors.length];
            ctx.fillRect(bookX, bookY, 14, 25);
        }
    }
}

// Draw server rack
function drawServerRack(x, y, w, h) {
    // Rack frame
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);
    
    // Server units
    for (let i = 0; i < 6; i++) {
        const unitY = y + 10 + i * 30;
        
        // Unit panel
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(x + 5, unitY, w - 10, 25);
        ctx.strokeStyle = '#34495e';
        ctx.strokeRect(x + 5, unitY, w - 10, 25);
        
        // LED lights
        for (let j = 0; j < 8; j++) {
            const isOn = Math.random() > 0.3;
            ctx.fillStyle = isOn ? (Math.random() > 0.5 ? '#00ff00' : '#ff0000') : '#333333';
            ctx.fillRect(x + 10 + j * 15, unitY + 8, 8, 8);
        }
        
        // Vents
        for (let v = 0; v < 3; v++) {
            ctx.strokeStyle = '#1a1a1a';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + w - 30, unitY + 5 + v * 5);
            ctx.lineTo(x + w - 10, unitY + 5 + v * 5);
            ctx.stroke();
        }
    }
}

// Draw bulletin board (simplified)
function drawBulletinBoard(x, y, w, h) {
    // Cork board
    ctx.fillStyle = '#d2691e';
    ctx.fillRect(x, y, w, h);
    
    // Frame
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
    
    // Simple papers (static)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 10, y + 10, 30, 35);
    ctx.fillStyle = '#ffffcc';
    ctx.fillRect(x + 50, y + 15, 30, 30);
    
    // Pins
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(x + 25, y + 13, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 65, y + 18, 3, 0, Math.PI * 2);
    ctx.fill();
}

// Draw debug station
function drawDebugStation(x, y, w, h) {
    // Station base
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(x, y, w, h);
    
    // Screen
    const screenGradient = ctx.createRadialGradient(x + w/2, y + h/2, 10, x + w/2, y + h/2, 50);
    screenGradient.addColorStop(0, '#ff0000');
    screenGradient.addColorStop(1, '#8b0000');
    ctx.fillStyle = screenGradient;
    ctx.fillRect(x + 10, y + 10, w - 20, h - 30);
    
    // Error messages
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px monospace';
    ctx.fillText('ERROR: Bug detected', x + 15, y + 25);
    ctx.fillText('Line 42: Syntax', x + 15, y + 35);
    ctx.fillText('Fix required!', x + 15, y + 45);
    
    // Warning lights
    const isBlinking = Math.floor(Date.now() / 500) % 2 === 0;
    ctx.fillStyle = isBlinking ? '#ff0000' : '#8b0000';
    ctx.beginPath();
    ctx.arc(x + 10, y + h - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w - 10, y + h - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Frame
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);
}

function updateUI() {
    document.getElementById('player-level').textContent = gameState.player.level;
    document.getElementById('player-xp').textContent = gameState.player.xp;
    document.getElementById('player-xp-needed').textContent = gameState.player.xpToLevel;
    document.getElementById('player-score').textContent = gameState.score;
    document.getElementById('missions-completed').textContent = gameState.player.completedMissions;
    document.getElementById('player-skills').textContent = gameState.player.skills.length > 0 ? gameState.player.skills.slice(-2).join(', ') : 'None yet';
    document.getElementById('current-quest').textContent = gameState.activeQuest || 'Explore the Digital World';
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Don't auto-start - wait for menu selection
    console.log('Game ready. Waiting for menu selection...');
});

// Draw table with enhanced details (optimized)
function drawTable(x, y, w, h) {
    // Table top
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(x, y, w, h);
    
    // Simplified wood grain (3 lines instead of 10)
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + i * (h / 3));
        ctx.lineTo(x + w, y + i * (h / 3));
        ctx.stroke();
    }
    
    // Edge highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
}

// Draw decorative plant (simplified)
function drawPlant(x, y, w, h) {
    // Pot
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.moveTo(x + 5, y + h - 20);
    ctx.lineTo(x + w - 5, y + h - 20);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    ctx.fill();
    
    // Plant leaves (simplified - 3 instead of 5)
    ctx.fillStyle = '#228b22';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(x + w/2, y + 15 + i * 12, 12, 8, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Draw water fountain
function drawWaterFountain(x, y, w, h) {
    // Base
    ctx.fillStyle = '#4682b4';
    ctx.fillRect(x, y + h - 20, w, 20);
    
    // Main body
    const bodyGradient = ctx.createLinearGradient(x, y, x + w, y);
    bodyGradient.addColorStop(0, '#5f9ea0');
    bodyGradient.addColorStop(0.5, '#4682b4');
    bodyGradient.addColorStop(1, '#5f9ea0');
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(x + 5, y + 10, w - 10, h - 30);
    
    // Spout
    ctx.fillStyle = '#708090';
    ctx.fillRect(x + w/2 - 5, y + 20, 10, 15);
    ctx.beginPath();
    ctx.arc(x + w/2, y + 20, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Water drops (animated)
    const dropY = y + 35 + Math.sin(Date.now() / 200) * 5;
    ctx.fillStyle = 'rgba(135, 206, 250, 0.7)';
    ctx.beginPath();
    ctx.arc(x + w/2, dropY, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Drain
    ctx.fillStyle = '#2f4f4f';
    ctx.fillRect(x + w/2 - 8, y + h - 25, 16, 5);
    
    // Shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(x + 8, y + 15, 8, h - 40);
}

// Draw trophy case
function drawTrophyCase(x, y, w, h) {
    // Glass case
    const glassGradient = ctx.createLinearGradient(x, y, x + w, y);
    glassGradient.addColorStop(0, 'rgba(173, 216, 230, 0.3)');
    glassGradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.5)');
    glassGradient.addColorStop(1, 'rgba(173, 216, 230, 0.3)');
    ctx.fillStyle = glassGradient;
    ctx.fillRect(x, y, w, h);
    
    // Frame
    ctx.strokeStyle = '#daa520';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
    
    // Shelves
    ctx.fillStyle = '#daa520';
    ctx.fillRect(x, y + h/3, w, 3);
    ctx.fillRect(x, y + 2*h/3, w, 3);
    
    // Trophies
    const trophies = [
        { x: x + 20, y: y + 15, size: 20 },
        { x: x + 50, y: y + 10, size: 25 },
        { x: x + 20, y: y + h/3 + 10, size: 18 },
        { x: x + 55, y: y + h/3 + 15, size: 22 }
    ];
    
    trophies.forEach(trophy => {
        // Trophy cup
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.moveTo(trophy.x - trophy.size/3, trophy.y);
        ctx.lineTo(trophy.x + trophy.size/3, trophy.y);
        ctx.lineTo(trophy.x + trophy.size/4, trophy.y + trophy.size/2);
        ctx.lineTo(trophy.x - trophy.size/4, trophy.y + trophy.size/2);
        ctx.closePath();
        ctx.fill();
        
        // Base
        ctx.fillStyle = '#b8860b';
        ctx.fillRect(trophy.x - trophy.size/3, trophy.y + trophy.size/2, trophy.size * 2/3, trophy.size/4);
        
        // Handles
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(trophy.x - trophy.size/3, trophy.y + trophy.size/4, trophy.size/6, Math.PI, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(trophy.x + trophy.size/3, trophy.y + trophy.size/4, trophy.size/6, Math.PI, 0);
        ctx.stroke();
    });
    
    // Glass reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(x + 5, y + 5, 15, h - 10);
}
