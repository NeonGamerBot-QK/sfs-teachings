console.log('Loaded About Me')

let noop = () => {}
fetch('/date').then(d => {
    d.json().then(data => {
        document.getElementById('date').innerHTML = data
    })
})
