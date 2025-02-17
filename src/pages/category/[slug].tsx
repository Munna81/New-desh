import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import SEO from "@/components/SEO";

interface Product {
  name: string;
  price: string;
  description?: string;
  benefits?: string[];
  image?: string;
  tags: string[];
}

interface Products {
  local_items: Product[];
  imported_items: Product[];
}

interface SEO {
  title: string;
  description: string;
}

interface LocalizedData {
  seo: SEO;
  products: Products;
}

interface CategoryData {
  bn: LocalizedData;
  en: LocalizedData;
  importData: {
    annualImport: string;
    impact: string;
  };
}

interface Props {
  data: CategoryData;
}

const ProductCard = ({
  product,
  type,
}: {
  product: Product;
  type: "imported" | "local";
}) => {
  const tagBg = type === "imported" ? "bg-red-100" : "bg-green-100";
  const tagText = type === "imported" ? "text-red-700" : "text-green-700";

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gray-100">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      {/* Content */}
      <div className="mt-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 break-words line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-1 mt-2">
          {product.tags?.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 ${tagBg} ${tagText} text-xs font-medium rounded-full`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Create a client-side only version of FacebookComments
const FacebookComments = dynamic(
  () => {
    return Promise.resolve(() => {
      const currentUrl = window.location.href;
      // Replace localhost with production URL and ensure /en/ path
      const commentUrl = currentUrl
        .replace(/^http:\/\/localhost:\d+/, "https://deshi-dusky.vercel.app")
        .replace(/\/(bn|en)\//, "/en/");

      return (
        <>
          <div id="fb-root"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0&appId=1115308760079585"
          ></script>

          <div
            className="fb-comments"
            data-href={commentUrl}
            data-width="100%"
            data-numposts="5"
            data-order-by="reverse_time"
          ></div>
        </>
      );
    });
  },
  { ssr: false }
);

export default function CategoryPage({ data }: Props) {
  const { locale } = useRouter();
  const lang = locale as "bn" | "en";
  const localizedData = data[lang];

  // State for active tab
  const [activeTab, setActiveTab] = useState<"imported" | "local">("imported");

  return (
    <>
      <SEO
        title={localizedData.seo.title}
        description={localizedData.seo.description}
        image={localizedData.products.imported_items[0]?.image}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              {localizedData.seo.title}
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              {localizedData.seo.description}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Imported Products Column */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  Imported Products
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {localizedData.products.imported_items.map((product) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      type="imported"
                    />
                  ))}
                </div>
              </div>

              {/* Local Products Column */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  Local Alternatives
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {localizedData.products.local_items.map((product) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      type="local"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View - Similar structure but with tabs */}
          <div className="md:hidden">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              {/* Tab Buttons */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setActiveTab("imported")}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === "imported"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Imported Products
                </button>
                <button
                  onClick={() => setActiveTab("local")}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === "local"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Local Alternatives
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 gap-4">
                {activeTab === "imported"
                  ? localizedData.products.imported_items.map((product) => (
                      <ProductCard
                        key={product.name}
                        product={product}
                        type="imported"
                      />
                    ))
                  : localizedData.products.local_items.map((product) => (
                      <ProductCard
                        key={product.name}
                        product={product}
                        type="local"
                      />
                    ))}
              </div>
            </div>
          </div>

          {/* Economic Impact Section */}
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Economic Impact
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-lg font-medium text-blue-900">
                  Annual Import: {data.importData.annualImport}
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {data.importData.impact}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              Comments
            </h2>
            <FacebookComments />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Read category files from the data directory
  const categoriesDir = path.join(process.cwd(), "src/data/categories");
  const files = fs.readdirSync(categoriesDir);
  const slugs = files.map((file) => file.replace(".json", ""));

  // Generate paths for each category in both languages
  const paths = slugs.flatMap((slug) => [
    { params: { slug }, locale: "bn" },
    { params: { slug }, locale: "en" },
  ]);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const filePath = path.join(
      process.cwd(),
      `src/data/categories/${slug}.json`
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent) as CategoryData;

    console.log("data\n", JSON.stringify(data, null, 2));

    return {
      props: {
        data,
      },
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
