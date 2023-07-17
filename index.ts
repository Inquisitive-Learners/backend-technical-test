// @ts-ignore
import { task1 } from './task1.ts';

const hello = async (): Promise<void> => {
  console.log('Hello World');
  await task1();

}
hello();