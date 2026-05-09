function FeatureCard({ title, description }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-cyan-500 transition duration-300">
      
      <h2 className="text-white text-2xl font-semibold mb-4">
        {title}
      </h2>

      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;
