import './App.css'
import React from 'react';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Home'
import CustomersList from './components/customers/List'
import ShowCustomer from './components/customers/ShowCustomer'
import NewCustomer from './components/customers/NewCustomer'
import EditCustomer from './components/customers/EditCustomer'

import ListEmployees from './components/employees/ListEmployees'
import ShowEmployee from './components/employees/ShowEmployee'
import AddEmployee from './components/employees/AddEmployee'
import EditEmployee from './components/employees/EditEmployee'

import ListDepartments from './components/departments/ListDepartments'

import ListTickets from './components/tickets/Tickets'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to='/'>Home</Link>&nbsp;|&nbsp;
        <Link to='/customers'>Customers</Link>&nbsp;|&nbsp;
        <Link to='/employees'>Employees</Link>&nbsp;|&nbsp;
        <Link to='/departments'>Departments</Link>&nbsp;|&nbsp;
        <Link to='/tickets'>Tickets</Link>&nbsp;|&nbsp;

        <Switch>
        <Route path='/' component={Home} exact={true}/>
        <Route path='/customers' component={CustomersList} exact={true}/>
        <Route path='/customers/add' component={NewCustomer}/>
        <Route path='/customers/edit' component={EditCustomer}/>
        <Route path='/customers/:id' component={ShowCustomer}/>

        <Route path ='/employees' component={ListEmployees} exact={true}/>
        <Route path='/employees/add' component={AddEmployee}/>
        <Route path='/employees/edit' component={EditEmployee}/>
        <Route path='/employees/:id' component={ShowEmployee}/>

        <Route path='/departments' component={ListDepartments} exact={true}/>

        <Route path='/tickets' component={ListTickets}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
