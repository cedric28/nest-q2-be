import { Controller, Post, Body } from '@nestjs/common';
import { OrderWebhookService } from '../../domain/order-webhook/order-webhook.service';

@Controller('webhook')
export class OrderWebhookController {
  constructor(private readonly orderWebhookService: OrderWebhookService) {}
  //this webhook is the one that will receive the notification from ToyUniverse
  @Post()
  async handleWebhook(@Body() notificationData: any) {
   try{
    await this.orderWebhookService.processWebhookNotification(notificationData);
   }catch(error) {
    console.error("Error in getting the notification from ToyUniverse")
   }
  }
}