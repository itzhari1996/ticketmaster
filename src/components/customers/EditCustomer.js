import React from 'react'
import Form from '../Form'
import axios from 'axios'

class EditCustomer extends React.Component{
    constructor(props){
        super()
        this.state={
            customer:props.location.state.customer
        }
    }

    handleSubmit=(formData)=>{
        const id= this.state.customer._id
        axios.put(`http://dct-ticket-master.herokuapp.com/customers/${id}`,formData,{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                alert('Customer Details edited successfully')
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
            <h2>Edit Customer Details</h2>
            <Form name={this.state.customer.name} email={this.state.customer.email} mobile={this.state.customer.mobile} handleSubmit={this.handleSubmit} handleReturn={this.handleReturn}/>
        </div>)
    }
}

export default EditCustomer