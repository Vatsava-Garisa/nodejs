
const fs = require('fs');

/********** Pool Allocation for Better Performance **********/
// Bad: Creates many small buffers
function inefficient() {
    for (let i = 0; i < 1000; i++) {
        const buf = Buffer.alloc(100);
        // Use buffer
    }
}

// Good: Reuse a larger buffer
function efficient() {
    const pool = Buffer.allocUnsafe(100000);
    let offset = 0;

    for (let i = 0; i < 1000; i++) {
        const view = pool.slice(offset, offset + 100);
        offset += 100;
        // Use view
    }
}


/********** When to Use allocUnsafe **********/
// 1. You'll immediately overwrite the data
const fd = fs.openSync("notes.js", "r");
const buf = Buffer.allocUnsafe(1024);
fs.readSync(fd, buf, 0, 1024, 0); // Immediately filled

// 2. Performance is critical and data isn't sensitive
function fastHash(data) {
    const buf = Buffer.allocUnsafe(32);
    // ... hash computation fills buffer
    return buf;
}

// NOTE: DON'T use allocUnsafe for sensitive data without clearing


/********** Avoid String Concatenation in Loops **********/
// Bad: Creates many intermediate strings
function badConcat(buffers) {
    let result = '';
    for (let buf of buffers) {
        result += buf.toString('utf8');
    }
    return result;
}

// Good: Use Buffer.concat
function goodConcat(buffers) {
    return Buffer.concat(buffers).toString('utf8');
}


/********** Understanding Slice vs Copy **********/
const original = Buffer.from('Hello World');

// Slice creates a VIEW (changes affect original)
const sliced = original.slice(0, 5);
sliced[0] = 0x58;
console.log(original.toString()); // 'Xello World' - CHANGED!

// To avoid this, create a copy
const copied = Buffer.from(original.slice(0, 5));
copied[0] = 0x58;
console.log(original.toString()); // 'Hello World' - UNCHANGED!

