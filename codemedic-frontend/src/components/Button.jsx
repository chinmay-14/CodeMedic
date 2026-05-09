function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg shadow-cyan-500/20"
    >
      {text}
    </button>
  );
}

export default Button;