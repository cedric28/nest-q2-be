import { Module } from '@nestjs/common';
import { OrderWebhookController } from './order-webhook.controller';
import { OrderWebhookService } from '../../domain/order-webhook/order-webhook.service';
import { PrismaModule } from '../../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],//import prisma module to use prisma service
  controllers: [OrderWebhookController],
  providers: [OrderWebhookService],
})
export class OrderWebhookModule {}
