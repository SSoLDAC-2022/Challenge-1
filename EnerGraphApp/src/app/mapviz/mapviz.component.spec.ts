import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapvizComponent } from './mapviz.component';

describe('MapvizComponent', () => {
  let component: MapvizComponent;
  let fixture: ComponentFixture<MapvizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapvizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapvizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
