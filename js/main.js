
document.addEventListener('keydown',)
let targets = document.querySelectorAll('#target .btn')
let friends = document.querySelectorAll('#friend .btn')

class Location {
   constructor() {
      this.name = ''
      this.distance = 0
      this.azimuth = 0
   }

   get distance() {
      return this.distance
   }

   set distance(x) {
      if (x && x >= 0) {
         this.distance = x
      }
   }

   get azimuth() {
      return this.azimuth
   }

   set azimuth(x) {
      if (x && x >= 0) {
         this.azimuth = x
      }
   }


}

function initButtonList(btn_list) {
   btn_list.forEach(element => {
      element.addEventListener('click', selectLocation)
      element.addEventListener('dblclick', renameButton)
   });
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
}

function renameButton(click) {
   click.target.innerHTML = `<input type="text" value=${click.target.value}>`
   input.classList.remove('hidden')
   input.focus()
}


initButtonList(targets)
initButtonList(friends)