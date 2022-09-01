import React from 'react'
import "./Card.css"
function Card({ task }) {
    return (
        <div className='containerCrads' >
            <div className='cradH2'>{task.title}</div>
            <table className='containerCrad'>
                <tr className='titleCrad'>

                    <td className='tdTitleCrad'>category</td>
                    <td className='tdTitleCrad'>due Date</td>
                    <td className='tdTitleCrad'>estimate</td>
                    <td className='tdTitleCrad'>importance</td>
                </tr>
                <tr className='valueCrad'>
                    <td>{task.category_id?.name || ""}</td>
                    <td>{new Date(task.dueDate).toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}</td>
                    <td>{task.estimate}</td>
                    <td >
                        <div className={task.importance}>
                            {task.importance === "null" ? "" : `${task.importance}`}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
export default Card