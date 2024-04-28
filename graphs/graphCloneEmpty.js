/**
 * Given a graph, create a new graph that has the same vertexes
 * but no edges
 */
function graphCloneEmpty(graph) {
  return Object.fromEntries(Object.keys(graph).map(v => [v, []]));
}

module.exports = {
  graphCloneEmpty,
};
