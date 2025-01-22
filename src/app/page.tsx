"use client";

import Cta from "@/components/cta";
import Hero from "@/components/hero";
import Product from "@/components/product";
import Statistics from "@/components/statistics";
import { ProductType } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProduct] = useState<ProductType[]>([]);
  // const res = await fetch("https://fakestoreapi.com/products");
  const getData = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      // const products: ProductType[] = await data;
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // const products: ProductType[] = await res.json();

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 ">
      <Hero />
      <section className="flex flex-col space-y-12">
        <h1 className="text-5xl font-bold text-center">SAMMI SHOP DEALS</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Cta />
      <Statistics />
    </main>
  );
}
