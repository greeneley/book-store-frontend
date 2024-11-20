import { OrderService } from "@services/OrderService";
import { convertToCurrency } from "@utils/helpers/convertToCurrency";
import { getDateStringFormat } from "@utils/helpers/getDateStringFormat";
import { Button, Col, Form, Image, Radio, RadioChangeEvent, Row, Select, Space, Table, TableColumnsType } from "antd";
import Input from "antd/es/input/Input";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CartInfo } from "../model/internal/cart-info";
import { CartItem } from "../model/internal/cart-item";
import { OrderStatus } from "../model/internal/request/order-request";

interface DataType {
	key: React.Key;
	imageUrl: string;
	book_id: number;
	name: string;
	quantity: number;
	total: number;
}

interface IProvince {
	province_id: number;
	province_name: string;
	province_type: string;
}

export const Checkout: React.FC = (props) => {
	const [paymentMethod, setPaymentMethod] = useState("COD");
	const [provinces, setProvinces] = useState(null);
	const [provinceId, setProvinceId] = useState<number | undefined>();
	const [provinceName, setProvinceName] = useState();
	const [districts, setDistricts] = useState(null);
	const [districtId, setDistrictId] = useState<number | undefined>();
	const [districtName, setDistrictName] = useState<string>();
	const [wards, setWards] = useState<any>();
	const [wardId, setWardId] = useState<number | undefined>();
	const [wardName, setWardName] = useState<string>();

	const cartInfo = useLoaderData() as CartInfo;
	const navigate = useNavigate();

	const [form] = Form.useForm();

	const dataSource = useMemo(() => {
		return cartInfo.cart_items.map((cartItem: CartItem) => {
			return {
				key: cartItem.cart_item_id,
				imageUrl: cartItem.book.imageUrl,
				book_id: cartItem.book.book_id,
				name: cartItem.book.name,
				quantity: cartItem.quantity,
				total: cartItem.subTotal
			};
		});
	}, [cartInfo.cart_items]);

	const columns: TableColumnsType<DataType> = [
		{
			title: "",
			dataIndex: "imageUrl",
			key: "imageUrl",
			width: 150,
			render: (url: string) => {
				return <Image src={url} width={100} />;
			}
		},
		{
			title: "Tên Sản phẩm",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Số lượng",
			dataIndex: "quantity",
			key: "quantity"
		},
		{
			title: "Thành tiền",
			dataIndex: "total",
			key: "total",
			render: (price: number) => {
				return convertToCurrency(price);
			}
		}
	];

	const onChangePaymentMethod = (e: RadioChangeEvent) => {
		setPaymentMethod(e.target.value);
	};

	useEffect(() => {
		axios.get("https://vapi.vnappmob.com/api/province/").then(async (res) => {
			const provinces = await res.data;
			setProvinces(provinces.results);
		});
	}, []);

	const onHandleProvince = (value: number, option: any) => {
		setProvinceId(value);
		setProvinceName(option?.label);
		form.setFieldsValue({ district: undefined });
		form.setFieldsValue({ ward: undefined });
	};

	useEffect(() => {
		if (provinceId) {
			axios.get("https://vapi.vnappmob.com/api/province/district/" + provinceId).then(async (res) => {
				const districts = await res.data;
				setDistricts(districts.results);
				setWards(undefined);
			});
		}
	}, [provinceId]);

	const onHandleDistrict = (value: number, option: any) => {
		setDistrictId(value);
		setDistrictName(option?.label);
		form.setFieldsValue({ ward: undefined });
	};

	useEffect(() => {
		if (districtId) {
			axios.get("https://vapi.vnappmob.com/api/province/ward/" + districtId).then(async (res) => {
				const wards = await res.data;
				setWards(wards.results);
			});
		}
	}, [districtId]);

	const onHandleWard = (value: number, option: any) => {
		setWardId(value);
		setWardName(option?.label);
	};

	const onFinish = (values: any) => {
		console.log(values);
		console.log(dataSource);

		const order = {
			address: {
				province: values.province,
				district: values.district,
				ward: values.ward,
				orderReceiverAddress: values.address,
				receiverName: values.name,
				receiverPhone: values.phone,
				createdAt: getDateStringFormat(new Date())
			},
			orderStatus: OrderStatus[OrderStatus.ORDERED],
			orderDate: getDateStringFormat(new Date()),
			paymentMethod: paymentMethod,
			total: cartInfo.total,
			orderItems: dataSource.map((item) => {
				return {
					bookId: item.book_id,
					quantity: item.quantity,
					priceAtPurchase: item.total
				};
			})
		};

		OrderService.createOrder(order).then(() => {
			toast.success("Đã tạo đơn hàng thành công");

			setTimeout(() => {
				navigate("/home");
			}, 3000);
		});
	};

	return (
		<>
			<Toaster />
			<div className="my-10 p-8">
				<Title level={3} className="font-light">
					Thông tin giao hàng
				</Title>
				<br />
				<Row gutter={15}>
					<Col span={12}>
						<Form form={form} onFinish={onFinish}>
							<div className="w-full">
								<Title level={4} className="font-light">
									Địa chỉ giao hàng
								</Title>
								<Form.Item name="name">
									<Input placeholder="Họ và tên" />
								</Form.Item>
								<Row gutter={15}>
									<Col span={16}>
										<Form.Item name="email">
											<Input placeholder="Email" />
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item name="phone">
											<Input name="mobile" placeholder="Số điện thoại" />
										</Form.Item>
									</Col>
								</Row>
								<Form.Item name="address">
									<Input placeholder="Địa chỉ" />
								</Form.Item>
								<Row gutter={10}>
									<Col span={8}>
										<Form.Item name="province">
											<Select placeholder="Tỉnh/thành" onSelect={onHandleProvince} allowClear={true}>
												{provinces
													? provinces.map((province: IProvince) => {
															const { province_id, province_name } = province;
															return (
																<Select.Option key={province_id} value={province_id}>
																	{province_name}
																</Select.Option>
															);
													  })
													: null}
											</Select>
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item name="district">
											<Select placeholder="Quận/huyện" onSelect={onHandleDistrict} allowClear={true}>
												{districts
													? districts.map((district: any) => {
															const { district_id, district_name } = district;
															return (
																<Select.Option key={district_id} value={district_id}>
																	{district_name}
																</Select.Option>
															);
													  })
													: null}
											</Select>
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item name="ward">
											<Select placeholder="Phường/xã" onSelect={onHandleWard} allowClear={true}>
												{wards?.map((ward: any) => {
													const { ward_id, ward_name } = ward;
													return (
														<Select.Option key={ward_id} value={ward_id}>
															{ward_name}
														</Select.Option>
													);
												})}
											</Select>
										</Form.Item>
									</Col>
								</Row>
								<Title level={4} className="font-light">
									Phương thức thanh toán
								</Title>
								<Radio.Group onChange={onChangePaymentMethod} value={paymentMethod}>
									<Space direction="vertical">
										<Radio value={"COD"}>Thanh toán khi giao hàng (COD)</Radio>
										<Radio value={"ATM"}>Chuyển khoản qua ngân hàng</Radio>
									</Space>
								</Radio.Group>
								{paymentMethod === "ATM" && (
									<div>
										<p>Dinh Thanh Hai</p>
										<p>Số tài khoản: 999999999999</p>
										<p>Ngân hàng: Vietcombank</p>
									</div>
								)}
							</div>
							<br />
							<Form.Item>
								<Button block htmlType="submit">
									Hoàn tất đơn hàng
								</Button>
							</Form.Item>
						</Form>
					</Col>

					<Col span={12}>
						<Title level={4} className="font-light">
							Danh sách sản phẩm
						</Title>
						<Title level={5} className="font-light">
							Tổng cộng: {convertToCurrency(cartInfo.total)}
						</Title>
						<div className="w-full">
							<Table dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 5 }} />;
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};
