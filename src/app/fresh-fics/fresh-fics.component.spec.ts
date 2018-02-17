import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshFicsComponent } from './fresh-fics.component';

describe('FreshFicsComponent', () => {
  let component: FreshFicsComponent;
  let fixture: ComponentFixture<FreshFicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshFicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshFicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
