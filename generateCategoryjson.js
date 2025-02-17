const fs = require("fs/promises");
const path = require("path");

async function generateCategoryJson() {
  const categoriesDir = path.join(__dirname, "./public/images");
  const outputDir = path.join(__dirname, "./src/data/categories");

  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Read all category folders
    const categories = await fs.readdir(categoriesDir);

    for (const category of categories) {
      if (category === "categories") continue;

      const categoryPath = path.join(categoriesDir, category);
      const stat = await fs.stat(categoryPath);

      if (!stat.isDirectory()) continue;

      // Read local and imported folders
      const localDir = path.join(categoryPath, "local");
      const importedDir = path.join(categoryPath, "imported");

      // Generate products from image files
      const localItems = await generateProductsFromImages(localDir);
      const importedItems = await generateProductsFromImages(importedDir);

      // Create category JSON structure
      const categoryData = {
        bn: {
          seo: {
            title: "",
            description: "",
          },
          products: {
            local_items: localItems,
            imported_items: importedItems,
          },
        },
        en: {
          seo: {
            title: "",
            description: "",
          },
          products: {
            local_items: localItems,
            imported_items: importedItems,
          },
        },
        importData: {
          annualImport: "",
          impact: "",
        },
      };

      // Write JSON file
      const outputPath = path.join(outputDir, `${category}.json`);
      await fs.writeFile(outputPath, JSON.stringify(categoryData, null, 2));

      console.log(`Generated JSON for category: ${category}`);
    }
  } catch (error) {
    console.error("Error generating category JSON:", error);
  }
}

async function generateProductsFromImages(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    // Get the relative path segments
    const pathSegments = folderPath.split(path.sep);
    const categoryIndex = pathSegments.indexOf("images") + 1;
    const category = pathSegments[categoryIndex];
    const type = pathSegments[pathSegments.length - 1]; // 'local' or 'imported'

    return files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      })
      .map((file) => ({
        name: path.parse(file).name,
        price: "",
        description: "",
        benefits: [],
        available: true,
        image: `/images/${category}/${type}/${file}`,
      }));
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

// Run the script
generateCategoryJson()
  .then(() => {
    console.log("Category JSON generation completed");
  })
  .catch((error) => {
    console.error("Script failed:", error);
  });
