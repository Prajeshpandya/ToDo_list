//declare refrense variable..

const addbtn = document.querySelector("#add-btn")
const newtaskinput = document.querySelector("#wrapper input")
const taskscontainer = document.querySelector("#tasks")
const error = document.getElementById("error")
const countvalue = document.querySelector(".count-value")
let taskcount = 0

//display pandding taskCount

const displaycount = (taskcount) => {
    countvalue.innerText = taskcount
}

const addtask = () => {
    const taskname = newtaskinput.value.trim()
    error.style.display = "none"
    if (!taskname) {
        setTimeout(() => {
            error.style.display = "block"
        }, 200)
        return
    }
    
    const task = `
     <div class="task">
         <input type="checkbox" class="task-check">
        <span class="taskname">${taskname}</span>
        <button class="edit">
           <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delet">
        <i class="fa-sharp fa-solid fa-trash"></i>
        </button>
     </div>`

    taskscontainer.insertAdjacentHTML("beforeend",task)

    const deletbuttons=document.querySelectorAll(".delet")
    deletbuttons.forEach(button=>{
        button.onclick=()=>{
            button.parentNode.remove()
            taskcount-=1
            displaycount(taskcount)
        }
    })

    const editbuttons=document.querySelectorAll(".edit")
    editbuttons.forEach((editbtn)=>{
        editbtn.onclick= (e)=>{
            let targetElement = e.target
            if(!(e.target.className=="edit")){
                targetElement = e.target.parentNode
            }
            newtaskinput.value=targetElement.previousElementSibling?.innerText
            targetElement.parentNode.remove()
            taskcount-=1 
            displaycount(taskcount)
        }
    })
    const taskcheck=document.querySelectorAll(".task-check")
    taskcheck.forEach((checkbox)=>{
        checkbox.onchange=()=>{
            checkbox.nextElementSibling.classList.toggle("completed")
            if(checkbox.checked){
                taskcount-=1
            }
            else{
                taskcount+=1
            }
            displaycount(taskcount)
        }
    })
    taskcount +=1
    displaycount(taskcount)
    newtaskinput.value=""
}
addbtn.addEventListener("click",addtask)

window.onload = ()=>{
    taskcount=0
    displaycount(taskcount)
    newtaskinput.value=""
}