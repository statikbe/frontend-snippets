function addClass(el, nameClass) {
  var classList = el.className.split(' ');
  classList.push(nameClass);
  el.className = classList.join(' ');
}