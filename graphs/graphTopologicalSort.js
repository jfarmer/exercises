/**
 * Given a graph, return a Map whose keys are vertexes and whose
 * values are that vertexes in-degree.
 *
 * A vertex's in-degree is the number of incoming edges to that vertex.
 */
function graphGetInDegrees(graph) {
  let inDegrees = new Map(Object.keys(graph).map(v => [v, 0]));

  return Object.values(graph).flat().reduce((map, v) => map.set(v, map.get(v) + 1), inDegrees);
}

/**
 * Given a graph, return its vertexes in topological order or
 * return null if no such order exists.
 */
function graphTopologicalSort(graph) {
  let results = [];
  let inDegrees = graphGetInDegrees(graph);

  let queue = Object.keys(graph).filter(v => inDegrees.get(v) === 0);


  while (queue.length > 0) {
    let node = queue.shift();
    results.push(node);

    for (let neighbor of graph[node]) {
      inDegrees.set(neighbor, inDegrees.get(neighbor) - 1);

      if (inDegrees.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (inDegrees.values().every(val => val === 0)) {
    return results;
  } else {
    return null;
  }
}


if (require.main === module) {
  let graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': ['E'],
    'E': [],
    'F': ['Z'],
    'Z': [],
  }

  let sorted = graphTopologicalSort(graph);

  console.log(sorted);
}

module.exports = {
  graphTopologicalSort,
}
