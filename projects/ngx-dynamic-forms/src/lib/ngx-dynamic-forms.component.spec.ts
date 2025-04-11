import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicFormsComponent } from './ngx-dynamic-forms.component';

describe('NgxDynamicFormsComponent', () => {
  let component: NgxDynamicFormsComponent;
  let fixture: ComponentFixture<NgxDynamicFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDynamicFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDynamicFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
