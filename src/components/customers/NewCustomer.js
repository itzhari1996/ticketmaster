import React from 'react'
import Form from '../Form'
import axios from 'axios'

class NewCustomer extends React.Component{

    handleSubmit=(formData)=>{
        axios.post('http://dct-ticket-master.herokuapp.com/customers/',formData,{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                alert('Customer added Succesfully')
                this.props.history.push('/customers')
            }
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
                <h2>Add New Customer</h2>
                <Form handleSubmit={this.handleSubmit} handleReturn={this.handleReturn}/>
            </div>
        )
    }
}

export default NewCustomer