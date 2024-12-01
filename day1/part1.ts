let input = await Deno.readTextFile("input");

function zip<T, G>(it1: T[], it2: G[]): [T, G][] {
    return it1.map((x, i) => [x, it2[i]]);
}

function process(input: string): number {
    let [list1, list2] = input.split('\n').reduce((acc, x) => {
        let [l1, l2] = acc;
        if (x.length != 0) {
            let [v1, v2] = x.split("   ", 2);
            let pv1 = Number.parseInt(v1);
            let pv2 = Number.parseInt(v2);
            l1.push(pv1);
            l2.push(pv2);
        }
        return [l1, l2]
    }, <number[][]>[[], []]);

    list1.sort();
    list2.sort();

    let diff = zip(list1, list2).reduce((acc, [x, y]) => {
        if (x >= y) { return acc + (x - y) } else { return acc + (y - x) }
    }, 0);
    return diff;
}

let diff = process(input);
console.log(diff);
