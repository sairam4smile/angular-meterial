import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApidataService } from '../apidata.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateFormComponent } from '../update-form/update-form.component';

@Component({
  selector: 'app-mappedsearch',
  standalone: true,
  imports: [CommonModule,  MatTableModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    UpdateFormComponent],
  templateUrl: './mappedsearch.component.html',
  styleUrl: './mappedsearch.component.css'
})
export class MappedsearchComponent implements OnInit {

  apiData: any[] = [];
  apiDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  showUpdateForm = false;
  selectedRow: any;



  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private apiDataService: ApidataService) {
  }


  ngOnInit(){
    this.loadApiData();
  }

  loadApiData(): void {
    this.apiDataService.getApiData().subscribe(data => {
      this.apiData = data;
      this.apiDataSource = new MatTableDataSource(this.apiData);
      this.apiDataSource.paginator = this.paginator;
      this.displayedColumns = Object.keys(data[0]);

      // this.apiDataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.apiDataSource.filter = filterValue.trim().toLowerCase();

    if (this.apiDataSource.paginator) {
      this.apiDataSource.paginator.firstPage();
    }
  }

  onRowClick(row: any): void {
    console.log("row clicked");
    console.log("row");
    console.log(row);


    this.selectedRow = row;
    this.showUpdateForm = true;
  }

  onCloseForm(): void {
    this.showUpdateForm = false;
    this.selectedRow = null;
  }
}
