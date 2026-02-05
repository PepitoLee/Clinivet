import React from 'react';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  description: string;
  schedule: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// ========== NEW TYPES FOR E-COMMERCE & APPOINTMENTS ==========

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'alimentos' | 'medicinas' | 'accesorios' | 'higiene';
  stock: number;
  rating: number;
  badge?: 'nuevo' | 'oferta' | 'popular';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppointmentForm {
  ownerName: string;
  phone: string;
  email: string;
  petName: string;
  petType: 'perro' | 'gato' | 'ave' | 'roedor' | 'reptil' | 'otro';
  service: string;
  date: string;
  time: string;
  notes?: string;
}

export type ProductCategory = Product['category'] | 'todos';
