import { Component, inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterListComponent } from '../../../../shared/ui/filter-list/filter-list.component';
import { ListHeaderComponent } from '../../../../shared/ui/list-header/list-header.component';
import { debounceTime, distinctUntilChanged, switchMap, Subject } from 'rxjs';
import { AttendanceService } from '../../../../core/services/attendance';
import { HasRoleDirective } from '../../../../core/directives/has-role.directive';
import { DropdownModule } from 'primeng/dropdown';
import { TenantsService } from '../../../../core/services/tenants';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  subject: string;
}

@Component({
  selector: 'app-files-list',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    DropdownModule,
    ToastModule,
    HasRoleDirective,
  ],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss',
})
export class AttendanceListComponent {
  filters = {
    tenantId: null,
    searchTerm: '',
    PageNumber: 1,
    PageSize: 5,
    endDate: '',
    startDate: '',
  };

  readonly dialog = inject(MatDialog);

  // openDialog() {
  //   const dialogRef = this.dialog.open(TenantsFormComponent, {
  //     width: '35vw',
  //     data: {
  //       record: this.record,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == 'refresh') {
  //       this.getList();
  //     }
  //   });
  // }

  constructor(
    private attendanceService: AttendanceService,
    private tenantsService: TenantsService
  ) {
    this.searchSubject
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(() => this.attendanceService.getList(this.filters))
      )
      .subscribe((results: any) => {
        this.dataSource = results.data;
        this.totalCount = results.totalCount;
      });
  }
  displayedColumns: string[] = ['checkIn', 'checkOut', 'date'];

  dataSource: any[] = [];
  private searchSubject = new Subject<string>();

  updateSearch(value: string) {
    this.searchSubject.next(value);
    this.filters.searchTerm = value;
  }
  newRecord() {
    this.record = null;
    // this.openDialog();
  }
  tenants = [];
  getLookup() {
    this.tenantsService.getList({ pageSize: 500 }).subscribe((res: any) => {
      this.tenants = res.data;
    });
  }

  // items = [
  //   { label: 'تعديل', icon: 'pi pi-pencil', command: () => this.openDialog() },
  //   {
  //     label: 'حذف',
  //     icon: 'pi pi-trash',
  //     command: (event: any) => {
  //       this.confirmationService.confirm({
  //         target: event.target as EventTarget,
  //         message: 'هل انت متاكد من الحذف ؟',
  //         header: '',
  //         icon: 'pi pi-info-circle',
  //         acceptButtonStyleClass: 'p-button-danger p-button-text',
  //         rejectButtonStyleClass: 'p-button-text p-button-text',
  //         acceptLabel: 'نعم انا متاكد',
  //         rejectLabel: 'لا اريد ان احذف',
  //         acceptIcon: 'none',
  //         rejectIcon: 'none',

  //         accept: () => {
  //           this.tenantsService.delete(this.record.id).subscribe(() => {
  //             this.messageService.add({
  //               severity: 'success',
  //               summary: 'تم الحذف',
  //               detail: 'تم حذف بنجاح',
  //             });
  //             this.getList();
  //           });
  //         },
  //       });
  //     },
  //   },
  // ];

  onPageChange(event: any) {
    console.log(event);
    this.filters.PageSize = event.pageSize;
    this.filters.PageNumber = event.pageIndex + 1;
    this.getList();
    // pageIndex , pageSize
  }

  record: any;
  editTask(record: any) {
    this.record = record;
  }

  filterHandler(isRemoved?: boolean) {
    if (isRemoved) {
      this.filters.startDate = '';
      this.filters.endDate = '';
      this.filters.tenantId = null;
    } else {
      this.filters.startDate = this.filters?.startDate
        ? formatDate(this.filters?.startDate, 'yyyy-MM-dd', 'en-US')
        : '';
      this.filters.endDate = this.filters?.endDate
        ? formatDate(this.filters?.endDate, 'yyyy-MM-dd', 'en-US')
        : '';
    }
    this.getList();
  }

  loading = true;
  totalCount: number = 0;
  getList() {
    this.attendanceService.getList(this.filters).subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalCount = res.totalCount;
      this.loading = false;
    });
  }

  currentRole = localStorage.getItem('role') ?? '';
  ngOnInit(): void {
    if (this.currentRole === 'Admin') {
      this.displayedColumns.unshift('employeeName');
    }
    if (this.currentRole === 'SuperAdmin') {
      this.displayedColumns.unshift('tenantName');
      this.displayedColumns.unshift('employeeName');
      this.getLookup();
    }
    this.getList();
  }
}
