import { useState } from "react";
import { Notif } from "../Notif";
import {transact} from "../Utilities/Utils";

export const TransactPage = (props) => {
    const users = props.users;
    const setNotif = props.setNotif;
    const notif = props.notif;
    const [accounts, setAccounts] = useState(users);
    const [selectedAccount, setSelectedAccount] = useState({ balance: 0 });
    const [transactionAmount, setTransAmount] = useState(0);
    const [TransactionReason, setReason] = useState();
    const [ActionType, setAction] = useState(props.page);

    const options = accounts.map(user => {
        return <option value={user.AccountNumber}>{user.AccountType + " Account "} {user.FirstName + " " + user.LastName} #{user.AccountNumber}</option>
    });

    const displayBalance = (e) => {
        setNotif(notif);
        const selectedNumber = e.target.value;

        for (const user of accounts) {
            if (user.AccountNumber.toLocaleString() === selectedNumber) {
                setSelectedAccount({ balance: user.AccountBalance });
                break;
            }
        }
    }
    const onReason = (e) => {
        const TransactionReason = e.target.value;
        setReason(TransactionReason);
    }

    const onTransaction = (e) => {
        const amount = e.target.value;
        setTransAmount(amount);
    }

    const processTransfer = async (e) => {
        e.preventDefault();
        const amount = e.target.elements.amount.value;
        const accountNumber = e.target.elements.account.value;

        if (amount > 0 && accountNumber !== "0") {
            for (const user of accounts) {
                if (user.AccountNumber.toLocaleString() === accountNumber) {
                    if(user.AccountBalance < amount && props.page == 'withdraw'){
                        setNotif({ message: 'Withdrawal Failed: Insufficient Balance', style: 'center' });
                    }
                    else {
                    const balance = transact(user.AccountNumber, amount, props.type, users);
                    setAccounts(users)
                    setAction(props.page);
                    setSelectedAccount({ balance: user.AccountBalance });
                    let TransactionDetails = {
                        UserID: user.UserID,
                        AccountID: user.AccountNumber,
                        AccountType: user.AccountType,
                        ActionType: ActionType,
                        AccountBalance: user.AccountBalance,
                        TransactionAmount: amount,
                        TransactionReason: TransactionReason
                    }
                    console.log(TransactionDetails);
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ TransactionDetails })
                    };
                    let url = "http://localhost:8090/api/Transactions";
                    const result = await fetch(url, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Response Message: ', data);
                            setNotif({ message: 'Transaction Saved Successfully', style: 'left' });
                        });
                    setTransAmount(0);
                    setReason('');
                    setNotif({ message: `${(props.page)} successful.`, style: 'success' });
                    displayBalance();
                    }
                }
            }

        }
        else {
            setNotif({ message: `${(props.page)} failed.`, style: 'danger' });
        }
    }
    const icon = props.page === 'withdraw' ? 'bx bx-down-arrow-alt' : 'bx bx-up-arrow-alt';

    return (
        <section id="main-content">
            <form id="form" onSubmit={processTransfer}>
                <h1>{props.page}</h1>
                <Notif message={notif.message} style={notif.style} />
                <label>Account</label>
                <select name="account" onChange={displayBalance}>
                    <option value="0">Select Account</option>
                    {options}
                </select>

                <label>Current balance</label>
                <input type="text" className="right" value={(selectedAccount.balance)} disabled />

                <div className="transfer-icon"><i className={icon}></i></div>
                <label>Amount to {props.page}</label>
                <input type="text" name="amount" value={transactionAmount} onChange={onTransaction} autoComplete="off" className="right big-input" />

                <label>Transaction Reason</label>
                <input type="text" name="TransactionReason" value={TransactionReason} onChange={onReason} autoComplete="off" className="right big-input" />
                <button type="submit" className="btn">{props.page}</button>
            </form>
        </section>
    )
}
