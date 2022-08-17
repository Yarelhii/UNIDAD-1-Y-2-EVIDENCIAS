const cursor = document.querySelector('.cursor')
const hoyos = [...document.querySelectorAll('.hoyo')]
const puntajeEl = document.querySelector('.puntaje span')
let puntaje = 0

const sound = new Audio("img/golpe.mp3")

function run(){
    const i = Math.floor(Math.random() * hoyos.length)
    const hoyo = hoyos[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('topo')
    img.src = 'img/topo.png'

    img.addEventListener('click', () => {
        puntaje += 10
        sound.play()
        puntajeEl.textContent = puntaje
        img.src = 'img/topogo.png'
        clearTimeout(timer)
        setTimeout(() => {
            hoyo.removeChild(img)
            run()
        }, 500)
    })

    hoyo.appendChild(img)

    timer = setTimeout(() => {
        hoyo.removeChild(img)
        run()
    }, 1500)
}
run()

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})