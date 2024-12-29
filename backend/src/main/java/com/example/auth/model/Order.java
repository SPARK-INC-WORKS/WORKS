package com.example.auth.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id") // Add this to create a foreign key reference to User
    private User user;  // This is the missing user relationship field

    private String status; // Preparing, Ready, Cancelled

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> foodItems;

    // Constructors, Getters, Setters

    public Order() {
    }

    public Order(User user, String status, List<OrderItem> foodItems) {
        this.user = user;
        this.status = status;
        this.foodItems = foodItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {  // Use 'user' instead of 'userId'
        return user;
    }

    public void setUser(User user) {  // Set the user directly
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItem> getFoodItems() {
        return foodItems;
    }

    public void setFoodItems(List<OrderItem> foodItems) {
        this.foodItems = foodItems;
    }
}
