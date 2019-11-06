import {NgModule} from "@angular/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";

@NgModule({
  exports: [
    MatTableModule,
    MatAutocompleteModule,
    MatInputModule,
    MatListModule,
  ]
})
export class MaterialModule {}