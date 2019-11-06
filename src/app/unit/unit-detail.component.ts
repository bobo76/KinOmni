import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UnitDto } from "../model/model";

@Component({
  selector: "app-unit-detail",
  templateUrl: "./unit-detail.component.html",
  styleUrls: ["./unit-detail.component.scss"]
})
export class UnitDetailComponent {
  @Input()
  selectedUnit: UnitDto;
  @Output()
  saveUnitEvent = new EventEmitter<UnitDto>();
  @Output()
  undoEvent = new EventEmitter<void>();

  saveUnit(): void {
    this.saveUnitEvent.emit(this.selectedUnit);
  }
  undoChanges(): void {
    this.undoEvent.emit();
  }
}
