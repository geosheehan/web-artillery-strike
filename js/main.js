let LOCATION_DATA = {};
let TIMER_ID = 0;
let SIDENAV = null;

let OPTIONS = {
   range: false,
   increments: false,
   tabbing: true
};


/******************************************************************************
 * 1. Classes
 *****************************************************************************/
class Location {
   constructor(distance = 1, azimuth = 0) {
      this._distance = distance;
      this._azimuth = azimuth;
      this.default = true;
   }

   get distance() {
      return this._distance;
   }

   set distance(value) {
      this.default = false;
      this._distance = value;
   }

   get azimuth() {
      return this._azimuth;
   }

   set azimuth(value) {
      this.default = false;
      this._azimuth = value;
   }

   equals(rhs) {
      return (this.distance === rhs.distance
         && this.azimuth === rhs.azimuth);
   }
}

class Side {
   constructor(l = 0) {
      this.length = l;
   }
}

class Angle {
   constructor(a = 0) {
      this._radians = a;
      this.degrees = Angle.toDegrees(a);
   }

   get radians() {
      return this._radians;
   }

   set radians(r) {
      this._radians = r;
      this.degrees = Angle.toDegrees(this._radians);
   }

   validate() {
      let degrees = this.degrees % 360;
      this.radians = Angle.toRadians(degrees);
   }

   static toRadians(degrees) {
      return degrees * Math.PI / 180;
   }
   static toDegrees(radians) {
      return radians * 180 / Math.PI;
   }

}

/******************************************************************************
 * 2. Initialization
 *****************************************************************************/
function init() {
   const ids = ['target', 'friend'];

   for (let id of ids) {
      const btn_list = document.querySelectorAll(`#${id} .btn-flat`);
      initButtonList(btn_list);

      const inputs = document.querySelectorAll(`#${id} .input`);
      initInputList(inputs);

      const btn_rename = document.querySelectorAll(`#${id} input[type="text"]`);
      initRenameButtons(btn_rename);

      const number_box = document.querySelectorAll(`#${id} input[type="number"]`);
      number_box.forEach(element => element.addEventListener('focus', () => element.select()))

   }

   const confirms = document.querySelectorAll('.confirm');
   initConfirmationButtons(confirms);

   const themeSelect = document.getElementById('theme');
   initColorSchemes(themeSelect);

   const modeSelect = document.getElementById('mode');
   initArtilleryMode(modeSelect);

   const increments = document.getElementById('increments');
   increments.addEventListener('click', toggleIncrements);

   const timer = document.getElementById('timer');
   timer.addEventListener('click', toggleTimer);

   const hamburger = document.querySelector('.hamburger');
   hamburger.addEventListener('click', () => SIDENAV.open());
}

function initButtonList(btn_list) {
   btn_list.forEach(element => {
      element.addEventListener('click', selectLocation);
      element.addEventListener('dblclick', renameButton);
      LOCATION_DATA[element.name] = new Location();
   });
   loadLocation(btn_list[0]);
}

function initInputList(inputs) {
   inputs.forEach(element => {
      element.addEventListener('input', onTextBoxUpdate);
   });
}

function initConfirmationButtons(btn_list) {
   btn_list.forEach(element => {
      element.addEventListener('click', confirmClick);
      element.addEventListener('blur', () => {
         element.classList.remove('selected');
         element.value = element.dataset.value;
      });
   });
}

function initRenameButtons(btn_list) {
   btn_list.forEach(element => {
      element.addEventListener('blur', applyRename)
   });
}

function initColorSchemes(themeSelect) {
   themeSelect.addEventListener('change', updateTheme);
}

function initArtilleryMode(modeSelect) {
   modeSelect.addEventListener('change', updateMode);
}

/******************************************************************************
 * 3. Event Handlers
 *****************************************************************************/
function onTextBoxUpdate(event) {
   saveLocation(event);
   updateResults();
}

function selectLocation() {
   let parent = this.parentElement;
   if (parent) {
      let children = parent.querySelectorAll('.btn-flat');
      children.forEach(element => {
         element.classList.remove('selected');
      });

      this.classList.add('selected');
   }
   loadLocation(this);
   updateResults();
}

function renameButton() {
   this.classList.add('hide');
   const input = document.querySelector(`input[name="i${this.name}"]`);
   input.value = this.value;
   input.classList.remove('hide');
   input.select();
}

function applyRename() {
   this.classList.add('hide');
   const button = document.querySelector(`input[name="${this.name.slice(1)}"]`);
   button.value = this.value;
   button.classList.remove('hide');
}

function toggleTimer() {
   const clock = document.getElementById('timer')
   if (!TIMER_ID) {
      TIMER_ID = setInterval(tick, 1000, clock);
      clock.classList.add('selected');
   }
   else {
      clearInterval(TIMER_ID);
      TIMER_ID = 0;
      clock.classList.remove('selected');
      clock.value = '10:00';
   }
}

function tick(clock) {
   let [min, sec] = clock.value.split(':');
   let time = ((Number(min) * 60) + Number(sec));

   if (time > 0) {
      time -= 1;
      min = String(~~(time / 60)).padStart(2, '0');
      sec = String(~~time % 60).padStart(2, '0');
      clock.value = `${min}:${sec}`;
   }
   else {
      clock.classList.toggle('selected');
   }
}

function updateTheme() {
   const remove = Array.from(this.querySelectorAll('option')).map(option => option.value);
   const theme = this.value;
   const body = document.querySelector('body');

   body.classList.remove(...remove)
   body.classList.add(theme);
}

function updateMode() {
   const [min, max, step] = this.value.split(',');
   const toggles = document.querySelectorAll('.toggle');
   if (min < 0) {
      // Turn off switches and disable or hide
      toggles.forEach(elem => elem.setAttribute('disabled', 'true'));
   }
   else {
      toggles.forEach(elem => {
         elem.removeAttribute('disabled');
      });
   }
   updateResults();
}

function toggleIncrements() {
   console.log(this.checked);
   const incrementText = document.querySelector('#result small');
   this.checked ? incrementText.classList.remove('hide') : incrementText.classList.add('hide');
}

/* Call backs stored in HTML */
function reset() {
   for (let item in LOCATION_DATA) {
      const button = document.querySelector(`input[name="${item}"]`);
      button.value = `Location ${item[item.length - 1]}`;
      LOCATION_DATA[item] = new Location();
   }

   for (let id of ['distance', 'azimuth']) {
      const input = document.querySelector(`#${id}__old`);
      input.value = '';
   }

   const selected = getSelectedButtons();
   selected.forEach((button) => button.click());
}

function relocate() {
   const newLocation = ['distance', 'azimuth'].reduce(
      (location, element) => {
         const input = document.querySelector(`#${element}__old`);
         location[element] = input.value;
         input.value = '';
         return location;
      }, new Location());

   if (newLocation.distance === '' || newLocation.azimuth === '') return;

   newLocation.distance = Number(newLocation.distance);
   newLocation.azimuth = ((Number(newLocation.azimuth) + 180) % 360); // point the other way

   for (const key in LOCATION_DATA) {
      if (!LOCATION_DATA[key].default) {
         LOCATION_DATA[key] = calcVector(newLocation, LOCATION_DATA[key]);
         const button = document.querySelector(`input[name="${key}"]`);
         if (Array.from(button.classList).includes('selected')) {
            button.click();
         }
      }
   }

}

/******************************************************************************
 * 4. Confirmation Buttons
 *****************************************************************************/
function confirmClick() {
   if (Array.from(this.classList).includes('selected')) {
      this.classList.remove('selected');
      this.value = this.dataset.value;
      const callback = window[this.dataset.callback];
      if (typeof callback === 'function') callback.apply(this);
   }
   else {
      this.classList.add('selected');
      this.value = 'Confirm?'
   }
}

/******************************************************************************
 * X. ???
 *****************************************************************************/
function getThemes() {
   const themes = document.querySelectorAll('.theme');
   return Array.from(themes).map(theme => theme.value);
}

function getSelectedButtons() {
   const thing = ['friend', 'target'].map((id) => {
      return document.querySelector(`#${id} .btn-flat.selected`);
   });
   return thing;
}

function getSelectedLocations() {
   const buttons = getSelectedButtons();
   return buttons.map((button) => LOCATION_DATA[button.name]);
}

function nearestIncrement(val, min, max, incr) {
   if (min < 0) return '';
   if (val < min) return `(${min.toFixed(1)})`;
   if (max < val) return `(${max.toFixed(1)})`;

   const fn = (x) => incr * x + min;
   let x = (+val.toFixed(1) - min) / incr;

   if (x % 1 === 0) {
      const match = fn(x).toFixed(1);
      return `(${match}, ${match})`;
   }

   x = Math.trunc(x);
   return `(${fn(x).toFixed(1)}, ${fn(x + 1).toFixed(1)})`;
}

function updateResults() {
   let [friend, target] = getSelectedLocations();

   const result = calcVector(friend, target);

   // What are the min, max and incr of the gun?
   const [min, max, incr] = document.querySelector('#mode').value.split(',').map(parseFloat);

   const HTMLresult = document.querySelector('#distance__result');
   const HTMLincr = HTMLresult.querySelector('small');

   console.log({ min, max, incr });
   let debug = nearestIncrement(result.distance, min, max, incr);
   console.log({ debug });
   HTMLincr.innerText = debug;

   HTMLresult.innerHTML = `
      ${result.distance.toFixed(1)} <small class="${Array.from(HTMLincr.classList).join(' ')}">${HTMLincr.innerText}</small>
   `;
   document.querySelector('#azimuth__result').innerText = result.azimuth.toFixed(1);
}

function loadLocation(selected) {
   const data = LOCATION_DATA[selected.name];

   let set = selected.name.includes('tl')
      ? 'target'
      : 'friend';

   document.querySelector(`#distance__${set}`).value = Math.round(data.distance);
   document.querySelector(`#azimuth__${set}`).value = Math.round(data.azimuth);
}

function saveLocation(changed) {
   let [attribute, team] = changed.target.id.split('__');
   let value = changed.target.value;

   let selected = document.querySelector(`#${team} .btn-flat.selected`);
   if (selected) {
      LOCATION_DATA[selected.name][attribute] = Number(value);
   }
}

function calcVector(friend, target) {
   if (friend.equals(target)) {
      return new Location(0, 0);
   }

   function lawOfCosinesTwoSides(a, b, theta) {
      let c = new Side();
      let a_2 = a.length ** 2;
      let b_2 = b.length ** 2;
      let cosine = 2 * a.length * b.length * Math.cos(theta.radians);

      let c_2 = a_2 + b_2 - cosine;
      c.length = Math.sqrt(c_2);
      return c;
   };

   function lawOfCosinesThreeSides(a, b, c) {
      let a_2 = a.length ** 2;
      let b_2 = b.length ** 2;
      let c_2 = c.length ** 2;
      let divisor = 2 * a.length * b.length;

      let cosC = (a_2 + b_2 - c_2) / divisor;
      return new Angle(Math.acos(cosC));
   };

   const SF = new Side(friend.distance); // Spotter to Friend
   const ST = new Side(target.distance); // Spotter to Target
   let FT;                               // Friend  to Target (result)

   const NSF = new Angle(Angle.toRadians(friend.azimuth)); // North to Spotter to Friend
   const NST = new Angle(Angle.toRadians(target.azimuth)); // North to Spotter to Target
   let NFT;                                               // North to Friend  to Target (result)

   // Calculated values
   let SFT;                       // Spotter to Friend to Target
   let delta;                     // Change between NSF and NST
   const PI = new Angle(Math.PI); // 180 degree angle for easy computing

   delta = new Angle(Math.abs(NSF.radians - NST.radians));

   FT = lawOfCosinesTwoSides(SF, ST, delta);

   // Order matters here. Side ST must always be the 3rd parameter.
   SFT = lawOfCosinesThreeSides(SF, FT, ST);

   // Make sure Angle stays between 0 - 360 degrees or 0 and 2PI radians
   delta.validate();
   //NFT = NSF + PI + ((delta.degrees > PI.degrees ^ NST > NSF) ? -SFT : SFT)

   NFT = new Angle(
      NSF.radians
      + PI.radians
      + ((delta.degrees > PI.degrees ^ NST.radians > NSF.radians)
         ? (-SFT.radians)
         : SFT.radians)
   );
   NFT.validate();

   return new Location(FT.length, NFT.degrees);

}

window.addEventListener('keyup', (e) => {
   e.preventDefault();

   let btn_list = null;
   let name = ''

   if (e.ctrlKey) {
      btn_list = document.querySelectorAll('#target input[type="button"]');
      name = 'tl';
   }
   if (e.altKey) {
      btn_list = document.querySelectorAll('#friend input[type="button"]');
      name = 'fl';
   }

   if (btn_list === null) return;
   btn_list = Array.from(btn_list);

   if (e.code.includes('Numpad')) name += e.code[e.code.length - 1];

   const found = btn_list.find(btn => btn.name === name);
   if (found) found.click();

});

document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.sidenav');
   SIDENAV = M.Sidenav.init(elems, { draggable: false, preventScrolling: false })[0];
});

init();