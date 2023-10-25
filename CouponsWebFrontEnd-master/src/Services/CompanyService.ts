import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import {CouponModel} from "../Models/CouponModel";
import {
    couponStore,
    addCouponAction,
    deleteCouponAction,
    fetchCouponsAction,
    updateCouponAction
} from "../Redux/CouponState";
import appConfig from "../Util/AppConfig";
import notificationService from "./NotificationService";


class CompanyService {


    public async addCoupon(coupon: CouponModel) {
        try {
            const response = (await axios.post<CouponModel>(appConfig.companyUrl + "coupons/add", coupon)).data;
            couponStore.dispatch(addCouponAction(response));
        } catch (err) {
            console.log(err);
            notificationService.error(err);
        }
    }

    public async updateCoupon(coupon: CouponModel) {
        const newCoupon = (await axios.put<CouponModel>(appConfig.companyUrl + "updateCoupon/" + coupon.id, coupon)).data
        couponStore.dispatch(updateCouponAction(newCoupon));
        return newCoupon;
    }


    public async getCompanyCoupons() {
        if (couponStore.getState().coupons.length === 0){
            const response =(await axios.get<CouponModel[]>("http://localhost:8080/company/coupons")).data
            couponStore.dispatch(fetchCouponsAction(response))
            return response;
        }
            return couponStore.getState().coupons
    }

    public async getOneCoupon(id: number) {
        if (couponStore.getState().coupons.length === 0)
            await this.getCompanyCoupons()
        const coupon = couponStore.getState().coupons.find(c => c.id === id)
        if (typeof coupon === "undefined")
            throw new Error("COUPON NOT FOUND")
        return coupon
    }

    // I didn't use the filter calls because they don't allow for cross-filtering
    public async getCompanyCouponsByCategory(category: string) {
        if (couponStore.getState().coupons.length === 0)
            await this.getCompanyCoupons()
        return couponStore.getState().coupons.filter(c => c.category === category)
    }

    public async getCompanyCouponsByMaxPrice(max: number) {
        if (couponStore.getState().coupons.length === 0)
            await this.getCompanyCoupons()
        return couponStore.getState().coupons.filter(c => c.price <= max)
    }

    public async getCompanyDetails() {
        return (await axios.get<CompanyModel>(appConfig.companyUrl + "details")).data;
    }



    public async deleteCoupon(id: number) {
        const response = (await axios.delete<string>(appConfig.companyUrl + id))
        couponStore.dispatch(deleteCouponAction(id));
        return response
    }
}

const companyService = new CompanyService();
export default companyService;