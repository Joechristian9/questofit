// Programming Puzzle System - Educational missions with difficulty levels
const puzzles = {
    'quiz': {
        beginner: [
            {
                title: "HTML Basics",
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text"],
                correct: 0,
                reward: 50
            },
            {
                title: "Computer Basics",
                question: "What does CPU stand for?",
                options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
                correct: 0,
                reward: 50
            },
            {
                title: "Programming Basics",
                question: "Which of these is a programming language?",
                options: ["Microsoft Word", "Python", "Google Chrome", "Windows"],
                correct: 1,
                reward: 50
            }
        ],
        intermediate: [
            {
                title: "Python Basics",
                question: "Which keyword is used to define a function in Python?",
                options: ["function", "def", "func", "define"],
                correct: 1,
                reward: 50
            },
            {
                title: "Data Types",
                question: "Which data type stores True or False?",
                options: ["int", "string", "boolean", "float"],
                correct: 2,
                reward: 50
            },
            {
                title: "Variables",
                question: "What is a variable in programming?",
                options: ["A fixed value", "A container for storing data", "A type of loop", "An error message"],
                correct: 1,
                reward: 50
            }
        ],
        advanced: [
            {
                title: "Object-Oriented Programming",
                question: "What is inheritance in OOP?",
                options: ["Copying code", "A class acquiring properties from another class", "Deleting objects", "Creating variables"],
                correct: 1,
                reward: 50
            },
            {
                title: "Algorithms",
                question: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                correct: 1,
                reward: 50
            },
            {
                title: "Design Patterns",
                question: "Which pattern ensures a class has only one instance?",
                options: ["Factory", "Singleton", "Observer", "Strategy"],
                correct: 1,
                reward: 50
            }
        ],
        pro: [
            {
                title: "Advanced Algorithms",
                question: "Which algorithm is best for finding shortest path in weighted graphs?",
                options: ["BFS", "DFS", "Dijkstra's", "Linear Search"],
                correct: 2,
                reward: 50
            },
            {
                title: "System Design",
                question: "What is the CAP theorem about?",
                options: ["CPU performance", "Distributed systems trade-offs", "Memory allocation", "Code optimization"],
                correct: 1,
                reward: 50
            },
            {
                title: "Concurrency",
                question: "What is a race condition?",
                options: ["Fast code execution", "Multiple threads accessing shared data", "Slow algorithm", "Memory leak"],
                correct: 1,
                reward: 50
            }
        ]
    },
    'syntax': {
        beginner: [
            {
                title: "Fix the Syntax",
                question: "What's missing? print('Hello World'",
                options: [")", ";", "}", "]"],
                correct: 0,
                reward: 75
            },
            {
                title: "Basic Syntax",
                question: "How do you write a comment in Python?",
                options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
                correct: 1,
                reward: 75
            }
        ],
        intermediate: [
            {
                title: "JavaScript Syntax",
                question: "Which symbol declares a variable in modern JavaScript?",
                options: ["var", "let", "const", "Both let and const"],
                correct: 3,
                reward: 75
            },
            {
                title: "Function Syntax",
                question: "What's the correct syntax for a function in JavaScript?",
                options: ["function myFunc[]", "function myFunc()", "func myFunc()", "def myFunc()"],
                correct: 1,
                reward: 75
            }
        ],
        advanced: [
            {
                title: "Arrow Functions",
                question: "What is the correct arrow function syntax?",
                options: ["=> (x) { return x * 2 }", "(x) => x * 2", "x -> x * 2", "lambda x: x * 2"],
                correct: 1,
                reward: 75
            },
            {
                title: "Destructuring",
                question: "What does const {name, age} = person; do?",
                options: ["Creates object", "Extracts properties", "Deletes properties", "Copies object"],
                correct: 1,
                reward: 75
            }
        ],
        pro: [
            {
                title: "Advanced Syntax",
                question: "What is the purpose of the spread operator (...)?",
                options: ["Multiply numbers", "Expand iterables", "Create loops", "Define functions"],
                correct: 1,
                reward: 75
            },
            {
                title: "Async/Await",
                question: "What does 'await' do in async functions?",
                options: ["Delays execution", "Pauses until promise resolves", "Creates new thread", "Stops program"],
                correct: 1,
                reward: 75
            }
        ]
    },
    'debug': {
        beginner: [
            {
                title: "Find the Error",
                question: "What's wrong with: x = '5' + 5",
                options: ["Nothing wrong", "Can't add string and number", "Missing semicolon", "Wrong variable name"],
                correct: 1,
                reward: 100
            }
        ],
        intermediate: [
            {
                title: "Debug the Loop",
                question: "Which loop runs 5 times? for(let i=0; i___5; i++)",
                options: ["==", "<", ">", "!="],
                correct: 1,
                reward: 100
            },
            {
                title: "Find the Bug",
                question: "What's wrong with: if (x = 5) { ... }",
                options: ["Missing semicolon", "Should use == or ===", "Wrong brackets", "Nothing wrong"],
                correct: 1,
                reward: 100
            }
        ],
        advanced: [
            {
                title: "Logic Error",
                question: "What will print? x = 10; print(x + '5')",
                options: ["15", "105", "Error", "10 5"],
                correct: 2,
                reward: 100
            },
            {
                title: "Scope Issue",
                question: "What's the problem with var in loops?",
                options: ["Too slow", "Function scope not block scope", "Can't iterate", "Syntax error"],
                correct: 1,
                reward: 100
            }
        ],
        pro: [
            {
                title: "Memory Leak",
                question: "What causes memory leaks in JavaScript?",
                options: ["Using variables", "Unreleased references", "Using functions", "Writing loops"],
                correct: 1,
                reward: 100
            },
            {
                title: "Closure Bug",
                question: "Why do closures sometimes cause unexpected behavior in loops?",
                options: ["They don't", "Variable scope capture", "Too slow", "Syntax error"],
                correct: 1,
                reward: 100
            }
        ]
    },
    'algorithm': {
        beginner: [
            {
                title: "Sorting Basics",
                question: "What does sorting mean?",
                options: ["Deleting items", "Arranging in order", "Adding items", "Counting items"],
                correct: 1,
                reward: 150
            }
        ],
        intermediate: [
            {
                title: "Algorithm Challenge",
                question: "Which sorting algorithm has O(n log n) average time complexity?",
                options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
                correct: 1,
                reward: 150
            }
        ],
        advanced: [
            {
                title: "Big O Notation",
                question: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                correct: 1,
                reward: 150
            }
        ],
        pro: [
            {
                title: "Advanced Algorithms",
                question: "What is dynamic programming?",
                options: ["Writing code fast", "Optimization using memoization", "Using variables", "Object-oriented"],
                correct: 1,
                reward: 150
            }
        ]
    },
    'database': {
        beginner: [
            {
                title: "Database Basics",
                question: "What is a database?",
                options: ["A programming language", "Organized collection of data", "A website", "An operating system"],
                correct: 1,
                reward: 125
            }
        ],
        intermediate: [
            {
                title: "SQL Query",
                question: "Which SQL command retrieves data from a database?",
                options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
                correct: 2,
                reward: 125
            },
            {
                title: "Database Basics",
                question: "What does SQL stand for?",
                options: ["Structured Query Language", "Simple Question Logic", "System Quality Level", "Standard Query List"],
                correct: 0,
                reward: 125
            }
        ],
        advanced: [
            {
                title: "SQL Joins",
                question: "What does INNER JOIN do?",
                options: ["Combines all rows", "Returns matching rows from both tables", "Deletes rows", "Creates new table"],
                correct: 1,
                reward: 125
            }
        ],
        pro: [
            {
                title: "Database Optimization",
                question: "What is database normalization?",
                options: ["Making data normal", "Organizing data to reduce redundancy", "Deleting data", "Backing up data"],
                correct: 1,
                reward: 125
            }
        ]
    },
    'logic': {
        beginner: [
            {
                title: "Logic Basics",
                question: "What is true AND false?",
                options: ["true", "false", "maybe", "error"],
                correct: 1,
                reward: 150
            }
        ],
        intermediate: [
            {
                title: "Logic Puzzle",
                question: "What is the output of: true && false || true?",
                options: ["true", "false", "undefined", "error"],
                correct: 0,
                reward: 150
            },
            {
                title: "Boolean Logic",
                question: "What is !true?",
                options: ["true", "false", "null", "undefined"],
                correct: 1,
                reward: 150
            }
        ],
        advanced: [
            {
                title: "Complex Logic",
                question: "What is (true || false) && (false || true)?",
                options: ["true", "false", "undefined", "null"],
                correct: 0,
                reward: 150
            }
        ],
        pro: [
            {
                title: "Advanced Logic",
                question: "What is De Morgan's Law?",
                options: ["A sorting algorithm", "NOT (A AND B) = (NOT A) OR (NOT B)", "A data structure", "A design pattern"],
                correct: 1,
                reward: 150
            }
        ]
    }
};

let currentPuzzle = null;
let currentMissionPoint = null;

function showPuzzle(missionPoint) {
    currentMissionPoint = missionPoint;
    const puzzleType = missionPoint.type;
    const difficulty = gameState.difficulty || 'intermediate';
    
    // Get puzzles for current difficulty
    const puzzleList = puzzles[puzzleType]?.[difficulty] || puzzles[puzzleType]?.['intermediate'] || [];
    
    if (puzzleList.length === 0) {
        showMessage('No puzzles available for this difficulty!');
        return;
    }
    
    const randomPuzzle = puzzleList[Math.floor(Math.random() * puzzleList.length)];
    currentPuzzle = randomPuzzle;
    
    const puzzleDiv = document.getElementById('puzzle-container');
    const puzzleModal = document.getElementById('puzzle-modal');
    
    // Determine if this is a programming-related puzzle
    const isProgrammingPuzzle = ['syntax', 'debug', 'algorithm'].includes(puzzleType);
    
    // Apply appropriate styling
    if (isProgrammingPuzzle) {
        puzzleModal.className = 'puzzle-modal monitor-style';
    } else {
        puzzleModal.className = 'puzzle-modal paper-style';
    }
    
    puzzleDiv.style.display = 'block';
    
    // Show difficulty indicator
    const difficultyEmoji = {
        'beginner': '🌱',
        'intermediate': '📚',
        'advanced': '💻',
        'pro': '🏆'
    };
    
    const typeEmoji = {
        'quiz': '📝',
        'syntax': '💻',
        'debug': '🐛',
        'algorithm': '⚙️',
        'database': '🗄️',
        'logic': '🧠'
    };
    
    document.getElementById('puzzle-title').textContent = `${typeEmoji[puzzleType] || '📝'} ${randomPuzzle.title}`;
    document.getElementById('puzzle-difficulty').textContent = `${difficultyEmoji[difficulty]} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
    document.getElementById('puzzle-question').textContent = randomPuzzle.question;
    
    const optionsDiv = document.getElementById('puzzle-options');
    optionsDiv.innerHTML = '';
    
    randomPuzzle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'puzzle-option';
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const resultDiv = document.getElementById('puzzle-result');
    
    if (selectedIndex === currentPuzzle.correct) {
        resultDiv.textContent = `✓ Correct! +${currentPuzzle.reward} XP`;
        resultDiv.style.color = '#00ff00';
        gainXP(currentPuzzle.reward);
        gameState.score += currentPuzzle.reward;
        gameState.player.completedMissions++;
        
        if (currentMissionPoint) {
            currentMissionPoint.completed = true;
        }
        
        showMessage(`Mission Complete! +${currentPuzzle.reward} XP`);
        
        setTimeout(() => {
            closePuzzle();
        }, 2000);
    } else {
        resultDiv.textContent = '✗ Incorrect! Try again.';
        resultDiv.style.color = '#ff0000';
        showMessage('Wrong answer! Review and try again.');
    }
}

function closePuzzle() {
    document.getElementById('puzzle-container').style.display = 'none';
    document.getElementById('puzzle-result').textContent = '';
    currentPuzzle = null;
    currentMissionPoint = null;
}
