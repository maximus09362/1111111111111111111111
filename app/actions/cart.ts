"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { CartItem } from "@/lib/types"

export async function getCartServerAction(): Promise<CartItem[]> {
  try {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return []
    }

    const { data, error } = await supabase.from("carts").select("items").eq("user_id", user.id).single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 means "no rows found"
      console.error("Error fetching cart:", error)
      return []
    }

    return (data?.items as CartItem[]) || []
  } catch (error) {
    console.error("Error in getCartServerAction:", error)
    return []
  }
}

export async function updateCartServerAction(newCart: CartItem[]): Promise<boolean> {
  try {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.warn("Attempted to update cart without authenticated user.")
      return false
    }

    const { error } = await supabase
      .from("carts")
      .upsert({ user_id: user.id, items: newCart }, { onConflict: "user_id" })

    if (error) {
      console.error("Error updating cart:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in updateCartServerAction:", error)
    return false
  }
}

export async function mergeGuestCartServerAction(guestCart: CartItem[]): Promise<boolean> {
  try {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.warn("Attempted to merge guest cart without authenticated user.")
      return false
    }

    const { data: existingCartData, error: fetchError } = await supabase
      .from("carts")
      .select("items")
      .eq("user_id", user.id)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching existing cart for merge:", fetchError)
      return false
    }

    const existingCart = (existingCartData?.items as CartItem[]) || []

    // Merge logic: combine guest cart with existing cart, prioritizing guest quantities
    const mergedCartMap = new Map<string, CartItem>()

    existingCart.forEach((item) => mergedCartMap.set(item.id, item))
    guestCart.forEach((guestItem) => {
      const existingItem = mergedCartMap.get(guestItem.id)
      if (existingItem) {
        mergedCartMap.set(guestItem.id, { ...existingItem, quantity: existingItem.quantity + guestItem.quantity })
      } else {
        mergedCartMap.set(guestItem.id, guestItem)
      }
    })

    const finalMergedCart = Array.from(mergedCartMap.values())

    const { error: updateError } = await supabase
      .from("carts")
      .upsert({ user_id: user.id, items: finalMergedCart }, { onConflict: "user_id" })

    if (updateError) {
      console.error("Error merging and updating cart:", updateError)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in mergeGuestCartServerAction:", error)
    return false
  }
}
