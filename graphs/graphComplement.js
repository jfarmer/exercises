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

}

module.exports = {
  graphTranspose,
}
