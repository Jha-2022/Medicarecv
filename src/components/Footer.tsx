import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <div className="md:mx-10 mt-16">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 text-sm">
        
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">✚</div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Medicare</h1>
          </div>
          <p className="w-full md:w-2/3 text-muted-foreground leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-foreground">COMPANY</p>
          <ul className="flex flex-col gap-2 text-muted-foreground">
            <li className="hover:text-primary transition-colors cursor-pointer w-max">Home</li>
            <li className="hover:text-primary transition-colors cursor-pointer w-max">About us</li>
            <li className="hover:text-primary transition-colors cursor-pointer w-max">Contact us</li>
            <li className="hover:text-primary transition-colors cursor-pointer w-max">Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-foreground">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-muted-foreground">
            <li className="flex items-center gap-2"><Phone size={16} /> +1-212-456-7890</li>
            <li className="flex items-center gap-2"><Mail size={16} /> greatstackdev@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className="border-border" />
        <p className="py-5 text-sm text-center text-muted-foreground">Copyright 2024 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  );
}
