import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTaskComponent } from './material-task.component';

describe('MaterialTaskComponent', () => {
  let component: MaterialTaskComponent;
  let fixture: ComponentFixture<MaterialTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
