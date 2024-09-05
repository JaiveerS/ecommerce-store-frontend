
export default function Orders(props) {
    const item = props.data
    return (
        <div className="px-10 py-5 flex flex-col">
            <table className="text-left text-lg font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th className="px-2 py-4">Product</th>
                        <th className="px-2 py-4 text-center">Price</th>
                        <th className="px-2  py-4 text-center">Quantity</th>
                        <th className="px-2 py-4 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {item.orderItems.map((element) => (
                        <tr>
                            <td>{element.productName}</td>
                            <td className="text-center">${element.price}</td>
                            <td className="text-center">{element.quantity}</td>
                            <td className="text-center">Ordered</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <details className="bg-gray-200 open:bg-white duration-300 px-5">
                <summary className="bg-inherit py-3 text-lg cursor-pointer">Shipping Details</summary>
                <div className="bg-white px-5 py-3 border border-gray-300 text-sm font-light">
                    <p>Shipping To: {item.fullName}</p>
                    <p>Phone Number: {item.phoneNumber}</p>
                    <p>Address: {item.address}</p>
                    <p>City: {item.city}</p>
                    <p>Province: {item.province}</p>
                    <p>Postal Code: {item.postalCode}</p>
                </div>
            </details>
        </div>
    )
}