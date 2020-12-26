import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAccComponent } from './all-acc.component';

describe('AllAccComponent', () => {
  let component: AllAccComponent;
  let fixture: ComponentFixture<AllAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
