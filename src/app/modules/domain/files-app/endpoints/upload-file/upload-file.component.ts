import { Component, EventEmitter, Output } from '@angular/core';
import { FileParameter, FilesApiService } from "../../../../../services/api/files/files.service";

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  @Output() fileUpload = new EventEmitter<string>();

  file?: File;

  constructor(private fileApi: FilesApiService) {}

  fileInputChange(input: any): void {
    this.file = input.target.files[0];
  }

  uploadFile(): void {
    if (!this.file) return;

    const model = {
      data: this.file,
      fileName: this.file.name
    } as FileParameter

    this.fileApi.addFile(model, "invoice")
      .subscribe({
        next: response => {
          if (!response.result.success) return;
          this.fileUpload.emit(response.result.id);
        }
      });
  }

  clearFile(): void {
    this.file = undefined;
  }
}
