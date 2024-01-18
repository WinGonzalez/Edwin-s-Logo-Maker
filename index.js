//Inquirer Initiation
const fs = require('fs');
const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
const shape = require('./lib/shapes.js');


//Setup
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);
const questions = [{
    type: 'maxlength-input',
    name: 'text',
    message: 'What would you like to write on the logo?',
    maxLength: 3
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'What color would you like for the text? use a CSS supported color, or type a # sign and follow it up with 6 hexadecimal values for a custom hex color.',
    default: '#000000'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'What shape would you like to use?',
    choices:[
      {
        value: 'Circle'
      },
      {
        value: 'Triangle'
      },
      {
        value: 'Square'
      }
    ]
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'What color would you like for the shape? Use a CSS supported color, or type a # sign and follow it up with 6 hexadecimal values for a custom hex color.',
    default: '#000000'
  }
];
//

function init() {
  inquirer.prompt(questions).then(async (result) => {
    var newLogo;
    switch (result.shape) {
      case 'Circle':
        newLogo = new shape.Circle();
        break;
      case 'Triangle':
        newLogo = new shape.Triangle();
        break;
      case 'Square':
        newLogo = new shape.Square();
        break;
    }
    newLogo.setText(result.text);
    await newLogo.setTextColor(result.textColor);
    await newLogo.setShapeColor(result.shapeColor);
    return newLogo.getSVG();
  })
  .then((logoSVG) => {
    fs.writeFile('./exports/logo.svg', logoSVG, (err) => {
      err ? console.error(err) : console.log('Logo Generated');
    });
  })
}

init();
