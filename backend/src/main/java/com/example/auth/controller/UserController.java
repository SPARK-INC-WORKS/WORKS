package com.example.auth.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.auth.dto.CreateOrder;
import com.example.auth.model.FoodItem;
import com.example.auth.model.Order;
import com.example.auth.repository.FoodItemRepository;
import com.example.auth.repository.OrderRepository;
import com.example.auth.service.OrderService;

@RestController
@RequestMapping("/user")
public class UserController {
	  @Autowired
	    private FoodItemRepository foodItemRepository;

	  @Autowired
	    private OrderRepository orderRepository;

		 @Autowired
    private OrderService orderService;
	  @PreAuthorize("hasRole('ROLE_USER')")
	 @GetMapping("/available")
	    public List<FoodItem> getAvailableFoodItems() {
	        return foodItemRepository.findAll()
	                .stream()
	                .filter(FoodItem::getAvailable)
	                .toList();
	    }

	 // Place an order
	 	@PreAuthorize("hasRole('ROLE_USER')")
	    @PostMapping
	    public ResponseEntity<?> placeOrder(@RequestBody CreateOrder order) {
	        Optional<Order> orderExist = foodItemRepository.findById(order.getFoodItemId()).map(foodItem -> {
	            if (foodItem.getAvailable()) {
	                Order newOrder = new Order(order.getFoodItemId(), "Preparing",order.getUserId());
	                Order result=orderRepository.save(newOrder);
	                return  result;
	            }
	            return null;
	        });

	        if (orderExist.isPresent()) {
	            return ResponseEntity.status(201).body("Order placed successfully");
	        } else {
	            return ResponseEntity.status(404).body("Food item not found or out of stock");
	        }
	    }

	    // View order history
	 	@PreAuthorize("hasRole('ROLE_USER')")
	    @GetMapping("/{userId}")
    public List<Order> getOrderHistoryByUserId(@PathVariable Long userId) {
        return orderService.getUserOrderHistory(userId);
    }

	    // Cancel order
	 	@PreAuthorize("hasRole('ROLE_USER')")
	    @PutMapping("/{id}/cancel")
	    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
	        Optional<Order> order = orderRepository.findById(id);

	        if (order.isPresent()) {
	            order.get().setStatus("Cancelled");
	            Order updatedOrder = orderRepository.save(order.get());
	            return ResponseEntity.ok(updatedOrder);
	        } else {
	            return ResponseEntity.status(404).body("Order not found");
	        }
	    }
}

