Write tests for the following functions:

```js
function purchaseTicket(name){
  return {
    owner: name,
    purchaseDate: Date.now(),
  }
}
```

---

```js
function verifyTicket(ticket){
  return ticket.purchaseDate < Date.now() + 1000 * 60 * 60 * 24
}
```
