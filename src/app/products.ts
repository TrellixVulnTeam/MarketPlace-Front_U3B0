export interface Product {
  id: number;
  name: string;
  unit_price: number;
  description: string;
  image: string;
  cnpj:string;
  idStocks:number;
  idWishlist:number;
  quantity:number;
  idStore:number;
  date_purchase:Date;
  product:{
    image:string;
    name: string;
    description: string;
    unit_price:number;
  }
  store:{
    name: string;
  }
  stock:{
    unit_price:number;
  }
  client:{
    name:string;
  }
}