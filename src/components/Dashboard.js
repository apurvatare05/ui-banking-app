import { useState } from "react";
import { Sidebar } from "./SideBar";
import { Home } from "./Home";
import { CreateAccountPage } from "../components/Accounts/CreateAccountPage";
import { TransactPage } from "../components/Transactions/TransactPage";
import { ViewTransaction } from "../components/Transactions/ViewTransactions";
import {notif} from './Notif';

export const Dashboard = (props) => {
    const [page, setPage] = useState('home');
    const [users, setUsers] = useState(props.users);
    const [notif, setNotif] = useState({message: '', style: ''});

    const changePageHandler = (pageName) => {

        setPage(pageName);

        console.log("Dashboard Users: ",props.users);
        if(pageName === 'withdraw') {
            setNotif({message: 'Select an account to withdraw money from.', style: 'left'});
        } 

        if(pageName === 'deposit') {
            setNotif({message: 'Select an account to deposit money.', style: 'left'});
        }
    }

    if(page === 'home') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <Home users={users} />
            </main>
        )
    }

    if(page === 'create-account') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <CreateAccountPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'ViewTransaction') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <ViewTransaction users={users} setUsers={setUsers} notif={notif} setNotif={setNotif}  page={page} />
            </main>
        )
    }

    if(page === 'deposit') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="add" page={page} />
            </main>
        )
    }

    if(page === 'withdraw') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="subtract" page={page} />
            </main>
        )
    }
}


