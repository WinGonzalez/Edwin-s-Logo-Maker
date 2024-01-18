const fetch = require('node-fetch');

class Shape {
    constructor(text, textColor, shapeColor) {
        this.text = '';
        this.textColor = '';
        this.shapeColor = '';
    }

    setText(text) {
        this.text = text.length > 3 ? text.substring(0, 3) : text;
    }

    async setTextColor(color) {
        var testColor = {text: 'White', shape: 'Black'};
        await this.validateColor(color, testColor);
        this.textColor = testColor.text;
    }
    
    async setShapeColor(color) {
        var testColor = {text: 'White', shape: 'Black'};
        await this.validateColor(color, testColor);
        this.shapeColor = testColor.shape;
    }

    async validateColor(color, obj) {
        if (color.substring(0, 1) != '#') {
            await fetch(`https://csscolorsapi.com/api/colors/${color}`)
            .then((res) => {
                return res.json();
            })
            .then((cData) => {
                if (cData.status == 200) {
                    obj.text = cData.data.name;
                    obj.shape = cData.data.name;
                }
                else {
                    console.error('Not a valid CSS Color');
                }
            });
        } else {
            const hexRegex = new RegExp('^#([A-Fa-f0-9]{6})$');
            if (!hexRegex.test(color)) {
                console.error('Not a valid hex color');
                return;
            }
            obj.text = color;
            obj.shape = color;
        }
    }

    render() {
    }

    baseRender(insert) {
        return `<?xml version="1.0" standalone="no"?>
<svg width="300" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ${insert}
</svg>`;
    }

    getSVG() {
        //const instance = new this(this.text, this.textColor, this.shapeColor);
        return this.baseRender(this.render());
    }
}

class Triangle extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        var svg = `<polygon points="150, 18 244, 182 56, 182" fill="${this.shapeColor}"/>`;
        if (this.text.length > 0) {
            svg = svg.concat(`<text text-anchor="middle" x="150" y="130" font-size="3em" font-family="sans-serif" fill="${this.textColor}">${this.text}</text>`);
        }
        return svg;
    }
}

class Circle extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        var svg = `<circle cx="150" cy="100" r="50" fill="${this.shapeColor}"/>`;
        if (this.text.length > 0) {
            svg = svg.concat(`<text text-anchor="middle" x="150" y="120" font-size="3em" font-family="sans-serif" fill="${this.textColor}">${this.text}</text>`);
        }
        return svg;
    }
}

class Square extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        var svg = `<rect x="50" y="0" width="200" height="200" fill="${this.shapeColor}"/>`;
        if (this.text.length > 0) {
            svg = svg.concat(`<text text-anchor="middle" x="150" y="120" font-size="4em" font-family="sans-serif" fill="${this.textColor}">${this.text}</text>`);
        }
        return svg;
    }
}

module.exports = {
    Triangle,
    Circle,
    Square
}
