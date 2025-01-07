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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorComponent,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  data = inject(MAT_DIALOG_DATA).record;
  employeeService = inject(EmployeeService);
  taskForm: FormGroup;
  dialogRef = inject(MatDialogRef<EmployeeFormComponent>);

  constructor(
    private fb: FormBuilder,
    private tenantsService: TenantsService,
    private messageService: MessageService
  ) {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      jobNumber,
      identityNumber,
      jobTitle,
      nationality,
      tenantId,
    } = this.data || {};
    this.taskForm = this.fb.group({
      fullName: [fullName ?? '', [Validators.required]],
      email: [email ?? '', Validators.required],
      password: [password ?? ''],
      phoneNumber: [phoneNumber ?? '', Validators.required],
      jobNumber: [jobNumber ?? '', Validators.required],
      identityNumber: [identityNumber ?? ''],
      jobTitle: [jobTitle ?? null, Validators.required],
      nationality: [nationality ?? null],
      tenantId: [tenantId ?? null, Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.employeeService.create(this.taskForm.value).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'نجح',
          detail: 'تم اضافه الموظف بنجاح',
        });
        this.dialogRef.close('refresh');
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
  tenants: any[] = [];
  getLookup() {
    this.tenantsService.getList().subscribe((res: any) => {
      this.tenants = res.data;
    });
  }
  ngOnInit(): void {
    console.log(this.data);
    this.getLookup();
  }
}
