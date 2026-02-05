import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { drawerVariants, modalOverlayVariants, cartItem as cartItemVariants } from '../../animations/variants';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
            className="fixed inset-0 bg-vet-dark/60 backdrop-blur-md z-[100]"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 right-0 h-full w-full max-w-md shadow-2xl z-[101] flex flex-col ${isDark ? 'bg-[#0A1628]' : 'bg-vet-cream'}`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-white/[0.06]' : 'border-vet-blue-dark/[0.06]'}`}>
              <div className="flex items-center gap-3">
                <div>
                  <h2 className={`font-serif text-xl ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>Tu Carrito</h2>
                  <p className={`font-mono text-[0.65rem] tracking-[0.15em] uppercase ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>{totalItems} artículos</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/[0.06]' : 'hover:bg-vet-blue-dark/[0.04]'}`}
              >
                <X size={20} className={isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-white/[0.04]' : 'bg-vet-blue-dark/[0.04]'}`}>
                    <ShoppingBag className={`w-10 h-10 ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`} />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>
                    Tu carrito está vacío
                  </h3>
                  <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}>
                    Explora nuestra tienda y encuentra productos increíbles para tu mascota
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-vet-blue-dark text-white rounded-full font-medium hover:bg-vet-blue-dark/90 transition-colors"
                  >
                    Ir a la tienda
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      variants={cartItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className={`flex gap-4 mb-4 p-4 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-vet-blue-dark/[0.04]'}`}
                    >
                      {/* Image */}
                      <div className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${isDark ? 'bg-[#0F1E33]' : 'bg-vet-warm'}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium truncate ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>
                          {item.product.name}
                        </h4>
                        <p className={`font-mono text-[0.6rem] tracking-[0.15em] uppercase ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>
                          {item.product.category}
                        </p>

                        {/* Price and quantity */}
                        <div className="flex items-center justify-between mt-3">
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>
                            ${item.product.price * item.quantity}
                          </span>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-vet-orange-deep transition-colors ${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-vet-blue-dark/[0.08]'}`}
                            >
                              <Minus size={14} className={isDark ? 'text-slate-300' : 'text-vet-blue-dark'} />
                            </motion.button>
                            <span className={`w-8 text-center font-medium ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-vet-orange-deep transition-colors ${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-vet-blue-dark/[0.08]'}`}
                            >
                              <Plus size={14} className={isDark ? 'text-slate-300' : 'text-vet-blue-dark'} />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-vet-blue-dark/40 hover:text-vet-orange-deep transition-colors self-start"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className={`border-t p-6 space-y-4 ${isDark ? 'border-white/[0.06]' : 'border-vet-blue-dark/[0.06]'}`}>
                {/* Promo code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de descuento"
                    className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none transition-colors ${isDark ? 'bg-white/[0.03] border-white/[0.08] text-slate-200 placeholder:text-slate-500 focus:border-white/20' : 'bg-white border-vet-blue-dark/[0.08] focus:border-vet-blue-dark'}`}
                  />
                  <button className={`px-4 py-3 rounded-xl font-medium transition-colors ${isDark ? 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]' : 'bg-vet-blue-dark/[0.04] text-vet-blue-dark hover:bg-vet-blue-dark/[0.08]'}`}>
                    Aplicar
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}>
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}>
                    <span>Envío</span>
                    <span>{totalPrice >= 500 ? 'Gratis' : '$50.00'}</span>
                  </div>
                  <div className={`flex justify-between text-lg font-bold pt-2 border-t ${isDark ? 'text-slate-100 border-white/[0.06]' : 'text-vet-blue-dark border-vet-blue-dark/[0.06]'}`}>
                    <span>Total</span>
                    <span>
                      ${(totalPrice + (totalPrice >= 500 ? 0 : 50)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Free shipping progress */}
                {totalPrice < 500 && (
                  <div className="bg-vet-orange-deep/[0.06] p-4 rounded-xl">
                    <p className="text-sm text-vet-orange-deep mb-2">
                      Agrega ${(500 - totalPrice).toFixed(2)} más para envío gratis
                    </p>
                    <div className="h-2 bg-vet-orange-deep/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalPrice / 500) * 100, 100)}%` }}
                        className="h-full bg-vet-orange-deep rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Checkout button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-vet-blue-dark text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-vet-blue-dark/90 transition-colors"
                >
                  Proceder al pago
                  <ArrowRight size={18} />
                </motion.button>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-vet-blue-dark/30 hover:text-vet-orange-deep text-sm transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
