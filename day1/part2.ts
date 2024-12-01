let input = await Deno.readTextFile("input");

function zip<T, G>(it1: T[], it2: G[]): [T, G][] {
    return it1.map((x, i) => [x, it2[i]]);
}

function process(input: string): number {
    let list = input.split('\n').reduce((acc, x) => {
        if (x.length != 0) {
            let [v1, v2] = x.split("   ", 2);
            let pv1 = Number.parseInt(v1);
            let pv2 = Number.parseInt(v2);

            if (acc.has(pv1)) {
                let v = acc.get(pv1)!;
                v.in_left = true;
            } else {
                acc.set(pv1, { repeat: 0, in_left: true });
            }

            if (acc.has(pv2)) {
                let v = acc.get(pv2)!;
                v.repeat += 1;
            } else {
                acc.set(pv2, { repeat: 1, in_left: false });
            }
        }

        return acc;
    }, new Map<number, { repeat: number, in_left: boolean }>());

    let sum = Array.from(list.entries()).filter(([_, v]) => v.in_left).reduce((acc, [k, v]) => {
        return acc + (k * v.repeat);
    }, 0);
    return sum;
}

let diff = process(input);
console.log(diff);
