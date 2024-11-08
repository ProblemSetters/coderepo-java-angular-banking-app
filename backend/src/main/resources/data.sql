/*add accounts*/
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance, deleted, locked)
values (1010213161, 'david@gmail.com', 'david123', 'David', 'Edel', '1990-01-03', 'Male', '21- Right Way', 'NYC',
        45837.87, false, false);
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance, deleted, locked)
values (1010113163, 'yalen@gmail.com', 'yalen123', 'Yalen', 'Brother', '1993-01-03', 'Male', '22- Right Way', 'CA',
        95437.12, false, false);
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance, deleted, locked)
values (1010213162, 'rome@gmail.com', 'rome', 'Rome', 'Wool', '1998-12-13', 'Male', 'Left way', 'LA', 384747.98, false, false);
insert into account(account_id, email_address, password, first_name, last_name, dob, gender, address, city, balance, deleted, locked)
values (1010113169, 'ravi@gmail.com', 'ravi', 'Ravi', 'Mahale', '1991-09-23', 'Male', 'Statue Road', 'Delhi',
        474636.09, false, false);

insert into role(id, name)
values (1, 'ADMIN'),
       (2, 'USER');

insert into user_roles(account_id, role_id)
values (1010213161, 1);

/*Add cards to accounts*/
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118071, 1010213161, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'David Edel', '234', false, -1, -1.0);
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118072, 1010213161, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'David Edel', '234', false, -1, -1.0);

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118073, 1010113163, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Yalen Brother', '234', false, -1, -1.0);
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118074, 1010113163, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Yalen Brother', '234', false, -1, -1.0);

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118075, 1010213162, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Rome Wool', '234', false, -1, -1.0);
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118076, 1010213162, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Rome Wool', '234', false, -1, -1.0);

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118077, 1010113169, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Ravi Mahale', '234', false, -1, -1.0);
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv, is_virtual, txn_allowed_count, virtual_limit)
values (2111460214118078, 1010113169, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Ravi Mahale', '234', false, -1, -1.0);

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
values (CURRENT_DATE - INTERVAL '2' DAY, CURRENT_DATE - INTERVAL '2' DAY, 1001, 1010213161, 1010113163, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '3' DAY, CURRENT_DATE - INTERVAL '3' DAY, 1002, 1010213161, 1010113163, 545);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1003, 1010213161, 1010113163, 7);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '5' DAY, CURRENT_DATE - INTERVAL '5' DAY, 1004, 1010213161, 1010113163, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '6' DAY, CURRENT_DATE - INTERVAL '6' DAY, 1005, 1010213161, 1010113163, 6576);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '7' DAY, CURRENT_DATE - INTERVAL '7' DAY, 1006, 1010213161, 1010113163, 55);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '8' DAY, CURRENT_DATE - INTERVAL '8' DAY, 1007, 1010213161, 1010113163, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '9' DAY, CURRENT_DATE - INTERVAL '9' DAY, 1008, 1010213161, 1010113173, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '9' DAY, CURRENT_DATE - INTERVAL '9' DAY, 1009, 1010213161, 1010113183, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '8' DAY, CURRENT_DATE - INTERVAL '8' DAY, 1010, 1010213161, 1010113163, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '7' DAY, CURRENT_DATE - INTERVAL '7' DAY, 1012, 1010213161, 1010113163, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '7' DAY, CURRENT_DATE - INTERVAL '7' DAY, 1013, 1010213161, 1010113163, 34);

insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '5' DAY, CURRENT_DATE - INTERVAL '5' DAY, 1014, 1010213161, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '5' DAY, CURRENT_DATE - INTERVAL '5' DAY, 1015, 1010213161, 1010213162, 545);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '5' DAY, CURRENT_DATE - INTERVAL '5' DAY, 1016, 1010213161, 1010213162, 7);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1017, 1010213161, 1010213162, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '3' DAY, CURRENT_DATE - INTERVAL '3' DAY, 1018, 1010213161, 1010213162, 6576);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '3' DAY, CURRENT_DATE - INTERVAL '3' DAY, 1019, 1010213161, 1010213162, 55);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1020, 1010213161, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '2' DAY, CURRENT_DATE - INTERVAL '2' DAY, 1021, 1010213161, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '3' DAY, CURRENT_DATE - INTERVAL '3' DAY, 1022, 1010213161, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '5' DAY, CURRENT_DATE - INTERVAL '5' DAY, 1023, 1010213161, 1010213162, 374);
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
values (CURRENT_DATE - INTERVAL '14' DAY, CURRENT_DATE - INTERVAL '14' DAY, 1030, 1010113169, 1010213162, 6576);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '16' DAY, CURRENT_DATE - INTERVAL '16' DAY, 1031, 1010113169, 1010213162, 55);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '14' DAY, CURRENT_DATE - INTERVAL '14' DAY, 1032, 1010113169, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '25' DAY, CURRENT_DATE - INTERVAL '25' DAY, 1033, 1010113169, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '15' DAY, CURRENT_DATE - INTERVAL '15' DAY, 1034, 1010113169, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '14' DAY, CURRENT_DATE - INTERVAL '14' DAY, 1035, 1010113169, 1010213162, 374);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '13' DAY, CURRENT_DATE - INTERVAL '13' DAY, 1036, 1010113169, 1010213162, 434);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '13' DAY, CURRENT_DATE - INTERVAL '13' DAY, 1037, 1010113169, 1010213162, 34);

/*fraudent transaction*/
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1038, 1010113169, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1039, 1010113169, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1040, 1010113169, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1041, 1010113169, 1010213162, 34);
insert into transaction(date_created, last_created, transaction_id, from_account_id, to_account_id, transfer_amount)
values (CURRENT_DATE - INTERVAL '4' DAY, CURRENT_DATE - INTERVAL '4' DAY, 1042, 1010113169, 1010213162, 34);
-- if add more transaction do not forget to change initialValue for Transaction.transactionId, in annotitaion TableGenerator

/*fraud merchant*/
INSERT INTO fraud_merchants (id, account_number) VALUES (1, 9999999991);
INSERT INTO fraud_merchants (id, account_number) VALUES (2, 9999999992);