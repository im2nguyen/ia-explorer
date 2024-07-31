import { NavItemData } from "@/components/NavItem";

interface DetailsCardProps {
  item: NavItemData;
}

const DetailsCard = ({ item }: DetailsCardProps) => (
  <div className="p-4 border border-gray-300 rounded-md bg-white">
    <h3 className="font-semibold mb-2">Details</h3>
    <p className="mb-1"><strong>Title:</strong> <span className="break-words">{item.text}</span></p>
    {item.url && <p className="mb-1"><strong>URL:</strong> <span className="break-all">{item.url}</span></p>}
    {item.filePath && <p className="mb-1"><strong>File path:</strong> <span className="break-all">{item.filePath}</span></p>}
    {item.link && <p className="mb-1"><strong>Link:</strong> <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{item.link}</a></p>}
  </div>
);

export default DetailsCard;