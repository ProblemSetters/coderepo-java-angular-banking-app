/*add accounts*/
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance)
values (1010213161, 'david@gmail.com', 'david', 'David', 'Edel', '1990-01-03', 'Male', '21- Right Way', 'NYC',
        45837.87);
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance)
values (1010113163, 'yalen@gmail.com', 'yalen', 'Yalen', 'Brother', '1993-01-03', 'Male', '22- Right Way', 'CA',
        95437.12);
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance)
values (1010213162, 'rome@gmail.com', 'rome', 'Rome', 'Wool', '1998-12-13', 'Male', 'Left way', 'LA', 384747.98);
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance)
values (1010113169, 'ravi@gmail.com', 'ravi', 'Ravi', 'Mahale', '1991-09-23', 'Male', 'Statue Road', 'Delhi',
        474636.09);

/*Add cards to accounts*/
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118071, 1010213161, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'David Edel', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118072, 1010213161, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'David Edel', '234');

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118073, 1010113163, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Yalen Brother', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118074, 1010113163, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Yalen Brother', '234');

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118075, 1010213162, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Rome Wool', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118076, 1010213162, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Rome Wool', '234');

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118077, 1010113169, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Ravi Mahale', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2111460214118078, 1010113169, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Ravi Mahale', '234');

/*Add beneficiaries*/
insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010213161, 1010113163);
insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010213161, 1010213162);
insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010213161, 1010113169);

insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010113163, 1010213161);
insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010113163, 1010213162);

insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010213162, 1010213161);
insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010213162, 1010113163);

insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010113169, 1010113163);
insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010113169, 1010213162);
insert into beneficiary(payer_account_id, beneficiary_account_id)
values (1010113169, 1010213161);

/*add transactions*/
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1001, 1010213161, 1010113163, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1002, 1010213161, 1010113163, 545);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1003, 1010213161, 1010113163, 7);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1004, 1010213161, 1010113163, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1005, 1010213161, 1010113163, 6576);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1006, 1010213161, 1010113163, 55);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1007, 1010213161, 1010113163, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1008, 1010213161, 1010113163, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1009, 1010213161, 1010113163, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1010, 1010213161, 1010113163, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1012, 1010213161, 1010113163, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1013, 1010213161, 1010113163, 34);

insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1014, 1010213161, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1015, 1010213161, 1010213162, 545);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1016, 1010213161, 1010213162, 7);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1017, 1010213161, 1010213162, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1018, 1010213161, 1010213162, 6576);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1019, 1010213161, 1010213162, 55);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1020, 1010213161, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1021, 1010213161, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1022, 1010213161, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1023, 1010213161, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1024, 1010213161, 1010213162, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1025, 1010213161, 1010213162, 34);

insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1026, 1010113169, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1027, 1010113169, 1010213162, 545);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1028, 1010113169, 1010213162, 7);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1029, 1010113169, 1010213162, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1030, 1010113169, 1010213162, 6576);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1031, 1010113169, 1010213162, 55);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1032, 1010113169, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1033, 1010113169, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1034, 1010113169, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1035, 1010113169, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1036, 1010113169, 1010213162, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1037, 1010113169, 1010213162, 34);