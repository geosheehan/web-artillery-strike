


// document.addEventListener('keydown',)

let locationData = {}

class Location {
   constructor(d = 1, a = 0) {
      this.distance = d
      this.azimuth = a
   }

   equals(rhs) {
      return (this.distance === rhs.distance
         && this.azimuth === rhs.azimuth)
   }
}

class Side {
   constructor(l = 0) {
      this.length = l
   }
}

class Angle {
   constructor(a = 0) {
      this._radians = a
      this.degrees = Angle.toDegrees(a)
   }

   get radians() {
      return this._radians
   }

   set radians(r) {
      this._radians = r
      this.degrees = Angle.toDegrees(this._radians)
   }

   validate() {
      let degrees = this.degrees % 360
      this.radians = Angle.toRadians(degrees)
   }

   static toRadians(degrees) {
      return degrees * Math.PI / 180
   }
   static toDegrees(radians) {
      return radians * 180 / Math.PI
   }

   // Since JS doesn't have operator overloading for objects
   negate = () => new Angle(-this.radians)
   subtract = (rhs) => new Angle(this.radians - rhs.radians)
   add = (rhs) => new Angle(this.radians + rhs.radians)
   lessThan = (rhs) => this.radians < rhs.radians
   greaterThan = (rhs) => this.radians > rhs.radians

}

function init() {
   let ids = ['target', 'friend']

   for (let id of ids) {
      let btn_list = document.querySelectorAll(`#${id} .btn`)
      initButtonList(btn_list)

      let inputs = document.querySelectorAll(`#${id} .input`)
      initInputList(inputs)
   }
}

function initButtonList(btn_list) {
   btn_list.forEach(element => {
      element.addEventListener('click', selectLocation)
      element.addEventListener('dblclick', renameButton)
      locationData[element.name] = new Location()
   });
   loadLocation(btn_list[0])
}

function initInputList(inputs) {
   inputs.forEach(element => {
      element.addEventListener('change', saveLocation)
      element.addEventListener('change', calcVector)
   })
}

function selectLocation(click) {
   let parent = click.target.parentElement
   if (parent) {
      let children = parent.querySelectorAll('.btn')
      children.forEach(element => {
         element.classList.remove('selected')
      })

      click.target.classList.add('selected')
   }
   loadLocation(click.target)
}

function renameButton(click) {
   click.target.innerHTML = `<input type="text" value=${click.target.value}>`
   input.classList.remove('hidden')
   input.focus()
}

function loadLocation(selected) {
   const data = locationData[selected.name]

   let set = selected.name.includes('tl')
      ? 'target'
      : 'friend'

   document.querySelector(`#distance__${set}`).value = data.distance
   document.querySelector(`#azimuth__${set}`).value = data.azimuth
}

function saveLocation(changed) {
   let [attribute, team] = changed.target.id.split('__')
   let value = changed.target.value

   let selected = document.querySelector(`#${team} .btn.selected`)
   if (selected) {
      locationData[selected.name][attribute] = Number(value)
   }
}

function calcVector() {
   let key_t = document.querySelector('#target .btn.selected').name
   let key_f = document.querySelector('#friend .btn.selected').name

   let target = locationData[key_t]
   let friend = locationData[key_f]
   let result = calc(friend, target)
}

function calc(friend, target) {
   if (friend.equals(target)) {
      return new Location(0, 0)
   }

   function lawOfCosinesTwoSides(a, b, theta) {
      let c = new Side()
      let a_2 = a.length ** 2
      let b_2 = b.length ** 2
      let cosine = 2 * a.length * b.length * Math.cos(theta.radians)

      let c_2 = a_2 + b_2 - cosine
      c.length = Math.sqrt(c_2)
      return c
   }

   function lawOfCosinesThreeSides(a, b, c) {
      let a_2 = a.length ** 2
      let b_2 = b.length ** 2
      let c_2 = c.length ** 2
      let divisor = 2 * a.length * b.length

      let cosC = (a_2 + b_2 - c_2) / divisor
      return new Angle(Math.acos(cosC))
   }


   const SF = new Side(friend.distance) // Spotter to Friend
   const ST = new Side(target.distance) // Spotter to Target
   let FT                               // Friend  to Target (result)

   const NSF = new Angle(Angle.toRadians(friend.azimuth)) // North to Spotter to Friend
   const NST = new Angle(Angle.toRadians(target.azimuth)) // North to Spotter to Target
   let NFT                                                // North to Friend  to Target (result)

   // Calculated values
   let SFT                       // Spotter to Friend to Target
   let delta                     // Change between NSF and NST
   const PI = new Angle(Math.PI) // 180 degree angle for easy computing

   delta = new Angle(Math.abs(NSF.radians - NST.radians))
   FT = lawOfCosinesTwoSides(SF, ST, delta)
   // Order matters here. Side ST must always be the 3rd parameter.
   SFT = lawOfCosinesThreeSides(SF, FT, ST)
   console.log(SF.length, FT.length, ST.length, SFT.radians)
   SFT_degrees = Math.round(SFT.degrees)

   // Make sure Angle stays between 0 - 360 degrees or 0 and 2PI radians
   delta.validate()
   //NFT = NSF + PI + ((delta.degrees > PI.degrees ^ NST > NSF) ? -SFT : SFT)

   NFT = new Angle(
      NSF.radians
         + PI.radians
         + (delta.degrees > PI.degrees ^ NST.radians > NSF.radians)
         ? (-SFT.radians)
         : SFT.radians
   )
   console.log(NFT)
   NFT.validate()


   return new Location(FT.length, Angle.toDegrees(NFT.radians))

}

init()