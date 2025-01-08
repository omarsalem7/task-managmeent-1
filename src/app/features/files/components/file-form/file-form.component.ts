import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../../shared/ui/form-error/form-error.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TenantsService } from '../../../../core/services/tenants';
import { EmployeeService } from '../../../../core/services/employee';
import { ToastModule } from 'primeng/toast';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { tap, finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadHandlerComponent } from '../../../../shared/ui/file-upload-handler/file-upload-handler.component';

@Component({
  selector: 'app-file-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormErrorComponent,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ToastModule,
    MatProgressSpinnerModule,
    FileUploadHandlerComponent,
  ],
  providers: [],
  templateUrl: './file-form.component.html',
  styleUrl: './file-form.component.scss',
})
export class FileFormComponent {
  data = inject(MAT_DIALOG_DATA).record;
  taskForm: FormGroup;
  dialogRef = inject(MatDialogRef<FileFormComponent>);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private tenantsService: TenantsService,
    private snackBar: MatSnackBar
  ) {
    const { tenantName, email, password } = this.data || {};
    this.taskForm = this.fb.group({
      name: [tenantName ?? '', [Validators.required]],
      email: [email ?? '', Validators.required],
      password: [password ?? ''],
      file: [password ?? ''],
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const request: any = this.data
      ? this.tenantsService.update(this.data.id, {
          ...this.taskForm.value,
        })
      : this.tenantsService.create(this.taskForm.value);

    request
      .pipe(
        tap(() => this.dialogRef.close('refresh')),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data
              ? 'تم تعديل الموظف بنجاح ✅✅'
              : 'تم اضافه الموظف بنجاح ✅✅',
            'Close',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            }
          );
        },
      });
  }
  tenants: any[] = [];
  getLookup() {
    this.tenantsService.getList().subscribe((res: any) => {
      this.tenants = res.data;
    });
  }

  isFileRequired: boolean = false;
  uploadedLogo: any = null;
  imagePreview: any = null;
  handleFileSelected(file: File) {
    this.taskForm.patchValue({ file: file.name });
    this.uploadedLogo = file;
    this.handleFile(file);
  }

  handleCancelClicked() {
    this.removeImage();
  }

  private removeImage() {
    this.imagePreview = null;
    this.taskForm.patchValue({ file: '' });
    this.taskForm.get('file')?.updateValueAndValidity();
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

  ngOnInit(): void {
    this.getLookup();
  }
}
