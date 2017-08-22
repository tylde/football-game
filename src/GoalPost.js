class GoalPost extends Circle {
    constructor(x, y, mass, r) {
        super(x, y, mass, r);
        
        this.topspeed = 10;
    }
    draw() {
        ctx.fillStyle = '#b35c00';
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.strokeStyle = '#4d2800';
        ctx.stroke();
        ctx.closePath();
    }

    bounce(ball, restitution) {
        let vNormal = Vector2D.sub(ball.position, this.position);
        let dist = vNormal.mag();

        if (dist < this.r + ball.r) {
            vNormal.norm();
            let vball = ball.velocity.mag();
            let v2 = vNormal.mult(vball).mult(restitution);
 
            ball.velocity = v2;

            let dr = (this.r + ball.r - dist);
            let cor2 = vNormal.get().mult(dr);
            ball.position.add(cor2);
        }
    }
}