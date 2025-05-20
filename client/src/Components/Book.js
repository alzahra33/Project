function Book() {
  return (
    <div>
      <h1>Book</h1>
      <form>
        <div>
          <input role='userName' type="text" placeholder="Name" />
        </div>
        <div>
          <input role='email' type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <button type="submit">Book</button>
        </div>
      </form>
    </div>
  );
}
export default Book;
