import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ApidataService } from '../apidata.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-csv-upload',
  standalone: true,
  imports: [CommonModule,  MatTableModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule],
  templateUrl: './csv-upload.component.html',
  styleUrl: './csv-upload.component.css'
})
export class CsvUploadComponent {


  // csvData: any[] = [];
  // csvHeaders: string[] = [];

  // onDragOver(event: any): void {
  //   event.preventDefault();
  // }

  // onDrop(event: any): void {
  //   event.preventDefault();
  //   const file = event.dataTransfer.files[0];
  //   this.parseCsv(file);
  // }

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   this.parseCsv(file);
  // }

  // parseCsv(file: any): void {
  //   Papa.parse(file, {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: (result) => {
  //       this.csvData = result.data;
  //       console.log("csvdata: "+ this.csvData)

  //       this.csvHeaders = result.meta.fields || [];
  //     }
  //   });
  // }










  constructor(private apiDataService: ApidataService) {}



  csvData: any[] = [];
  csvHeaders: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


  apiData: any[] = [];
  apiDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  onDragOver(event: any): void {
    event.preventDefault();
  }

  onDrop(event: any): void {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.parseCsv(file);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.parseCsv(file);
  }

  parseCsv(file: any): void {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log('Parsed CSV Data:', result.data);
        // this.csvData = result.data.map(row => this.extractValues(row));
        this.csvData = result.data;
        this.csvHeaders = result.meta.fields || [];
        this.dataSource = new MatTableDataSource(this.csvData);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }



  private extractValues(row: any): any[] {
    return this.csvHeaders.map(header => row[header]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
}
