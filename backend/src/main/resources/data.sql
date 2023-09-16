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
values (2131610011, 1010213161, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'David Edel', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2131610012, 1010213161, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'David Edel', '234');

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2131610013, 1010113163, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Yalen Brother', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2131610014, 1010113163, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Yalen Brother', '234');

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2131610015, 1010213162, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Rome Wool', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2131610016, 1010213162, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Rome Wool', '234');

insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2131610017, 1010113169, 'Visa', 3837474.3, '234', false, '03/23', '2024', 'Ravi Mahale', '234');
insert into card(card_number, account_id, name, balance, pin, blocked, expire_month, expire_year, card_holder_name, cvv)
values (2131610018, 1010113169, 'Master Card', 383743.3, '234', false, '03/24', '2024', 'Ravi Mahale', '234');

/*Add beneficiaries*/
insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (1, 1010213161, 1010113163);
insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (2, 1010213161, 1010213162);
insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (3, 1010213161, 1010113169);

insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (4, 1010113163, 1010213161);
insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (5, 1010113163, 1010213162);

insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (6, 1010213162, 1010213161);
insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (7, 1010213162, 1010113163);

insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (8, 1010113169, 1010113163);
insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (9, 1010113169, 1010213162);
insert into beneficiary(id, payer_account_id, beneficiary_account_id)
values (10, 1010113169, 1010213161);

/*add transactions*/
