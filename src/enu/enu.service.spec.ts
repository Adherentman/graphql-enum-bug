import { Test, TestingModule } from '@nestjs/testing';
import { EnuService } from './enu.service';

describe('EnuService', () => {
  let service: EnuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnuService],
    }).compile();

    service = module.get<EnuService>(EnuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
