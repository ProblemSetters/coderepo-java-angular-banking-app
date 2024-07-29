## User Story
Currently, there are some operations in the app which should only be allowed for an admin. Like:
1. View account details of **other** customers
2. View full transaction history of **other** customers
3. Soft **delete** customers

The issue is that no RBAC management is currently implemented, meaning that any user can use their own JWT token to directly call the APIs to mimic transactions of other users, retrieve other user account details and delete a user account.

All of these operations should solely be allowed by an admin only. Implement **RBAC management** in the application so that these operations are allowed for an admin only.

## Acceptance Criteria
1. Introduce a `Role` class (with just `id` and `name` attributes) and tie it to the `Account` domain class such that each account can have multiple roles.
2. A user should only be able to view their own transaction history and account details.
3. Create new API to let only admin allow soft delete an account like `DELETE /api/core-banking/account/{accountId}`
4. Modify existing fetch transaction history API `/transaction/transactionHistory/accounts/12345` to not accept an account id - `/transaction/transactionHistory`. The API should now use the JWT token to return the corresponding user account details.
5. Create new transaction history API `/transaction/transactionHistory/accounts/{accountId}` which can only be called by admin

## Domain-mode updates
#### Role for RBAC (and its usage in Account domain model)
<details open>
<summary>We have defined a new `Role` class whose model looks like:</summary>

```json
{
  "id": 1,
  "name": "Admin"
}
```
</details>
<br />
<details>
<summary>This is now used in the existing Account domain model class:</summary>

```json
{
  "accountId": 12,
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "gender": "Male",
  "address": "1234 Elm Street",
  "city": "Springfield",
  "emailAddress": "john.doe@example.com",
  "balance": 2434.76,
  "password": "password123",
  "deleted": false,
  "deletedAt": null,
  "roles": [
    {
      "id": 1,
      "name": "Admin"
    },
    {
      "id": 2,
      "name": "User"
    }
  ]
}
```
</details>

### API Updates
#### **Soft-delete a customer** (Updated, backward-compatible)
Now admin can soft-delete a customer using the following **existing** API:
```bash
curl --location --request DELETE \
    'http://localhost:8080/api/core-banking/account/:accountId?softDelete=true'
```
The API above is backward compatible.

#### **Fetch transaction history: self-account** (Updated, backward-compatible)
Earlier, the below fetch transaction history API accepted account id parameter, which leaked transaction data for other customers too, if they know other customer account id. Now, providing account is not needed, and the **API will infer current user from the JWT token**.
```bash
curl -X GET "http://localhost:8080/api/core-banking/transaction/transactionHistory?fromDate=2024-01-01&toDate=2024-12-31" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
The API above is backward compatible i.e. even if you pass an account id, no change. You will always get your own transaction history only.

#### **Fetch transaction history: Admin** (New API)
Now admin can fetch transaction history for all accounts
```bash
curl --location --request GET \
    'http://localhost:8080/api/core-banking/transaction/accounts/:accountId'
```
The API **will validate admin JWT token**. If user is not an admin, it returns error.
<details>
<summary>Sample success response:</summary>

```json
[
  {
    "dateCreated": "2024-05-01 12:34:56",
    "lastCreated": "2024-05-01 12:34:56",
    "transactionId": 1042,
    "fromAccountId": 12345,
    "toAccountId": 67890,
    "transferAmount": 100.50
  },
  {
    "dateCreated": "2024-06-15 08:45:30",
    "lastCreated": "2024-06-15 08:45:30",
    "transactionId": 1043,
    "fromAccountId": 12345,
    "toAccountId": 13579,
    "transferAmount": 250.00
  },
  {
    "dateCreated": "2024-07-22 16:00:00",
    "lastCreated": "2024-07-22 16:00:00",
    "transactionId": 1044,
    "fromAccountId": 24680,
    "toAccountId": 12345,
    "transferAmount": 300.75
  }
]
```
</details>
