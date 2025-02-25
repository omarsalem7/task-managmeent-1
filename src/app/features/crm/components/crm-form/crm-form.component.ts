import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrmService } from '../../../../core/services/crm.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';
import { catchError, finalize, take } from 'rxjs';

@Component({
  selector: 'app-crm-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.scss'],
})
export class CrmFormComponent {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private crmService: CrmService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      responsibleName: ['', [Validators.required]],
      responsiblePosition: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      status: [0, [Validators.required]],
      action: [0, [Validators.required]],
      notes: ['', [Validators.required]],
      taxRecord: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.customerId = +params['id'];
        this.loadCustomerData(this.customerId);
      }
    });
  }
  actions = [
    'PhoneCall',
    'Meeting',
    'Postponed',
    'Assigned',
    'ContractSent',
    'DealClosed',
  ];

  statuss = ['Active', 'Potential', 'Hesitant', 'NotInterested'];

  loadCustomerData(id: number) {
    this.crmService.getCustomerById(id).subscribe((customer) => {
      if (customer) {
        console.log(customer);
        this.customerForm.patchValue(customer);
      }
    });
  }

  isLoading: boolean = false;
  onSubmit() {
    if (this.customerForm.valid) {
      let formData = this.customerForm.value;
      formData = {
        ...formData,
        status: this.statuss.indexOf(formData.status) + 1,
        action: this.actions.indexOf(formData.action) + 1,
      };
      this.isLoading = true;
      if (this.isEditMode && this.customerId) {
        this.crmService
          .update({ ...formData, id: this.customerId })
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe(() => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'تم التحديث',
              detail: 'تم تحديث العميل بنجاح',
            });
            this.router.navigate(['/crm/']);
          });
      } else {
        this.crmService
          .add(formData)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe(() => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'تم الإضافة',
              detail: 'تم إضافة العميل بنجاح',
            });
            this.router.navigate(['/crm/']);
          });
      }
    } else {
      this.showValidationErrors();
    }
  }

  onCancel() {
    this.router.navigate(['/crm/']);
  }

  showValidationErrors() {
    Object.keys(this.customerForm.controls).forEach((field) => {
      const control = this.customerForm.get(field);
      if (control && control.invalid && control.errors) {
        Object.keys(control.errors).forEach((error) => {
          switch (error) {
            case 'required':
              this.messageService.add({
                severity: 'error',
                summary: 'خطأ في التحقق',
                detail: `الحقل "${field}" مطلوب.`,
              });
              break;
            case 'email':
              this.messageService.add({
                severity: 'error',
                summary: 'خطأ في التحقق',
                detail: 'البريد الإلكتروني غير صحيح.',
              });
              break;
            default:
              break;
          }
        });
      }
    });
  }
}
