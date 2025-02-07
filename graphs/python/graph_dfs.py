def graph_dfs_from_node(graph, start_node, pre_order_callback=None,
                        post_order_callback=None, visited=None):
    """
    Given a graph and a starting node, perform a depth-first traversal
    of the graph. You can supply both a pre-order and post-order callback.
    """
    if visited is None:
        visited = set()

    if start_node in visited:
        return

    visited.add(start_node)

    if callable(pre_order_callback):
        pre_order_callback(start_node)

    for neighbor in graph[start_node]:
        graph_dfs_from_node(graph, neighbor, pre_order_callback,
                            post_order_callback, visited)

    if callable(post_order_callback):
        post_order_callback(start_node)


def graph_dfs(graph, pre_order_callback=None, post_order_callback=None):
    """
    Perform a depth-first traversal of the given graph.
    You can supply both a pre-order and post-order callback.
    """
    visited = set()

    for node in graph:
        graph_dfs_from_node(graph, node, pre_order_callback,
                            post_order_callback, visited)
