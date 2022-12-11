// hooks
import { useEffect, useState } from "react";
// config file
import { useFirestore } from "../../hooks/useFirestore";

export const TransactionForm = ({uid}) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const {addDocument, response} = useFirestore('transactions');

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name,
            amount
        })
    }

    // reset form
    useEffect(() => {
        if (response.success) {
            setAmount('')
            setName('')
        }
    }, [response.success])

  return (
      <>
          <h3>Add a Transaction</h3>
          <form onSubmit={handleSubmit}>
              <label htmlFor="name">Transaction name:</label>
              <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
              />
              <label htmlFor="amount">Amount ($):</label>
              <input
                  type="number"
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  required
              />
              {!response.isPending && <button>Add Transaction</button>}
              {response.isPending && <button disabled>Adding ...</button>}
          </form>
      </>
  )
}
