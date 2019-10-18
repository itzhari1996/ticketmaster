import React from 'react'

class Form extends React.Component{
    constructor(props){
        super()
        this.state={
            isEmployee:props.isEmployee||false,
            name:props.name||'',
            email:props.email||'',
            mobile:props.mobile||'',
            departments:props.departments||[],
            department:props.department||''
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleClear=(e)=>{
        e.preventDefault()
        this.setState({name:'',email:'',mobile:''})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department
        }
        this.props.handleSubmit(formData)
    }

    handleReturn=()=>{
        this.props.handleReturn()
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name:&nbsp;</label>
                    <input id='name' name='name' type='text' value={this.state.name} onChange={this.handleChange} required/>
                </div><br/>
                <div>
                    <label>Email:&nbsp;</label>
                    <input id='email' name='email' type='email' value={this.state.email} onChange={this.handleChange} required/>
                </div><br/>
                <div>
                    <label>Mobile:&nbsp;</label>
                    <input id='mobile' name='mobile' type='text' value={this.state.mobile} onChange={this.handleChange} required/>
                </div><br/>
                {this.state.isEmployee && (
                    <React.Fragment>
                    <div>
                        <label>Department:&nbsp;</label>
                        <select name='department' onChange={this.handleChange} value={this.state.department}>
                            {this.state.departments.map(department=>{
                                return (<option key={department._id} value={department._id}>{department.name}</option>)
                            })}
                        </select>
                    </div><br/>
                    </React.Fragment>
                )}
                <div>
                    <input type='button' onClick={this.handleReturn} value='Back'/>&nbsp;
                    <input type="button" onClick={this.handleClear} value='Clear'/>&nbsp;
                    <input type='submit'/>
                </div>
                </form>
            </div>
        )
    }

}

export default Form