export type MenuList = {
	name: string;
	url: string;
};

export type User = {
	id: number;
	username: string;
	email: string;
	role: string;
};


export type Account = {
	accountId: string,
	firstName: string,
	lastName: string,
	dob: Date,
	gender: string,
	address: string,
	city: string,
	emailAddress: string,
	balance: string
};

export type Transaction = {
	transactionId: string,
	fromAccountId: string,
	toAccountId: string,
	transferAmount: number
}

export type Card = {
	id: string,
	accountId: number,
	cardNumber: number,
	expireMonth: string,
	expireYear: string,
	cardHolderName: string,
	cvv: number,
	isBlocked: boolean
}

