import axios from "axios";
import * as dotenv from 'dotenv'
import { aws4Interceptor } from "aws4-axios";

export const task2 = async (): Promise<any> => {
    dotenv.config();
    try {
        const url = 'https://api2.inquisitive.com/latest/graphql';
        const payload = {
            operationName: 'ContentBrowser',
            query:
                'query ContentBrowser($input: ContentBrowserInput!) { contentBrowser(input: $input) { topics { name units { name lessons { id name subjects { id name } years { id name } } } } }}',
            variables: {
                input: {
                    years: ['1', '2', '3', '4'],
                    subjects: ['history', 'science-and-technology', 'english', 'maths'],
                    curriculums: [],
                    includingDraft: false,
                    includingComingSoon: false,
                    includingFuture: false,
                    includingEmptyTopic: false,
                    initialTopics: 10,
                    topicIds: []
                },
            },
        };

        const interceptor = aws4Interceptor({
            credentials: {
                accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
                secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
            },
        });

        axios.interceptors.request.use(interceptor);
        const response = await axios.post(url, payload);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
    }
}

//task2();