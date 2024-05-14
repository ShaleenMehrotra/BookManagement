$(document).ready(function () {
  let currentBookId; // Variable to store the book ID being updated

  // Load books when the page is ready
  loadBooks();

  // Add book
  $("#addBookForm").on("submit", function (e) {
    e.preventDefault();
    const book = {
      title: $("#title").val(),
      author: $("#author").val(),
      genre: $("#genre").val(),
    };

    $.ajax({
      url: "http://127.0.0.1:5000/books",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(book),
      success: function () {
        loadBooks(); // Reload books after adding
      },
    });
  });

  // Open modal for updating
  $(document).on("click", ".update", function () {
    const bookId = $(this).data("id");
    currentBookId = bookId; // Store the book ID
    const bookRow = $(this).closest("tr");
    $("#updateTitle").val(bookRow.find("td:eq(1)").text());
    $("#updateAuthor").val(bookRow.find("td:eq(2)").text());
    $("#updateGenre").val(bookRow.find("td:eq(3)").text());
    $("#updateModal").modal("show"); // Open modal
  });

  // Update book
  $("#updateBookForm").on("submit", function (e) {
    e.preventDefault();
    const book = {
      title: $("#updateTitle").val(),
      author: $("#updateAuthor").val(),
      genre: $("#updateGenre").val(),
    };

    $.ajax({
      url: `http://127.0.0.1:5000/books/${currentBookId}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(book),
      success: function () {
        loadBooks(); // Reload books after updating
        $("#updateModal").modal("hide"); // Close modal
      },
    });
  });

  // Delete book
  $(document).on("click", ".delete", function () {
    const bookId = $(this).data("id");

    $.ajax({
      url: `http://127.0.0.1:5000/books/${bookId}`,
      type: "DELETE",
      success: function () {
        loadBooks(); // Reload books after deleting
      },
    });
  });

  // Load all books
  function loadBooks() {
    $.ajax({
      url: "http://127.0.0.1:5000/books",
      type: "GET",
      success: function (books) {
        const tableBody = $("#booksTable tbody");
        tableBody.empty(); // Clear previous data

        books.forEach((book) => {
          tableBody.append(`
                      <tr>
                          <td>${book.id}</td>
                          <td>${book.title}</td>
                          <td>${book.author}</td>
                          <td>${book.genre}</td>
                          <td>
                              <button class="btn update" data-id="${book.id}">Update</button>
                              <button class="btn delete" data-id="${book.id}">Delete</button>
                          </td>
                      </tr>
                  `);
        });
      },
    });
  }
});
