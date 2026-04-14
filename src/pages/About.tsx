export default function About() {
  return (
    <div className="py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">
          ABOUT <span className="text-primary">US</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-16">
        <div className="md:w-2/5">
          <img
            src="https://picsum.photos/seed/about1/600/400"
            alt="About Medicare"
            className="w-full rounded-2xl object-cover shadow-md"
          />
        </div>
        <div className="md:w-3/5 flex flex-col gap-6 text-muted-foreground text-sm leading-relaxed">
          <p>
            Welcome to Medicare, your trusted partner in managing your healthcare needs conveniently and efficiently. At Medicare, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Medicare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Medicare is here to support you every step of the way.
          </p>
          <div>
            <h3 className="text-foreground font-bold text-base mb-3">Our Vision</h3>
            <p>
              Our vision at Medicare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-center mb-8 text-foreground">
          WHY <span className="text-primary">CHOOSE US</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-xl overflow-hidden">
          <div className="p-8 border-b md:border-b-0 md:border-r border-border hover:bg-primary hover:text-white group transition-colors duration-300 cursor-default">
            <h4 className="font-bold text-base mb-3 text-foreground group-hover:text-white">EFFICIENCY</h4>
            <p className="text-sm text-muted-foreground group-hover:text-white/90 leading-relaxed">
              Streamlined appointment scheduling that fits into your busy lifestyle, reducing wait times and simplifying your healthcare journey.
            </p>
          </div>
          <div className="p-8 border-b md:border-b-0 md:border-r border-border hover:bg-primary hover:text-white group transition-colors duration-300 cursor-default">
            <h4 className="font-bold text-base mb-3 text-foreground group-hover:text-white">CONVENIENCE</h4>
            <p className="text-sm text-muted-foreground group-hover:text-white/90 leading-relaxed">
              Access to a network of trusted healthcare professionals in your area, bringing you closer to quality medical care with just a few clicks.
            </p>
          </div>
          <div className="p-8 hover:bg-primary hover:text-white group transition-colors duration-300 cursor-default">
            <h4 className="font-bold text-base mb-3 text-foreground group-hover:text-white">PERSONALIZATION</h4>
            <p className="text-sm text-muted-foreground group-hover:text-white/90 leading-relaxed">
              Tailored recommendations and reminders to help you stay on top of your health and make informed decisions about your care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
