package com.example.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderItemsList {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; 
   private String desc; 
private double price;
   private int quantity;

   public OrderItemsList(){}
public OrderItemsList(String name, String desc, double price, int quantity) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.quantity = quantity;
}
public String getName() {
    return name;
}
public void setName(String name) {
    this.name = name;
}
public String getDesc() {
    return desc;
}
public void setDesc(String desc) {
    this.desc = desc;
}
public double getPrice() {
    return price;
}
public void setPrice(double price) {
    this.price = price;
}
public int getQuantity() {
    return quantity;
}
public void setQuantity(int quantity) {
    this.quantity = quantity;
}
}
