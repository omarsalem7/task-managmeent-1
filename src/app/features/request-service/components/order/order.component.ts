import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OurServiceService } from '../../../../core/services/our-service.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  form: FormGroup;
  isSubmited: boolean = false;

  constructor(private fb: FormBuilder, private service: OurServiceService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^5[0-9]{8}$')],
      ],
      details: ['', [Validators.required]],
    });

    const savedFormData = sessionStorage.getItem('isService');
    if (savedFormData) {
      this.isSubmited = true; // Mark as submitted if data exists
    }
  }

  submitForm() {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe(() => {
      this.isSubmited = true;
      sessionStorage.setItem('isService', 'yes');
    });
  }
}
