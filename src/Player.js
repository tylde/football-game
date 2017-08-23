class Player extends Ball {
    constructor(x, y, mass, r, speed, color) {
        super(x, y, mass, r, speed, color);
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.kick = false;

        this.name = '';
        this.team = '';
    }

    kickBall(ball) {
        if (this.kick === true) {
            let vNormal = Vector2D.sub(ball.position, this.position);
            let dist = vNormal.mag();

            if (dist < 1.3*this.r + ball.r) {
                vNormal.norm();
                let vball = ball.topspeed;
                let v2 = vNormal.mult(vball);
    
                ball.velocity = v2;
            }
        }
    }
}