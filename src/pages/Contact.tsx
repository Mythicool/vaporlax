import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { submitContactForm } from '@/lib/api'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const success = await submitContactForm(formData)
      if (success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@vaporlax.com',
      description: 'Send us an email anytime',
      color: 'neon-cyan',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '(405) 217-2299',
      description: 'Daily 9AM-11PM CST',
      color: 'neon-pink',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '1808 W Lindsey St #100',
      description: 'Norman, OK 73069',
      color: 'neon-purple',
    },
    {
      icon: Clock,
      title: 'Store Hours',
      details: 'Daily 9AM-11PM',
      description: 'Open 7 days a week',
      color: 'neon-teal',
    },
  ]

  const subjects = [
    'General Inquiry',
    'Product Question',
    'Order Support',
    'Technical Issue',
    'Wholesale Inquiry',
    'Partnership',
    'Other',
  ]

  return (
    <motion.div
      className="min-h-screen bg-vapor-black pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-orbitron font-bold text-4xl sm:text-5xl gradient-text mb-4">
            Get in Touch
          </h1>
          <p className="font-vt323 text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our products or need support? 
            We're here to help you navigate the future of vaping.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.div
                key={info.title}
                className="neon-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${info.color}/20 flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 text-${info.color}`} />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                  {info.title}
                </h3>
                <p className={`font-vt323 text-lg text-${info.color} mb-1`}>
                  {info.details}
                </p>
                <p className="font-vt323 text-sm text-gray-400">
                  {info.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="neon-card p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-6 h-6 text-neon-pink mr-3" />
                <h2 className="font-orbitron font-bold text-2xl text-white">
                  Send us a Message
                </h2>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  className="mb-6 p-4 bg-neon-teal/20 border border-neon-teal/50 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-neon-teal font-vt323 text-lg">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-400 font-vt323 text-lg">
                    ✗ Failed to send message. Please try again.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-orbitron font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-vapor-dark-gray border border-neon-cyan/50 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323 text-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-orbitron font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-vapor-dark-gray border border-neon-cyan/50 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323 text-lg"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-orbitron font-medium text-white mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-vapor-dark-gray border border-neon-cyan/50 text-white focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323 text-lg"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-orbitron font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-vapor-dark-gray border border-neon-cyan/50 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors duration-300 font-vt323 text-lg resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full neon-button neon-button-pink py-4 flex items-center justify-center space-x-3 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" color="neon-pink" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* FAQ Section */}
            <div className="neon-card p-8">
              <h3 className="font-orbitron font-bold text-xl text-white mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-orbitron font-medium text-neon-cyan mb-2">
                    What is your return policy?
                  </h4>
                  <p className="font-vt323 text-lg text-gray-300">
                    We offer a 30-day return policy for unopened products in original packaging.
                  </p>
                </div>
                <div>
                  <h4 className="font-orbitron font-medium text-neon-cyan mb-2">
                    Do you ship internationally?
                  </h4>
                  <p className="font-vt323 text-lg text-gray-300">
                    Currently, we ship within the United States only. International shipping coming soon!
                  </p>
                </div>
                <div>
                  <h4 className="font-orbitron font-medium text-neon-cyan mb-2">
                    How do I track my order?
                  </h4>
                  <p className="font-vt323 text-lg text-gray-300">
                    You'll receive a tracking number via email once your order ships.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="neon-card p-8">
              <h3 className="font-orbitron font-bold text-xl text-white mb-6">
                Store Hours - Norman, OK
              </h3>
              <div className="space-y-3 font-vt323 text-lg">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Sunday:</span>
                  <span className="text-neon-cyan">9:00 AM - 11:00 PM CST</span>
                </div>
                <div className="border-t border-vapor-light-gray pt-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Location 1:</span>
                    <span className="text-neon-pink">1808 W Lindsey St #100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Phone:</span>
                    <span className="text-neon-cyan">(405) 217-2299</span>
                  </div>
                </div>
                <div className="border-t border-vapor-light-gray pt-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Location 2:</span>
                    <span className="text-neon-pink">320 12th Ave SE #100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Phone:</span>
                    <span className="text-neon-cyan">(405) 217-2215</span>
                  </div>
                </div>
                <div className="flex justify-between border-t border-vapor-light-gray pt-3 mt-4">
                  <span className="text-gray-300">Online Support:</span>
                  <span className="text-neon-teal">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Age Verification Notice */}
            <div className="neon-card p-8 border-neon-pink/50">
              <h3 className="font-orbitron font-bold text-xl text-neon-pink mb-4">
                Age Verification Required
              </h3>
              <p className="font-vt323 text-lg text-gray-300">
                All customers must be 21 years or older to purchase vaping products. 
                We take age verification seriously and promote responsible vaping practices.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
