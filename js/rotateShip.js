var rotateShip = function (elem) {

  var output = this;

  //Preventing elem to being selected on IE

  if (document.all && !window.opera) elem.setAttribute("unselectable", "on");

  //Public Properties

  output.rad = 0;

  output.deg = 0;

  output.per = 0;

  output.fullRad = 0;

  output.fullDeg = 0;

  output.fullPer = 0;

  output.spin = 0;

  output.clock = false;

  //Private properties

  var drag = false;

  var pos = [];

  var size = [];

  var axis = [];

  var cursor = [];

  var rad = 0;

  var lastRad = 0;

  var lastPer = 0;

  var lastFullRad = 0;

  var maxRad = 6.283185307179586;

  var maxDeg = 360;

  var maxPer = 100;

  var Dx = [];

  var Dy = [];

  //Public Methods

  output.onchange = function () { };

  //Private Methods

  function preventDefault(e) {

    //prevent event's default action

    if (window.event) e = window.event;

    if (e.preventDefault) { e.preventDefault() } else { e.returnValue = false };

  }

  function getPos(elem) {

    //get the position [left,top] relative to whole document

    var tmp = elem;

    var left = tmp.offsetLeft;

    var top = tmp.offsetTop;

    while (tmp = tmp.offsetParent) left += tmp.offsetLeft;

    tmp = elem;

    while (tmp = tmp.offsetParent) top += tmp.offsetTop;

    return [left, top];

  }

  function getSize(elem) {

    //return the size [width,height] of the element

    return [elem.offsetWidth, elem.offsetHeight];

  }

  function getAxis(elem) {

    //return the center point [left,top] of the element

    return [getPos(elem)[0] + getSize(elem)[0] / 2, getPos(elem)[1] + getSize(elem)[1] / 2];

  }

  function getCursorPos(e) {

    //return the cursor's position [x,y]

    var cursorPos;

    if (window.event) e = window.event;

    if (e.clientX) cursorPos = [e.clientX, e.clientY];

    if (e.pageX) cursorPos = [e.pageX, e.pageY];

    try { if (e.targetTouches[0]) cursorPos = [e.targetTouches[0].pageX, e.targetTouches[0].pageY]; } catch (err) { };

    return cursorPos;

  }

  function getAngle(e) {

    //getting rotation angle by Arc Tangent 2

    var rad;

    pos = getPos(elem);

    size = getSize(elem);

    axis = getAxis(elem);

    cursor = getCursorPos(e);

    rad = Math.atan2(cursor[1] - axis[1], cursor[0] - axis[0]);

    //correct the 90° of difference starting from the Y axis of the element

    rad += maxRad / 4;

    //transform opposite angle negative value, to possitive

    if (rad < 0) rad += maxRad;

    return rad;

  }

  function rotate(e) {

    //Rotate the element

    //setting control variables

    var cursorRad;

    var relativeRad;

    var rotationRad;

    cursorRad = getAngle(e);

    relativeRad = cursorRad - rad;

    var rotationRad = lastRad + relativeRad;

    if (rotationRad < 0) rotationRad = maxRad;

    if (rotationRad > maxRad) rotationRad = 0;

    rad = cursorRad;



    //applying rotation to element

    elem.style.MozTransform = "rotate(" + rotationRad + "rad)";

    elem.style.WebkitTransform = "rotate(" + rotationRad + "rad)";

    elem.style.OTransform = "rotate(" + rotationRad + "rad)";

    elem.style.MsTransform = "rotate(" + rotationRad + "rad)";

    //assigning values to public properties

    output.rad = rotationRad;

    output.deg = maxDeg * output.rad / (2 * Math.PI);

    output.per = (output.rad * maxPer) / maxRad;



    if ((lastPer <= 100 && lastPer >= 60) && (output.per >= 0 && output.per <= 30)) output.spin++;

    if ((lastPer <= 30 && lastPer >= 0) && (output.per >= 60 && output.per <= 100)) output.spin--;



    output.fullRad = output.rad + (maxRad * output.spin);

    output.fullDeg = output.deg + (maxDeg * output.spin);

    output.fullPer = output.per + (maxPer * output.spin);



    if (lastFullRad < output.fullRad) output.clock = true;

    if (lastFullRad > output.fullRad) output.clock = false;



    lastRad = rotationRad;

    lastPer = output.per;

    lastFullRad = output.fullRad;

    // Put the rotation in radians for the instance "ship"
    ship.direction = rotationRad

    output.onchange();

  }

  //Listen events

  document.onmousemove = function (e) { rotate(e); }
}