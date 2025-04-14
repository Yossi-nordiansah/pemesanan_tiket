const MyComponent = () => {
    return (
        <div className="relative w-full flex items-center justify-center text-center">
          {/* Background Image Absolute */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{
              backgroundImage: "url('/images/pattern-title.png')",
              backgroundPosition: "center",
              backgroundSize: "160% 100%",
            }}
          ></div>
  
          {/* Konten */}
          <div className="relative z-10 text-black px-6 md:py-56 py-24">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-4">
              METAVFEST 2025
            </h1>
            <p className="text-lg md:text-xl drop-shadow-md">
            Your one-stop gate to the biggest Web3 & crypto event, with gaming and anime as thrilling extras!
            </p>
          </div>
        </div>
    );
  };
  
  export default MyComponent;