import { Module } from '@nestjs/common';
import { EnuService } from './enu.service';
import { EnuResolver } from './enu.resolver';

@Module({
  providers: [EnuResolver, EnuService],
})
export class EnuModule {}
