import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Content = () => {
  const[todo,setTodo]=useState("")
  const[todos,setTodos]=useState([])
  const[showFinished,setshowFinished]=useState(false)
  
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  useEffect(()=>{
    let todostring =  localStorage.getItem("todos")
    console.log(todostring);

    if(todostring){
      let t =  JSON.parse(localStorage.getItem("todos"))
      setTodos(t)
    }
  },[])

  const handleDone=()=>{

  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  const handleCheckbox=(e)=>{
    let id=e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  const handleClear=()=>{
    setTodos([])
  }

  const handleDelete=(e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })

    setTodos(newTodos)
  }

  const handleEdit =(e,id)=>{
    let t=todos.filter((item) => item.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id !== id
    })

    setTodos(newTodos)
  }

  const handleAdd = () => {
    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false,
    };
  
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodo(""); // Clear the input after adding
  };

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  return (
    <div className='bg-slate-400 min-h-[80vh]'>
        <div className="flex justify-center">
        <div className=' text-black font-bold'>Add a task</div>
        <input onChange={handleChange} value={todo} type="text" className='w-80 mx-5' />
        <button onClick={handleAdd} disabled={todo.length < 3} className='disabled:bg-slate-600 bg-slate-700 text-white w-20 font-bold'>Add</button>
        </div>

        <div className='my-10 text-black font-bold font-extrabold'>Your tasks</div>

        <div className='bg-slate-700 text-white p-4 mx-auto font-semibold w-full max-w-lg border-2 border-gray-800'><input type="checkbox" onChange={toggleFinished} checked={showFinished} className=''/>Show Finished tasks</div>

        <div className="w-full max-w-lg h-80 border-2 border-gray-800 p-4 mx-auto bg-gray-100 overflow-auto" id="output">
          {todos.length === 0 && <div className='flex'>No todos to display</div>}
          {todos.map(item=>{

          return (showFinished || !item.isCompleted) && <div key={item.id} className='flex justify-evenly my-2'>
            <input name={item.id} type="checkbox" onChange={handleCheckbox} id="" className="myCheckbox" checked={item.isCompleted}/>
          <div className="text w-full max-w-sm">
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="flex h-full buttons">
          <button onClick={(e)=>{handleEdit(e,item.id)}} className=' text-white bg-slate-700 mx-3 w-20 rounded-md'>Edit</button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className=' text-white bg-slate-700 mx-3 w-20 rounded-md'>Delete</button>
          </div>
          </div>
          })}
        </div>

        <button onClick={handleClear} className=' text-white bg-slate-700 mx-9 w-20'>Clear</button>
        <button onClick={handleDone} className=' text-white bg-slate-700 mx-9 w-20'>Done</button>
    </div>
  )
}

export default Content
