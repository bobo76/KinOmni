import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IDomainDto } from "../model/model";

@Component({
  selector: "app-domain-detail",
  templateUrl: "./domain-detail.component.html",
  styleUrls: ["./domain-detail.component.scss"]
})
export class DomainDetailComponent {
  @Input()
  selectedDomain: IDomainDto;
  @Output()
  saveEvent = new EventEmitter<IDomainDto>();
  @Output()
  undoEvent = new EventEmitter<void>();

  constructor() { }

  saveDomain(): void {
    this.saveEvent.emit(this.selectedDomain);
  }
  undoChanges(): void {
    this.undoEvent.emit();
  }
}
