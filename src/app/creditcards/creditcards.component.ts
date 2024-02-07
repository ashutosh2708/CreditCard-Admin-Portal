import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';

@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss'],
})
export class CreditcardsComponent {
  creditcards: CreditCard[] = [];

  totalCreditCardAmount: number = 0;
  totalCreditCards: number = 0;
  creditCardMaximumInterest: number = 0;
  creditCardMaximumAmount: number = 0;

  constructor(private creditCardsService: CreditcardsService) {
    this.creditCardsService.getCreditCards().subscribe((data: CreditCard[]) => {
      this.creditcards = data;

      this.dataSource = new MatTableDataSource(this.creditcards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.calculateMetrics();
    });
  }

  dataSource = new MatTableDataSource(this.creditcards);

  displayColumns = [
    'id',
    'name',
    'description',
    'bankName',
    'maxCredit',
    'interestRate',
    'active',
    'recommendedScore',
    'actions',
  ];

  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectHandler(row: CreditCard) {
    this.selection.toggle(row as never);
  }

  calculateMetrics() {
    // Calculate the total amount of all credit cards
    this.totalCreditCardAmount = Math.round(
      this.creditcards.reduce((total, card) => total + card.maxCredit, 0)
    );

    // Calculate the total number of credit cards
    this.totalCreditCards = this.creditcards.length;

    // Calculate the maximum interest rate among all credit cards
    this.creditCardMaximumInterest = Math.max(
      ...this.creditcards.map((card) => card.interestRate)
    );
// Calculate the number of credit cards with a maximum credit greater than 3000
    this.creditCardMaximumAmount = this.creditcards.filter(
      (card) => card.maxCredit > 3000
    ).length;
  }
}
