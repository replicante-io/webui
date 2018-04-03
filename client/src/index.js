import 'bootstrap';
import url from '../assets/main.scss';


function component() {
  var element = document.createElement('div');
  element.innerHTML = 'Hello webpack';
  return element;
}

document.body.appendChild(component());
