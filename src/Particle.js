class Particle {
    constructor(x, y, mass) {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0, 0);

        this.mass = mass;
    }
    
    zeroAcc() {
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        return this;
    }

    addForce(force) {
        var fc = force.get();
        fc.div(this.mass);
        this.acceleration.add(fc);
        return this;
    }
}