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
import { TaskFormComponent } from '../task-form/task-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  subject: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, subject: 'dsdsds' },
  { position: 2, name: 'Helium', weight: 4.0026, subject: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, subject: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, subject: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, subject: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, subject: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, subject: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, subject: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, subject: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, subject: 'Ne' },
];

@Component({
  selector: 'app-task-list',
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
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  filters = {
    searchValue: '',
    pageIndex: 0,
    pageSize: 10,
    startDate: '',
    endDate: '',
  };

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '35vw',
      data: {
        record: this.record,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.fetchResults())
      )
      .subscribe((results) => {
        this.dataSource = results;
      });
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'subject',
    'edit',
  ];

  dataSource = ELEMENT_DATA;
  private searchSubject = new Subject<string>();

  updateSearch(value: string) {
    this.searchSubject.next(value);
    this.filters.searchValue = value;
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
    // pageIndex , pageSize
  }

  fetchResults() {
    return of();
  }

  record: any;
  editTask(record: any) {
    this.record = record;
  }

  filterHandler() {
    this.filters.startDate = formatDate(
      this.filters.startDate,
      'yyyy-MM-dd',
      'en-US'
    );
    this.filters.endDate = formatDate(
      this.filters.endDate,
      'yyyy-MM-dd',
      'en-US'
    );
    console.log(this.filters);
  }
}
