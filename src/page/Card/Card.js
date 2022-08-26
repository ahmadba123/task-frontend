import React from 'react'
import "./Card.css"
function Card({ task }) {
    return (
        <div className='containerCrads' >
            <p className='cradH2'>{task.title}</p>
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
                    <td>{task.importance}</td>
                </tr>
            </table>


            {/* <div className='titleCrad'>
                <h2></h2>
                <p>category</p>
                <p>due Date</p>
                <p>estmate</p>
                <p>importance</p>
            </div>
            <div className='valueCrad'>
                <p>category</p>
                <p>due Date</p>
                <p>estmate</p>
                <p>importance</p>

            </div> */}

        </div>
    )
}

export default Card