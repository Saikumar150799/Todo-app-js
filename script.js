
const input = document.getElementById('input')
const addTodo = document.getElementById('addTodo')
const container = document.querySelector('.container')

addTodo.addEventListener('click', (e) => {
    if (input.value) {

        var todoList = document.createElement('div')
        todoList.classList.add('allTodos')

        var buttonDiv = document.createElement('div')
        buttonDiv.classList.add('buttons')


        var ulTag = document.createElement('ul')
        ulTag.classList.add('ultag')

        var liTag = document.createElement('li')
        liTag.innerHTML = input.value


        var deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete"
        deleteButton.classList.add('deleteButton')

        var editButton = document.createElement('button')
        editButton.innerHTML = "Edit"
        editButton.classList.add('editButton')

        var editButton = document.createElement('button')
        editButton.classList.add('editButton')
        editButton.innerHTML = 'Edit'

        ulTag.appendChild(todoList)
        todoList.append(liTag)
        buttonDiv.append(deleteButton)
        buttonDiv.append(editButton)

        todoList.appendChild(buttonDiv)

        container.appendChild(ulTag)


        input.value = ''

        deleteButton.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove()
            console.log(e.target.parentElement.parentElement)
        })


        editButton.addEventListener('click', (e) => {
            if (e.target.innerHTML != 'Save') {
                e.target.innerHTML = 'Save'
                e.target.parentElement.parentElement.firstChild.contentEditable = true
                e.target.parentElement.parentElement.firstChild.classList.add('editable')
            } else {
                e.target.innerHTML = 'Edit'
                console.log(e.target.innerHTML)
                e.target.parentElement.parentElement.firstChild.contentEditable = false
                e.target.parentElement.parentElement.firstChild.classList.remove('editable')
            }
        })
    }
})