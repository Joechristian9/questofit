// Map and World System
const maps = {
    'school_entrance': {
        name: 'IT School - Main Entrance',
        width: 1600,
        height: 900,
        backgroundColor: '#e8d4b8',
        theme: 'school',
        tiles: [
            // Main floor
            { x: 0, y: 550, width: 1600, height: 350, color: '#c9b896', type: 'floor' },
            
            // Top walls
            { x: 0, y: 0, width: 1600, height: 120, color: '#6b5d52', type: 'wall' },
            
            // Left wall
            { x: 0, y: 120, width: 60, height: 430, color: '#6b5d52', type: 'wall' },
            
            // Right wall
            { x: 1540, y: 120, width: 60, height: 430, color: '#6b5d52', type: 'wall' },
            
            // Reception desk (left side)
            { x: 120, y: 220, width: 180, height: 100, color: '#8b4513', type: 'desk' },
            
            // Bulletin boards
            { x: 90, y: 140, width: 160, height: 120, color: '#d2691e', type: 'board' },
            { x: 1350, y: 140, width: 160, height: 120, color: '#d2691e', type: 'board' },
            
            // Student desks (center area - classroom style)
            { x: 400, y: 300, width: 100, height: 70, color: '#8b4513', type: 'desk' },
            { x: 550, y: 300, width: 100, height: 70, color: '#8b4513', type: 'desk' },
            { x: 700, y: 300, width: 100, height: 70, color: '#8b4513', type: 'desk' },
            { x: 400, y: 420, width: 100, height: 70, color: '#8b4513', type: 'desk' },
            { x: 550, y: 420, width: 100, height: 70, color: '#8b4513', type: 'desk' },
            { x: 700, y: 420, width: 100, height: 70, color: '#8b4513', type: 'desk' },
            
            // Lockers (right side)
            { x: 1350, y: 300, width: 140, height: 280, color: '#4682b4', type: 'shelf' },
            
            // Benches (waiting area)
            { x: 950, y: 450, width: 140, height: 60, color: '#8b4513', type: 'desk' },
            { x: 1120, y: 450, width: 140, height: 60, color: '#8b4513', type: 'desk' },
            
            // Plants/decorations
            { x: 350, y: 500, width: 50, height: 70, color: '#228b22', type: 'plant' },
            { x: 850, y: 500, width: 50, height: 70, color: '#228b22', type: 'plant' },
            { x: 1280, y: 500, width: 50, height: 70, color: '#228b22', type: 'plant' },
            { x: 80, y: 500, width: 50, height: 70, color: '#228b22', type: 'plant' },
            
            // Water fountain
            { x: 1050, y: 220, width: 70, height: 90, color: '#4682b4', type: 'fountain' },
            
            // Trophy case
            { x: 1180, y: 180, width: 120, height: 140, color: '#daa520', type: 'trophy' },
            
            // Additional tables
            { x: 950, y: 300, width: 140, height: 80, color: '#a0522d', type: 'table' },
            { x: 1120, y: 300, width: 140, height: 80, color: '#a0522d', type: 'table' }
        ],
        npcs: [
            { x: 550, y: 350, name: 'Principal Tech', type: 'quest', role: 'teacher', dialogue: ['Welcome to IT School!', 'Learn programming through missions!', 'Visit classrooms to start learning!', 'Press E to begin your journey.'] },
            { x: 180, y: 450, name: 'Student Helper', type: 'info', role: 'student', dialogue: ['Hi! I can guide you around.', 'Check the Computer Lab first!', 'Good luck with your studies!'] },
            { x: 1000, y: 380, name: 'Ms. Books', type: 'info', role: 'librarian', dialogue: ['The library is downstairs.', 'Lots of books to learn from!', 'Visit me when you need resources.'] }
        ],
        portals: [
            { x: 1450, y: 700, toMap: 'computer_lab', toX: 200, toY: 650, label: 'Computer Lab →', color: '#4169e1' },
            { x: 120, y: 750, toMap: 'library', toX: 650, toY: 700, label: '↓ Library', color: '#9370db' }
        ],
        missions: [
            { x: 430, y: 420, type: 'quiz', title: 'Welcome Quiz', icon: '📚', color: '#ffa500' }
        ]
    },
    'computer_lab': {
        name: 'Computer Laboratory',
        width: 1400,
        height: 900,
        backgroundColor: '#d3d3d3',
        theme: 'lab',
        tiles: [
            // Floor
            { x: 0, y: 550, width: 1400, height: 350, color: '#708090', type: 'floor' },
            // Walls
            { x: 0, y: 0, width: 1400, height: 100, color: '#4a5568', type: 'wall' },
            { x: 0, y: 100, width: 60, height: 450, color: '#4a5568', type: 'wall' },
            { x: 1340, y: 100, width: 60, height: 450, color: '#4a5568', type: 'wall' },
            
            // Computer desks (3 rows of 4)
            // Row 1
            { x: 150, y: 200, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 310, y: 200, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 470, y: 200, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 630, y: 200, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            
            // Row 2
            { x: 150, y: 340, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 310, y: 340, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 470, y: 340, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 630, y: 340, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            
            // Row 3
            { x: 150, y: 480, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 310, y: 480, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 470, y: 480, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            { x: 630, y: 480, width: 110, height: 90, color: '#2c3e50', type: 'computer' },
            
            // Server racks (right side)
            { x: 1050, y: 200, width: 180, height: 240, color: '#1a1a1a', type: 'server' },
            { x: 1050, y: 470, width: 180, height: 240, color: '#1a1a1a', type: 'server' },
            
            // Teacher's desk
            { x: 850, y: 200, width: 150, height: 100, color: '#8b4513', type: 'desk' },
            
            // Whiteboard
            { x: 850, y: 120, width: 200, height: 100, color: '#ffffff', type: 'board' },
            
            // Printer station
            { x: 850, y: 480, width: 120, height: 80, color: '#34495e', type: 'desk' },
            
            // Plants
            { x: 100, y: 620, width: 50, height: 70, color: '#228b22', type: 'plant' },
            { x: 780, y: 620, width: 50, height: 70, color: '#228b22', type: 'plant' }
        ],
        npcs: [
            { x: 900, y: 380, name: 'Prof. Python', type: 'info', role: 'teacher', dialogue: ['Welcome to the lab!', 'Practice your coding here.', 'Complete all missions to master programming!'] }
        ],
        portals: [
            { x: 100, y: 600, toMap: 'school_entrance', toX: 1300, toY: 650, label: '← Back to Entrance', color: '#4169e1' },
            { x: 1280, y: 450, toMap: 'debug_room', toX: 100, toY: 400, label: 'Debug Room →', color: '#ff6347' }
        ],
        missions: [
            { x: 180, y: 320, type: 'syntax', title: 'Code Syntax', icon: '💻', color: '#00bfff' },
            { x: 340, y: 320, type: 'quiz', title: 'Python Test', icon: '🐍', color: '#ffd700' },
            { x: 500, y: 320, type: 'syntax', title: 'JavaScript', icon: '⚡', color: '#f0e68c' }
        ]
    },
    'debug_room': {
        name: 'Debugging Chamber',
        width: 1100,
        height: 800,
        backgroundColor: '#2d3436',
        theme: 'debug',
        tiles: [
            // Dark floor
            { x: 0, y: 500, width: 1100, height: 300, color: '#1e272e', type: 'floor' },
            // Walls
            { x: 0, y: 0, width: 1100, height: 100, color: '#34495e', type: 'wall' },
            { x: 0, y: 100, width: 60, height: 400, color: '#34495e', type: 'wall' },
            { x: 1040, y: 100, width: 60, height: 400, color: '#34495e', type: 'wall' },
            
            // Debug stations (with red glow)
            { x: 200, y: 250, width: 140, height: 120, color: '#e74c3c', type: 'debug' },
            { x: 480, y: 250, width: 140, height: 120, color: '#e74c3c', type: 'debug' },
            { x: 760, y: 250, width: 140, height: 120, color: '#e74c3c', type: 'debug' },
            
            // Server racks (monitoring systems)
            { x: 100, y: 150, width: 120, height: 180, color: '#1a1a1a', type: 'server' },
            { x: 880, y: 150, width: 120, height: 180, color: '#1a1a1a', type: 'server' },
            
            // Central monitoring table
            { x: 400, y: 450, width: 300, height: 100, color: '#2c3e50', type: 'table' },
            
            // Emergency equipment
            { x: 100, y: 600, width: 80, height: 80, color: '#c0392b', type: 'desk' },
            { x: 920, y: 600, width: 80, height: 80, color: '#c0392b', type: 'desk' }
        ],
        npcs: [
            { x: 550, y: 500, name: 'Debug Master', type: 'quest', role: 'teacher', dialogue: ['Find and fix the bugs!', 'Debugging is an essential skill.', 'Complete these challenges!'] }
        ],
        portals: [
            { x: 100, y: 550, toMap: 'computer_lab', toX: 1200, toY: 650, label: '← Back to Lab', color: '#ff6347' }
        ],
        missions: [
            { x: 230, y: 400, type: 'debug', title: 'Bug Hunt 1', icon: '🐛', color: '#ff4500' },
            { x: 510, y: 400, type: 'debug', title: 'Bug Hunt 2', icon: '🔍', color: '#ff6347' },
            { x: 790, y: 400, type: 'logic', title: 'Logic Error', icon: '🧩', color: '#dc143c' }
        ]
    },
    'library': {
        name: 'IT Library - Study Hall',
        width: 1300,
        height: 850,
        backgroundColor: '#f5e6d3',
        theme: 'library',
        tiles: [
            // Floor
            { x: 0, y: 550, width: 1300, height: 300, color: '#daa520', type: 'floor' },
            // Walls
            { x: 0, y: 0, width: 1300, height: 110, color: '#8b4513', type: 'wall' },
            { x: 0, y: 110, width: 60, height: 440, color: '#8b4513', type: 'wall' },
            { x: 1240, y: 110, width: 60, height: 440, color: '#8b4513', type: 'wall' },
            
            // Bookshelves (left side)
            { x: 100, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            { x: 230, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            { x: 360, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            { x: 490, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            
            // Bookshelves (right side)
            { x: 730, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            { x: 860, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            { x: 990, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            { x: 1120, y: 160, width: 90, height: 220, color: '#654321', type: 'shelf' },
            
            // Study tables (center area)
            { x: 250, y: 450, width: 180, height: 100, color: '#a0522d', type: 'table' },
            { x: 550, y: 450, width: 180, height: 100, color: '#a0522d', type: 'table' },
            { x: 850, y: 450, width: 180, height: 100, color: '#a0522d', type: 'table' },
            
            // Librarian desk
            { x: 600, y: 200, width: 150, height: 100, color: '#8b4513', type: 'desk' },
            
            // Computer stations (for research)
            { x: 100, y: 450, width: 100, height: 80, color: '#2c3e50', type: 'computer' },
            { x: 1100, y: 450, width: 100, height: 80, color: '#2c3e50', type: 'computer' },
            
            // Reading chairs
            { x: 100, y: 650, width: 60, height: 60, color: '#8b4513', type: 'desk' },
            { x: 200, y: 650, width: 60, height: 60, color: '#8b4513', type: 'desk' },
            { x: 1040, y: 650, width: 60, height: 60, color: '#8b4513', type: 'desk' },
            { x: 1140, y: 650, width: 60, height: 60, color: '#8b4513', type: 'desk' },
            
            // Plants
            { x: 650, y: 650, width: 50, height: 70, color: '#228b22', type: 'plant' },
            { x: 80, y: 400, width: 50, height: 70, color: '#228b22', type: 'plant' },
            { x: 1170, y: 400, width: 50, height: 70, color: '#228b22', type: 'plant' }
        ],
        npcs: [
            { x: 650, y: 350, name: 'Librarian Ada', type: 'info', role: 'librarian', dialogue: ['Shhh... This is a study area.', 'Learn algorithms and databases here.', 'Knowledge is power!'] }
        ],
        portals: [
            { x: 620, y: 750, toMap: 'school_entrance', toX: 200, toY: 700, label: '↑ Back to Entrance', color: '#9370db' }
        ],
        missions: [
            { x: 280, y: 580, type: 'algorithm', title: 'Algorithms', icon: '⚙️', color: '#9370db' },
            { x: 580, y: 580, type: 'database', title: 'SQL Basics', icon: '🗄️', color: '#4682b4' },
            { x: 880, y: 580, type: 'logic', title: 'Logic Puzzle', icon: '🧠', color: '#6a5acd' }
        ]
    }
};

let currentMap = 'hub';

class NPC {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.width = 32;
        this.height = 40;
        this.name = data.name;
        this.type = data.type;
        this.dialogue = data.dialogue;
        this.dialogueIndex = 0;
        this.role = data.role || 'student'; // teacher, student, librarian, etc.
    }
    
    draw() {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;
        
        // Draw shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(screenX + 16, screenY + 42, 14, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw NPC based on role
        this.drawNPCByRole(screenX, screenY);
        
        // Draw name tag with background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        const nameWidth = ctx.measureText(this.name).width + 16;
        ctx.fillRect(screenX + 16 - nameWidth/2, screenY - 15, nameWidth, 18);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, screenX + 16, screenY - 3);
        ctx.textAlign = 'left';
        
        // Draw interaction hint
        const player = gameState.player;
        const distance = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
        if (distance < 60) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.fillRect(screenX - 10, screenY + this.height + 5, 52, 20);
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('[E] Talk', screenX + 16, screenY + this.height + 18);
            ctx.textAlign = 'left';
        }
    }
    
    drawNPCByRole(x, y) {
        switch(this.role) {
            case 'teacher':
                this.drawTeacher(x, y);
                break;
            case 'librarian':
                this.drawLibrarian(x, y);
                break;
            case 'student':
                this.drawStudent(x, y);
                break;
            default:
                this.drawStudent(x, y);
        }
    }
    
    drawTeacher(x, y) {
        // Body (suit)
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(x + 8, y + 16, 16, 14);
        
        // Tie
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(x + 14, y + 16, 4, 10);
        
        // Arms
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(x + 6, y + 18, 4, 10);
        ctx.fillRect(x + 22, y + 18, 4, 10);
        
        // Hands
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x + 6, y + 26, 4, 4);
        ctx.fillRect(x + 22, y + 26, 4, 4);
        
        // Head
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x + 10, y + 4, 12, 12);
        
        // Hair (gray)
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(x + 10, y + 2, 12, 6);
        
        // Glasses
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 11, y + 8, 4, 4);
        ctx.strokeRect(x + 17, y + 8, 4, 4);
        ctx.beginPath();
        ctx.moveTo(x + 15, y + 10);
        ctx.lineTo(x + 17, y + 10);
        ctx.stroke();
        
        // Legs
        ctx.fillStyle = '#34495e';
        ctx.fillRect(x + 10, y + 30, 5, 10);
        ctx.fillRect(x + 17, y + 30, 5, 10);
        
        // Shoes
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 9, y + 38, 6, 3);
        ctx.fillRect(x + 17, y + 38, 6, 3);
    }
    
    drawLibrarian(x, y) {
        // Body (cardigan)
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(x + 8, y + 16, 16, 14);
        
        // Arms
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(x + 6, y + 18, 4, 10);
        ctx.fillRect(x + 22, y + 18, 4, 10);
        
        // Book in hand
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(x + 5, y + 24, 5, 6);
        
        // Hands
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x + 22, y + 26, 4, 4);
        
        // Head
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x + 10, y + 4, 12, 12);
        
        // Hair (bun)
        ctx.fillStyle = '#654321';
        ctx.fillRect(x + 10, y + 2, 12, 6);
        ctx.beginPath();
        ctx.arc(x + 16, y + 4, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Glasses
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 11, y + 8, 4, 4);
        ctx.strokeRect(x + 17, y + 8, 4, 4);
        ctx.beginPath();
        ctx.moveTo(x + 15, y + 10);
        ctx.lineTo(x + 17, y + 10);
        ctx.stroke();
        
        // Skirt
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(x + 9, y + 30, 14, 8);
        
        // Legs
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x + 11, y + 36, 4, 4);
        ctx.fillRect(x + 17, y + 36, 4, 4);
        
        // Shoes
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(x + 10, y + 38, 5, 3);
        ctx.fillRect(x + 17, y + 38, 5, 3);
    }
    
    drawStudent(x, y) {
        // Body (hoodie)
        ctx.fillStyle = '#3498db';
        ctx.fillRect(x + 8, y + 16, 16, 14);
        
        // Hood
        ctx.fillStyle = '#2980b9';
        ctx.fillRect(x + 9, y + 14, 14, 4);
        
        // Arms
        ctx.fillStyle = '#3498db';
        ctx.fillRect(x + 6, y + 18, 4, 10);
        ctx.fillRect(x + 22, y + 18, 4, 10);
        
        // Hands
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x + 6, y + 26, 4, 4);
        ctx.fillRect(x + 22, y + 26, 4, 4);
        
        // Head
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x + 10, y + 4, 12, 12);
        
        // Hair
        ctx.fillStyle = '#654321';
        ctx.fillRect(x + 10, y + 2, 12, 7);
        
        // Eyes
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 12, y + 9, 2, 2);
        ctx.fillRect(x + 18, y + 9, 2, 2);
        
        // Smile
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x + 16, y + 12, 3, 0, Math.PI);
        ctx.stroke();
        
        // Jeans
        ctx.fillStyle = '#34495e';
        ctx.fillRect(x + 10, y + 30, 5, 10);
        ctx.fillRect(x + 17, y + 30, 5, 10);
        
        // Sneakers
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(x + 9, y + 38, 6, 3);
        ctx.fillRect(x + 17, y + 38, 6, 3);
    }
    
    interact() {
        if (this.dialogueIndex < this.dialogue.length) {
            showDialogue(this.name, this.dialogue[this.dialogueIndex]);
            this.dialogueIndex++;
            
            if (this.type === 'quest' && this.dialogueIndex === this.dialogue.length) {
                gameState.activeQuest = 'Complete missions in the Code Lab';
                showMessage('Quest accepted: Learn programming!');
            }
        } else {
            this.dialogueIndex = 0;
        }
    }
}

class Portal {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.width = 60;
        this.height = 80;
        this.toMap = data.toMap;
        this.toX = data.toX;
        this.toY = data.toY;
        this.label = data.label;
        this.color = data.color || '#00ffff';
    }
    
    draw() {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;
        
        // Draw door frame
        ctx.fillStyle = '#654321';
        ctx.fillRect(screenX - 5, screenY - 10, this.width + 10, this.height + 10);
        
        // Animated portal/door
        const pulse = Math.sin(Date.now() / 300) * 3;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(screenX, screenY, this.width, this.height);
        ctx.globalAlpha = 1.0;
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
        
        // Door handle
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(screenX + this.width - 15, screenY + this.height / 2 - 5, 8, 10);
        
        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '11px monospace';
        ctx.fillText(this.label, screenX - 20, screenY - 15);
        
        // Interaction hint
        const player = gameState.player;
        const distance = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
        if (distance < 70) {
            ctx.fillStyle = '#ffff00';
            ctx.fillText('[E] Enter', screenX + 5, screenY + this.height + 20);
        }
    }
    
    checkCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
    
    use() {
        changeMap(this.toMap, this.toX, this.toY);
    }
}

function loadMap(mapName) {
    const mapData = maps[mapName];
    if (!mapData) {
        console.error('Map not found:', mapName);
        return;
    }
    
    currentMap = mapName;
    
    // Clear existing entities
    gameState.npcs = [];
    gameState.portals = [];
    gameState.missionPoints = [];
    gameState.tiles = [];
    
    // Load tiles (walls, floors, furniture)
    if (mapData.tiles && Array.isArray(mapData.tiles)) {
        gameState.tiles = [...mapData.tiles];
    }
    
    // Store background color
    gameState.backgroundColor = mapData.backgroundColor || '#1a1a1a';
    
    // Apply room theme to UI
    applyRoomTheme(mapData.theme || 'default');
    
    // Load NPCs
    if (mapData.npcs) {
        mapData.npcs.forEach(npcData => {
            gameState.npcs.push(new NPC(npcData));
        });
    }
    
    // Load portals
    if (mapData.portals) {
        mapData.portals.forEach(portalData => {
            gameState.portals.push(new Portal(portalData));
        });
    }
    
    // Load mission points
    if (mapData.missions) {
        mapData.missions.forEach(missionData => {
            gameState.missionPoints.push(new MissionPoint(missionData.x, missionData.y, missionData));
        });
    }
    
    // Update canvas size to fill available space
    const topBarHeight = 70;
    const bottomUIHeight = 150;
    const availableHeight = window.innerHeight - topBarHeight - bottomUIHeight;
    
    canvas.width = window.innerWidth;
    canvas.height = availableHeight;
    
    gameState.mapWidth = mapData.width;
    gameState.mapHeight = mapData.height;
    gameState.mapName = mapData.name;
    
    // Set safe starting position for player if loading school entrance for first time
    if (mapName === 'school_entrance' && gameState.player.x < 200) {
        gameState.player.x = 800;
        gameState.player.y = 650;
    }
    
    console.log('Map loaded:', mapName, 'Tiles:', gameState.tiles.length);
}

function applyRoomTheme(theme) {
    const root = document.documentElement;
    
    const themes = {
        'school': {
            primary: '#8b4513',
            secondary: '#d2691e',
            accent: '#ffa500',
            bg: 'linear-gradient(135deg, #8b7355 0%, #a0826d 100%)',
            text: '#ffffff'
        },
        'lab': {
            primary: '#1e3a8a',
            secondary: '#3b82f6',
            accent: '#60a5fa',
            bg: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            text: '#ffffff'
        },
        'debug': {
            primary: '#7f1d1d',
            secondary: '#dc2626',
            accent: '#ef4444',
            bg: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
            text: '#ffffff'
        },
        'library': {
            primary: '#78350f',
            secondary: '#92400e',
            accent: '#d97706',
            bg: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
            text: '#ffffff'
        },
        'default': {
            primary: '#1a1a2e',
            secondary: '#16213e',
            accent: '#00ff88',
            bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            text: '#ffffff'
        }
    };
    
    const selectedTheme = themes[theme] || themes['default'];
    
    root.style.setProperty('--theme-primary', selectedTheme.primary);
    root.style.setProperty('--theme-secondary', selectedTheme.secondary);
    root.style.setProperty('--theme-accent', selectedTheme.accent);
    root.style.setProperty('--theme-bg', selectedTheme.bg);
    root.style.setProperty('--theme-text', selectedTheme.text);
}

function changeMap(mapName, x, y) {
    loadMap(mapName);
    gameState.player.x = x;
    gameState.player.y = y;
    showMessage(`Entered: ${maps[mapName].name}`);
}

function updateCamera() {
    const player = gameState.player;
    
    // Center camera on player
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
    
    // Keep camera in bounds
    camera.x = Math.max(0, Math.min(gameState.mapWidth - canvas.width, camera.x));
    camera.y = Math.max(0, Math.min(gameState.mapHeight - canvas.height, camera.y));
}

function showDialogue(speaker, text) {
    const dialogueBox = document.getElementById('dialogue-box');
    document.getElementById('dialogue-speaker').textContent = speaker;
    document.getElementById('dialogue-text').textContent = text;
    dialogueBox.style.display = 'block';
    
    setTimeout(() => {
        dialogueBox.style.display = 'none';
    }, 3000);
}
