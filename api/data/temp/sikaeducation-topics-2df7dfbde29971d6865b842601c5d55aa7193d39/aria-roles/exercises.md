Identify the ARIA roles (if any) of each of the following elements:

```js
<header>
  <h1>Shoez</h1>
  <nav>
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">Products</a>
      </li>
      <li>
        <a href="#">About</a>
      </li>
    </ul>
  </nav>
</header>
<main>
  <section aria-label="account-creation">
    <h2>Create an Account</h2>
    <form>
      <label for="username">Username</label>
      <input required type="text" id="username" name="username" />

      <label for="password">Password</label>
      <input required type="password" id="password" name="password" />

      <label for="age">Age</label>
      <input type="number" id="age" name="age" />

      <label for="shirt-size">Shirt Size</label>
      <select id="shirt-size">
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
        <option value="xl">XL</option>
        <option value="xxl">XXL</option>
        <option value="xxxl">XXXL</option>
        <option value="xxxxl">XXXXL</option>
        <option value="xxxxxl">XXXXXL</option>
        <option value="xxxxxxl">XXXXXL</option>
      </select>

      <input type="submit" value="Create Account" />
    </form>
  </section>
</main>
```
