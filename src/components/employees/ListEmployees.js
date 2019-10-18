import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ListEmployees extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[]
        }
    }

    componentDidMount(){

        axios.get('http://dct-ticket-master.herokuapp.com/employees',{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            this.setState({employees:response.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <h2>Listing employees</h2>
                {this.state.employees.length>0?
                (<table border='1px' cellPadding='5px'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.employees.map((employee,index)=>{
                        return(
                            <tr key={employee._id}>
                                <td>{index+1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.department && employee.department.name}</td>
                                <td>
                                    <Link to={{ pathname: `/employees/${index+1}`,state: {employee: employee}}}>Show</Link><br/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>):(<h4>No rows to Display</h4>)}
                <br/><Link to='/employees/add'>Add Employee</Link>
            </div>
        )
    }
}

export default ListEmployees