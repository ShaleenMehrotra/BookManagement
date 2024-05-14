from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure MySQL
# app.config['MYSQL_USER'] = 'root'  # Replace with your MySQL username
# app.config['MYSQL_PASSWORD'] = 'password'  # Replace with your MySQL password
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_DB'] = 'book_management'
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

books = [{'id': 1, 'title':'Iron Man', 'author': 'Shaleen', 'genre': 'action'}, 
         {'id': 2, 'title':'Batman', 'author': 'Dhoni', 'genre': 'action'}, 
         {'id': 3, 'title':'Superman', 'author': 'Virat', 'genre': 'action'}]

# mysql = MySQL(app)

@app.route('/books', methods=['GET'])
def get_books():
    id = request.args.get('id')
    if id:
        return [d for d in books if d.get('id') == int(id)]
    # cur = mysql.connection.cursor()
    # cur.execute("SELECT * FROM books")
    # books = cur.fetchall()
    return books

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    title = data['title']
    author = data['author']
    genre = data['genre']
    # cur = mysql.connection.cursor()
    # cur.execute("INSERT INTO books (title, author, genre) VALUES (%s, %s, %s)", (title, author, genre))
    # mysql.connection.commit()
    books.append({'id': len(books)+1, 'title': title, 'author': author, 'genre': genre})
    return jsonify({"status": "Book added"}), 201

@app.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    data = request.json
    title = data['title']
    author = data['author']
    genre = data['genre']
    # cur = mysql.connection.cursor()
    # cur.execute("UPDATE books SET title = %s, author = %s, genre = %s WHERE id = %s", (title, author, genre, id))
    # mysql.connection.commit()
    d = next(book for book in books if book.get('id') == id)
    d['title'] = title
    d['author'] = author
    d['genre'] = genre
    return jsonify({"status": "Book updated"}), 200

@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    # cur = mysql.connection.cursor()
    # cur.execute("DELETE FROM books WHERE id = %s", (id,))
    # mysql.connection.commit()
    books[:] = [d for d in books if d.get('id') != id]
    return jsonify({"status": "Book deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)