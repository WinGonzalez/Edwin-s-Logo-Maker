const { Triangle, Circle, Square } = require('./shapes.js');

describe('Shapes', () => {
  describe('Triangle', () => {
    it('should create a string via svg that represents a triangle', async () => {
      var test = new Triangle('TST', 'Green', 'Red');
      test.setText('TST');
      await test.setTextColor('Green');
      await test.setShapeColor('Red');
      var result ='<polygon points="150, 18 244, 182 56, 182" fill="Red"/><text text-anchor="middle" x="150" y="130" font-size="3em" font-family="sans-serif" fill="Green">TST</text>';
      expect(test.render()).toEqual(result);
    });
  });

  describe('Circle', () => {
    it('should create a string of svg that represents a Circle', async () => {
      var test = new Circle('TST', 'Green', 'Red');
      test.setText('TST');
      await test.setTextColor('Green');
      await test.setShapeColor('Red');
      var result = '<circle cx="150" cy="100" r="50" fill="Red"/><text text-anchor="middle" x="150" y="120" font-size="3em" font-family="sans-serif" fill="Green">TST</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Square', () => {
    it('should create a string of svg that represents a Square', async () => {
      var test = new Square('TST', 'Green', 'Red');
      test.setText('TST');
      await test.setTextColor('Green');
      await test.setShapeColor('Red');
      var result = '<rect x="50" y="0" width="200" height="200" fill="Red"/><text text-anchor="middle" x="150" y="120" font-size="4em" font-family="sans-serif" fill="Green">TST</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('No Text', () => {
    it('should create a string of svg without any text and only a shape', async () => {
      var test = new Circle('', 'Blue', 'Yellow');
      test.setText('');
      await test.setTextColor('Blue');
      await test.setShapeColor('Yellow');
      var result = '<circle cx="150" cy="100" r="50" fill="Yellow"/>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Too Many Characters', () => {
    it('should automatically use only the first 3 letters for its text', async () => {
      var test = new Circle('Testing', 'Blue', 'Yellow');
      test.setText('Testing');
      await test.setTextColor('Blue');
      await test.setShapeColor('Yellow');
      var result = '<circle cx="150" cy="100" r="50" fill="Yellow"/><text text-anchor="middle" x="150" y="120" font-size="3em" font-family="sans-serif" fill="Blue">Tes</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('CSS Color', () => {
    it('should follow the CSS library of colors to parse the input and use it for the logo', async () => {
      var test = new Square('ICE', 'HoneyDew', 'HotPink');
      test.setText('ICE');
      await test.setTextColor('HoneyDew');
      await test.setShapeColor('HotPink');
      var result = '<rect x="50" y="0" width="200" height="200" fill="HotPink"/><text text-anchor="middle" x="150" y="120" font-size="4em" font-family="sans-serif" fill="HoneyDew">ICE</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Invalid CSS Color', () => {
    it('should automatically use black for the shape, and white for the text', async () => {
      var test = new Square('YAY', 'Yin', 'Yang');
      test.setText('YAY');
      await test.setTextColor('Yin');
      await test.setShapeColor('Yang');
      var result = '<rect x="50" y="0" width="200" height="200" fill="Black"/><text text-anchor="middle" x="150" y="120" font-size="4em" font-family="sans-serif" fill="White">YAY</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Hex Color', () => {
    it('should follow the hex color exactly', async () => {
      var test = new Triangle('BRY', '#FF4500', '#663399');
      test.setText('BRY');
      await test.setTextColor('#FF4500');
      await test.setShapeColor('#663399');
      var result ='<polygon points="150, 18 244, 182 56, 182" fill="#663399"/><text text-anchor="middle" x="150" y="130" font-size="3em" font-family="sans-serif" fill="#FF4500">BRY</text>';
      expect(test.render()).toEqual(result);
    });
  });

  describe('Invalid Hex Color', () => {
    it('should automatically use black for the shape, and white for the text', async () => {
      var test = new Triangle('BRY', '#FF45OO', '#666333999');
      test.setText('BRY');
      await test.setTextColor('#FF45OO');
      await test.setShapeColor('#666333999');
      var result ='<polygon points="150, 18 244, 182 56, 182" fill="Black"/><text text-anchor="middle" x="150" y="130" font-size="3em" font-family="sans-serif" fill="White">BRY</text>';
      expect(test.render()).toEqual(result);
    });
  });
});

