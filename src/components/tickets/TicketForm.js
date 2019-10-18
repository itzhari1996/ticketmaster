import React from 'react'

class TicketForm extends React.Component{
    constructor(props){
        super()
        this.state={
            customer:'',
            department:'',
            priority:'',
            message:'',
            departments:props.departments,
            customers:props.customers
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandle=(e)=>{
        e.preventDefault()
        let result = "DCT-"
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < 3; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const formData={
            code:result,
            customer:this.state.customer,
            department:this.state.department,
            priority:this.state.priority,
            message:this.state.message
        }
        this.props.submitHandle(formData)
    }

    resetHandle=()=>{
        this.setState({customer:'',department:'',priority:'',message:'',})
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitHandle}>
                    <fieldset>
                    <legend>Add Ticket&nbsp;</legend>
                    <div>
                        <label>Name:&nbsp;</label>
                        <select name='customer' onChange={this.handleChange} value={this.state.customer}>
                        <option value='' default disabled>Select Name</option>
                            {this.state.customers.map(customer=>{
                                return (<option key={customer._id} value={customer._id}>{customer.name}</option>)
                            })}
                        </select>
                    </div><br/>
                    <div>
                        <label>Department:&nbsp;</label>
                        <select name='department' onChange={this.handleChange} value={this.state.department}>
                            <option value='' default disabled>Select Department</option>
                            {this.state.departments.map(department=>{
                                return (<option key={department._id} value={department._id}>{department.name}</option>)
                            })}
                        </select>
                    </div><br/>
                    <div>
                        <label>Priority:&nbsp;
                        <input id='high' type='radio' name='priority' value='High' onChange={this.handleChange}/>
                        <label htmlFor='high'>High</label>
                        <input id='medium' type='radio' name='priority' value='Medium' onChange={this.handleChange}/>
                        <label htmlFor='medium'>Medium</label>
                        <input id='low' type='radio' name='priority' value='Low' onChange={this.handleChange}/>
                        <label htmlFor='low'>Low</label>
                        </label>
                    </div><br/>
                    <div>
                        <label>Message:&nbsp;</label>
                        <textarea id='message' name='message' value={this.state.message} onChange={this.handleChange} required/>
                    </div><br/>
                    <input type='submit'/>&nbsp;
                    <input type='button' value='Reset' onClick={this.resetHandle}/>
                </fieldset>
                </form>
            </div>
        )
    }
}

export default TicketForm