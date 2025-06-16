// Connect to your MongoDB shell or use Node.js with the MongoDB driver
// Assumes a database named 'plp_bookstore' and collection named 'books'

// Task 2: Basic CRUD Queries

// 1. Find all books in a specific genre
db.books.find({ genre: "Technology" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } });

// 3. Find books by a specific author
db.books.find({ author: "James Lee" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "Mastering Python" },
  { $set: { price: 27.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Silent Forest" });


// Task 3: Advanced Queries

// 1. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 2. Projection: only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. Sort by price ascending
db.books.find().sort({ price: 1 });

// 4. Sort by price descending
db.books.find().sort({ price: -1 });

// 5. Pagination: 5 books per page
// Page 1
db.books.find().skip(0).limit(5);

// Page 2
db.books.find().skip(5).limit(5);


// Task 4: Aggregation Pipelines

// 1. Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  }
]);

// 2. Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 3. Group books by publication decade
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $substr: [{ $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }, 0, 4] },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);


// Task 5: Indexing

// 1. Create an index on the title field
db.books.createIndex({ title: 1 });

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 3. Use explain to show performance improvement
db.books.find({ title: "Mastering Python" }).explain("executionStats");
