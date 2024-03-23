import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({item, handelCheck, handleDelete}) => {
  return (
    <li className='item'>
        <input
        type ="checkbox"
        onChange={() =>handelCheck(item.id)}
        Checked ={item.cheked}
        />
        <label
        style={(item.cheked)?{textDecoration: 'line-through'} : null}
        onDoubleClick={() =>handelCheck(item.id)}>{item.item}</label>
        <FaTrashAlt
        role = " button "
        onClick={() => handleDelete(item.id)}
        tabIndex= "0"
        aria-label={`Delete ${item.item}`}
        
        />
      </li>
  )
}

export default LineItem