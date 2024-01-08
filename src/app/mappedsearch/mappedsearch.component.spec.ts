import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedsearchComponent } from './mappedsearch.component';

describe('MappedsearchComponent', () => {
  let component: MappedsearchComponent;
  let fixture: ComponentFixture<MappedsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MappedsearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MappedsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
