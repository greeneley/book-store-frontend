export interface AddressResponse {
	address_id: number; // Uses "addressId" due to @JsonProperty annotation
	province: string;
	district: string;
	ward: string;
	orderReceiverAddress?: string; // Optional field
	receiverName?: string; // Optional field
	receiverPhone?: string; // Optional field
	createdAt?: string; // Optional field
}
