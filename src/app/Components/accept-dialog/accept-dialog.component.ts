import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  question: string;
  cancelButonTitle: string;
  acceptButonAction: any;
}

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.css'],
})
export class AcceptDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    setTimeout(() => {
      document.getElementById('data-question-alert')!.innerHTML = data.question;
    }, 50);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
