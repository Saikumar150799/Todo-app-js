
const input = document.getElementById('input')
const addTodo = document.getElementById('addTodo')
const container = document.querySelector('.container')

function getData() {
    let flag = 0

    if (localStorage.getItem('todos') != null) {
        let getTodoFromLocal = JSON.parse(localStorage.getItem('todos'))
        for (let todo of getTodoFromLocal) {

            var ulTag = document.createElement('ul')
            ulTag.classList.add('ultag')

            var todoList = document.createElement('div')
            todoList.classList.add('allTodos')

            var liTag = document.createElement('li')
            liTag.innerHTML = todo.title

            var buttonDiv = document.createElement('div')
            buttonDiv.classList.add('buttons')

            var deleteButton = document.createElement('button')
            deleteButton.innerHTML = "Delete"
            deleteButton.classList.add('deleteButton')

            var editButton = document.createElement('button')
            editButton.classList.add('editButton')
            editButton.innerHTML = 'Edit'

            var checkBox = document.createElement('input')
            checkBox.type = 'checkbox'


            ulTag.appendChild(todoList)
            todoList.append(liTag)
            buttonDiv.appendChild(checkBox)
            buttonDiv.append(deleteButton)
            buttonDiv.append(editButton)

            todoList.appendChild(buttonDiv)

            container.appendChild(ulTag)


            input.value = ''

            deleteButton.addEventListener('click', (e) => {
                e.target.parentElement.parentElement.remove()
                let localData = JSON.parse(localStorage.getItem('todos'))
                let todoItem = e.target.parentElement.parentElement.firstChild.innerHTML
                let removedItem = []
                console.log(todoItem)
                localData.forEach((todo) => {
                    if (todo.title == todoItem) {
                        delete todo['title']
                    } else {
                        removedItem.push(todo)
                    }
                });
                localStorage.setItem('todos', JSON.stringify(removedItem))
            })

            let initialText;
            let updatedText;
            editButton.addEventListener('click', (e) => {
                if (e.target.innerHTML != 'Save') {
                    e.target.innerHTML = 'Save'
                    e.target.parentElement.parentElement.firstChild.contentEditable = true
                    e.target.parentElement.parentElement.firstChild.classList.add('editable')
                    initialText = e.target.parentElement.parentElement.firstChild.innerHTML

                } else {
                    e.target.innerHTML = 'Edit'
                    e.target.parentElement.parentElement.firstChild.contentEditable = false
                    e.target.parentElement.parentElement.firstChild.classList.remove('editable')
                    let refreshLocalStorage = JSON.parse(localStorage.getItem('todos'))
                    updatedText = e.target.parentElement.parentElement.firstChild.innerHTML

                    let updatedTodosList = []
                    for (let todo of refreshLocalStorage) {

                        if (todo['title'] == initialText) {
                            let updatedTodo = { 'title': todo['title'] = updatedText }
                            updatedTodosList.push(updatedTodo)
                        } else {
                            updatedTodosList.push({ 'title': todo['title'] })
                        }
                    }
                    localStorage.setItem('todos', JSON.stringify(updatedTodosList))
                }
            })

           
            
            checkBox.addEventListener('click', (e) => {
                let liTagText = e.target.parentElement.parentElement.firstChild
                flag += 1
                if (flag % 2 != 0) {
                    liTagText.classList.add('complete')
                } else {
                    liTagText.classList.remove('complete')
                }

            })
        }
    }
}
getData()


addTodo.addEventListener('click', (e) => {

    if (input.value) {

        let flag = 0
        let check = false

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
        editButton.classList.add('editButton')
        editButton.innerHTML = 'Edit'

        var checkBox = document.createElement('input')
        checkBox.type = 'checkbox'


        ulTag.appendChild(todoList)
        todoList.append(liTag)
        buttonDiv.appendChild(checkBox)
        buttonDiv.append(deleteButton)
        buttonDiv.append(editButton)

        todoList.appendChild(buttonDiv)

        container.appendChild(ulTag)


        let todos = []
        let local = localStorage.getItem('todos')
        if (local != null) {
            todos = JSON.parse(local)

        }
        let obj = { title: input.value}

        todos.push(obj)
        localStorage.setItem('todos', JSON.stringify(todos))

        input.value = ''

        deleteButton.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove()
            let todoItem = e.target.parentElement.parentElement.firstChild.innerHTML
            let localData = JSON.parse(localStorage.getItem('todos'))
            // console.log(todoItem)
            let removedItem = []

            for (let todo of localData) {
                if (todo.title == todoItem) {
                    delete todo['title']
                } else {
                    removedItem.push(todo)
                }
            };
            localStorage.setItem('todos', JSON.stringify(removedItem))

        })

        let initialText;
        let updatedText;
        editButton.addEventListener('click', (e) => {
            if (e.target.innerHTML != 'Save') {
                e.target.innerHTML = 'Save'
                e.target.parentElement.parentElement.firstChild.contentEditable = true
                e.target.parentElement.parentElement.firstChild.classList.add('editable')
                initialText = liTag.innerHTML
            } else {
                e.target.innerHTML = 'Edit'
                e.target.parentElement.parentElement.firstChild.contentEditable = false
                e.target.parentElement.parentElement.firstChild.classList.remove('editable')
                updatedText = liTag.innerHTML

                let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

                let updatedTodoList = []
                for (let todo of localStorageTodos) {
                    if (todo['title'] == initialText) {
                        let updatedTodo = { 'title': todo['title'] = updatedText }
                        updatedTodoList.push(updatedTodo)

                    } else {
                        updatedTodoList.push({ 'title': todo['title'] })
                    }
                }
                localStorage.setItem('todos', JSON.stringify(updatedTodoList))

            }
        })


        checkBox.addEventListener('click', (e) => {
            flag += 1
            let isChecked;
            if (flag % 2 != 0) {
                checkBox.setAttribute('checked', 'true')
                liTag.classList.add('complete')
                isChecked = checkBox.getAttribute('checked')
            } else {
                checkBox.setAttribute('checked', 'false')
                liTag.classList.remove('complete')
                isChecked = checkBox.getAttribute('checked')

            }
            
        })
    }
})