function removeClass(el, nameClass) {
  var classList = el.className.split(' ');
  var index = classList.indexOf(nameClass);
  if (index >= 0) {
    classList.splice(index, 1);
    el.className = classList.join(' ');
  }
}