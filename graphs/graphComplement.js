/**
 * Given a directed graph, represented as an adjacency list, return its graph complement.
 * The graph complement contains the same vertexes, but has an edge exactly where the
 * original graph lacks an edge (and vice versa).
 *
 * See: https://en.wikipedia.org/wiki/Complement_graph
 *
 * Assume graphs can't contain self-loops, so neither the original nor the complement
 * has any.
 *
 * For example, if your graph looks like:
 *   A -> [B]
 *   B -> [C]
 *   C -> []
 *
 * Then the complement is
 *   A -> [C]
 *   B -> [A, C]
 *   C -> [B, A]
 */
function graphComplement(graph) {
  const complement = {};

  // First, we need to get a list of all vertices in the graph
  const vertices = Object.keys(graph);

  // Initialize the complement graph with empty arrays for each vertex
  vertices.forEach(vertex => {
      complement[vertex] = [];
  });

  // Now, for each vertex, find out which vertices it doesn't have an edge to and add those to its list in the complement graph
  vertices.forEach(vertex => {
      const edges = new Set(graph[vertex]); // Convert current edges to a set for quick lookup
      vertices.forEach(otherVertex => {
          if (!edges.has(otherVertex) && vertex !== otherVertex) {
              // Add edge if it's not in the original graph and it's not a self-loop
              complement[vertex].push(otherVertex);
          }
      });
  });

  return complement;
}



module.exports = {
  graphTranspose,
}
