import { useEffect, useState } from "react";
import axios from "../api"
import TodoItem from "../components/TodoItem";

function Home() {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [todoList, setTodoList] = useState([]);
    useEffect(()=>{
        axios.get('/todos').then(res=>{
            const {data} = res;
            setTodoList(data.data);
        })
    },[])
    const handleAddTodo = () => {
        const params = {
            title: title,
            content: content
        }
        axios.post('/todos',params).then(res=>{
            const {data} = res;
            setTodoList(todoList.concat(data.data));
            console.log(data);
        }).catch(err=>{
            if(err.response.data){
                alert(err.response.data.details);
            }
        })
    }
    const handleEditTodo = () => {
        const params = {
            title: title,
            content: content
        }
        axios.post('/todos',params).then(res=>{
            const {data} = res;
            console.log(data);
        }).catch(err=>{
            if(err.response.data){
                alert(err.response.data.details);
            }
        })
    }
    const handleDelTodo = (id:any) => {
        axios.delete(`/todos/${id}`).then(res=>{
            const {data} = res;
            setTodoList(todoList.filter((todo:any)=>todo.id!==id));
        }).catch(err=>{
            if(err.response.data){
                alert(err.response.data.details);
            }
        })
    }
    return (
      <div>
         해야 할 일
         {todoList.map((todo:any) => (
             <TodoItem key={todo.id} id={todo.id} title={todo.title} content={todo.content} onEdit={handleEditTodo} onDelete={handleDelTodo}/>
            
         ))}
         <div>
            <input type="text" placeholder="제목을 입력해주세요" value={title} onChange={(e)=>setTitle(e.target.value)}/><textarea placeholder="내용을 입력해주세요" value={content} onChange={(e)=>setContent(e.target.value)}/><button type="button" onClick={handleAddTodo}>추가</button>
         </div>
      </div>
    );
  }
  
  export default Home;