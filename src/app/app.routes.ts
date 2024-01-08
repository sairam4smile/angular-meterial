import { Routes } from '@angular/router';
import { MappedsearchComponent } from './mappedsearch/mappedsearch.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

export const routes: Routes = [
  {path :"search", component: MappedsearchComponent},
  {path :"", component: CsvUploadComponent}

];
