import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-dialog',
  templateUrl: './credit-dialog.component.html',
  styleUrls: ['./credit-dialog.component.scss'],
})
export class CreditDialogComponent implements OnInit, OnDestroy {
  creditCardDetails!: CreditCard;
  creditCardId!: Number;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private creditCardsService: CreditcardsService
  ) {}

  ngOnInit() {
    this.getCreditCardDetails(this.dialogData);
  }

  getCreditCardDetails(rowId: any) {
    this.creditCardId = rowId.data;

    this.creditCardsService
      .getCreditCardById(this.creditCardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: CreditCard) => {
        this.creditCardDetails = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
