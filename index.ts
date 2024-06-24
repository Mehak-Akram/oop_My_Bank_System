#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.italic.magenta("\n\t\t WELCOME TO MEHAK-AKRAM PROJECT - OOP_MY_BANK_SYSTEM \t\t\n"));


//BackAccount interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;
  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
  //Debit Money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        chalk.bold.blue(
          `Withdrawal of $${amount} succesful.Remaining balance: $${this.balance}`
        )
      );
    } else {
      console.log(chalk.red(`Insufficient balance.`));
    }
  }
  //Credit Money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(
      chalk.bold.blue(
        `Deposit of $${amount} successful.Remaining balance: $${this.balance}`
      )
    );
  }
  //Check balance
  checkBalance(): void {
    console.log(chalk.bold.green(`Current balance: $${this.balance}`));
  }
}

//Customer class

class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

//Create bank accounts

const accounts: BankAccount[] = [
  new BankAccount(1001, 500),
  new BankAccount(1002, 1000),
  new BankAccount(1003, 2000),
];

//Create customers

const customers: Customer[] = [
  new Customer("Ali", "Khan", "male", 26, 3245679019, accounts[0]),
  new Customer("Sara", "Khan", "Female", 23, 3145679019, accounts[1]),
  new Customer("Aisha", "Khan", "Female", 25, 3005679019, accounts[2]),
];

//function to intrect with bank account

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "accountNumber",
      type: "number",
      message: chalk.bold.yellow(chalk.bold.yellow("Enter you account number:")),
    });
    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(chalk.bold(`Welcome ${customer.firstName} ${customer.lastName}!\n`));
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          meaasege: "Select an operation",
          choices: ["Deposit", "Withdraw", "Check balance", "Exit"],
        },
      ]);
      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.bold.yellow("Enter the amount to deposit"),
          });
          customer.account.deposit(depositAmount.amount);
          break;
        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.bold.yellow("Enter the amount to withdraw:"),
          });
          customer.account.withdraw(withdrawAmount.amount);
          break;
        case "Check balance":
          customer.account.checkBalance();
          break;
        case "Exit":
          console.log(chalk.italic.red(`Exiting bank program...`));
          console.log(
           chalk.italic.cyanBright( `\n Thank you for using our bank services.Have a great day!`)
          );
          return;
      }
    } else {
      console.log(chalk.bold.red(`Invalid account number.please try again.`));
    }
  } while (true);
}

service();
