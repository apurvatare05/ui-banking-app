import { useState, useEffect } from "react";
import { Notif } from "../Notif";
import {Dashboard} from "../Dashboard"
export const CreateAccountPage = (props) => {

    const [notif, setNotif] = useState({ message: 'Create a new client account.', style: 'left' });
    
    const [initialBalance, setInitialBalance] = useState(0);
    const [accounts, setAccounts] = useState();
    const [accountType, setAccountsType] = useState();
    const[isData, setIsData] = useState(false);

    useEffect(() => {
        getAccountTypeDetails();
    },[]);
 

    const getAccountTypeDetails = async () =>
    {
        let url = "http://localhost:8090/api/AccountTypeDetails"
        const result = await fetch(url)
            .then(response => response.json())
            .then(data => {
                setIsData(true);
                setAccounts(data);
            });
    }

    const onAccountTypeChange = (e) => {
        setAccountsType(e.target.value);
        console.log('Account Type: ' + accountType);
    }

    const createNewAccount = async (accountDetails) => {

        accountDetails = JSON.stringify({ accountDetails });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept':'application/json' },
            body: accountDetails
        };
        let url = "http://localhost:8090/api/AccountDetails"
        const result = await fetch(url, requestOptions)
            .then(response => {response.json(); })
            .then(data => {
                console.log('Response Message: ', data);
                setNotif({message: 'Account Created Successfully', style: 'left'});
                // setisLogin(true);
                if(data.includes('successful')){
                    <Dashboard users={accountDetails}/>
                }
            });
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        const user = event.target.elements;
        
        console.log(accountType);
        const accountDetails = {
            UserName: user.username.value,
            UserEmail: user.UserEmail.value,
            Password: user.Password.value,
            FirstName: user.firstname.value,
            LastName: user.lastname.value,
            TransactionReason: user.TransactionReason.value,
            AccountTypeID: user.AccountType.value,
            PhoneNumber: user.PhoneNumber.value,
            AccountBalance: user.initialBalance.value,
            TransactionAmount: user.initialBalance.value,
        }

        if (accountDetails.UserEmail) {
            const isSaved = createNewAccount(accountDetails);
            if (isSaved) {
                user.email.value = '';
                user.password.value = '';
                user.fullname.value = '';
                user.initialBalance.value = setInitialBalance(1000);
            }
        }
    }

    const onInitialBalance = event => {
        const amount = event.target.value || 0;
        setInitialBalance(amount);
    }


    return (
        <section id="main-content">
            <form id="form" onSubmit={handleCreateAccount}>
                <h1>Create Account</h1>
                <Notif message={notif.message} style={notif.style} />

                <label htmlFor="username">User name</label>
                <input id="username" type="text" autoComplete="off" name="username" />
                <hr />

                <label htmlFor="firstname">First name</label>
                <input id="firstname" type="text" autoComplete="off" name="firstname" />
                <hr />

                <label htmlFor="lastname">Last name</label>
                <input id="lastname" type="text" autoComplete="off" name="lastname" />
                <hr />
                
                <label htmlFor="phonenumber">Phone Number</label>
                <input id="PhoneNumber" type="text" autoComplete="off" name="phonenumber" />
                <hr />

                <label htmlFor="TransactionReason">Reason</label>
                <input id="TransactionReason" type="text" autoComplete="off" name="TransactionReason" />
                <hr />

                <label htmlFor="AccountBalance">Initial balance</label>
                <input id="AccountBalance" type="text" value={initialBalance} onChange={onInitialBalance} name="initialBalance" className="right" />

                <label htmlFor="AccountType">Account Type</label>
                <select name="AccountType" onChange={onAccountTypeChange}>
                    {isData && accounts.map(user => {
                        return <option value={user.AccountTypeID}>{user.AccountType} Account</option>})
                    }
                </select>
                <hr />
                <label htmlFor="UserEmail">Email Address</label>
                <input id="UserEmail" type="email" name="email" />

                <label htmlFor="Password">Password</label>
                <input id="Password" type="password" name="password" />

                <input value="Create Account" className="btn" type="submit" />
            </form>
        </section>
    )
}