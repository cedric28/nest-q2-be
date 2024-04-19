import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderWebhookModule } from './api/order-webhook/order-webhook.module';

@Module({
  imports: [OrderWebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
