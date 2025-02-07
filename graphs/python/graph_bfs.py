from collections import deque


def graph_bfs(graph, start_node, callback=None):
    """
    Given a graph, represented as an adjacency list, iterate through it
    breadth-first and call the callback for each node.
    """
    queue = deque([start_node])
    visited = set()

    while queue:
        node = queue.popleft()

        if node in visited:
            continue

        visited.add(node)

        if callable(callback):
            callback(node)

        queue.extend(graph[node])
