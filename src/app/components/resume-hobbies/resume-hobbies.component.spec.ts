import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeHobbiesComponent } from './resume-hobbies.component';

describe('ResumeHobbiesComponent', () => {
  let component: ResumeHobbiesComponent;
  let fixture: ComponentFixture<ResumeHobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeHobbiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeHobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
