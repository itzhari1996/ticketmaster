import React from 'react'
import axios from 'axios'
import TicketForm from './TicketForm'
import SomeStats from './SomeStats'
import {Link} from 'react-router-dom'

class ListTickets extends React.Component{

    constructor(){
        super()
        this.state={
            ticketsData:[],
            tickets:[],
            customers:[],
            departments:[],
            chartKey:'All'
        }
    }

    apiGetRequest=(arrayName,url,headers={})=>{
        axios.get(url,headers)
        .then(response=>{
            arrayName==='tickets'?this.setState({[arrayName]:response.data,ticketsData:response.data}):this.setState({[arrayName]:response.data})
        })
        .catch(err=>{
            alert(err)
        })
    }

    objectSearch=(array,id)=>{
        const result=array.find(item=>item._id===id)
        return result?result.name:''
    }
    
    componentDidMount(){
        const header={headers:{'x-auth':localStorage.getItem('authToken')}}
        this.apiGetRequest('tickets','http://dct-ticket-master.herokuapp.com/tickets',header)
        this.apiGetRequest('departments','http://dct-ticket-master.herokuapp.com/departments',header)
        this.apiGetRequest('customers','http://dct-ticket-master.herokuapp.com/customers',header)
    }

    handleChecked=(e,ticket)=>{
        const id=ticket._id
        const value=e.target.checked
        axios.put(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,{isResolved:value},{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            this.setState(prevState=>{
                const item=prevState.tickets.find(i=>i._id===response.data._id)
                item.isResolved=!(item.isResolved)
                return {tickets:prevState.tickets}
            })
        })
    }

    submitHandle=(formData)=>{
        axios.post('http://dct-ticket-master.herokuapp.com/tickets',formData,{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                alert('Ticket added Succesfully')
                this.setState(prevState=>{
                    prevState.tickets.push(response.data)
                    return {tickets:prevState.tickets}
                })
            }
        })
        .catch(err=>{
            alert(err)
        })
    }

    deleteHandle=(id)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            this.setState(prevState=>{
                const tickets=prevState.tickets.filter(ticket=>ticket._id!==id)
                return {tickets}
            })
        })
        .catch(err=>{
            alert(err)
        })
    }
    
    sortTickets=(e)=>{
        const value=e.target.value
        switch(value){
        case 'All':
            this.setState({chartKey:'All',tickets:this.state.ticketsData});
            break;
        case 'High':
            this.setState({chartKey:'High',tickets:this.state.ticketsData.filter(tckt=>tckt.priority==='High')});
            break;
        case 'Medium':
            this.setState({chartKey:'Medium',tickets:this.state.ticketsData.filter(tckt=>tckt.priority==='Medium')});
            break;
        case 'Low':
            this.setState({chartKey:'Low',tickets:this.state.ticketsData.filter(tckt=>tckt.priority==='Low')});
            break;
        default:
            return undefined
        }
    }

    render(){
        return(
        <div>
            <h2>Ticket Master</h2>
            <h4>Listing Tickets - {this.state.tickets.length}</h4>
            <div>
                <button value='All' onClick={this.sortTickets}>All</button>
                <button value='High' onClick={this.sortTickets}>High</button>
                <button value='Medium' onClick={this.sortTickets}>Medium</button>
                <button value='Low' onClick={this.sortTickets}>Low</button>
            </div>
            <div>
                {this.state.tickets.length>0?
                    (<table border='1px' cellPadding='5px'>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Dept</th>
                                <th>Priority</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.tickets.map((ticket)=>{
                            return(
                                <tr key={ticket._id}>
                                    <td>{ticket.code}</td>
                                    <td>{this.state.customers[0] && this.objectSearch(this.state.customers,ticket.customer)}</td>
                                    <td>{this.state.departments[0] && this.objectSearch(this.state.departments,ticket.department)}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{ticket.message}</td>
                                    <td>
                                        <div>
                                        <input type='checkbox' checked={ticket.isResolved} onChange={(e)=>{this.handleChecked(e,ticket)}}/>
                                        </div>
                                    </td>
                                    <td><Link to='#' onClick={()=>{this.deleteHandle(ticket._id)}}>Delete</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>):(<h4>No rows to Display</h4>)}
                </div>
                <div>
                    <br/>{(this.state.departments[0] && this.state.customers[0]) && <TicketForm departments={this.state.departments} customers={this.state.customers} submitHandle={this.submitHandle}/>}
                </div>
                <div>
                    {this.state.tickets[0] && <progress className='progress' value={this.state.tickets.filter(item=>item.isResolved).length} max={this.state.tickets.length}></progress>}
                </div>
                <div>
                    {this.state.tickets[0] && this.state.departments[0] && <SomeStats key={this.state.chartKey} tickets={this.state.tickets} departments={this.state.departments}/>}
                </div>
        </div>)
    }
}

export default ListTickets