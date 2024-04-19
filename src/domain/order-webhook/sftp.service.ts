import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class SftpService {
    async getOrderDetails(orderId: number) {
     try {
        //the url is sample only, connect to sftp
        const sftpResponse = await axios.get('sftp.toyuniverse.com',{
         timeout: 5000
        });
        const xmlData = sftpResponse.data;

        // Parse XML data to extract order details
        const parsedDataFromSFTP = await parseStringPromise(xmlData);
        //parsed the result data to find order details
        const orderDetails = parsedDataFromSFTP?.orders?.find(order => order?.order_id === orderId.toString());

        return orderDetails;
     } catch (error) {
       // Handle errors (e.g., timeouts)
       console.error('Error fetching order details from SFTP:', error.message);
       throw error;
     }
    }
}