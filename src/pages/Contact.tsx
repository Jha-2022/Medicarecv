export default function Contact() {
  return (
    <div className="py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">
          CONTACT <span className="text-primary">US</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-16">
        <div className="md:w-2/5">
          <img
            src="/images/contact.png"
            alt="Contact Us"
            className="w-full rounded-2xl object-cover shadow-md"
          />
        </div>

        <div className="md:w-3/5 flex flex-col gap-8">
          <div>
            <h3 className="text-foreground font-bold text-base mb-4 uppercase tracking-wide">Our Office</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground leading-relaxed">
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
              <p className="mt-2">Tel: +1-212-456-7890</p>
              <p>Email: greatstackdev@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-bold text-base mb-3 uppercase tracking-wide">Careers at Medicare</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Learn more about our teams and job openings.
            </p>
            <button className="px-8 py-3 border border-foreground text-foreground text-sm font-medium rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
