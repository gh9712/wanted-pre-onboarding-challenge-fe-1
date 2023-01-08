import React from 'react'

function TodoItem({id,title,content, onEdit, onDelete}:any) {
  return (
    <div>{title}<button type="button" onClick={()=>onEdit(id)}>수정</button><button type="button" onClick={()=>onDelete(id)}>삭제</button></div>
  )
}

export default TodoItem