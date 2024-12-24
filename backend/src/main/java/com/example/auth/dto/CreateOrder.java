package com.example.auth.dto;

public class CreateOrder {
	public CreateOrder(Long userId, Long foodItemId, String status) {
		super();
		this.userId = userId;
		this.foodItemId = foodItemId;

	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getFoodItemId() {
		return foodItemId;
	}
	public void setFoodItemId(Long foodItemId) {
		this.foodItemId = foodItemId;
	}


    private Long userId;
    private Long foodItemId;
 
}
