
// document.addEventListener('keydown',)

let locationData = {}

class Location {
   constructor(name) {
      this.name = name
      this.distance = 0
      this.azimuth = 0
   }

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
      locationData[element.name] = new Location(element.value)
   });
   loadLocation(btn_list[0])
}

function initInputList(inputs) {
   inputs.forEach(element => {
      element.addEventListener('change', saveLocation)
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

init()