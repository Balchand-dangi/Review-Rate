# Interview Questions — Review&RATE Full-Stack App

A comprehensive collection of interview questions across every technology and concept used in this project.

---

## 📋 Table of Contents

1. [JavaScript / ES6+](#1-javascript--es6)
2. [React.js](#2-reactjs)
3. [Node.js & Express](#3-nodejs--express)
4. [MongoDB & Mongoose](#4-mongodb--mongoose)
5. [REST API Design](#5-rest-api-design)
6. [Authentication — JWT & RBAC](#6-authentication--jwt--rbac)
7. [CSS & Responsive Design](#7-css--responsive-design)
8. [WebSockets & Real-Time](#8-websockets--real-time)
9. [Performance & Network Optimization](#9-performance--network-optimization)
10. [System Design](#10-system-design)
11. [Data Structures & Algorithms](#11-data-structures--algorithms)
12. [Project-Specific Questions](#12-project-specific-questions)

---

## 1. JavaScript / ES6+

### Fundamentals
1. What is the difference between `var`, `let`, and `const`? When would you use each?
2. Explain closure in JavaScript with an example.
3. What is the difference between `==` and `===`?
4. What is event delegation and why is it useful?
5. Explain the concept of hoisting in JavaScript.
6. What is the difference between `null` and `undefined`?
7. What is the prototype chain? How does prototypal inheritance work?
8. What is the difference between `call()`, `apply()`, and `bind()`?
9. Explain the `this` keyword — how does its value change in different contexts?
10. What is a pure function? Why are pure functions desirable?

### Asynchronous JavaScript
11. What is the event loop? How does JavaScript handle asynchronous code?
12. What is the difference between callbacks, Promises, and `async/await`?
13. What does `Promise.all()` do? How is it different from `Promise.allSettled()`?
14. What happens if one Promise in `Promise.all()` rejects?
15. What is `Promise.race()`? Give a use case.
16. How do you cancel a fetch request? What is `AbortController`?
17. Explain the microtask queue vs the macrotask queue.
18. What is debouncing? What is throttling? When would you use each?
19. What is the difference between `setTimeout(fn, 0)` and a resolved Promise?
20. How does `async/await` handle errors? Show an example with try/catch.

### ES6+ Features
21. What are arrow functions? How do they differ from regular functions regarding `this`?
22. What is destructuring? Show array and object destructuring examples.
23. What are template literals? What are tagged template literals?
24. What is the spread operator (`...`)? How is it different from the rest parameter?
25. What are default function parameters?
26. What is a `Map` vs an object? What is a `Set` vs an array?
27. What are `Symbol`s? When would you use one?
28. What are generators (`function*`)? Give a use case.
29. What is `Optional Chaining` (`?.`)? What is `Nullish Coalescing` (`??`)?
30. What is the difference between `for...of` and `for...in`?

---

## 2. React.js

### Core Concepts
1. What is the Virtual DOM? How does React use it to improve performance?
2. What is the difference between a class component and a functional component?
3. What are props? What is prop drilling and how do you avoid it?
4. What is state? How is local state different from global/shared state?
5. What is the difference between controlled and uncontrolled components?
6. What is a key in React lists? Why is it important? What happens if you use index as key?
7. What is reconciliation in React?
8. What is React Strict Mode? What does it do in development?
9. What is the difference between a fragment (`<>`) and a `<div>`?
10. What is `React.memo`? When should you use it?

### Hooks
11. What is `useState`? What happens when state changes?
12. What is `useEffect`? Explain its dependency array with examples for all 3 cases.
13. What is the `useEffect` cleanup function? When does it run?
14. What is `useContext`? How does it compare to prop drilling?
15. What is `useRef`? Give two different use cases (DOM access and value persistence).
16. What is `useCallback`? When does it help with performance?
17. What is `useMemo`? How is it different from `useCallback`?
18. What is `useReducer`? When would you choose it over `useState`?
19. What is a custom hook? Write a `useDebounce` hook.
20. What is `useLayoutEffect`? How is it different from `useEffect`?

### Performance
21. What causes unnecessary re-renders in React? How do you prevent them?
22. What is code splitting? How do you implement it in React with `React.lazy` and `Suspense`?
23. What is the difference between `useCallback` and `useMemo`?
24. How does Context API affect performance? What is the risk with large contexts?
25. What is batching in React 18?

### Routing (React Router v6)
26. How does `useNavigate` work? How is it different from the old `useHistory`?
27. What is `useSearchParams`? How do you read and set URL query parameters?
28. What is the difference between `<Link>` and `<a>` in React Router?
29. How do you create protected/private routes in React Router?
30. What is the difference between `<BrowserRouter>` and `<HashRouter>`?

---

## 3. Node.js & Express

### Node.js Fundamentals
1. What is Node.js? How is it different from browser JavaScript?
2. What is the event-driven architecture in Node.js?
3. What is the difference between synchronous and asynchronous file operations in Node.js?
4. What is `process.env`? How do you use environment variables?
5. What is `require()` vs ES Module `import`?
6. What are streams in Node.js? What are the 4 types?
7. What is the difference between `setImmediate()` and `setTimeout(fn, 0)` in Node.js?
8. What is a buffer in Node.js?
9. How does Node.js handle CPU-intensive tasks? What are worker threads?
10. What is `package.json`? What is the difference between `dependencies` and `devDependencies`?

### Express.js
11. What is middleware in Express? How does `next()` work?
12. What is the order of middleware execution in Express?
13. How do you handle errors in Express? What is the error-handling middleware signature?
14. What is the difference between `app.use()` and `app.get()`?
15. What are route parameters vs query parameters in Express?
16. How do you parse a JSON request body in Express?
17. What is CORS? How do you enable it in Express?
18. How do you structure a large Express application (routes, controllers, models)?
19. What is `express.Router()`? How do you use it?
20. How do you implement rate limiting in Express?

---

## 4. MongoDB & Mongoose

### MongoDB
1. What is MongoDB? How is it different from a relational database?
2. What is a document? What is a collection?
3. What is BSON? How is it different from JSON?
4. What is an index in MongoDB? Why is it important?
5. What is the difference between `find()` and `findOne()`?
6. How do you do a case-insensitive regex search in MongoDB?
7. What is the aggregation pipeline? Give an example.
8. What is `$lookup`? How is it like a SQL JOIN?
9. What is sharding in MongoDB? What is replication?
10. What are the trade-offs of embedding documents vs referencing (IDs)?

### Mongoose
11. What is a Mongoose schema? How do you define one?
12. What are validators in Mongoose? Give examples.
13. What is a Mongoose virtual? When would you use one?
14. What are Mongoose middleware (pre/post hooks)? Give a use case.
15. What is `populate()` in Mongoose? How does it work?
16. What is the difference between `save()` and `findByIdAndUpdate()`?
17. How do you handle unique validation errors in Mongoose?
18. What is the `lean()` option in Mongoose queries? When is it useful?
19. How do you paginate results in Mongoose?
20. What is a Mongoose discriminator?

---

## 5. REST API Design

1. What are the HTTP methods (GET, POST, PUT, PATCH, DELETE)? When is each appropriate?
2. What is idempotency? Which HTTP methods are idempotent?
3. What are HTTP status codes? Give examples in the 2xx, 3xx, 4xx, 5xx ranges.
4. What is the difference between 401 and 403?
5. What is the difference between PUT and PATCH?
6. How do you version a REST API?
7. What is HATEOAS?
8. What are query parameters vs path parameters? When do you use each?
9. How do you design pagination for a REST API (offset-based vs cursor-based)?
10. What is the difference between REST and GraphQL? What are trade-offs?

---

## 6. Authentication — JWT & RBAC

### JWT
1. What is a JSON Web Token (JWT)? What are its 3 parts?
2. How does JWT authentication work (sign, send, verify flow)?
3. Where should you store JWTs on the client — localStorage, sessionStorage, or cookies? Trade-offs?
4. What is the difference between a symmetric and asymmetric JWT signing algorithm?
5. What is token expiry (`exp`)? How do you handle refresh tokens?
6. What is the difference between authentication and authorization?
7. How do you invalidate/revoke a JWT before it expires?
8. What is a JWT blacklist? What are the downsides?
9. What does `bcrypt` do? Why do you hash passwords before storing?
10. What is a salt in password hashing? Why is it needed?

### RBAC (Role-Based Access Control)
11. What is RBAC? How is it different from ABAC?
12. How do you implement RBAC in an Express + JWT app?
13. What is an authorization middleware in Express?
14. How do you attach roles to a JWT payload?
15. What are the security risks of trusting client-side role data?

---

## 7. CSS & Responsive Design

1. What is the CSS Box Model? What does `box-sizing: border-box` change?
2. What is the difference between `display: flex` and `display: grid`? When do you use each?
3. What are CSS media queries? Write one that targets screens smaller than 640px.
4. What is mobile-first design? How do you implement it with media queries?
5. What is the difference between `position: relative`, `absolute`, `fixed`, and `sticky`?
6. What is CSS specificity? How is it calculated?
7. What is the difference between `em`, `rem`, `%`, `vw`, and `vh`?
8. What are CSS custom properties (variables)? How do they differ from preprocessor variables?
9. What is `z-index`? Why does it sometimes not work as expected?
10. How do you center an element both horizontally and vertically using flexbox? Using grid?
11. What is the difference between `overflow: hidden`, `scroll`, and `auto`?
12. What is `transition` vs `animation` in CSS?
13. How do you make text truncate with an ellipsis?
14. What is the cascade in CSS? How does it determine which rule wins?
15. What is a CSS pseudo-class vs pseudo-element? Give examples.

---

## 8. WebSockets & Real-Time

1. What is the difference between HTTP and WebSockets?
2. What is Socket.IO? How does it fall back when WebSockets are unavailable?
3. What is a Socket.IO room? How do you emit to a specific room?
4. What is the difference between `socket.emit()`, `socket.broadcast.emit()`, and `io.emit()`?
5. How do you authenticate Socket.IO connections using JWT?
6. What is long polling? How is it different from WebSockets?
7. What is Server-Sent Events (SSE)? Compare to WebSockets.
8. How do you handle disconnection and reconnection in Socket.IO?
9. What is the namespace in Socket.IO? When would you use one?
10. How do you scale Socket.IO across multiple servers (sticky sessions, Redis adapter)?

---

## 9. Performance & Network Optimization

1. What is debouncing and how does it reduce network calls?
2. What is throttling? Give a real use case.
3. What is the `AbortController` API? Why should you use it in React's `useEffect`?
4. What is `Promise.all()`? How does parallel fetching improve load speed?
5. What is HTTP caching? What are cache-control headers?
6. What is memoization? How does it differ from caching?
7. What is lazy loading? How do you lazy load images?
8. What is code splitting? How does it improve initial load time?
9. What are Web Vitals (LCP, FID, CLS)? How do you optimize each?
10. What is a CDN? How does it improve performance?
11. What is GZIP/Brotli compression and how does it help?
12. What is HTTP/2? What improvements does it bring over HTTP/1.1?
13. What is tree shaking in JavaScript bundlers?
14. What is the critical rendering path in a browser?
15. How would you optimize an API endpoint that is very slow?

---

## 10. System Design

1. Design a URL shortener (like bit.ly). What components would you need?
2. Design a review/rating system for companies. How would you structure the database?
3. How would you implement a search feature that searches by company name?
4. How would you handle 1 million concurrent users on your Node.js app?
5. What is horizontal vs vertical scaling?
6. What is a load balancer? What algorithms does it use?
7. What is a message queue (e.g., RabbitMQ, Kafka)? When would you use one?
8. What is a cache? When would you use Redis vs Memcached?
9. How do you avoid race conditions when multiple users update the same data?
10. What is the CAP theorem?
11. What is eventual consistency vs strong consistency?
12. How would you design real-time notifications at scale?
13. What is a microservices architecture? How is it different from monolithic?
14. What is an API gateway?
15. How would you design a pagination system for a large dataset?

---

## 11. Data Structures & Algorithms

### Arrays & Strings
1. Reverse a string without using `.reverse()`.
2. Check if a string is a palindrome.
3. Find the first non-repeating character in a string.
4. Given an array, find two numbers that sum to a target (Two Sum).
5. Remove duplicates from a sorted array in place.

### Objects & Maps
6. Deep clone an object without JSON.parse/stringify.
7. Implement `groupBy` — group an array of objects by a property.
8. Flatten a nested object.

### Linked Lists, Stacks, Queues
9. Implement a stack using an array (push, pop, peek, isEmpty).
10. Detect a cycle in a linked list (Floyd's algorithm).

### Sorting & Searching
11. Explain Bubble Sort, Selection Sort, and Quick Sort. What are their time complexities?
12. Implement Binary Search. What is its time complexity and prerequisite?
13. When would you use Merge Sort over Quick Sort?

### Trees & Graphs
14. What is a binary search tree? What are its properties?
15. What is BFS vs DFS? When would you use each?
16. Find the height of a binary tree.

### Big O Notation
17. What is Big O notation? Why is it important?
18. What is the time complexity of accessing an array element? A hash map element?
19. What is O(n log n)? Which sorting algorithms achieve this?
20. What is the space complexity of recursion?

---

## 12. Project-Specific Questions

### Architecture
1. Walk me through the architecture of the Review&RATE app. How does data flow from the database to the user?
2. Why did you choose MongoDB over a relational database like PostgreSQL for this project?
3. How is the frontend and backend connected? What is the proxy configuration?
4. How is the application structured on the frontend (pages, components, context)?

### Features & Decisions
5. How does the search functionality work end-to-end in this application?
6. How do you filter companies by city on the backend? How is it case-insensitive?
7. How does the star rating system work? How is `avgRating` computed?
8. Why did you use `Promise.all()` in CompanyDetail instead of sequential fetches?
9. How did you implement debouncing in the Navbar search? Why 350ms?
10. What does the `AbortController` in `useEffect` protect against?

### Authentication & Security
11. How does login work in this app? What is stored in the browser after login?
12. How do you protect admin-only routes on both the frontend and backend?
13. What would happen if someone sent a POST request to `/api/companies` without being an admin?
14. How is the admin secret key handled securely in registration?
15. What is the risk of storing the JWT in localStorage? How would you mitigate it?

### Real-Time Features
16. How did you add real-time comments to the project?
17. How does a user get notified of a new comment without refreshing the page?
18. How do Socket.IO rooms prevent broadcasting events to unrelated clients?
19. How do you ensure a user only gets their own notifications?
20. What happens when the Socket.IO connection drops? How does the client recover?

### Improvements & Scalability
21. What would you add to this application if you had more time?
22. How would you add pagination to the company list?
23. If this app had 10,000 companies, how would you optimize the search?
24. How would you add image upload support for company logos?
25. How would you implement a "report review" feature?

---

*Good luck with your interview! 🚀*
