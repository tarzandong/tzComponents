export class DragWindow{
  ent: HTMLElement
  handle: HTMLElement
  left: number
  top: number
  dx: number
  dy: number
  newEle: HTMLElement
  start: (e: any)=>void
  end: (e: any)=>void
  over:  (e: any)=>void
  constructor(toolId:string, targetId:string) {
    this.ent = document.getElementById(targetId) as HTMLElement
    this.handle = document.getElementById(toolId) as HTMLElement
    const tempParent = this.ent.parentElement

    // this.ent.style.transition = 'left 0.2s, top 0.2s'
    this.ent.style.zIndex = '10'
    
    this.left = this.ent.offsetLeft
    this.top = this.ent.offsetTop
    this.ent.style.left = this.left + 'px'
    this.ent.style.top = this.top + 'px'
    this.dx = 0
    this.dy = 0
    this.newEle = document.createElement('div')
    this.newEle.style.width = '100vw'
    this.newEle.style.height = '100vh'
    this.newEle.style.position = 'fixed'
    this.newEle.style.zIndex = '1'
    this.newEle.style.left = '0'
    this.newEle.style.top = '0'
    this.newEle.draggable = true
    this.newEle.style.opacity = '0'

    this.handle.addEventListener('mousedown', () => {
      console.log('handle')
      this.ent.style.position = 'fixed'
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(this.newEle)
      tempParent?.removeChild(this.ent)
      this.newEle.appendChild(this.ent)
      this.newEle.addEventListener('dragover', this.over)
      this.ent.draggable = true
      this.ent.addEventListener('dragstart', this.start)
      this.ent.addEventListener('dragend', this.end)
    })

    this.start = (e) => {
      this.dx = e.x - this.left
      this.dy = e.y - this.top
    }

    this.end = (e) => {
      this.left = e.x - this.dx
      this.top = e.y - this.dy
      if (this.left > document.body.clientWidth-this.ent.offsetWidth) this.left = document.body.clientWidth-this.ent.offsetWidth
      if (this.top > document.body.clientHeight-this.ent.offsetHeight) this.top = document.body.clientHeight-this.ent.offsetHeight
      this.dx = 0
      this.dy = 0
      this.ent.style.left = this.left + 'px'
      this.ent.style.top = this.top + 'px'
      console.log(this.ent.style.top)
      this.ent.draggable = false
      this.ent.removeEventListener('dragstart', this.start)
      this.ent.removeEventListener('dragend', this.end)
      
      const body = document.getElementsByTagName('body')[0]
      this.newEle.removeEventListener('dragover', this.over)
      this.newEle.removeChild(this.ent)
      body.removeChild(this.newEle)
      tempParent?.appendChild(this.ent)
    }

    this.over = (e) => {
      e.preventDefault()
      this.left = e.x - this.dx
      this.top = e.y - this.dy
      // console.log(e.y, this.dy)
      this.ent.style.left = this.left + 'px'
      this.ent.style.top = this.top + 'px'
    }

  }
}


