import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeLanguageComponent } from './resume-language.component';

describe('ResumeLanguageComponent', () => {
  let component: ResumeLanguageComponent;
  let fixture: ComponentFixture<ResumeLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
