export class CouponModel{
    id: number;
    title: string;
    amount: number;
    category: string;
    company_id: number;
    description: string;
    startDate: Date;
    endDate: Date;
    image: string;
    price: number;

    constructor(id:number, title: string, amount: number, category: string, company_id: number, description:
        string, startDate: Date, endDate: Date, image: string, price: number){
            this.id = id
            this.title = title
            this.amount = amount
            this.category = category
            this.company_id = company_id
            this.description = description
            this.startDate = startDate
            this.endDate = endDate
            this.image = image
            this.price = price
            
        }
}