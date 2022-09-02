import React from 'react'

const EventList = (props) => {

    return (
        <div className="wh-100">
            <table className="table">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {props.events.map((event, i) =>
                        <tr key={i}>
                            <td>{event.name} </td>
                            <td>{event.eventDate}</td>
                            <td>{event.description}</td>
                            <td>  
                                <div className="d-flex justify-content-center gap-3">
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
    
export default EventList;