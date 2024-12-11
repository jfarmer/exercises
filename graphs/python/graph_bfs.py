"""
Graph traversal functions implementing breadth-first search in Python.
"""
from collections import deque


def graph_bfs(graph, start_node, callback=None):
    """
    Given a graph, represented as an adjacency list, iterate through it breadth-first
    and call the callback for each node.

    If callback returns a non-None value, the traversal stops and that value is returned.
    Otherwise returns None after completing the traversal.
    """
    queue = deque([start_node])
    visited = set()

    while queue:
        node = queue.popleft()

        if node in visited:
            continue

        visited.add(node)

        if callback is not None:
            result = callback(node)
            if result is not None:
                return result

        queue.extend(graph[node])

    return None


if __name__ == '__main__':
    # Example usage
    graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    }

    print("BFS traversal:")
    graph_bfs(graph, 'A', print)

    # Example of early return
    def find_f(node):
        if node == 'F':
            return f"Found node {node}!"

    result = graph_bfs(graph, 'A', find_f)
    print("\nSearching for 'F':", result)
