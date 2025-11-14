
const myBuffer = Buffer.alloc(6);

/* Write string */
myBuffer.write('Hello');
console.log(myBuffer); // <Buffer 48 65 6c 6c 6f 00>

/* Write at specific offset */
myBuffer.write('World', 0);
console.log(myBuffer); // 'World\0'

/* Access individual bytes */
console.log(myBuffer[0]); // 87 (W in ASCII)

/* Modify bytes */
myBuffer[0] = 0x48; // H
console.log(myBuffer.toString()); // 'Horld\0'
