import {
  createUnionType,
  Field,
  Mutation,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
} from '@nestjs/graphql';
import { EnuService } from './enu.service';

export enum StatusCode {
  SUCCESS = 200,
  UnauthorizedError = 401,
  ForbiddenError = 403,
}

registerEnumType(StatusCode, {
  name: 'StatusCode',
  description: 'statusCode',
  valuesMap: {
    SUCCESS: {
      description: 'ok',
    },
    UnauthorizedError: {
      description: 'not login',
    },
    ForbiddenError: {
      description: 'no permission',
    },
  },
});

@ObjectType({ description: 'error' })
export class TTError {
  @Field(() => StatusCode, { description: 'ok' })
  statusCode: StatusCode;

  @Field({ description: 'desc' })
  message: string;
}

@ObjectType({ description: 'return' })
export class TTSuccess {
  @Field(() => StatusCode, { description: 'code' })
  statusCode: StatusCode;

  @Field({ description: 'desc' })
  message: string;
}

export const ResultSendSMS = createUnionType({
  name: 'ResultSendSMS',
  types: () => [TTSuccess, TTError] as const,
  description: 'sendSms',
  resolveType: (v: TTSuccess | TTError) => {
    if (v.statusCode == StatusCode.SUCCESS) return TTSuccess;
    return TTError;
  },
});

@Resolver()
export class EnuResolver {
  constructor(private readonly enuService: EnuService) {}

  @Query(() => String)
  ping() {
    return 'ping';
  }
  @Mutation(() => ResultSendSMS, { description: '发送手机校验码' })
  async sendSMS(): Promise<TTSuccess | TTError> {
    return {
      statusCode: StatusCode.SUCCESS,
      message: 'ok',
    };
  }
}
