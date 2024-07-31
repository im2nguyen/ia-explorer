const Legend = () => {
  return (
    <div className="text-sm flex items-center space-x-4 mb-2 p-2 bg-gray-100 rounded">
      <span className="text-red-500 mr-1">Red text:</span> File path needed
      <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>Existing</span>
      <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>New</span>
      <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-400 mr-1"></span>Default</span>
    </div>
  );
};

export default Legend;