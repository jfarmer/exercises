const { graphDFSFromNode } = require('./graphDFS');
const { graphCloneEmpty } = require('./graphCloneEmpty');
/**
 * Given a graph, represented as an adjacency list, return its path graph.
 *
 * The path graph of a graph G has the same vertexes, but has (u, v) as an
 * edge if there's a path from u to v in the original graph.
 *
 * See: https://en.wikipedia.org/wiki/Path_graph
 */
function graphPathGraph(graph) {
  let pathGraph = graphCloneEmpty(graph);

  for (let vertex of Object.keys(graph)) {
    let visited = new Set();
    graphDFSFromNode(graph, vertex, {
      preOrderCallback: (node) => pathGraph[vertex].push(node)
    }, visited);
  }

  return pathGraph;
}

if (require.main === module) {
  let graph = {
    'A': ['B'],
    'B': ['C'],
    'C': ['D'],
    'D': ['E'],
    'E': [],
    'F': ['G'],
    'G': [],
  };

  console.log(graphPathGraph(graph));
}

module.exports = {
  graphPathGraph,
}
