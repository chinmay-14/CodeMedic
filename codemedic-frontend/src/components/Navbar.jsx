import Button from "./Button";
import Container from "./Container";

function Navbar() {
  return (
    <nav className="border-b border-gray-800">
      <Container>
        <div className="flex items-center justify-between py-4">

          <div className="flex items-center gap-3">

         <img
  src="/logo.png"
  alt="CodeMedic"
  className="w-12 h-12"
/>

            <h1 className="text-white text-2xl font-bold">
              CodeMedic
            </h1>

          </div>

          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
          </div>

          <Button text="Get Started" />

        </div>
      </Container>
    </nav>
  );
}

export default Navbar;