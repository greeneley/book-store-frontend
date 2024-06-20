export interface AddressRequest {
    province: string;
    district: string;
    ward: string;
    orderReceiverAddress: string; // Optional field
    receiverNameL: string; // Optional field
    receiverPhone: string; // Optional field
    createdAt: string; // Optional field
}
