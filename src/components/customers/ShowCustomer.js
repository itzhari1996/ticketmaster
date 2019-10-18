import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ShowCustomer extends React.Component{
    constructor(props){
        super()
        this.state={
            customer:props.location.state.customer
        }
    }

    returnHandle = (e)=>{
       this.props.history.goBack()
    }

    deleteHandle=(id)=>{
        if(window.confirm('Do you want to delete the Record?')){
            axios.delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`,{
                headers:{'x-auth':localStorage.getItem('authToken')}
            })
            .then(response=>{
                this.props.history.push('/customers')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    render(){
        return(
        <div>
            <h2>Customer Information</h2>
            <p><strong>ID:</strong> {this.state.customer._id}</p>
            <p><strong>Name:</strong> {this.state.customer.name}</p>
            <p><strong>Email:</strong> {this.state.customer.email}</p>
            <p><strong>Mobile:</strong> {this.state.customer.mobile}</p>
            <button onClick={this.returnHandle}>Back</button>
            <button><Link to="#" onClick={()=>{this.deleteHandle(this.state.customer._id)}}>Delete</Link><br/></button>
            <button><Link to={{ pathname:'/customers/edit',state: {customer:this.state.customer}}}>Edit</Link></button>
        </div>)
    }
}

export default ShowCustomer

