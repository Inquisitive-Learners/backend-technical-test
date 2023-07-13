// @ts-ignore
import { task2 } from './task2.ts';

interface Row {
    Year: number;
    Subject: string;
    Lesson: string;
}

const task3 = async (): Promise<void> => {
    const response = await task2();

    let topics = response?.data?.contentBrowser?.topics
    const dict: Record<number, Record<string, string[]>> = {};

    for( let i = 0; i < topics.length; i++ ) {
        const units = topics[i]?.units;
        for( let j = 0; j < units.length; j++ ) {
            const lessons = units[j]?.lessons;
            for( let k = 0; k < lessons.length; k++ ) {
                const lesson = lessons[k]?.name;
                const subject = lessons[k]?.subjects[0]?.name;
                const year = lessons[k]?.years[0]?.name;

                if (!dict[year]) {
                    dict[year] = {};
                }

                if (!dict[year][subject]) {
                    dict[year][subject] = [];
                }

                dict[year][subject].push(lesson);
            }
        }
    }

    for (const year in dict) {
        console.log(`Year ${year.trim()}`);

        for (const subject in dict[year]) {
            console.log(`\t${capitaliseFirstLetter(subject).trim()}`);
            const lessons = dict[year][subject];

            for (const lesson of lessons) {
                console.log(`\t\t${lesson.trim()}`);
            }
        }
    }

    function capitaliseFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

task3();