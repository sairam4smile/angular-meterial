import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [UpdateFormComponent,ReactiveFormsModule,
    CommonModule,  MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    UpdateFormComponent],
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css'
})
export class UpdateFormComponent implements OnInit {
  @Input() selectedRow: any;
  @Output() closeForm = new EventEmitter<void>();
  // updateForm!: FormGroup;
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient ) {
    this.updateForm = this.fb.group({});
  }

  ngOnInit(): void {
    // this.updateForm = this.fb.group({
    //   // Define form controls based on your columns
    // });

    this.updateForm = this.createForm(this.selectedRow);

    // Populate form controls with selected row data
    // if (this.selectedRow) {
    //   this.updateForm.patchValue(this.selectedRow);
    // }
  }



ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRow'] && changes['selectedRow'].currentValue) {
      this.updateForm = this.createForm(changes['selectedRow'].currentValue);
    }
  }
  createForm(data: any): FormGroup {
    const formGroup: any = {};

    // Iterate over the properties of the selected row and create form controls
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formGroup[key] = [data[key], Validators.required];
      }
    }

    return this.fb.group(formGroup);
  }

  formControlNames(): string[] {
    return Object.keys(this.updateForm.controls);
  }

  getInputType(controlName: string): string {
    // Add logic to determine the input type based on the control name if needed
    return 'text';
  }
  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedData = this.updateForm.value;

      // Make API call to update data
      this.http.put('your-api-endpoint', updatedData).subscribe(response => {
        // Handle response, e.g., show success message
        console.log('Data updated successfully:', response);
        this.closeForm.emit();
      });
    }
  }

}
