package com.example.Exceptions;

public class CouponDoesntExistException extends Exception{
    public CouponDoesntExistException(String s) {
        super("There is no coupon with this id located at your data base");
    }
}
