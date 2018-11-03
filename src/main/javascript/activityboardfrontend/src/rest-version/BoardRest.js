import React, { Component } from 'react';
import './BoardRest.css'

export default class BoardRest extends Component {
    constructor(props) {
        super(props);
        this.handleTicketChange = this.handleTicketChange.bind(this);
    }
    
    state = {
        tickets: {
            id1: {
                description: "Cook",
                category: "backlog"
            },
            id2: {
                description: "Bake",
                category: "inProgress"
            },
            id3: {
                description: "Buy ingredients",
                category: "completed"
            },
            id4: {
                description: "Mangoes",
                category: "backlog"
            }
        }
    }

    handleTicketChange(event, id) {
        console.log(this.state.tickets);
        this.state.tickets[id].description = event.target.values;
    }

    onDragOver(event) {
        event.preventDefault();
    };

    onDragStart(event, id) {
        event.dataTransfer.setData("id", id);
    }

    onDrop(event, category) {
        let id = event.dataTransfer.getData("id");
        let tickets = Object.values(this.state.tickets).filter((ticket) => {
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

        Object.keys(this.state.tickets).forEach((ticketKey) => {
            tickets[this.state.tickets[ticketKey].category].push(
                <div key={this.state.tickets[ticketKey].description}
                    className="alert alert-dark"
                    draggable
                    onDragStart={(event) => this.onDragStart(event, this.state.tickets[ticketKey].description)}
                >
                    <p
                        contentEditable='true'
                        onChange={(event)=>this.handleTicketChange(event, ticketKey)}
                    >
                    {this.state.tickets[ticketKey].description}
                    </p>
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