# Graphs

## Contents <!-- omit in toc -->

- [Exercises](#exercises)
- [Algorithms - Graph Transformations](#algorithms---graph-transformations)
  - ["Forgetful" Graph (Directed to Undirected)](#forgetful-graph-directed-to-undirected)
  - [Complement Graph](#complement-graph)
  - [Transpose Graph](#transpose-graph)
  - [Path Graph](#path-graph)
  - [Graph Power](#graph-power)
    - [Graph Powers and the Adjacency Matrix](#graph-powers-and-the-adjacency-matrix)
  - [Line Graph](#line-graph)
- [Algorithms - Traversals](#algorithms---traversals)
  - [BFS vs DFS](#bfs-vs-dfs)
- [Algorithms - Common](#algorithms---common)
  - [Shortest Path Between Two Vertexes](#shortest-path-between-two-vertexes)
  - [Longest path Between Two Vertexes](#longest-path-between-two-vertexes)
  - [Is Directed Graph a Tree?](#is-directed-graph-a-tree)

## Exercises

**Note**: If `G` is a graph with vertex set `V` and edge set `E`, we will write `G = (V,E)`. This makes it easier to talk about vertexes and edges.

You can do the below exercises in any order. We'll be adding more later. Right now the exercises fall into two categories:

1. Algorithms for transforming one graph into another, related graph
1. Algorithms that operate on a specific graph

It's important to understand [graph traversals](#algorithms---traversals) and they'll underpin every exercise. Breadth-first and depth-first (BFS and DFS) are the most important. Many seemingly-complex algorithms boil down to one of these techniques performed on a transformed/related graph.

## Algorithms - Graph Transformations

Given a graph `G = (V,E)`, there are many ways to construct new, related graphs related to `G`. A particular problem in `G` often becomes a different (and possibly easier) problem in one of these related graphs.

A good set of exercises is to implement each of these transformations.

### "Forgetful" Graph (Directed to Undirected)

Given a *directed* graph `G = (V, E)` we can "forget" the direction of the edges and form an associated undirected graph. It's defined as follows:

1. The vertex set `V` remains the same
2. `{u,v}` is an edge in the new graph if at least one of `(u,v)` or `(v,u)` was an edge in the original graph

### [Complement Graph][wiki-complement-graph]

Given a graph `G = (V,E)`, the complement graph of `G`, denoted `Comp(G)`, is formed adding edges that are missing in `G` and removing edges that are present. You can think of it as "toggling" all the missing edges on and all the present edges off. It's defined as follows:

- The vertex set `V` remains the same
- `(u,v)` is an edge in `Comp(G)` if and only if `(u,v)` is ***not*** an edge in `G`

### [Transpose Graph][wiki-transpose-graph]

Given a **directed** graph `G = (V,E)`, the transpose graph or opposite graph of `G`, denoted `Opp(G)`, is constructed by flipping all the edges in `G`. It's defined as follows:

- The vertex set `V` remains the same.
- The edge set of `Opp(G)` is `{(v,u) | (u,v) ∈ E}`. That is, if `(u,v)` is an edge in the original graph `G` then `(v,u)` is an edge in `Opp(G)`.

### [Path Graph][wiki-path-graph]

Given a graph `G = (V,E)`, the path graph or reachability graph of `G`, denoted `Path(G)`, is formed by adding an edge directly between any two vertexes that are connected via *some* path in `G`. An edge `(u,v)` in `Path(G)` means "you can reach `v` along some path starting at `u` in `G`."

It's defined as follows:

- The vertex set `V` remains the same
- `(u, v)` is an edge in `Path(G)` if and only if there is a path from `u` to `v` in the original graph `G`.

### [Graph Power][wiki-graph-power]

Given a graph `G = (V,E)` and a non-negative integer `k`, we can form the `k`th-power of `G`, denoted `G^k`, which encodes information about how far apart the vertexes of `G` are. It's defined as follows:

- The vertex set of `G^k` remains the same
- `(u, v)` is an edge in `G^k` if the shortest path from `u` to `v` in the original graph `G` is *at most* `k`.

If you think of an edge as a "path of length `1`", then `G^2` has an edge between all vertexes in `G` connected by a path of length `1` *or* a path of length `2`. `G^3` has an edge between vertexes connected by a path of length `1`, `2`, or `3`. `G^4` has an edge between vertexes connected by a path of length `1`, `2`, `3`, or `4`. And so on.

If `G` is finite, i.e., if `V` is a finite set, there's a math-y way of expressing the relationship between `Path(G)`, the path graph of `G`, and the graph powers of `G`. If you understand what this is saying then you understand both of these definitions:

```text
Path(G) = \lim_{k → ∞} G^k
```

#### Graph Powers and the Adjacency Matrix

If we have a graph `G` and represent it using an [adjacency matrix][wiki-adjacency-matrix] `A` then `A^k` contains information about how many paths of length `k` there are between vertexes in `G`. This allows us to calculate the adjacency matrix of `G^k`.

For example, `A^k` tells us how many paths of *exactly* length `k` there are between each vertex. So if `A` is the adjacency matrix of `G` then the adjacency matrix of `G^k` is

```text
A + A^2 + A^3 + ... + A^k
```

There are ways to modify the adjacency matrix `A` so that we don't have to calculate powers of `A` repeatedly. This turns the problem of counting paths into a matrix multiplication problem, which we can do very efficiently!

### [Line Graph][wiki-line-graph]

Given a graph `G = (V,E)`, the line graph or edge graph of `G`, denoted `Line(G)`, is a graph formed by turning vertexes into edges and edges into vertexes. You sort of turn the graph "inside out".

It's defined as follows:

- The vertex set of `Line(G)` is `E`, the set of edges in `G`
- `(e1, e2)` is an edge in `Line(G)` if the edges `e1` and `e1` share a common vertex in `G`

## Algorithms - Traversals

Like trees, there are two common ways to traverse a graph:

1. [Breadth-first search][wiki-bfs]
2. [Depth-first search][wiki-dfs]

Writing these should be as automatic as possible. Fortunately, *every* graph traversal has a similar structure.

Unlike trees, however, graphs have fewer constraints, so traversing them requires more information. Specifically:

1. Graphs don't necessarily have a *root*, i.e., a unique vertex from which you can reach every other vertex. Because of this we have to specify which node we're starting at.
2. Paths in a graph aren't necessarily unique, i.e., there might be more than one way to get from one vertex to another. Because of this we have to keep track of what vertexes we've visited so that we don't visit the same vertex twice.

### BFS vs DFS

Here's the difference between `DFS` and `BFS` on a graph:

```js
function graphBFS(graph, startNode, visited = new Set()) {
  let queue = [];

  queue.push(startNode);

  while (queue.length > 0) {
    let node = queue.shift();  // Visit least recently added item next

   if (!visited.has(node)) {
      visited.add(node);

      console.log('Visited:', node);

      queue.push(...graph[node]);
    }
  }
}

function graphDFS(graph, startNode, visited = new Set()) {
  let stack = [];

  stack.push(startNode);

  while (stack.length > 0) {
    let node = stack.pop();   // Visit most recently added item next

    if (!visited.has(node)) {
      visited.add(node);

      console.log('Visited:', node);

      stack.push(...graph[node]);
    }
  }
}
```

We keep track of nodes as we visit them and add neighbors to a collection data structure. The *only* difference between the two algorithms is the order in which that collection returns the nodes we've added to it. If it has FIFO order we get BFS. If it has LIFO order we get DFS.

We can use other structures besides a plain queue or stack to store nodes. Those give us different algorithms. For example, you could use a [priority queue][wiki-priority-queue] where the priority is determined by a the value of a vertex, the weight of a vertex, the weight of outgoing edges, etc.

## Algorithms - Common

### Shortest Path Between Two Vertexes

Given a graph and two vertexes called `start` and `end`, find the shortest path from `start` to `end`. If there's no such path then return `Infinity` or something equivalent.

### Longest path Between Two Vertexes

Given a graph and two vertexes (called `start` and `end`), find the *longest* path from `start` to `end`. Return something appropriate if there's no such path. (What makes sense and why?)

### Is Directed Graph a Tree?

Given a directed graph, determine whether it's a tree or not. A directed graph is a tree if:

1. It has exactly one vertex from which every other vertex is reachable
1. No vertex is reachable in two different ways

[wiki-bfs]: https://en.wikipedia.org/wiki/Breadth-first_search
[wiki-dfs]: https://en.wikipedia.org/wiki/Depth-first_search
[wiki-transpose-graph]: https://en.wikipedia.org/wiki/Transpose_graph
[wiki-path-graph]: https://en.wikipedia.org/wiki/Path_graph
[wiki-line-graph]: https://en.wikipedia.org/wiki/Line_graph
[wiki-complement-graph]: https://en.wikipedia.org/wiki/Complement_graph
[wiki-graph-power]: https://en.wikipedia.org/wiki/Graph_power
[wiki-adjacency-matrix]: https://en.wikipedia.org/wiki/Adjacency_matrix
[wiki-priority-queue]: https://en.wikipedia.org/wiki/Priority_queue

<!--
[wiki-spanning-tree]: https://en.wikipedia.org/wiki/Spanning_tree
[wiki-min-spanning-tree]: https://en.wikipedia.org/wiki/Minimum_spanning_tree
[wiki-graph-component]: https://en.wikipedia.org/wiki/Component_(graph_theory)
[wiki-graph-strong-component]: https://en.wikipedia.org/wiki/Strongly_connected_component
-->
