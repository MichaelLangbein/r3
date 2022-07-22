# Things I've learned

- State in backend:
  - a little complicated. cannot just keep orchestrator in session, because it's not json-serializable.
  - still might be good because this way other frontends can be written that don't care about state management.