"""
Graph traversal functions implementing depth-first search in Python.
"""


def graph_dfs_from_node_pre(graph, start_node, callback=None, visited=None):
    """
    Given a graph and a starting node, perform a depth-first traversal of the graph.
    You can supply both a pre-order and post-order callback.
    """
    if visited is None:
        visited = set()

    if start_node in visited:
        return

    visited.add(start_node)

    if callback is not None:
        callback(start_node)

    for neighbor in graph[start_node]:
        graph_dfs_from_node_pre(
            graph,
            neighbor,
            callback=callback,
            visited=visited
        )


def graph_dfs_from_node_post(graph, start_node, callback=None, visited=None):
    """
    Given a graph and a starting node, perform a depth-first traversal of the graph.
    You can supply both a pre-order and post-order callback.
    """
    if visited is None:
        visited = set()

    if start_node in visited:
        return

    visited.add(start_node)

    for neighbor in graph[start_node]:
        graph_dfs_from_node_pre(
            graph,
            neighbor,
            callback=callback,
            visited=visited
        )

    if callback is not None:
        callback(start_node)


def graph_dfs_pre(graph, callback=None):
    """
    Perform a pre-order depth-first traversal of the given graph.
    """
    visited = set()

    for node in graph:
        graph_dfs_from_node_pre(
            graph,
            node,
            callback=callback,
            visited=visited
        )


def graph_dfs_post(graph, callback=None):
    """
    Perform a post-order depth-first traversal of the given graph.
    """
    visited = set()

    for node in graph:
        graph_dfs_from_node_post(
            graph,
            node,
            callback=callback,
            visited=visited
        )
