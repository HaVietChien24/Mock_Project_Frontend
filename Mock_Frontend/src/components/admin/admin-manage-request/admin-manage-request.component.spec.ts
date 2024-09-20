import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageRequestComponent } from './admin-manage-request.component';

describe('AdminManageRequestComponent', () => {
  let component: AdminManageRequestComponent;
  let fixture: ComponentFixture<AdminManageRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
