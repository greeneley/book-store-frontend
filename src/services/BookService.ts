import API from "@/constants";
import axios from "axios";

const baseUrl = API.dev;

class BookService {
	static getAllBooks(page: number, size: number, seed: number) {
		return axios.get(baseUrl + "/api/v1/books/all", {
			params: {
				page,
				size,
				seed
			}
		});
	}

	static getBookDetail(bookId: number) {
		return axios.get(baseUrl + `/api/v1/books/${bookId}`);
	}
}

export default BookService;
