from .graph_dfs import graph_dfs_from_node

def graph_path_graph(graph):
    """
    Given a graph, represented as an adjacency list, return its path graph.

    The path graph of a graph G has the same vertices, but has (u, v) as an
    edge if there's a path from u to v in the original graph.

    See: https://en.wikipedia.org/wiki/Path_graph
    """
    path_graph = { v : [] for v in graph }

    for vertex in graph:
        graph_dfs_from_node(
            graph,
            vertex,
            pre_order_callback=path_graph[vertex].append,
            visited=set()
        )

    return path_graph


if __name__ == '__main__':
    from pprint import pprint

    graph = {
        'A': ['B'],
        'B': ['C'],
        'C': ['D'],
        'D': ['E'],
        'E': [],
        'F': ['G'],
        'G': [],
    }

    pprint(graph_path_graph(graph), width=40)
