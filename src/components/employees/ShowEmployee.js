import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ShowEmployee extends React.Component{
    constructor(props){
        super()
        this.state={
            employee:props.location.state.employee
        }
    }

    returnHandle = (e)=>{
        this.props.history.goBack()
    }

    deleteHandle=(id)=>{
        if(window.confirm('Do you want to Delete the record?')){
            axios.delete(`http://dct-ticket-master.herokuapp.com/employees/${id}`,{
                headers:{'x-auth':localStorage.getItem('authToken')}
            })
            .then(response=>{
                this.props.history.goBack()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    render(){
        return(
        <div>
            <h2>Employee Information</h2>
            <p><strong>ID:</strong> {this.state.employee._id}</p>
            <p><strong>Name:</strong> {this.state.employee.name}</p>
            <p><strong>Email:</strong> {this.state.employee.email}</p>
            <p><strong>Mobile:</strong> {this.state.employee.mobile}</p>
            <p><strong>Dept:</strong> {this.state.employee.department.name}</p>
            <button onClick={this.returnHandle}>Back</button>&nbsp;
            <button><Link to="#" onClick={()=>{this.deleteHandle(this.state.employee._id)}}>Delete</Link></button>&nbsp;
            <button><Link to={{ pathname:'/employees/edit',state: {employee:this.state.employee}}}>Edit</Link></button>
        </div>)
    }
}

export default ShowEmployee

