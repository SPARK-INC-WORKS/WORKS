package com.example.auth.controller;

import java.util.List;
import java.util.Optional;

import com.example.auth.model.ContactForm;
import com.example.auth.repository.ReservationRepository;
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

import com.example.auth.model.FoodItem;
import com.example.auth.model.Order;
import com.example.auth.model.Reservation;
import com.example.auth.repository.FoodItemRepository;
import com.example.auth.repository.OrderRepository;
import com.example.auth.service.ContactFormService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
	private FoodItemRepository foodItemRepository;
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ReservationRepository reservationRepository;
	@Autowired
	 private ContactFormService contactFormService;

	  @PreAuthorize("hasRole('ROLE_USER')")
	  @GetMapping("/get-food-items")
	  public List<FoodItem> getAllFoodItems() {
		  return foodItemRepository.findAll();
	  }
	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping("/create-reservation")
	public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
		// Save the reservation to the database
		Reservation savedReservation = reservationRepository.save(reservation);

		// Return a response with the created reservation
		return ResponseEntity.ok(savedReservation);
	}


	@PreAuthorize("hasRole('ROLE_USER')")
	  @PostMapping("/contact-form")
    public ResponseEntity<ContactForm> submitContactForm(@RequestBody ContactForm contactForm) {
        ContactForm savedContactForm = contactFormService.saveContactForm(contactForm);
        return ResponseEntity.ok(savedContactForm);
    }
	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping("/place-order")
	public ResponseEntity<Order> placeOrder(@RequestBody Order order)  {
		// Set the initial status of the order
		order.setStatus("Preparing");

		// Save the order to the database
		Order savedOrder = orderRepository.save(order);

		// Return a response with the created order
		return ResponseEntity.ok(savedOrder);
	}


	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/get-orders/{userId}")
	public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
		// Retrieve orders for the specified user
		List<Order> userOrders = orderRepository.findByUserId(userId);

		// Return the list of orders
		return ResponseEntity.ok().body(userOrders);
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	@PutMapping("/cancel-order/{id}")
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

