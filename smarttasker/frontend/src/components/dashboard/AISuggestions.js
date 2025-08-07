const AISuggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No suggestions available</div>;
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
          <h3 className="font-medium text-indigo-700 dark:text-indigo-300">{suggestion.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{suggestion.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AISuggestions;