import React from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
};

interface BookCollectionProps {
  readingList: Book[];
}

const BookCollection: React.FC<BookCollectionProps> = ({ readingList }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">My Reading List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {readingList && readingList.length === 0 ? (
          <p>No books in your reading list yet.</p>
        ) : (
          readingList?.map((book) => (
            <div key={book.id} className="p-4 bg-white rounded shadow">
              <img src={book.image} alt={book.title} className="mb-4" />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BookCollection;
