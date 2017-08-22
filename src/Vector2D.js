class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // returns objects (this for method chaining)

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    norm() {
        if (this.mag() > 0) this.div(this.mag());
        return this;
    }

    limit(l) {
        if (this.mag() > l) this.norm().mult(l)
        return this;
    }

    get() {
        return new Vector2D(this.x, this.y);
    }

    // returns values

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    angleRad(v) {
        return Math.acos(this.dot(v) / (this.mag() * v.mag()));
    }

    angleDeg(v) {
        return Math.acos(this.dot(v) / (this.mag() * v.mag())) * 180 / Math.PI;
    }

    // static functions
    static add(u, v) {
        return new Vector2D(u.x + v.x, u.y + v.y);
    }

    static sub(u, v) {
        return new Vector2D(u.x - v.x, u.y - v.y);
    }

    static dot(u, v) {
        return u.x * v.x + u.y * v.y;
    }

    static angleRad(u, v) {
        return Math.acos(this.dot(u, v) / (u.mag() * v.mag()));
    }

    static angleDeg(u, v) {
        return Math.acos(this.dot(u, v) / (u.mag() * v.mag())) * 180 / Math.PI;
    }
}

