import { 
  Component, 
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoboxComponent implements OnInit {
  @Input() data: Observable<any> | undefined;
  info: string[] = [];


  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit() {
    if (this.data) {
      this.data.subscribe(newinfo => {
        this.info = newinfo; 
        this.cd.markForCheck();
      });
    }

  }
  refresh() {
    this.cd.detectChanges();
  }

}
