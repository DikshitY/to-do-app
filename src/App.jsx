import React, { useEffect } from 'react'
import {nanoid} from 'nanoid'

function App() {

  // Getting Items from LocalStorage

  const getItems = () => {
  let taskList = JSON.parse(localStorage.getItem('list'))
      if(taskList){
        return taskList
      } else{
        return []
      }
  }

  const [task, setTask] = React.useState("")
  const [allTasks, setAllTasks] = React.useState(getItems())
  const [toggleBtn, setToggleBtn] = React.useState(true)
  const [editItemID, setEditItemID] = React.useState(null)

  // Adding Items to LocalStorage

  React.useEffect(() =>{
    localStorage.setItem('list', JSON.stringify(allTasks))
  }, [allTasks])

  // Add Item to the List

  const addItem = () => {
    if(!task){
      alert("Write down something...")
    } else if (task && !toggleBtn){
      setAllTasks(
        allTasks.map((elem) => {
          if(elem.id === editItemID){
            return {...elem, name: task}
          } else{
            return elem
          }
        })
      )
      setTask("")
      setToggleBtn(true)
    }
    else{
      const taskToAdd = {id: nanoid(), name: task}
      setAllTasks([...allTasks, taskToAdd])
      setTask("")
    }
  }

  // Edit Item

  const editItem = (id) => {
    const newEditItem = allTasks.find((task) => {
      return task.id === id
    })
    setToggleBtn(false)
    setTask(newEditItem.name)
    setEditItemID(id)
  }

  // Remove Item from the List

  const removeItem = (id) => {
    const updatedTasks = allTasks.filter((task) => {
      return task.id != id
    })
    setAllTasks(updatedTasks)
  }

  // Remove All Item from the List

  const removeAllItems = () => {
    setAllTasks([])
  }

  const displayTask = allTasks.map((elem)=>{
    return (<div key = {elem.id} className='task-box'>
        <h3>{elem.name}</h3>
        <div className='button-container'>
          <button onClick={() => editItem(elem.id)}>edit</button>
          <button className='delete-btn' onClick={() => removeItem(elem.id)}>delete</button>
        </div>
     </div>)
  })
  console.log(allTasks);
  return (
    <div className='main-container'>
      <h1>To-Do-List</h1>
      <div>
        <input className='input-box' type="text" placeholder='e.g.Dance' value = {task} onChange={(e) =>{
          setTask(e.target.value)
        }}/>
        {toggleBtn ? <button className='add-btn' onClick={addItem}>Add Task</button> : <button className='add-btn save' onClick={addItem}>save edit</button>}
      </div>
        <div className='task-conatiner'>
          {displayTask}
        </div>
        <button className='end-btn' onClick={removeAllItems}>{allTasks.length > 0 ? 'Delete All Tasks' : 'No Tasks to do'}</button>
    </div>
  )
}

export default App