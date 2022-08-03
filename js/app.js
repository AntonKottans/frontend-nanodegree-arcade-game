class Field {
    constructor() {
        this.maxreachableXCoord = 4;
        this.maxreachableYCoord = 4;
        this.topIndent = 50;
        this.SquareWidth = 100;
        this.SquareHeight = 80;
    }
}
const field = new Field();

class Enemy {
    constructor({ x, y, speed, row }) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = "images/enemy-bug.png";
        this.row = row;
    }
    checkCollision() {
        const distanceOfCollision = 70;
        const sameRow = () => player.y === this.row;
        const bugTooClose = () =>
            Math.abs(player.x * field.SquareWidth - this.x) <
            distanceOfCollision;
        if (sameRow() && bugTooClose()) {
            player.x = player.start.x;
            player.y = player.start.y;
        }
    }

    update(dt) {
        if (this.x >= (field.maxreachableXCoord + 1) * field.SquareWidth)
            this.x = -field.SquareWidth;
        else this.x += dt * this.speed;

        this.checkCollision();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.start = { x: 2, y: 4 };
        this.x = this.start.x;
        this.y = this.start.y;
    }

    update() {}
    toStart() {
        this.x = this.start.x;
        this.y = this.start.y;
    }
    render() {
        ctx.drawImage(
            Resources.get(this.sprite),
            this.x * field.SquareWidth,
            this.y * field.SquareHeight + field.topIndent
        );
    }
    handleInput(key) {
        key === "up"
            ? this.y--
            : key === "right" && this.x < field.maxreachableXCoord
            ? this.x++
            : key === "down" && this.y < field.maxreachableYCoord
            ? this.y++
            : key === "left" && this.x > 0
            ? this.x--
            : {};
        if (this.y < 0) this.toStart();
    }
}
const player = new Player();

const allEnemies = (() => {
    const yCoordsForEnemiesToMove = [60, 143, 225];
    return yCoordsForEnemiesToMove.map(
        (yCoord, i) =>
            new Enemy({
                x: 0,
                y: yCoord,
                speed: Math.random() * (200 - 60) + 60,
                row: i,
            })
    );
})();

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
