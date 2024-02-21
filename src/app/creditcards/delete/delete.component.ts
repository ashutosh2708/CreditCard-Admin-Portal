import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {
  creditCardId!: Number;

  private destory$: Subject<void> = new Subject<void>();

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private SnackBar: MatSnackBar,
    private creditcardsService: CreditcardsService
  ) {
    this.creditCardId = parseInt(this.router.snapshot.paramMap.get('id') || '');

    // Delete Functionality
    this.creditcardsService
      .deleteCreditCard(this.creditCardId)
      .pipe(takeUntil(this.destory$))
      .subscribe((data) => {
        this.showSuccessMessage('Credit Card Deleted Successfully');
        this.route.navigate(['creditcards']);
      });
  }

  showSuccessMessage(message: string) {
    this.SnackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
