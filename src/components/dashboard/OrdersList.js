import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import BaseCard from "../baseCard/BaseCard";
import  { useRouter } from "next/router";
import Cookies from "js-cookie";
const Orders = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState([]);
  const [emptyOrder, setEmptyOrder] = useState(null);


  useEffect(() => {
      let id = JSON.parse(Cookies.get('userData')).id;
      if (Cookies.get('token') && Cookies.get('userData')) {
          fetch(`http://127.0.0.1:8000/api/allOrders`).then((data) => {
              data.json().then((resp) => {
                  if ('orders' in resp) {
                      setOrderData(resp.orders)
                      console.log(resp.orders)
                  } else if ('empty' in resp) {
                      setOrderData(null)
                      setEmptyOrder(resp.empty)
                  } else {
                      console.log(resp.error)
                  }
                  
              })
          })
      } else {
          router.push('/')
      }
  }, [])

  return (
    <BaseCard title="All Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Product
              </Typography>
            </TableCell>
            
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Product Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Placed By
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Payment
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Date
              </Typography>
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((product) => (
            <TableRow key={product.order_id}>
              <TableCell>
                <Image src={product.img} height={50} alt='product img' width={100} priority className='h-10 w-50 object-cover' />
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.userName}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Rs.{product.price}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.payment}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.productPlaced}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};
// ordersList
export default Orders;
