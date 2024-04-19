import { Injectable } from '@nestjs/common';
import { SftpService } from './sftp.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import axios from "axios"

@Injectable()
export class OrderWebhookService {
    constructor(private readonly sftpService: SftpService, private readonly prisma: PrismaService) {}

    async processWebhookNotification(notificationData: any) {
        try {
            const orderId = notificationData.id;
            const orderDetails = await this.sftpService.getOrderDetails(orderId);
            // Process order details and create order in ERP
            const result = await this.prisma.order.findFirst({
                where: {
                    orderId: orderDetails?.order_id,
                },
            });
            if(!result){
                // Creating a new record if doesnt exist on the database
                await this.prisma.order.create({
                    orderId: orderDetails.order_id,
                    customer: orderDetails.customer,
                    product: {...orderDetails.product}
                })
                //call erp api to create an order
                await axios.post("http://127.0.0.1:3000/api/erp/order",{
                    orderId: orderDetails.order_id,
                    customer: orderDetails.customer,
                    product: {...orderDetails.product}
                })
            }
           
        } catch (error){
             // Handle timeout errors
             if (error.code === 'ECONNABORTED') {
                   // Handle errors (e.g., timeouts)
                console.error('Timeout occurred while fetching order details from SFTP Server', error.message);
                throw new Error('Timeout occurred while fetching order details from SFTP.');
            }
            throw error; // Rethrow other errors
         
        }
    }
}