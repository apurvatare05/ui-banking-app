
import React from "react";

export const Account = (props) => {
    
    const {type, accountNumber, balance, fullname} = props;
    
    return (
      <div className="account">
          <div className="details">
              <AccountHolder fullname={fullname} />
              <AccountType type={type} />
              <AccountNumber accountNumber={accountNumber} />
          </div>
          <AccountBalance balance= {balance} />
      </div>
    )
  }

export const AccountHolder = (props) => {
    return (
      <h1>{props.fullname}</h1>
    )
  }
  
  
export const AccountType = (props) => {
    return (
      <h3>{props.type}</h3>
    )
  }
  
  
export const AccountNumber = (props) => {
    return (
      <div>Account Number - #{props.accountNumber}</div>
    )
  }
  
  
export const AccountBalance = (props) => {
    const balance = props.balance;
    return (
      <div className="balance">{balance}</div>
    )
  }

