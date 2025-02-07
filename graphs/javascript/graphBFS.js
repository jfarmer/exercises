/**
 * Given a graph, represented as an adjacency list, iterate through it breadth-first
 * and call the callback for each node.
 */
function graphBFS(graph, startNode, callback) {
  let queue = [startNode];
  let visited = new Set();

  while (queue.length > 0) {
    let node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);

      if (typeof callback === 'function') {
        callback(node);
      }

      queue.push(...graph[node]);
    }
  }
}

module.exports = {
  graphBFS,
}
