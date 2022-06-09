
export function transact(number, amount, type,users)
{
    let multiplier = 1;
    if(type === 'add' || type === 'credit') multiplier = 1;
    if(type === 'subtract' || type === 'debit') multiplier = -1;
    for(const user of users) {
        if(user.AccountNumber === number) {
            user.AccountBalance += amount * multiplier;
        }
    }
    
}
