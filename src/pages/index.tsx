import { useRouter } from "next/router";
import Link from "next/link";
// import ComparisonCard from "@/components/ComparisonCard";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import SEO from "@/components/SEO";
import categoriesData from "@/data/categories.json";
const { categories, categoryTypeOrder } = categoriesData;

interface Category {
  id: number;
  name: {
    en: string;
    bn: string;
  };
  slug: string;
  image: string;
  productCount: number;
  tags: string[];
  categoryType: string; // Added this field
}

interface CategoryTypeTranslations {
  en: string;
  bn: string;
}

const categoryTypeTranslations: Record<string, CategoryTypeTranslations> = {
  Food: {
    en: "Food",
    bn: "খাবার",
  },
  "Cleaning Supplies": {
    en: "Cleaning Supplies",
    bn: "পরিষ্কার-পরিচ্ছন্নতা",
  },
  "Personal Care": {
    en: "Personal Care",
    bn: "ব্যক্তিগত যত্ন",
  },
  "Health & Wellness": {
    en: "Health & Wellness",
    bn: "স্বাস্থ্য ও সুস্থতা",
  },
  "Baby Care": {
    en: "Baby Care",
    bn: "শিশু যত্ন",
  },
  "Home & Kitchen": {
    en: "Home & Kitchen",
    bn: "গৃহস্থালি ও রান্নাঘর",
  },
  "Stationery & Office": {
    en: "Stationery & Office",
    bn: "স্টেশনারি ও অফিস",
  },
  "Pet Care": {
    en: "Pet Care",
    bn: "পোষা প্রাণীর যত্ন",
  },
  "Toys & Sports": {
    en: "Toys & Sports",
    bn: "খেলনা ও ক্রীড়া",
  },
  "Beauty & MakeUp": {
    en: "Beauty & MakeUp",
    bn: "সৌন্দর্য ও মেকআপ",
  },
  "Fashion & Lifestyle": {
    en: "Fashion & Lifestyle",
    bn: "ফ্যাশন ও লাইফস্টাইল",
  },
  "Vehicle Essentials": {
    en: "Vehicle Essentials",
    bn: "যানবাহন সামগ্রী",
  },
};

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (search: string) => {
    setSearchTerm(search);

    if (!search.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const searchLower = search.toLowerCase();
    const filtered = categories.filter((category) => {
      return (
        category.name[locale as keyof typeof category.name]
          .toLowerCase()
          .includes(searchLower) ||
        category.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });

    setFilteredCategories(filtered);
  };

  const groupedCategories = filteredCategories.reduce((acc, category) => {
    if (!acc[category.categoryType]) {
      acc[category.categoryType] = [];
    }
    acc[category.categoryType].push(category);
    return acc;
  }, {} as Record<string, Category[]>);

  return (
    <>
      <SEO
        title={
          locale === "bn"
            ? "দেশি পণ্য কিনুন, অর্থনীতিতে ভূমিকা রাখুন"
            : "Buy Local goods, Build our Nation"
        }
        description={
          locale === "bn"
            ? "স্থানীয় ব্যবসা শক্তিশালী করতে, কর্মসংস্থান তৈরি করতে এবং টেকসই উন্নয়নে দেশীয় পণ্য বেছে নিন।"
            : "Choose locally made products to empower businesses, create jobs, and promote sustainability."
        }
      />
      <div className="min-h-screen flex flex-col items-center px-4">
        {/* Hero Section */}
        <div className="text-center mb-4">
          <h1 className="text-base md:text-lg lg:text-2xl font-bold  bg-blue-100 p-6 rounded-lg shadow-md mb-3">
            {locale === "bn"
              ? "দেশি পণ্য কিনুন, অর্থনীতিতে ভূমিকা রাখুন"
              : "Buy Local Goods, Build Our Nation"}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {locale === "bn"
              ? "স্থানীয় ব্যবসা শক্তিশালী করতে, কর্মসংস্থান তৈরি করতে এবং টেকসই উন্নয়নে দেশীয় পণ্য বেছে নিন।"
              : "Choose locally made products to empower businesses, create jobs, and promote sustainability."}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearch={handleSearch}
            placeholder={
              locale === "bn" ? "পণ্য খুঁজুন..." : "Search products..."
            }
          />
        </div>

        {/* Categories by Type */}
        <div className="w-full max-w-6xl mb-8">
          {categoryTypeOrder.map((categoryType) => {
            const categories = groupedCategories[categoryType];
            if (!categories?.length) return null;

            return (
              <div key={categoryType} className="mb-6">
                <h2 className="text-4xl font-bold mb-4">
                  {
                    categoryTypeTranslations[categoryType][
                      locale as keyof CategoryTypeTranslations
                    ]
                  }
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="group"
                    >
                      <div className="aspect-square relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                        <Image
                          src={category.image}
                          alt={
                            category.name[locale as keyof typeof category.name]
                          }
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 w-full">
                            <h3 className="text-white text-2xl font-semibold">
                              {
                                category.name[
                                  locale as keyof typeof category.name
                                ]
                              }
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Local */}
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">
            {locale === "bn"
              ? "দেশীয় পণ্য কেন বেছে নেবেন?"
              : "Why Choose Local?"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 border rounded-lg">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {benefit.title[locale as keyof typeof benefit.title]}
                </h3>
                <p className="text-gray-600">
                  {
                    benefit.description[
                      locale as keyof typeof benefit.description
                    ]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Impact */}
        <div className="w-full max-w-6xl mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {locale === "bn" ? "অর্থনৈতিক প্রভাব" : "Economic Impact"}
          </h2>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {economicStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
              >
                <div className="text-4xl font-bold text-blue-600 mb-3">
                  {stat.figure}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {stat.label[locale as keyof typeof stat.label]}
                </h3>
                <p className="text-gray-600">
                  {stat.description[locale as keyof typeof stat.description]}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold mb-4">
              {locale === "bn"
                ? "আমাদের দেশের অর্থনীতি শক্তিশালী করুন"
                : "Strengthen Our Economy"}
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {locale === "bn"
                ? "দেশীয় পণ্য ব্যবহার করে আপনি শুধু নিজের টাকাই সাশ্রয় করছেন না, দেশের মূল্যবান বৈদেশিক মুদ্রাও সংরক্ষণ করছেন।"
                : "By choosing local products, you're not just saving money - you're helping preserve valuable foreign currency and strengthening our domestic economy."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const benefits = [
  {
    icon: "💪",
    title: {
      en: "Support Local Economy",
      bn: "স্থানীয় অর্থনীতি সমর্থন",
    },
    description: {
      en: "Every purchase of local products helps create jobs and strengthen our economy",
      bn: "প্রতিটি স্থানীয় পণ্যের ক্রয় কর্মসংস্থান সৃষ্টি করে এবং আমাদের অর্থনীতি শক্তিশালী করে",
    },
  },
  {
    icon: "🌱",
    title: {
      en: "Environmental Impact",
      bn: "পরিবেশগত প্রভাব",
    },
    description: {
      en: "Local products typically have a lower carbon footprint due to shorter transportation distances",
      bn: "কম পরিবহন দূরত্বের কারণে স্থানীয় পণ্যের কার্বন ফুটপ্রিন্ট কম",
    },
  },
  {
    icon: "🏆",
    title: {
      en: "Quality Assurance",
      bn: "মানের নিশ্চয়তা",
    },
    description: {
      en: "Local products are made under strict quality control and follow national standards",
      bn: "স্থানীয় পণ্য কঠোর মান নিয়ন্ত্রণে এবং জাতীয় মান অনুসরণ করে তৈরি করা হয়",
    },
  },
];

const economicStats = [
  {
    figure: "$18.2B",
    label: {
      en: "Annual Remittance in 2023",
      bn: "২০২৩ সালে বার্ষিক রেমিট্যান্স",
    },
    description: {
      en: "Bangladesh received $18.2 billion in remittances",
      bn: "বাংলাদেশ ১৮.২ বিলিয়ন ডলার রেমিট্যান্স পেয়েছে",
    },
  },
  {
    figure: "12%",
    label: {
      en: "Spent on Personal Care",
      bn: "ব্যক্তিগত যত্নে ব্যয়",
    },
    description: {
      en: "Of remittance is spent on imported personal care products",
      bn: "রেমিট্যান্সের এই অংশ আমদানিকৃত পণ্যে ব্যয় হয়",
    },
  },
  {
    figure: "$2.18B",
    label: {
      en: "Potential Savings",
      bn: "সম্ভাব্য সঞ্চয়",
    },
    description: {
      en: "Annual savings by choosing local alternatives",
      bn: "দেশীয় পণ্য বেছে নেওয়ার মাধ্যমে বার্ষিক সঞ্চয়",
    },
  },
];
