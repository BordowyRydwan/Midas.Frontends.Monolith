import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import {
  AddInvoiceDto,
  InvoiceDto,
  TransactionApiService,
  TransactionDto
} from "../../../../../services/api/transaction/transaction.service";
import { UploadFileComponent } from "../../../files-app/endpoints/upload-file/upload-file.component";
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'invoice-popup',
  templateUrl: './invoice-popup.component.html',
  styleUrls: ['./invoice-popup.component.css']
})
export class InvoicePopupComponent implements OnInit {
  @Output() emitClear = new EventEmitter<void>();
  @ViewChild(UploadFileComponent) upload!: UploadFileComponent;

  invoices: InvoiceDto[] = [];
  displayedColumns: string[] = ['name', 'icons'];

  constructor(
    public dialogRef: MatDialogRef<InvoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public transaction: TransactionDto,
    private transactionApi: TransactionApiService,
  ) {
  }

  ngOnInit(): void {
    this.invoices = this.transaction.invoices?.items!;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addInvoice(guid: string): void {
    const model = {
      transactionId: this.transaction.id,
      fileId: guid
    } as AddInvoiceDto

    this.transactionApi.addInvoice(model).subscribe({
      next: response => {
        const model = {fileId: guid, fileMetadata: response.result} as InvoiceDto;
        this.dialogRef.componentInstance.invoices = [...this.invoices, model];
        this.upload.clearFile();
      },
      error: (err: any) => console.error(err)
    });
  }

  deleteInvoice(guid: string): void {
    this.transactionApi.deleteInvoice(guid).subscribe({
      next: () => {
        this.transaction!.invoices!.items = this.transaction.invoices?.items?.filter(x => x.fileId !== guid);
        this.invoices = this.invoices.filter(x => x.fileId !== guid);
      },
      error: (err: any) => console.error(err)
    });
  }

  downloadInvoice(guid: string): void {
    const url = location.origin;
    const handle = window.open(`${url}/files/download/${guid}`);

    handle!.blur();
    window.focus();
  }
}
