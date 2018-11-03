import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import update from 'immutability-helper';
import './BoardRest.css'

const uuid = require('uuid/v4');

const baseUrl = 'http://localhost:8080/api/ticket';

export default class BoardRest extends Component {
    constructor(props) {
        super(props);
        this.handleTicketChange = this.handleTicketChange.bind(this);
    }
    
    state = {
        tickets: {
            
        }
    }

    handleTicketChange(event, id) {
        this.updateTicket(id, event.target.value, this.state.tickets[id].category)
        this.state.tickets[id].description = event.target.value;
    }

    addTicket(category) {
        let myId = uuid();
        this.insertTicket(myId, "New ticket", category);
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

    displayRefreshedTickets(id, description, category) {
        this.setState(update(this.state, {
            tickets: {
                [id]:
                    {$set: {
                        description: description,
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
            if (ticketKey !== id.ticketKey) {
                filteredState[ticketKey] = this.state.tickets[ticketKey]
            }
            else {
                this.deleteTicket(ticketKey, this.state.tickets[ticketKey].description, this.state.tickets[ticketKey].category);
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
        console.log(id)
        let description = this.state.tickets[id].description;
        this.updateTicket(id, description, category);
        this.setState(update(this.state, {
            tickets: {
                [id]:
                    {$set: {
                        description: description,
                        category: category
                    }}
            }
        })
        )
    }

    refreshTickets() {
        fetch(baseUrl,{
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(JSON.stringify(data));
            data.forEach((ticket) => {
                this.displayRefreshedTickets(ticket.id, ticket.description, ticket.category)
            })
        }).catch((error) => {
            console.log(error.message);
        })
    }

    insertTicket(id, description, category) {
        let data = {
            id: id,
            description: description,
            category: category
        }
        fetch(baseUrl,{
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => {
            console.log(error.message);
        })
    }

    updateTicket(id, description, category) {
        let data = {
            id: id,
            description: description,
            category: category
        }
        fetch(baseUrl,{
            method: "PUT",
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => {
            console.log(error.message);
        })
    }

    deleteTicket(id, description, category) {
        let data = {
            id: id,
            description: description,
            category: category
        }
        fetch(baseUrl,{
            method: "DELETE",
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => {
            console.log(error.message);
        })
    }

    componentWillMount() {

        this.refreshTickets();

    }


    render() {

        var tickets = {
            backlog: [],
            inProgress: [],
            completed: []
        }

        Object.keys(this.state.tickets).forEach((ticketKey) => {
            tickets[this.state.tickets[ticketKey].category].push(
                <div key={ticketKey}
                    className="alert alert-dark"
                    draggable
                    onDragStart={(event) => this.onDragStart(event, ticketKey)}
                >
                    <div>
                    <div>
                    <button type="button" className="close" aria-label="Close" onClick={(event)=>this.removeTicket({ticketKey})}>
                        <span aria-hidden="true">&times;</span>
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