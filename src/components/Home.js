import { Account } from "../components/Accounts/Accounts";

export const Home = (props) => {
     const users = props.users;
    
  const Accounts = users.map((user, index) => {
    return (
        <Account fullname={user.FirstName + " " + user.LastName} type={user.AccountType} 
        accountNumber = {user.AccountNumber} 
        balance={"₹" + user.AccountBalance} />
    )
    })

    return (
      <section id="main-content">
        {Accounts}
      </section>
    )
  }

