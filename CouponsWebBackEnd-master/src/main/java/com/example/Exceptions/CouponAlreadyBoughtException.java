package com.example.Exceptions;

public class CouponAlreadyBoughtException extends Exception {
    public CouponAlreadyBoughtException() {
        super("Sorry,This Coupon Was Already Bought");
    }
}
