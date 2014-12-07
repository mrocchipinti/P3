var rows = [0, 50, 150, 225, 300, 400];
var cols = [0, 100, 200, 300, 400];
var maxEnemy = 3;

// Enemy class
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.reset();
}

Enemy.prototype.update = function (dt) {
    // Check for collision if player and enemy are on the same row
    if (this.row == player.row) {
        if (Math.abs(this.x - cols[player.col]) < 40)   // 40 unit buffer for collision, 
            player.reset();                             // this neglects to take into account the width of the enemy, but close enough
    }

    // If enemy is off screen, set reset bug characteristics
    if (this.x > 800) {
        this.reset();
    }
    this.x = this.x + this.speed * dt; 
}

Enemy.prototype.reset = function()
{
    // Set initial col position (x)
    this.col = 0;
    this.x = cols[this.col];    // Only need x for sweeping the bug across the screen

    // Randomly set enemy row
    this.row = 1 + Math.floor(Math.random() * 3);

    // Randomly set speed 100-700
    this.speed = 100 + (100 * Math.floor(Math.random() * 7));
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    // Draw image in x position and y col 
    ctx.drawImage(Resources.get(this.sprite), this.x, rows[this.row]);
}

// Player class
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.reset();
}
Player.prototype.reset = function () {
    // Start player at 3rd col in, bottom row
    this.col = 2;
    this.row = 5;
};
Player.prototype.update = function (dt) {
    // Empty implementation.  Checking for collision on enemy movement.
};
Player.prototype.render = function () {
    // Draw image in x/y col position
    ctx.drawImage(Resources.get(this.sprite), cols[this.col], rows[this.row]);
};
Player.prototype.moveLeft = function () {
    if (this.col > 0)
        this.col--;
}
Player.prototype.moveRight = function () {
    if (this.col < 4)
        this.col++;
}
Player.prototype.moveUp = function () {
    if (this.row > 0)
        this.row--;
}
Player.prototype.moveDown = function () {
    if (this.row < 5)
        this.row++;
}
Player.prototype.handleInput = function (direction) {
    // Increment or decrement col or row position within limits.
    // Ignore movement beyond bounds.
    switch (direction) {
        case "left":
            this.moveLeft();
            break;
        case "right":
            this.moveRight();
            break;
        case "up":
            this.moveUp();
            break;
        case "down":
            this.moveDown();
            break;
    }

    // If the player makes it to the water, reset to starting position
    if (this.row == 0)
        this.reset();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Push onto allEnemies array the max number of enemies
for (currentEnemy = 0; currentEnemy < maxEnemy; currentEnemy++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
