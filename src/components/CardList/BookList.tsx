import { BookItem } from "@components/Book/BookItem";
import BookService from "@services/BookService";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Book } from "../../model";

export const BookList: React.FC = () => {
	const [books, setBooks] = useState<Array<Book>>([]);

	useEffect(() => {
		BookService.getAllBooks(0, 12, 1).then((response: any) => {
			console.log(response);
			setBooks([...response.data.content]);
		});
	}, []);

	return (
		<>
			<div className="my-10 bg-white p-8 rounded-2xl">
				<Title level={3} className="font-light">
					Danh sách
				</Title>
				<Toaster />
				<br />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{books &&
						books.map((book: Book, index: number) => {
							return (
								<BookItem key={index} url={book.imageUrl} price={book.price} title={book.name} bookId={book.book_id} />
							);
						})}
				</div>
			</div>
		</>
	);
};
