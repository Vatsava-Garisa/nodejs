
/*
Promise.resolve(console.log("sync-log")).then(() =>
    console.log("microtask-log")
);
console.log("end");
*/

/*
new Promise((res) => {
    console.log("inside");
    res();
}).then(() => console.log("after"));
console.log("outside");
*/

/*
let log = [];
Promise.resolve().then(() => {
    log.push("p1");
    queueMicrotask(() => log.push("m1"));
    Promise.resolve().then(() => log.push("p2"));
});
queueMicrotask(() => log.push("m2"));
setTimeout(() => console.log(log), 0);
*/

/*
async function f() {
    console.log("A");
    await null;
    console.log("B");
    setTimeout(() => console.log("C"), 0);
}
f();
Promise.resolve().then(() => console.log("D"));
console.log("E");
*/

/*
Promise.resolve()
    .then(() => {
        console.log("1");
        setTimeout(() => console.log("2"), 0);
        return Promise.resolve().then(() => console.log("3"));
    })
    .then(() => console.log("4"));

console.log("5");
*/

/*
async function loop(n) {
    if (n === 0) return;
    console.log("L" + n);
    await 0;
    setTimeout(() => console.log("T" + n), 0);
    return loop(n - 1);
}
loop(3);
console.log("S");
*/
