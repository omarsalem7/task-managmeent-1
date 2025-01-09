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
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TenantsService } from '../../../../core/services/tenants';
import { EmployeeService } from '../../../../core/services/employee';

@Component({
  selector: 'app-task-form',
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
    CalendarModule,
    DropdownModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  data = inject(MAT_DIALOG_DATA).record;
  taskForm: FormGroup;
  dialogRef = inject(MatDialogRef<TaskFormComponent>);

  constructor(
    private fb: FormBuilder,
    private tenantsService: TenantsService,
    private employeeService: EmployeeService
  ) {
    const { tenantId, description, employeeIds, startDate, endDate } =
      this.data || {};
    this.taskForm = this.fb.group({
      description: [description ?? '', [Validators.required]],
      tenantId: [tenantId ?? '', Validators.required],
      employeeIds: [employeeIds ?? '', Validators.required],
      notes: [''],
      startDate: [startDate ?? null, Validators.required],
      endDate: [endDate ?? null, Validators.required],
    });
  }

  tenants: any[] = [];
  getLookups() {
    this.tenantsService.getList().subscribe((res: any) => {
      this.tenants = res.data;
    });
  }

  employees = [];
  getListEmployees(event: any) {
    // todo getListEmployees based on tenantId= event.value
    this.employeeService
      .getEmployeesbyTanentId(event.value)
      .subscribe((res: any) => {
        this.employees = res.data;
      });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.getLookups();
  }
}
