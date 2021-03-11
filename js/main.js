
class ButtonList {
   constructor(id) {
      this.group = document.getElementById(`${id}`)
      if (this.group) {
         this.buttons = this.group.querySelectorAll('.btn')
      }

      this.init()
   }

   init() {
      this.buttons.forEach(button => button.addEventListener('click',
         function () {
            selectLocation(this.buttons)
         }))
   }

}
function selectLocation(siblings) {
   console.log(siblings)
   console.log(this)
   // for (let button of this.buttons) {
   //    if (event.target != button) {
   //       button.classList.remove('selected')
   //    }
   //    else {
   //       button.classList.add('selected')
   //    }

   // }
}




targets = new ButtonList('target')
friends = new ButtonList('friendly')