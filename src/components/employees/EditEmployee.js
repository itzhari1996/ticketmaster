import React from 'react'
import Form from '../Form'
import axios from 'axios'

class EditEmployee extends React.Component{
    constructor(props){
        super()
        this.state={
            employee:props.location.state.employee,
            departments:undefined
        }
    }

    handleSubmit=(formData)=>{
        const id= this.state.employee._id
        axios.put(`http://dct-ticket-master.herokuapp.com/employees/${id}`,formData,{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                alert('Employee Details edited successfully')
                this.props.history.push('/employees')
            }
        })
        .catch(err=>{
            alert(err)
        })
    }

    componentDidMount(){
        axios.get('http://dct-ticket-master.herokuapp.com/departments/',{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            this.setState({departments:response.data})
        })
        .catch(err=>{
            alert(err)
        })
    }

    handleReturn=()=>{
        this.props.history.goBack()
    }

    render(){
        return(
        <div>
            <h2>Edit Employee Details</h2>
            {this.state.departments && <Form name={this.state.employee.name} email={this.state.employee.email} mobile={this.state.employee.mobile} department={this.state.employee.department._id} departments={this.state.departments} isEmployee={true} handleSubmit={this.handleSubmit}handleReturn={this.handleReturn} />}
        </div>)
    }
}

export default EditEmployee