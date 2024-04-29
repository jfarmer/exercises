const { PriorityQueue } = require('./PriorityQueue');

/**
 * Implement Dijkstra's algorithm to find the shortest path between two nodes in a weighted graph.
 * The graph is represented as an adjacency list where each entry is a node and an array of
 * objects, each with a 'node' and 'cost' indicating the weight of the edge.
 *
 * See: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 */
function dijkstra(graph, startNode) {
  let queue = new PriorityQueue();
  let dist = {};
  let prev = {};

  for (let vertex of Object.keys(graph)) {
    if (vertex == startNode) {
      dist[vertex] = 0;
      queue.enqueueWithPriority(startNode, 0);
    } else {
      dist[vertex] = Infinity;
      queue.enqueueWithPriority(vertex, Infinity);
    }
  }

  while (!queue.isEmpty()) {
    let vertex = queue.dequeue();

    for (let neighbor of graph[vertex]) {
      // We use "+ 1" here because graphs are unweighted
      // Otherwise we'd want to add weight(vertex, neighbor)
      let alt = dist[vertex] + 1;

      if (alt < dist[neighbor]) {
        prev[neighbor] = vertex;
        dist[neighbor] = alt;
        queue.decreasePriority(neighbor, alt);
      }
    }
  }

  return [dist, prev];
}

if (require.main === module) {
  let graph = {
    'A': ['B', 'C', 'E'],
    'B': ['D'],
    'C': ['D'],
    'D': ['E'],
    'E': [],
    'F': ['Z'],
    'Z': [],
  }

  let [distances, parents] = dijkstra(graph, 'A');

  console.log('Distances:', distances);
  console.log('Parents:', parents);
}

module.exports = {
  dijkstra,
}
