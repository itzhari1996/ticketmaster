import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class CustomersList extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[],
            selectAll:false,
            selected:[]
        }
    }

    componentDidMount(){
        axios.get('http://dct-ticket-master.herokuapp.com/customers',{
            headers:{'x-auth':localStorage.getItem('authToken')}
        })
        .then(response=>{
            this.setState({customers:response.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }

    checkAllHandle=(e)=>{
        const custNames=[]
        const value=e.target.checked
        if (value){
            this.state.customers.map(customer=>custNames.push(customer._id))
        }
        this.setState({selected:custNames,selectAll:value})
    }

    deleteChecked=()=>{
        const promiseList=[]
        this.state.selected.forEach(id=>{
            promiseList.push(axios.delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`,{headers:{'x-auth':localStorage.getItem('authToken')}}))
        })
        Promise.all(promiseList).then(value=>{
            this.setState(prevState=>{
                const customers=prevState.customers.filter(cust=> !this.state.selected.includes(cust._id))
                return{customers:customers,selected:[],selectAll:false}
            })
        })
        .catch(err=>{
            alert(err)
        })
    }

    eachCheckHandle=(e,id)=>{
        const value=e.target.checked
        if (value && this.state.selected.length === this.state.customers.length-1){
            this.setState(prevState=>{   
                prevState.selected.push(id)
                return {selected:prevState.selected,selectAll:true}
            })
        }else if(value){
            this.setState(prevState=>{   
                prevState.selected.push(id)
                return {selected:prevState.selected}
            })
        }else{
            this.setState(prevState=>{
                const index = prevState.selected.indexOf(id)
                prevState.selected.splice(index,1)
                return {selected:prevState.selected,selectAll:false}
            })
        }
        
    }

    checkCancel=()=>{
        this.setState({selected:[],selectAll:false})
    }

    render(){
        const list=[].concat(this.state.selected)
        return(
            <div>
                <h2>Listing Customers</h2>
                {this.state.customers.length>0?
                (<table border='1px' cellPadding='5px'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                            <th>Check/Uncheck &nbsp; <input type='checkbox' checked={this.state.selectAll} onChange={this.checkAllHandle}/></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.customers.map((customer,index)=>{
                        return(
                            <tr key={customer._id}>
                                <td>{index+1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.mobile}</td>
                                <td>
                                    <Link to={{ pathname: `/customers/${index+1}`,state: {customer: customer}}}>Show</Link><br/>
                                </td>
                                <td>
                                    <input type='checkbox' checked={this.state.selectAll || list.includes(customer._id)} onChange={(e)=>{this.eachCheckHandle(e,customer._id)}}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                ):(<h4>No rows to Display</h4>)}
                <br/><div>
                    <button onClick={this.deleteChecked}>Delete</button>&nbsp;&nbsp;
                    <button onClick={this.checkCancel}>Cancel</button>
                </div>
                <br/><button><Link to='/customers/add'>Add Customer</Link></button>
            </div>
        )
    }
}

export default CustomersList