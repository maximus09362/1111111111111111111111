export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  image: string
  category: string
  popular?: boolean
  ingredients?: string[]
  varieties?: MenuVariety[]
  priceLabel?: string
  sauceOptions?: string[]
}

export interface MenuVariety {
  name: string
  price: number
  description?: string
}

export interface CartItem extends MenuItem {
  quantity: number
  notes?: string
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
  enabled: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
  }
  paymentMethod: string
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered"
  createdAt: Date
}
