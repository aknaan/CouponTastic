import { createStore } from "redux";
import { CouponModel } from "../Models/CouponModel";

export class CouponState{
    public coupons: CouponModel[] = [];
}

export enum CouponActionType{
    FetchCoupons, AddCoupon, EditCoupon, DeleteCoupon, UpdateCoupon
}

export interface CouponAction{
    type: CouponActionType;
    payload: any;
}

export function addCouponAction(coupon: CouponModel){
    return {type: CouponActionType.AddCoupon, payload: coupon};
}
export function updateCouponAction(coupon: CouponModel){
    return {type: CouponActionType.UpdateCoupon, payload: coupon}
}
export function fetchCouponsAction(coupons: CouponModel[]){
    return {type: CouponActionType.FetchCoupons, payload: coupons};
}

export function editCouponAction(coupon: CouponModel){
    return {type: CouponActionType.EditCoupon, payload: coupon};
}

export function deleteCouponAction(id: number){
    return {type: CouponActionType.DeleteCoupon, payload: id};
}

export function couponReducer(currentState:CouponState = new CouponState(), action: CouponAction){
    const newState:{coupons: CouponModel[]} = {...currentState};

    switch(action.type){
        case CouponActionType.AddCoupon:
            newState.coupons.push(action.payload);
            break;

        case CouponActionType.UpdateCoupon:
            const couponId = action.payload.id; // payload is Coupon
            const couponIndex = newState.coupons.findIndex( p => p.id == couponId);
            if(couponIndex >= 0)
                newState.coupons[couponIndex] = action.payload;
            break;

        case CouponActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CouponActionType.EditCoupon:
            const indexToEdit = newState.coupons.findIndex(c => c.id === action.payload.id);
            if(indexToEdit >= 0)
                newState.coupons[indexToEdit] = action.payload;
            break;

        case CouponActionType.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload.id);
            if(indexToDelete >= 0)
                newState.coupons.splice(indexToDelete, 1);
            break;
    }
    return newState;
}

export const couponStore = createStore(couponReducer);