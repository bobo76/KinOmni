import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IDomainGroupDto } from "../model/model";

@Component({
  selector: "app-domain-group",
  templateUrl: "./domain-group.component.html",
  styleUrls: ["./domain-group.component.scss"]
})
export class DomainGroupComponent {
  @Input()
  selectedDomainGroup: IDomainGroupDto;
  @Output()
  saveEvent = new EventEmitter<IDomainGroupDto>();
  @Output()
  undoEvent = new EventEmitter<void>();

  constructor() { }

  get ramqSyncDate(): Date {
    return this.selectedDomainGroup.ramqSyncDate;
  }
  set ramqSyncDate(value: Date) {
    this.selectedDomainGroup.ramqSyncDate = value;
  }
  saveDomainGroup(): void {
    this.saveEvent.emit(this.selectedDomainGroup);
  }
  undoChanges(): void {
    this.undoEvent.emit();
  }
}
