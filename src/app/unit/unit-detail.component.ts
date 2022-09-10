import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { UnitDto, IUnitTableDto } from "../model/model";
import { Observable } from "rxjs";
import { DataService } from "@app/_services/data.service";
import { AlertService } from "@app/_services";

@Component({
  selector: "app-unit-detail",
  templateUrl: "./unit-detail.component.html",
  styleUrls: ["./unit-detail.component.scss"]
})
export class UnitDetailComponent implements OnInit {
  @Input()
  selectedUnit: UnitDto;
  @Output()
  saveUnitEvent = new EventEmitter<UnitDto>();
  @Output()
  undoEvent = new EventEmitter<void>();

  waveList$: Observable<IUnitTableDto[]>;
  isLoading: boolean;

  constructor(private data: DataService,
    private alertService: AlertService)
  {}

  ngOnInit(): void {
    this.isLoading = true;
    this.waveList$ = this.data.getWaveList();
    this.waveList$.subscribe(_ => this.isLoading = false,
      error => {
        this.alertService.httpError(error);
      }
    );
  }

  saveUnit(): void {
    this.saveUnitEvent.emit(this.selectedUnit);
  }
  undoChanges(): void {
    this.undoEvent.emit();
  }
}
