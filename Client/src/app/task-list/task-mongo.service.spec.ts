import { TestBed, inject } from '@angular/core/testing';

import { TaskMongoService } from './task-mongo.service';

describe('TaskMongoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskMongoService]
    });
  });

  it('should be created', inject([TaskMongoService], (service: TaskMongoService) => {
    expect(service).toBeTruthy();
  }));
});
