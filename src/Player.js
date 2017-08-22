class Player extends Ball {
    constructor(x, y, mass, r, color) {
        super(x, y, mass, r, color);
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }
}