import React, { Component } from 'react';
import './BoardRest.css'

export default class BoardRest extends Component {
    state = {
        tickets: [
            {
                description: "Cook",
                category: "backlog"
            },
            {
                description: "Bake",
                category: "inProgress"
            },
            {
                description: "Buy ingredients",
                category: "completed"
            },
            {
                description: "Mangoes",
                category: "backlog"
            }
        ]
    }

    onDragOver(event) {
        event.preventDefault();
    };

    onDragStart(event, id) {
        event.dataTransfer.setData("id", id);
    }

    onDrop(event, category) {
        let id = event.dataTransfer.getData("id");
        let tickets = this.state.tickets.filter((ticket) => {
            if (ticket.description === id) {
                ticket.category = category;
            }
            return ticket;
        });
        this.setState({
            ...this.state,
            tickets
        })
    }


    render() {

        var tickets = {
            backlog: [],
            inProgress: [],
            completed: []
        }

        this.state.tickets.forEach((ticket) => {
            tickets[ticket.category].push(
                <div key={ticket.description}
                    className="alert alert-dark"
                    draggable
                    onDragStart={(event) => this.onDragStart(event, ticket.description)}
                >
                    {ticket.description}
                </div>
            );
        });

        return(
            <div>
            <Navbar />
            <div className='container-fluid'>
                <div className='actualBoard row'>
                    <div className="activityColumn border rounded col-sm">
                        <div className="backlogColumn"
                            onDragOver={(event)=>this.onDragOver(event)}
                            onDrop={(event)=>this.onDrop(event, "backlog")}
                        >
                            <h3>Backlog</h3>
                            {tickets.backlog}
                        </div>
                    </div>
                    <div className="activityColumn border rounded col-sm">
                        <div className="inProgressColumn"
                            onDragOver={(event)=>this.onDragOver(event)}
                            onDrop={(event)=>this.onDrop(event, "inProgress")}
                        >
                            <h3>In Progress</h3>                        
                            {tickets.inProgress}
                        </div>
                    </div>
                    <div className="activityColumn border rounded col-sm">
                        <div className="completedColumn"
                            onDragOver={(event)=>this.onDragOver(event)}
                            onDrop={(event)=>this.onDrop(event, "completed")}
                        >
                            <h3>Completed</h3>
                            {tickets.completed}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}


class Navbar extends Component {

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Activity Board</a>
            </nav>
        )
    }

}