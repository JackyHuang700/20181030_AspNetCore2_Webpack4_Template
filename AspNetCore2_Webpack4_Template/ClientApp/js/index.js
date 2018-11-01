import printMe from './print'
// import '../css/styles.css'

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


if (module.hot) {
  // module.hot.accept('./print.js', function() {
  //   console.log('Accepting the updated printMe module in index.js!');
  //   printMe();
  // })

}

if (module.hot) {
  module.hot.accept()
}