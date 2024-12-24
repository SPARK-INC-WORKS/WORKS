//package com.example.auth.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.auth.model.FoodItem;
//import com.example.auth.repository.FoodItemRepository;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/food")
//public class FoodItemController {
//
//    @Autowired
//    private FoodItemRepository foodItemRepository;
//
//    // View all available food items
//    @GetMapping("/available")
//    public List<FoodItem> getAvailableFoodItems() {
//        return foodItemRepository.findAll()
//                .stream()
//                .filter(FoodItem::getAvailable)
//                .toList();
//    }
//
//    // Admin: Add new food item
//    @PostMapping
//    public FoodItem addFoodItem(@RequestBody FoodItem foodItem) {
//        return foodItemRepository.save(foodItem);
//    }
//
//    // Admin: Update food item
//    @PutMapping("/{id}")
//    public FoodItem updateFoodItem(@PathVariable Long id, @RequestBody FoodItem updatedFoodItem) {
//        return foodItemRepository.findById(id).map(foodItem -> {
//            foodItem.setName(updatedFoodItem.getName());
//            foodItem.setPrice(updatedFoodItem.getPrice());
//            foodItem.setAvailable(updatedFoodItem.getAvailable());
//            return foodItemRepository.save(foodItem);
//        }).orElseThrow(() -> new RuntimeException("Food item not found"));
//    }
//}
//
