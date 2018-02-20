import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFanficsComponent } from './user-fanfics.component';

describe('UserFanficsComponent', () => {
  let component: UserFanficsComponent;
  let fixture: ComponentFixture<UserFanficsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFanficsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFanficsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
