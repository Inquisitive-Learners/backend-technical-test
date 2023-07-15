import * as dotenv from 'dotenv'
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { readFileSync } from 'fs';

export const task5 = async (): Promise<void> => {
    dotenv.config();

    const client = new S3Client({ region: 'ap-southeast-2'});

    const fileContent = readFileSync("data.csv");
    const command = new PutObjectCommand({
        Bucket: "inquisitive-backend-developer-tests",
        Key: "data.csv",
        Body: fileContent,
    });

    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}

task5()