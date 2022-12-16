import { Test, TestingModule } from '@nestjs/testing';
import { EnuResolver } from './enu.resolver';
import { EnuService } from './enu.service';

describe('EnuResolver', () => {
  let resolver: EnuResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnuResolver, EnuService],
    }).compile();

    resolver = module.get<EnuResolver>(EnuResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
