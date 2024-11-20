## User Story
Currently, there are some fraud checks added to the system which are **not working correctly**.

1.	**Frequent Transaction Limit**: Users should be restricted to make more than 5 transactions within 30 minutes of each other.
2.	**Transaction Time**: If a user performs a transaction between 1 AM and 4 AM, the transaction is deemed suspicious.
3.  **Transaction Limit**: If a transaction exceeds a pre-defined limit, it is deemed suspicious.
4.  **Suspicious Merchant**: If a transaction is done to a suspicious merchant account, transaction is deemed as suspicious.

All **limits can be set as static values for now** and do not need to be customizable at the user level.

## Acceptance Criteria

There are some bugs present in overall fraud analysis and the same needs to be fixed based on the rules to defined above so that all unit test passes.
