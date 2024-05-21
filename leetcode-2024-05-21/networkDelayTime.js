function networkDelayTime(times, n, k) {
  let minTimeToNode = Array(n).fill(Infinity);
  minTimeToNode[k-1] = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let [from, to, weight] of times) {
      // Note: nodes are labeled from "1 to n" rather than from "0 to n-1"
      let toAdj = to - 1;
      let fromAdj = from - 1;

      minTimeToNode[toAdj] = Math.min(minTimeToNode[toAdj], minTimeToNode[fromAdj] + weight);
    }
  }

  let timeToLastNode = Math.max(...minTimeToNode);

  return timeToLastNode === Infinity ? -1 : timeToLastNode;
}
