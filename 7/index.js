const common = require('../common.js');
const EventEmitter = require( 'events' );

class QueuedSolver extends EventEmitter {
    constructor(letter, l2, data) { 
        super();
        this.queue = [];
        this.out = 0;
        this.letter = letter;
        this.letter2 = l2;
        this.pos = 0;
        this.data = [...data];
        setInterval(() => {
            if (this.queue.length > 0) {
                let to_eval = this.queue.pop();
                this.solve(this.data, to_eval);
            }
        }, 1);
        setTimeout(() => {
            let re = this.out;
            this.emit('OVER', re);
        }, 1000);
    }
    
    queueInput(i) {
        this.queue.push(i);
    }
    
    solve(data, input2, i=0) {
        let inputs = 0;
        let input1 = this.letter;
        // data = [...data];
        let possible = [];
        let foundout = 0;
        let pos = this.pos;

        while (true) {
            let s = data[pos] + '';
            let inc = 0;

            while (s.length < 5)
                s = '0' + s;

            let instr = +(s.slice(-2));
            let mode1 = +(s.slice(-3, -2));
            let mode2 = +(s.slice(-4, -3));
            let mode3 = +(s.slice(-5, -4));

            let val1 = mode1 === 0 ? data[data[pos + 1]] : data[pos + 1];
            let val2 = mode2 === 0 ? data[data[pos + 2]] : data[pos + 2];
            let newpos = mode3 === 0 ? data[pos + 3] : pos + 3;
            let newpos2 = mode3 === 0 ? data[pos + 1] : pos + 1;

            // console.log(instr);

            if (instr === 1) { // Addition code
                data[newpos] = val1 + val2;
            }
            else if (instr === 2) {
                data[newpos] = val1 * val2;
            }
            else if (instr === 3) {
                data[newpos2] = inputs === 0 ? input1 : input2;
                inputs++;
            }
            else if (instr === 4) {
                this.emit('OUT', data[newpos2]);
                this.out = data[newpos2];
                foundout++;
                this.pos += 2;
                break;
            }
            else if (instr === 5) {
                if (val1 !== 0) pos = val2;
                else inc = 3;
            }
            else if (instr === 6) {
                if (val1 === 0) pos = val2;
                else inc = 3;
            }
            else if (instr === 7) {
                data[newpos] = val1 < val2 ? 1 : 0;
                inc = 4;
            }
            else if (instr === 8) {
                data[newpos] = val1 === val2 ? 1 : 0;
                inc = 4;
            }

            else break;

            if (instr >= 1 && instr <= 2)
                inc = 4;
            else if (instr >= 3 && instr <= 4)
                inc = 2;

            pos += inc;
            this.pos = pos;
        }
    }

    
}


module.exports = {
    run: () => {
        let max = 0;
        let max2 = '';
        for (let A2 = 5; A2 <= 9; A2++) {
        for (let B2 = 5; B2 <= 9; B2++) {
        for (let C2 = 5; C2 <= 9; C2++) {
        for (let D2 = 5; D2 <= 9; D2++) {
        for (let E2 = 5; E2 <= 9; E2++) {
            if ([...new Set([A2, B2, C2, D2, E2])].length !== 5)
                continue;

            // let data = common.readInput('./7/input.txt').split(',').map(x => +x);
            let data = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5'.split(',').map(x => +x);
            
            A2 = 9;
            B2 = 7;
            C2 = 8;
            D2 = 5;
            E2 = 6;

            let A, B, C, D, E;
            A = new QueuedSolver(A2, 'A', data);
            B = new QueuedSolver(B2, 'B', data);
            C = new QueuedSolver(C2, 'C', data);
            D = new QueuedSolver(D2, 'D', data);
            E = new QueuedSolver(E2, 'E', data);

            let lastE = 0;
            A.on('OUT', val => B.queueInput(val));
            B.on('OUT', val => C.queueInput(val));
            C.on('OUT', val => D.queueInput(val));
            D.on('OUT', val => E.queueInput(val));
            E.on('OUT', val => {
                A.queueInput(val);
                lastE = val;
            });
            A.queueInput(0);
            // B.queueInput(B2);
            // C.queueInput(C2);
            // D.queueInput(D2);
            // E.queueInput(E2);

            let onover = x => {
                if (x > max) {
                    max = x;
                    max2 = [A2, B2, C2, D2, E2].join(', ');
                }
            }
            // A.on('OVER', onover);
            // B.on('OVER', onover);
            // C.on('OVER', onover);
            // D.on('OVER', onover);
            E.on('OVER', onover);
            setInterval(() => {
                console.log('last e', lastE)
                console.log('Not the answer, but combo: ', max2);
                console.log(max);
            }, 5000);
            return;
        }}}}}


        return 'Please wait...';
    }
}