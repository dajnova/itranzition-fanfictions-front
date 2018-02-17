import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotFicsComponent } from './hot-fics.component';

describe('HotFicsComponent', () => {
  let component: HotFicsComponent;
  let fixture: ComponentFixture<HotFicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotFicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotFicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
