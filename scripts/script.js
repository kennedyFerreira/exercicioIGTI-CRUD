window.addEventListener('load', start)

let globalNames, form, inputName, divNames, isEditing, currentIndex;


function start() {
  globalNames = ['kennedy', 'ariane', 'santos', 'ferreira', 'ale']
  form = document.querySelector('form')
  inputName = document.querySelector('#inputName')
  divNames = document.querySelector('#names')
  isEditing = false

  preventFormSubmit()
  activeInput()
  render()
}

function preventFormSubmit() {

  form.addEventListener('submit', handleFormSubmit = event => event.preventDefault())

}

function changeItem() {
  let newItem = inputName.value

  globalNames.splice(currentIndex, 1, newItem)
}

function activeInput() {
  inputName.focus()

  inputName.addEventListener('keyup', handleTyping = event => {
    if (event.key === 'Enter') {
      if (inputName.value.trim() === '') {
        window.alert('Nome invalido!')
      }else if (isEditing) {
        changeItem()  
      } else {
        globalNames.push(event.target.value)
      }
      isEditing = false
      render()
    }
  })
}

function render() {
  function createButtonDelete(index) {
    let button = document.createElement('button')
    button.classList.add('buttonDelete')
    button.textContent = 'x'

    button.addEventListener('click', deleteIten = () => {
      globalNames.splice(index, 1)
      render()
    })

    return button
  }

  function creatSpan(name, index) {
    let span = document.createElement('span')
    span.textContent = name

    span.addEventListener('click', editItem = () => {
      inputName.value = name
      inputName.focus()
      isEditing = true
      currentIndex = index
    })

    return span
  }

  let ul = document.createElement('ul')
  divNames.innerHTML = ''

  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i]

    let li = document.createElement('li')
    let span = creatSpan(currentName, i)
    let button = createButtonDelete(i)



    li.appendChild(button)
    li.appendChild(span)
    ul.appendChild(li)
    divNames.appendChild(ul)

    inputClear()
  }

}


function inputClear() {
  inputName.value = ''
  inputName.focus()
}