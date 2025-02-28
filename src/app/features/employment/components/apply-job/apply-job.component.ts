import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.scss',
})
export class ApplyJobComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^5[0-9]{8}$')]],
    });
  }

  submitForm() {
    if (this.form.invalid) return;
  }
}
