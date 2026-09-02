import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  FaCreditCard, 
  FaLock, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaArrowRight, 
  FaRegQuestionCircle, 
  FaExchangeAlt,
  FaShoppingBag,
  FaTag,
  FaCheck
} from 'react-icons/fa';
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay } from 'react-icons/si';

// Interactive 3D Card Preview Component
function Animated3DCard({ cardNumber, cardHolder, expiry, cvv, focusedField }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isFlipped = focusedField === 'cvv';

  return (
    <div 
      className="perspective-1000 w-full max-w-md mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative h-56 rounded-3xl p-6 text-white shadow-2xl overflow-hidden bg-gradient-to-tr from-violet-900 via-indigo-900 to-slate-900 border border-indigo-400/20"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-12 -right-12 w-56 h-56 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-12 -left-12 w-56 h-56 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" 
        />

        {/* Card Front */}
        <div className={`absolute inset-0 p-6 flex flex-col justify-between ${isFlipped ? 'hidden' : 'flex'}`}>
          <div className="flex justify-between items-center">
            <div className="w-12 h-8 rounded-lg bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 border border-amber-200/50 shadow-inner relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-[1px] bg-amber-950/30 absolute top-2" />
              <div className="w-full h-[1px] bg-amber-950/30 absolute bottom-2" />
            </div>
            <div className="flex gap-2 text-3xl">
              <SiVisa className="drop-shadow" />
              <SiMastercard className="drop-shadow" />
            </div>
          </div>

          <motion.div 
            animate={{ scale: focusedField === 'number' ? 1.04 : 1 }}
            className="text-xl sm:text-2xl font-mono tracking-[0.2em] font-medium transition-all text-shadow"
          >
            {cardNumber || '•••• •••• •••• ••••'}
          </motion.div>

          <div className="flex justify-between items-end text-xs">
            <motion.div animate={{ scale: focusedField === 'name' ? 1.04 : 1 }}>
              <div className="text-[10px] text-indigo-200/70 uppercase tracking-widest font-semibold mb-1">Cardholder Name</div>
              <div className="font-semibold tracking-wider uppercase truncate max-w-[200px] text-sm">
                {cardHolder || 'FULL NAME'}
              </div>
            </motion.div>
            <motion.div animate={{ scale: focusedField === 'expiry' ? 1.04 : 1 }}>
              <div className="text-[10px] text-indigo-200/70 uppercase tracking-widest font-semibold mb-1">Expires</div>
              <div className="font-mono font-semibold text-sm">{expiry || 'MM/YY'}</div>
            </motion.div>
          </div>
        </div>

        {/* Card Back (CVV focus) */}
        <div className={`absolute inset-0 py-6 flex flex-col justify-between rotate-y-180 ${!isFlipped ? 'hidden' : 'flex'}`}>
          <div className="w-full h-10 bg-slate-950/90 mt-2" />
          <div className="px-6">
            <div className="text-[10px] text-indigo-200/70 uppercase tracking-widest font-semibold mb-1 text-right">Security Code (CVV)</div>
            <div className="w-full h-10 bg-white/90 rounded-lg px-4 flex items-center justify-end font-mono text-slate-900 font-bold tracking-widest">
              {cvv || '•••'}
            </div>
          </div>
          <div className="px-6 text-[10px] text-indigo-200/50 text-center">
            Authorized signature • Not valid unless signed
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TransactionCard() {
  const [method, setMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setExpiry(val);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().length > 0) {
      setIsPromoApplied(true);
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 2400);
  };

  const resetForm = () => {
    setIsPaid(false);
    setCardNumber('');
    setCardHolder('');
    setExpiry('');
    setCvv('');
    setIsPromoApplied(false);
    setPromoCode('');
  };

  const totalAmount = isPromoApplied ? 129.00 : 149.00;

  return (
    <section className="w-full min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-12 font-sans text-slate-800 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200/80 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isPaid ? (
            <motion.div
              key="checkout-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Column: Summary & 3D Visual Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/50 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between space-y-8">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase mb-2">
                    <FaShoppingBag /> Order Summary
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Complete Checkout
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Review your items and enter payment details to start your subscription.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200/60 text-sm">
                      <div>
                        <span className="font-semibold text-slate-800">Pro Developer Plan</span>
                        <span className="block text-xs text-slate-500">Annual billing</span>
                      </div>
                      <span className="font-bold text-slate-900">$149.00</span>
                    </div>

                    {isPromoApplied && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex justify-between items-center py-2 border-b border-emerald-200/60 text-sm text-emerald-600"
                      >
                        <span className="flex items-center gap-1.5 font-medium"><FaTag /> Discount Applied</span>
                        <span className="font-bold">-$20.00</span>
                      </motion.div>
                    )}

                    {!isPromoApplied && (
                      <form onSubmit={handleApplyPromo} className="flex gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    <div className="flex justify-between items-center pt-2 text-base font-extrabold text-slate-900">
                      <span>Total Due</span>
                      <motion.span 
                        key={totalAmount}
                        initial={{ scale: 1.2, color: '#4f46e5' }}
                        animate={{ scale: 1, color: '#0f172a' }}
                        className="text-2xl text-indigo-600"
                      >
                        ${totalAmount.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Animated3DCard
                    cardNumber={cardNumber}
                    cardHolder={cardHolder}
                    expiry={expiry}
                    cvv={cvv}
                    focusedField={focusedField}
                  />
                  <p className="text-[11px] text-center text-slate-400 mt-3">
                    Hover card to tilt 3D preview • Focus CVV field to view flip animation
                  </p>
                </div>
              </div>

              {/* Right Column: Checkout Form */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        Payment Details <FaShieldAlt className="text-emerald-500 text-sm" />
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">Choose your preferred payment method</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <FaLock className="text-[10px]" /> 256-Bit SSL
                    </span>
                  </div>

                  {/* Method Tabs */}
                  <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-100 rounded-2xl mb-8">
                    {[
                      { id: 'card', label: 'Credit Card', icon: <FaCreditCard /> },
                      { id: 'apple', label: 'Apple Pay', icon: <SiApplepay className="text-lg" /> },
                      { id: 'google', label: 'Google Pay', icon: <SiGooglepay className="text-xl" /> },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMethod(item.id)}
                        className={`relative flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                          method === item.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {method === item.id && (
                          <motion.div
                            layoutId="activeMethodTabFull"
                            className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200/60"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-2">{item.icon} {item.label}</span>
                      </button>
                    ))}
                  </div>

                  {method === 'card' ? (
                    <form onSubmit={handlePay} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            onFocus={() => setFocusedField('number')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm font-mono text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                          />
                          <FaCreditCard className="absolute left-4 top-3.5 text-slate-400 text-base" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="John Doe"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Expiration Date</label>
                          <input
                            type="text"
                            required
                            value={expiry}
                            onChange={handleExpiryChange}
                            onFocus={() => setFocusedField('expiry')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="MM/YY"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">CVV</label>
                            <FaRegQuestionCircle className="text-slate-400 text-xs cursor-pointer hover:text-slate-600" title="3-digit code on back" />
                          </div>
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                            onFocus={() => setFocusedField('cvv')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="•••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={isProcessing}
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all relative overflow-hidden"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Authorizing Transaction...
                          </div>
                        ) : (
                          <span className="flex items-center gap-2 text-base">
                            Pay ${totalAmount.toFixed(2)} <FaArrowRight className="text-xs" />
                          </span>
                        )}
                      </motion.button>
                    </form>
                  ) : (
                    <div className="py-16 text-center space-y-6">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-4xl text-slate-800 shadow-inner">
                        {method === 'apple' ? <SiApplepay /> : <SiGooglepay />}
                      </div>
                      <div className="max-w-xs mx-auto">
                        <h3 className="text-lg font-bold text-slate-900">
                          Pay with {method === 'apple' ? 'Apple Pay' : 'Google Pay'}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Authorize payment instantly using biometric authentication on your device.
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePay}
                        className="w-full max-w-sm mx-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base shadow-lg"
                      >
                        Checkout with {method === 'apple' ? 'Apple Pay' : 'Google Pay'}
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <FaCheck className="text-emerald-500 text-xs" /> 30-Day Money Back Guarantee
                  </span>
                  <span>PCI-DSS Certified Level 1</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="payment-success-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-6 text-center space-y-6"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-5xl shadow-xl shadow-emerald-500/10"
              >
                <FaCheckCircle />
              </motion.div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-3xl font-extrabold text-slate-900">Payment Complete!</h3>
                <p className="text-sm text-slate-500">
                  Thank you for your purchase. We have sent a confirmation receipt to your email address.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left text-sm space-y-3 max-w-sm mx-auto text-slate-600 shadow-sm">
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-900">#PAY-948201948</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Charged:</span>
                  <span className="font-bold text-indigo-600">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold text-slate-900 uppercase">{method}</span>
                </div>
              </div>

              <div>
                <button
                  onClick={resetForm}
                  className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2 shadow-lg"
                >
                  <FaExchangeAlt /> Return to Store
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}