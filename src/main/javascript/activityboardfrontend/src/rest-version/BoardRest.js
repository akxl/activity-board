import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import update from 'immutability-helper';
import './BoardRest.css'

const uuid = require('uuid/v4');

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
        console.log(event.target.value)
        console.log(this.state.tickets);
        this.state.tickets[id].description = event.target.value;
    }

    addTicket(category) {
        let myId = uuid();
        this.setState(update(this.state, {
            tickets: {
                [myId]:
                    {$set: {
                        description: "New ticket",
                    category: category
                    }}
            }
        })
        )
    }

    removeTicket(id) {
        console.log(id)
        var filteredState = {}
        Object.keys(this.state.tickets).forEach((ticketKey) => {
            if (ticketKey != id.ticketKey) {
                filteredState[ticketKey] = this.state.tickets[ticketKey]
            }
        })
        console.log(filteredState);
        this.setState({tickets: filteredState});
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
                    <div>
                    <div>
                    <button type="button" className="close" ariaLabel="Close" onClick={(event)=>this.removeTicket({ticketKey})}>
                        <span ariaHidden="true">&times;</span>
                    </button>
                    </div>


                    <div>
                    <ContentEditable
                        html={this.state.tickets[ticketKey].description}
                        disabled={false}
                        onChange={(event) => {this.handleTicketChange(event, ticketKey)}}
                    />
                    </div>
                    </div>
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
                            <div className="columnHeader d-flex flex-row justify-content-between">
                                <div><h3>Backlog</h3></div>
                                <div><button type="button" className="btn btn-dark" onClick={(event) => this.addTicket('backlog')}>Add</button></div>   
                            </div> 
                            {tickets.backlog}
                        </div>
                    </div>
                    <div className="activityColumn border rounded col-sm">
                        <div className="inProgressColumn"
                            onDragOver={(event)=>this.onDragOver(event)}
                            onDrop={(event)=>this.onDrop(event, "inProgress")}
                        >
                            <div className="columnHeader d-flex flex-row justify-content-between">
                                <div><h3>In Progress</h3></div>
                                <div><button type="button" className="btn btn-dark" onClick={(event) => this.addTicket('inProgress')}>Add</button></div>   
                            </div>          
                            {tickets.inProgress}
                        </div>
                    </div>
                    <div className="activityColumn border rounded col-sm">
                        <div className="completedColumn"
                            onDragOver={(event)=>this.onDragOver(event)}
                            onDrop={(event)=>this.onDrop(event, "completed")}
                        >
                            <div className="columnHeader d-flex flex-row justify-content-between">
                                <div><h3>Completed</h3></div>
                                <div><button type="button" className="btn btn-dark" onClick={(event) => this.addTicket('completed')}>Add</button></div>   
                            </div> 
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