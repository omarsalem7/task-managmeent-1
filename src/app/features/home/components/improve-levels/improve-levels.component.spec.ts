import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImproveLevelsComponent } from './improve-levels.component';

describe('ImproveLevelsComponent', () => {
  let component: ImproveLevelsComponent;
  let fixture: ComponentFixture<ImproveLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImproveLevelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImproveLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
