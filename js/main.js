
let targets = document.querySelectorAll('#target .btn')
let friends = document.querySelectorAll('#friendly .btn')

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

      element.setAttribute('draggable', false)
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
   let input = click.target.querySelector('input')
   input.classList.remove('hidden')
   input.focus()
}


initButtonList(targets)
initButtonList(friends)