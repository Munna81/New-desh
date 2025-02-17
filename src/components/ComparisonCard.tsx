import Image from "next/image";

interface Product {
  name: string;
  category: string;
  origin: string;
  image: string;
}

interface ComparisonCardProps {
  localProduct: Product;
  importedProduct: Product;
}

export default function ComparisonCard({
  localProduct,
  importedProduct,
}: ComparisonCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <div className="relative h-48 mb-4">
          <Image
            src={importedProduct.image}
            alt={importedProduct.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h3 className="text-xl font-semibold">{importedProduct.name}</h3>
        <p className="text-gray-600">{importedProduct.category}</p>
        <p className="text-sm text-gray-500">
          Origin: {importedProduct.origin}
        </p>
      </div>

      <div className="flex items-center">
        <span className="px-4 py-2 bg-yellow-400 rounded-full font-bold">
          VS
        </span>
      </div>

      <div className="flex-1">
        <div className="relative h-48 mb-4">
          <Image
            src={localProduct.image}
            alt={localProduct.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h3 className="text-xl font-semibold">{localProduct.name}</h3>
        <p className="text-gray-600">{localProduct.category}</p>
        <p className="text-sm text-gray-500">Origin: {localProduct.origin}</p>
      </div>
    </div>
  );
}
