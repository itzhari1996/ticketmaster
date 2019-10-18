import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ListDepartments extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[],
            department:''
        }
    }

    componentDidMount(){

        axios.get('http://dct-ticket-master.herokuapp.com/departments',{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            this.setState({departments:response.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }

    deleteHandle=(id)=>{
        if(window.confirm('Do you want to delete the Department?')){
            axios.delete(`http://dct-ticket-master.herokuapp.com/departments/${id}`,{
                headers:{'x-auth':localStorage.getItem('authToken')}
            })
            .then(response=>{
                this.setState((prevState)=>{
                    const newState = prevState.departments.filter(department=> department._id !== response.data._id)
                    return {departments:newState}
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    changeHandle = (e)=>{
        const value=e.target.value
        this.setState({department:value})
    }

    addDepartment=()=>{
        if (this.state.department===''){
            alert('Department can\'t be Empty')
        }else{
            const formData={name:this.state.department}
            axios.post('http://dct-ticket-master.herokuapp.com/departments/',formData,{
                headers:{'x-auth':localStorage.getItem('authToken')}
            })
            .then(response=>{
                this.setState(prevState=>{
                    prevState.departments.push(response.data)
                    return {departments:prevState.departments,department:''}
                })
            })
            .catch(err=>{
                alert(err)
            })
        }
    }

    render(){
        return(
            <div>
                <h2>Listing Departments</h2>
                {this.state.departments.length>0?
                (<table border='1px' cellPadding='5px'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.departments.map((department,index)=>{
                        return(
                            <tr key={department._id}>
                                <td>{index+1}</td>
                                <td>{department.name}</td>
                                <td>
                                    <Link to="#" onClick={()=>{this.deleteHandle(department._id)}}>Remove</Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>):(<h4>No rows to Display</h4>)}
                <br/><input type='text' value={this.state.department} onChange={this.changeHandle} required/>&nbsp;&nbsp;
                <button><Link to='#' onClick={this.addDepartment}>Add Department</Link></button>
            </div>
        )
    }
}

export default ListDepartments