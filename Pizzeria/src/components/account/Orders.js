const Orders = ({ orders }) => {
  const calculateOrderCost = (products) => {
    var sum = 0;
    products.forEach((element) => {
      sum += element.price * element.count;
    });
    return sum;
  };

  const changeDate = (orderTime) => {
    var date;

    var tmp = new Date(orderTime);
    date = `${tmp.getDate()}-${tmp.getMonth()}-${tmp.getFullYear()} ${tmp.getHours()}:${tmp.getMinutes()}`;

    return date;
  };
  changeDate(orders);
  return (
    <div className="account-information">
      <div className="account-title">ORDERS</div>
      <div className="account-info-content"></div>
      <table>
        <thead>
          <tr>
            <th>Order number</th>
            <th>Order time</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.idOrder}>
              <td>{order.idOrder}</td>
              <td>{changeDate(order.orderTime)}</td>
              <td>{calculateOrderCost(order.products)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
