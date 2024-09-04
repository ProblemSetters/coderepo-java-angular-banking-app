## User Story
Currently, there are no daily or monthly transaction limits on cards. To improve user security, we need to implement transaction limits in the application:

1.	**Daily Transaction Limit**: Users should be restricted from making transactions that exceed a certain amount in a single day.
2.	**Monthly Transaction Limit**: Users should not be allowed to transfer more than a specified total amount in one month.

These **limits can be set as static values for now** and do not need to be customizable at the user level.

## Acceptance Criteria
1. **Daily Transaction Limit Enforcement:**
   - Ensure that users cannot make transactions exceeding the daily transaction limit.
   - If a user attempts to make a transaction that would cause the total daily transactions to exceed the limit, the transaction should be blocked, and an appropriate error message should be returned.

2. **Monthly Transaction Limit Enforcement:**
   - Ensure that users cannot transfer more than the specified monthly transaction limit.
   - If a user attempts to make a transaction that would cause the total monthly transactions to exceed the limit, the transaction should be blocked, and an appropriate error message should be returned.

3. **Static Limit Values:**
   - Implement the daily and monthly transaction limits as static values as part of `Card` entity itself.
   - The values for these limits should be hardcoded and not configurable by users.

4. **Error Handling:**
   - Ensure that appropriate error messages are displayed to the user when a transaction is blocked due to exceeding the daily or monthly limits.
   - The error messages should clearly indicate which limit was exceeded.

5. **Code Quality:**
   - Follow best practices for code readability, maintainability, and performance.
   - Ensure the code is properly documented where necessary, and that the solution integrates well with the existing codebase.

## Domain-mode updates
#### Transaction
<details open>
<summary>The transaction entity JSON can look like this:</summary>

```json
{
  "dateCreated": "2024-08-21 10:30:00",
  "lastCreated": "2024-08-21 10:30:00",
  "transactionId": 1042,
  "fromAccountId": 1010213161,
  "sourceCardNumber": "2111460214118071",
  "toAccountId": 1010213162,
  "transferAmount": 1500.75
}
```
</details>
<br />
<details>
<summary>The Card entity JSON can look like this:</summary>

```json
{
   "dateCreated": "2024-08-21 10:30:00",
   "lastCreated": "2024-08-21 10:30:00",
   "cardNumber": "2111460214118071",
   "accountId": 1010213161,
   "name": "Visa",
   "balance": 3837474.3,
   "pin": 234,
   "blocked": false,
   "expireMonth": "03",
   "expireYear": "2024",
   "cardHolderName": "David Edel",
   "cvv": 234
}
```
</details>

### API Updates
#### **Send Money** (Updated, backward-compatible)
Note that the customer is able to send a source card number in the SendMoneyTransaction API. They don't have to mention the source account number.
```bash
curl -X POST http://localhost:8080/transactions \
    -H "Content-Type: application/json" \
    -d '{
      "sourceCardNumber": "2111460214118071",
      "toAccountId": 1010213162,
      "transferAmount": 3000.00,
      "dateCreated": "2024-08-21T10:30:00",
      "lastCreated": "2024-08-21T10:30:00"
    }'
```

**Note**: From an API point of view, this is the only API which will be impacted from this transaction limit due to the reason that we are applying a static limit for now. So we don't have to create or update any admin API through which we can update these limits.