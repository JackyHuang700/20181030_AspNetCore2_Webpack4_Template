import printMe from './print'
// import '../css/styles.css'
import {
  cube,
  square,
} from './multiFunc'

console.log('index');


function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = "Hello webpack"

  btn.innerHTML = 'Click me and check the console!adsasdf';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component())
console.log(cube(5))
console.log(square(5))
// console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

if (module.hot) {
  // module.hot.accept('./print.js', function() {
  //   console.log('Accepting the updated printMe module in index.js!');
  //   printMe();
  // })

}

if (module.hot) {
  module.hot.accept()
}