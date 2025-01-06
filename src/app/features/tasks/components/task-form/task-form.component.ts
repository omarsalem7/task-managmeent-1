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
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  data = inject(MAT_DIALOG_DATA);
  taskForm: FormGroup;
  dialogRef = inject(MatDialogRef<TaskFormComponent>);

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      employee: ['', Validators.required],
      company: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      alert('valid');
      // Submit form
      this.dialogRef.close(this.taskForm.value);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {}
}
