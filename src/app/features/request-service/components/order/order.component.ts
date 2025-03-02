import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadHandlerComponent } from '../../../../shared/ui/file-upload-handler/file-upload-handler.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, FileUploadHandlerComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  form: FormGroup;
  isSubmited: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^5[0-9]{8}$')]],
      inqury: ['', [Validators.required]],
    });

    const savedFormData = sessionStorage.getItem('isSubmited');
    if (savedFormData) {
      this.isSubmited = true; // Mark as submitted if data exists
    }
  }

  isFileRequired: boolean = false;
  uploadedLogo: any = null;
  imagePreview: any = null;
  handleFileSelected(file: File) {
    this.form.patchValue({ resume: file.name });
    this.uploadedLogo = file;
    this.handleFile(file);
  }

  handleCancelClicked() {
    this.removeImage();
  }

  private removeImage() {
    this.imagePreview = null;
    this.form.patchValue({ resume: '' });
    this.form.get('resume')?.updateValueAndValidity();
    this.uploadedLogo = null;
  }

  private handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview =
        'https://cdn-icons-png.flaticon.com/512/2457/2457802.png';
    }
  }

  submitForm() {
    if (this.form.invalid) return;
    console.log(this.form.value);
    console.log(this.uploadedLogo);

    this.isSubmited = true;
    sessionStorage.setItem('isSubmited', 'yes');
  }
}
