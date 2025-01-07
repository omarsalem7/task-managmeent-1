import { Component, inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterListComponent } from '../../../../shared/ui/filter-list/filter-list.component';
import { ListHeaderComponent } from '../../../../shared/ui/list-header/list-header.component';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  Subject,
  of,
} from 'rxjs';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from '../../../../core/services/employee';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  subject: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 4, name: 'Beryllium', weight: 9.0122, subject: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, subject: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, subject: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, subject: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, subject: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, subject: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, subject: 'Ne' },
// ];

@Component({
  selector: 'app-employee-list',
  standalone: true,
  providers: [provideNativeDateAdapter(), ConfirmationService, MessageService],
  imports: [
    CommonModule,
    MatTableModule,
    ListHeaderComponent,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FilterListComponent,
    FormsModule,
    MatDialogModule,
    MenuModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  filters = {
    SearchTerm: '',
    PageNumber: 1,
    PageSize: 5,
    StartDate: '',
    EndDate: '',
  };

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '35vw',
      data: {
        record: this.record,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'refresh') {
        this.getList();
      }
    });
  }

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    this.searchSubject
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(() => this.employeeService.getList(this.filters))
      )
      .subscribe((results: any) => {
        console.log(results);
        this.dataSource = results.data;
        this.totalCount = results.totalCount;
      });
  }
  displayedColumns: string[] = [
    'fullName',
    'jobNumber',
    'company',
    'email',
    'phoneNumber',
    'jobTitle',
    'startDate',
    'endDate',
    'edit',
  ];

  dataSource: any[] = [];
  private searchSubject = new Subject<string>();

  updateSearch(value: string) {
    this.searchSubject.next(value);
    this.filters.SearchTerm = value;
  }
  newRecord() {
    this.record = null;
    this.openDialog();
  }

  items = [
    { label: 'تعديل', icon: 'pi pi-pencil', command: () => this.openDialog() },
    {
      label: 'حذف',
      icon: 'pi pi-trash',
      command: (event: any) => {
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'هل انت متاكد من حذف المهمه ؟',
          header: '',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass: 'p-button-danger p-button-text',
          rejectButtonStyleClass: 'p-button-text p-button-text',
          acceptLabel: 'نعم انا متاكد',
          rejectLabel: 'لا اريد ان احذف',
          acceptIcon: 'none',
          rejectIcon: 'none',

          accept: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'حذف',
              detail: 'تم الحذف بنجاح',
            });
          },
        });
      },
    },
  ];

  onPageChange(event: any) {
    console.log(event);
    this.filters.PageSize = event.pageSize;
    this.filters.PageNumber = event.pageIndex + 1;
    this.getList();
    // pageIndex , pageSize
  }

  fetchResults() {
    return of();
  }

  record: any;
  editTask(record: any) {
    this.record = record;
  }

  filterHandler(isRemoved?: boolean) {
    this.filters.StartDate = formatDate(
      this.filters.StartDate,
      'yyyy-MM-dd',
      'en-US'
    );
    this.filters.EndDate = formatDate(
      this.filters.EndDate,
      'yyyy-MM-dd',
      'en-US'
    );
    if (isRemoved) {
      this.filters.StartDate = '';
      this.filters.EndDate = '';
    }
    this.getList();
  }

  totalCount: number = 0;
  getList() {
    this.employeeService.getList(this.filters).subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalCount = res.totalCount;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getList();
  }
}
