from graph_dfs import graph_dfs_from_node_pre

def graph_path_graph(graph):
    path_graph = { v : [] for v in graph }

    for vertex in graph:
        graph_dfs_from_node_pre(
            graph,
            vertex,
            path_graph[vertex].append,
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
