// @ts-ignore
import { task2 } from './task2.ts';
import * as csv from 'csv-writer';
import * as path from 'path';

interface Row {
    Year: number;
    Subject: string;
    Lesson: string;
}

const task4 = async (): Promise<void> => {
    const response = await task2();

    let topics = response?.data?.contentBrowser?.topics

    const rows: Row[] = [];

    for( let i = 0; i < topics.length; i++ ) {
        const units = topics[i]?.units;
        for( let j = 0; j < units.length; j++ ) {
            const lessons = units[j]?.lessons;
            for( let k = 0; k < lessons.length; k++ ) {
                const lesson = lessons[k]?.name;
                const subject = lessons[k]?.subjects[0]?.name;
                const year = lessons[k]?.years[0]?.name;

                const row: Row = {
                    Year: year,
                    Subject: subject,
                    Lesson: lesson,
                };

                rows.push(row);
            }
        }
    }

    const writer = csv.({
        path: "data.csv",
        header: [
            { id: 'Year', title: 'Year' },
            { id: 'Subject', title: 'Subject' },
            { id: 'Lesson', title: 'Lesson' },
        ],
    });

    writer.writeRecords(rows)
        .then(() => {
            console.log('CSV file has been success');
        })
        .catch((err: any) => {
        });
}

task4();