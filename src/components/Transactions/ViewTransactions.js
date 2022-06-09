import { useState, useEffect } from "react";
import { Notif } from "../Notif";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const ViewTransaction = (props) => {
    const users = props.users;
    const setNotif = props.setNotif;
    const [rowData, setRowData] = useState(users);
    
    const [columnDefs, setColumnDefs] = useState([
        {field: 'AccountID', filter: true},
        {field: 'AccountType'},
        {field: 'ActionType'},
        {field: 'TransactionDate'},
        {field: 'TransactionReason'},
        {field: 'AccountBalance', filter: true},

        
      ]);
    const [accounts, setAccounts] = useState(users);

    const options = accounts.map(user => {
        return <option value={user.AccountNumber}>{user.AccountType + " Account "} {user.FirstName + " " + user.LastName} #{user.AccountNumber}</option>
    });

    const onAccountChange = async (e) => {
        const selectedNumber = e.target.value;
        for (const user of accounts) {
            if (user.AccountNumber.toLocaleString() === selectedNumber) {
                let TransDetails = {
                    UserID: user.UserID,
                    AccountID: user.AccountNumber
                }
        
                let transUrl = `http://localhost:8090/api/Transactions?UserID=${encodeURIComponent(TransDetails.UserID)}&AccountID=${encodeURIComponent(TransDetails.AccountID)}`
                console.log(transUrl);
                const clients = await fetch(transUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.length > 0) {
                            setRowData(data);
                            setNotif('View Transactions');
                        }
                    });
        
            }
        }
        
    }


    return (
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            <section id="main-content">
                <form id="form" >
                    <h1>{props.page}</h1>
                    {/* <Notif message={notif.message} style={notif.style} /> */}
                    <label>Account</label>
                    <select name="account" onChange={onAccountChange}>
                        <option value="0">Select Account</option>
                        {options}
                    </select>
                </form>
            </section>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    )
}