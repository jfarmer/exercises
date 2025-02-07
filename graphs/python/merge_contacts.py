def merge_contacts(contacts):
    """
    Given a contact list where each entry is a person's name and a list of
    email addresses, merge contacts that share any email address. Each contact
    can be represented as a dictionary with a name and an array of email
    addresses. If two contacts share an email, they are considered the same
    person and should be merged into a single contact entry.

    The function should return a new list of merged contacts. Each merged
    contact should have a unique set of email addresses and may include
    names from any of the original unmerged entries.

    Example:
    Input: [
        {"name": "Alice", "emails": ["alice@example.com", "alice@gmail.com"]},
        {"name": "Bob", "emails": ["bob@example.com"]},
        {"name": "Alice Smith", "emails": ["alice@gmail.com"]}
    ]
    Output: [
        {"name": "Alice Smith", "emails": ["alice@example.com", "alice@gmail.com"]},
        {"name": "Bob", "emails": ["bob@example.com"]}
    ]
    """
    # Exercise: Implement this function
    pass
