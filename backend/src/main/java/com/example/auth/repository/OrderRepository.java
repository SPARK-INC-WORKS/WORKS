package com.example.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auth.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}

