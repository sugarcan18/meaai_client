import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResComponent } from './all-res.component';

describe('AllResComponent', () => {
  let component: AllResComponent;
  let fixture: ComponentFixture<AllResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
