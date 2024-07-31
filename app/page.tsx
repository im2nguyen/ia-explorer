import IAExplorer from "@/components/IAExplorer";

const Main = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Information Architecture (IA) Explorer
          </h1>
          <p className="text-sm text-gray-600">
            Visualize and explore your information architecture structure using
            MarkDown.
          </p>
        </div>
      </header>
      <div className="border-t border-gray-200"></div>
      <IAExplorer />
    </div>
  );
};

export default Main;
