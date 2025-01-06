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
      title: ['', [Validators.required, Validators.minLength(3)]],
      // description: ['', Validators.required],
      // dueDate: [null, Validators.required],
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
