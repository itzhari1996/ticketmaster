import React from 'react'
import Form from '../Form'
import axios from 'axios'

class AddEmployee extends React.Component{
    constructor(){
        super()
        this.state={
            departments:undefined
        }
    }

    handleSubmit=(formData)=>{
        axios.post('http://dct-ticket-master.herokuapp.com/employees/',formData,{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                alert('Employee added Succesfully')
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

    handleReturn = (e)=>{
        this.props.history.goBack()
    }

    render(){
        return(
            <div>
                <h2>Add New Employee</h2>
                {this.state.departments && <Form isEmployee={true} departments={this.state.departments} handleSubmit={this.handleSubmit} handleReturn={this.handleReturn}/>}
            </div>
        )
    }
}

export default AddEmployee