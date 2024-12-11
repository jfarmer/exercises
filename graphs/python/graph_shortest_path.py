"""
Functions for finding shortest paths in graphs.
"""
from graph_bfs import graph_bfs


def graph_shortest_path(graph, start_node, end_node):
    """
    Find the shortest path between start_node and end_node in the graph.
    Returns None if no path exists.
    """
    if start_node not in graph or end_node not in graph:
        return None

    if start_node == end_node:
        return [start_node]

    predecessors = {v: None for v in graph}

    def visit(node):
        for neighbor in graph[node]:
            if predecessors[neighbor] is None and neighbor != start_node:
                predecessors[neighbor] = node
                if neighbor == end_node:
                    return True

    graph_bfs(graph, start_node, visit)

    path = []

    current = end_node
    while current is not None:
        path.append(current)
        current = predecessors[current]

    return path[::-1]

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

    print("Path from A to F:", graph_shortest_path(graph, 'A', 'F'))  # Should show the path
    print("Path from A to A:", graph_shortest_path(graph, 'A', 'A'))  # Should be ['A']
    print("Path from A to G:", graph_shortest_path(graph, 'A', 'G'))  # Should be None
