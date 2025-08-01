import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend portun

socket.on("connect", () => {
  console.log("Socket connected, id:", socket.id);
});

socket.on("new_order", (order) => {
  console.log("Yeni sipariş geldi:", order);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
