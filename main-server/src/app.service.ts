import { Injectable } from '@nestjs/common';
import { PrismaService } from './shared/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  getHello(): string {
    this.prismaService.user.findMany().then(console.log);

    return 'Hello World!';
  }
}
