//package com.example.auth.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.auth.dto.CreateOrder;
//import com.example.auth.model.Order;
//import com.example.auth.repository.FoodItemRepository;
//import com.example.auth.repository.OrderRepository;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/orders")
//public class OrderController {
//
//    @Autowired
//    private OrderRepository orderRepository;
//
//    @Autowired
//    private FoodItemRepository foodItemRepository;
//
//    // Place an order
//    @PostMapping
//    public ResponseEntity<?> placeOrder(@RequestBody CreateOrder order) {
//        Optional<Order> orderExist = foodItemRepository.findById(order.getFoodItemId()).map(foodItem -> {
//            if (foodItem.getAvailable()) {
//                Order newOrder = new Order(order.getFoodItemId(), "Preparing",order.getUserId());
//                Order result=orderRepository.save(newOrder);
//                return  result;
//            }
//            return null;
//        });
//
//        if (orderExist.isPresent()) {
//            return ResponseEntity.status(201).body("Order placed successfully");
//        } else {
//            return ResponseEntity.status(404).body("Food item not found or out of stock");
//        }
//    }
//
//    // View order history
//    @GetMapping
//    public ResponseEntity<List<Order>> viewOrderHistory() {
//        List<Order> orderHistory = orderRepository.findAll();
//        return ResponseEntity.ok(orderHistory);
//    }
//
//    // Cancel order
//    @PutMapping("/{id}/cancel")
//    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
//        Optional<Order> order = orderRepository.findById(id);
//
//        if (order.isPresent()) {
//            order.get().setStatus("Cancelled");
//            Order updatedOrder = orderRepository.save(order.get());
//            return ResponseEntity.ok(updatedOrder);
//        } else {
//            return ResponseEntity.status(404).body("Order not found");
//        }
//    }
//
//    // Admin: Change order status
//    @PutMapping("/{id}/status")
//    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
//        Optional<Order> order = orderRepository.findById(id);
//
//        if (order.isPresent()) {
//            order.get().setStatus(status);
//            Order updatedOrder = orderRepository.save(order.get());
//            return ResponseEntity.ok(updatedOrder);
//        } else {
//            return ResponseEntity.status(404).body("Order not found");
//        }
//    }
//}
