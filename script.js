const formEl = document.getElementById("form")
const inputEl = document.getElementById("input")
const maintodosEl = document.getElementById("todos")



const modeEl = document.querySelector(".mode")
let darkmode = JSON.parse(localStorage.getItem("Darkmode")) || false
window.onload = changeModes; 
modeEl.addEventListener("click",()=>{
    
    switch(darkmode) {
        case false:
            localStorage.setItem("Darkmode",JSON.stringify(true))
            darkmode = JSON.parse(localStorage.getItem("Darkmode"))
            changeModes()
            break;
        case true:
            localStorage.setItem("Darkmode",JSON.stringify(false))
            darkmode = JSON.parse(localStorage.getItem("Darkmode"))
            changeModes()
            break;
    }
})

function changeModes(){
    if(!darkmode){
        
        modeEl.src="moon.png"
        
        showLigntMode()
        
        
        

    }else{
        modeEl.src="sun.png"
        
        
        showDarkMode()
        
        
    }
}
function showDarkMode(){
    document.documentElement.style.setProperty('--clr-bacground', '#191A23');
    document.documentElement.style.setProperty('--clr-white', '#000000');
    document.documentElement.style.setProperty('--clr-dark', 'white');
    document.documentElement.style.setProperty('--clr-lowwhite', 'rgba(0,0,0,.6)');
    
}
function showLigntMode(){
    document.documentElement.style.setProperty('--clr-bacground', '#f0f8ff');
    document.documentElement.style.setProperty('--clr-white', '#ffffff');
    document.documentElement.style.setProperty('--clr-dark', 'black');
    document.documentElement.style.setProperty('--clr-lowwhite', '#ffffffcc');
    
}


getTodos().forEach(element => {
    const newcreated = createTodoEl(element)
    maintodosEl.appendChild(newcreated)
});

chekcEmpty()

formEl.addEventListener("submit",(event)=>{
    event.preventDefault()

    const todo = {
        content:inputEl.value,
        done: false
    }
    const alltodos = getTodos()
    alltodos.push(todo)
    saveTodos(alltodos)
    
    const createdEL = createTodoEl(todo)
    maintodosEl.insertBefore(createdEL,document.querySelector(".todo"))
    chekcEmpty()
    inputEl.value=''

})


function getTodos(){
    return JSON.parse(localStorage.getItem("My-todos")) || []

}

function saveTodos(todos){
    localStorage.setItem("My-todos",JSON.stringify(todos))
}




function createTodoEl(todo){
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const checkDiv = document.createElement("div")
    checkDiv.classList.add("checkbox")

    const pnoteEl = document.createElement("p")
    pnoteEl.innerText = todo.content

    const h2delEl = document.createElement("h2")
    h2delEl.classList.add("delet")
    h2delEl.innerText="X"

    
    todoDiv.appendChild(checkDiv)
    todoDiv.appendChild(pnoteEl)
    todoDiv.appendChild(h2delEl)

    if(!todo.done){
        checkDiv.addEventListener("click",()=>{
            pnoteEl.style.textDecoration = 'line-through'
            checkDiv.style.backgroundColor = 'var(--clr-primary)'
            updateTodo(todo,todoDiv)

        })
    }
    else{
        pnoteEl.style.textDecoration = 'line-through'
        checkDiv.style.backgroundColor = 'var(--clr-primary)'
    }
    
    

    h2delEl.addEventListener("click",()=>{
        deletTodo(todo,todoDiv)
        
    })

    return todoDiv

}

function deletTodo(todo,tododivel){
    let newtodos = getTodos().filter(function(item){
        return item.content !== todo.content
    } )
    saveTodos(newtodos)
    maintodosEl.removeChild(tododivel)
    chekcEmpty()
  
    
}


function updateTodo(todo,tododiv){
    const evrytodos = getTodos()
    let updatedTodo = evrytodos.filter((alltodos)=>alltodos.content==todo.content)[0]
    updatedTodo.done = true

    evrytodos.push(evrytodos.splice(evrytodos.indexOf(updatedTodo), 1)[0]);
    saveTodos(evrytodos)
    maintodosEl.removeChild(tododiv)
    maintodosEl.appendChild(tododiv)
    
}

function chekcEmpty(){
    if (maintodosEl.childElementCount=== 0){
        maintodosEl.style.display = 'none'
    }
    else{
        maintodosEl.style.display = 'block'
    }
}

