import { useState } from "react";
import "@/App.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast, Toaster } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    booth_type: "Classic Print Booth",
    message: ""
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/bookings`, bookingData);
      toast.success("Booking inquiry submitted successfully! We'll contact you soon.");
      setShowBookingForm(false);
      setBookingData({
        name: "",
        email: "",
        phone: "",
        event_type: "",
        event_date: "",
        booth_type: "Classic Print Booth",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
      console.error(error);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-display font-bold tracking-tight text-gray-900">
              Forever Photobooth
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('booths')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Our Booths</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Testimonials</button>
              <Button 
                onClick={() => setShowBookingForm(true)} 
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full"
                data-testid="nav-book-now-btn"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558467778-122dbb038e3b?crop=entropy&cs=srgb&fm=jpg&q=85" 
            alt="Photo booth experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/90 via-cream-50/85 to-amber-50/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="text-rose-600 font-script text-2xl md:text-3xl italic">immersive experiences</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            Vancouver Photo Booth Rental
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light max-w-3xl mx-auto leading-relaxed">
            Experience an exquisite blend of elegance, where cherished memories intertwine with cherished keepsakes.
          </p>
          <div className="mb-8">
            <span className="text-amber-700 font-script text-2xl md:text-3xl italic">timeless elegance</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setShowBookingForm(true)} 
              size="lg" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              data-testid="hero-book-now-btn"
            >
              BOOK NOW
            </Button>
            <Button 
              onClick={() => scrollToSection('services')} 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-900 text-gray-900 px-10 py-6 text-lg rounded-full hover:bg-gray-900 hover:text-white transition-all"
              data-testid="explore-services-btn"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24 px-6 bg-white" data-testid="services-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Our Photo Booths for Rent
            </h2>
            <p className="text-xl text-gray-600 font-light">exceptional photo souvenirs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Classic Print Booth",
                description: "Capture cherished memories in stunning, high-quality prints with sophistication",
                image: "https://images.unsplash.com/photo-1558707538-c56435bdcdf3?crop=entropy&cs=srgb&fm=jpg&q=85",
                testId: "classic-booth-card"
              },
              {
                title: "Portrait Print Booth",
                description: "Offers a touch of glamor, letting guests showcase their best angles with professional-grade portraits.",
                image: "https://images.unsplash.com/photo-1698235301688-6b5b79dac3d5?crop=entropy&cs=srgb&fm=jpg&q=85",
                testId: "portrait-booth-card"
              },
              {
                title: "360 Video Booth",
                description: "360 video booth offers an immersive journey, ideal for brand activations and experiential marketing",
                image: "https://images.pexels.com/photos/19568105/pexels-photo-19568105.jpeg",
                testId: "360-booth-card"
              }
            ].map((booth, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-none" data-testid={booth.testId}>
                <div className="relative overflow-hidden h-80">
                  <img 
                    src={booth.image} 
                    alt={booth.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-display text-2xl font-bold mb-2">{booth.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">{booth.description}</p>
                  <Button 
                    onClick={() => scrollToSection('booths')} 
                    variant="ghost" 
                    className="text-rose-600 hover:text-rose-700 p-0 h-auto font-semibold"
                    data-testid={`${booth.testId}-learn-more`}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Booth Sections */}
      <section id="booths" className="py-24 px-6 bg-gradient-to-br from-rose-50 via-cream-50 to-amber-50" data-testid="booths-detail-section">
        <div className="container mx-auto max-w-6xl space-y-24">
          
          {/* Glam Portrait Booth */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="font-script text-rose-600 text-2xl mb-4 italic">Timeless Elegance</h3>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                GLAM PORTRAIT BOOTH
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our luxury portrait photo booth rental, complete with a glam beauty filter, is for those seeking timeless elegance and sophistication, available in both vibrant color or classic black and white options.
              </p>
              <Button 
                onClick={() => setShowBookingForm(true)} 
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 text-lg rounded-full"
                data-testid="portrait-booth-book-btn"
              >
                Book This Booth
              </Button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1627580158782-ecd7b8a16326?crop=entropy&cs=srgb&fm=jpg&q=85" 
                  alt="Portrait booth"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 360 Video Booth */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/34765679/pexels-photo-34765679.jpeg" 
                  alt="360 video booth"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-script text-amber-700 text-2xl mb-4 italic">Immersive Experience</h3>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                360 VIDEO BOOTH
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our 360 video booth offers an immersive and dynamic experience, perfect for brand activation events, marketing campaigns and private events. With its cutting-edge technology and customizable features, it captivates audiences and leaves a lasting impression.
              </p>
              <Button 
                onClick={() => setShowBookingForm(true)} 
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-6 text-lg rounded-full"
                data-testid="360-booth-book-btn"
              >
                Book This Booth
              </Button>
            </div>
          </div>

          {/* Classic Print Booth */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="font-script text-rose-600 text-2xl mb-4 italic">Classic Memories</h3>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                CLASSIC PRINT BOOTH
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our sleek and stylish Open-Air Photo Booths are perfect for maximising fun, allowing more guests to join in on the action and delivering prints in an instant. Perfect for weddings, birthdays, and corporate events.
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl mb-6 border border-rose-200">
                <p className="text-gray-800 font-medium">
                  <span className="text-rose-600 font-bold">Please note:</span> Friday and Saturday evenings require a minimum booking of 3 hours
                </p>
              </div>
              <Button 
                onClick={() => setShowBookingForm(true)} 
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 text-lg rounded-full"
                data-testid="classic-booth-book-btn"
              >
                Book This Booth
              </Button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3271951/pexels-photo-3271951.jpeg" 
                  alt="Classic booth"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 bg-white" data-testid="experience-section">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            Forever Photobooth Vancouver Experience
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Experience the ultimate in photobooth luxury with our comprehensive range of services.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            From our classic print photobooth, offering seamless and enjoyable experiences, to our luxury portrait print booth, exuding timeless elegance with a glam beauty filter, and finally, our immersive 360 video booth, perfect for brand activations and private events, each booth is designed to capture cherished memories and elevate the atmosphere of any occasion.
          </p>
          <div className="mt-12">
            <span className="font-script text-3xl md:text-4xl text-rose-600 italic">always and forever</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gradient-to-br from-amber-50 via-rose-50 to-cream-50" data-testid="testimonials-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-script text-2xl text-gray-600 mb-4 italic">testimonials</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Lisa",
                event: "Wedding",
                text: "I had the pleasure of using Forever Photobooth Studio for a wedding and I cannot recommend them highly enough! The quality of the photos was outstanding. The team was incredibly professional and friendly.",
                testId: "testimonial-lisa"
              },
              {
                name: "Barbara",
                event: "Corporate Event",
                text: "Samantha and the forever photo booth team are great! They were so easy to work with and were a hit at a corporate event I organized. I'll be working with them again!",
                testId: "testimonial-barbara"
              },
              {
                name: "Shaun",
                event: "Client Appreciation",
                text: "We hired Forever Photobooth for a corporate client appreciation event. Samantha was excellent in communicating, their price was very competitive. Everyone really enjoyed it.",
                testId: "testimonial-shaun"
              },
              {
                name: "Selina",
                event: "Wedding",
                text: "We recently had Forever Photobooth at my wedding. Highly recommend! Communication was easy and fast. They had a lot of props and backdrops to choose from. Everyone had a lot of fun!",
                testId: "testimonial-selina"
              },
              {
                name: "Ali",
                event: "Holiday Party",
                text: "I used Forever Photobooth for my company's corporate holiday party. They were fast responding, timely, professional and friendly! Forever Photobooth was by far the easiest to work with.",
                testId: "testimonial-ali"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow" data-testid={testimonial.testId}>
                <CardContent className="p-8">
                  <div className="text-rose-600 text-4xl mb-4">"</div>
                  <p className="text-gray-700 leading-relaxed mb-6">{testimonial.text}</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.event}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-8 py-6 text-lg rounded-full"
              data-testid="read-reviews-btn"
            >
              Read More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-rose-600 via-rose-500 to-amber-600 text-white" data-testid="cta-section">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">
            Making Memories
          </h2>
          <p className="text-2xl md:text-3xl font-light mb-12 opacity-95">
            That last a lifetime
          </p>
          <Button 
            onClick={() => setShowBookingForm(true)} 
            size="lg" 
            className="bg-white text-rose-600 hover:bg-gray-100 px-12 py-8 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all font-bold"
            data-testid="cta-book-now-btn"
          >
            BOOK NOW
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6" data-testid="footer">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">Forever Photobooth</h3>
              <p className="text-gray-400">Creating unforgettable memories in Vancouver, BC</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Classic Print Booth</li>
                <li>Portrait Print Booth</li>
                <li>360 Video Booth</li>
                <li>Brand Activations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Vancouver, BC</li>
                <li>Lower Mainland</li>
                <li>
                  <Button 
                    onClick={() => setShowBookingForm(true)} 
                    variant="link" 
                    className="text-rose-400 hover:text-rose-300 p-0 h-auto"
                    data-testid="footer-book-btn"
                  >
                    Book Online
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2024 Forever Photobooth Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" data-testid="booking-modal">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-3xl font-bold text-gray-900">Book Your Photo Booth</h2>
                <button 
                  onClick={() => setShowBookingForm(false)} 
                  className="text-gray-500 hover:text-gray-900 text-2xl"
                  data-testid="close-modal-btn"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="mt-2"
                    data-testid="booking-name-input"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="mt-2"
                    data-testid="booking-email-input"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="mt-2"
                    data-testid="booking-phone-input"
                  />
                </div>
                
                <div>
                  <Label htmlFor="event_type">Event Type *</Label>
                  <Input 
                    id="event_type"
                    placeholder="e.g., Wedding, Corporate Event, Birthday"
                    required
                    value={bookingData.event_type}
                    onChange={(e) => setBookingData({...bookingData, event_type: e.target.value})}
                    className="mt-2"
                    data-testid="booking-event-type-input"
                  />
                </div>
                
                <div>
                  <Label htmlFor="event_date">Event Date *</Label>
                  <Input 
                    id="event_date"
                    type="date"
                    required
                    value={bookingData.event_date}
                    onChange={(e) => setBookingData({...bookingData, event_date: e.target.value})}
                    className="mt-2"
                    data-testid="booking-date-input"
                  />
                </div>
                
                <div>
                  <Label htmlFor="booth_type">Booth Type *</Label>
                  <select 
                    id="booth_type"
                    required
                    value={bookingData.booth_type}
                    onChange={(e) => setBookingData({...bookingData, booth_type: e.target.value})}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    data-testid="booking-booth-type-select"
                  >
                    <option>Classic Print Booth</option>
                    <option>Portrait Print Booth</option>
                    <option>360 Video Booth</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us more about your event..."
                    value={bookingData.message}
                    onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                    className="mt-2 min-h-[120px]"
                    data-testid="booking-message-input"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-6 text-lg rounded-full"
                    data-testid="submit-booking-btn"
                  >
                    Submit Booking Inquiry
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowBookingForm(false)}
                    className="px-8 py-6 rounded-full"
                    data-testid="cancel-booking-btn"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;