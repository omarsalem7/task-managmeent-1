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

@Component({
  selector: 'app-train-form',
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
  ],
  providers: [],
  templateUrl: './train-form.component.html',
  styleUrl: './train-form.component.scss',
})
export class TrainFormComponent {
  data = inject(MAT_DIALOG_DATA).record;
  taskForm: FormGroup;
  dialogRef = inject(MatDialogRef<TrainFormComponent>);
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
  ngOnInit(): void {
    this.getLookup();
  }
}
