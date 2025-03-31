// Define all navigation categories and subcategories
export const navigationCategories = [
    {
      name: "New In!",
      link: "/new-arrivals",
      subCategories: [
        { name: "View all", link: "/new-arrivals" },
        { name: "This Week", link: "/new-arrivals/this-week" },
        { name: "Last Week", link: "/new-arrivals/last-week" },
      ],
    },
    {
      name: "Top Wear",
      link: "/top-wear",
      subCategories: [
        { name: "View all", link: "/top-wear" },
        { name: "Blouses", link: "/top-wear/blouses" },
        { name: "Tunics", link: "/top-wear/tunics" },
      ],
    },
    {
      name: "Sets",
      link: "/sets",
      subCategories: [
        { name: "View all", link: "/sets" },
        { name: "2 Piece sets", link: "/sets/2-piece" },
        { name: "3 Piece sets", link: "/sets/3-piece" },
      ],
    },
    {
      name: "Sarees",
      link: "/sarees",
      subCategories: [
        { name: "View all", link: "/sarees" },
        { name: "Saree Blouses", link: "/sarees/saree-blouses" },
        { name: "Kurtas", link: "/sarees/kurtas" },
        { name: "Dresses", link: "/sarees/dresses" },
        { name: "Tunics", link: "/sarees/tunics" },
        { name: "3 Piece sets", link: "/sarees/3-piece-sets" },
        { name: "2 Piece sets", link: "/sarees/2-piece-sets" },
        { name: "Unstitched Dress Materials", link: "/sarees/unstitched-materials" },
        { name: "Kaftans", link: "/sarees/kaftans" },
      ],
    },
    {
      name: "Blouses",
      link: "/blouses",
      subCategories: [
        { name: "View all", link: "/blouses" },
        { name: "Designer Blouses", link: "/blouses/designer" },
        { name: "Ready to Wear", link: "/blouses/ready-to-wear" },
      ],
    },
    {
      name: "Bottom wear",
      link: "/bottom-wear",
      subCategories: [
        { name: "View all", link: "/bottom-wear" },
        { name: "Pants", link: "/bottom-wear/pants" },
        { name: "Skirts", link: "/bottom-wear/skirts" },
        { name: "Palazzos", link: "/bottom-wear/palazzos" },
      ],
    },
    {
      name: "Dupattas & More",
      link: "/dupattas",
      subCategories: [
        { name: "View all", link: "/dupattas" },
        { name: "Dupattas", link: "/dupattas/all" },
        { name: "Stoles", link: "/dupattas/stoles" },
      ],
    },
    {
      name: "Sale",
      link: "/sale",
    },
    {
      name: "Collections",
      link: "/collections",
      subCategories: [
        { name: "View all", link: "/collections" },
        { name: "Festive Collection", link: "/collections/festive" },
        { name: "Bridal Collection", link: "/collections/bridal" },
        { name: "Summer Collection", link: "/collections/summer" },
      ],
    },
    {
      name: "Online Exclusive",
      link: "/online-exclusive",
    },
  ]
  
  // Helper function to get category info from URL path
  export const getCategoryInfoFromPath = (path) => {
    // Remove leading slash and split by slashes
    const segments = path.replace(/^\//, "").split("/")
  
    // Handle root categories
    if (segments.length === 1) {
      const mainCategory = navigationCategories.find((cat) => cat.link === `/${segments[0]}`)
  
      if (mainCategory) {
        return {
          title: mainCategory.name,
          breadcrumbs: [
            { name: "Home", link: "/" },
            { name: mainCategory.name, link: mainCategory.link },
          ],
        }
      }
    }
  
    // Handle subcategories
    if (segments.length >= 2) {
      const mainCategory = navigationCategories.find((cat) => cat.link === `/${segments[0]}`)
  
      if (mainCategory && mainCategory.subCategories) {
        const subCategory = mainCategory.subCategories.find((subCat) => subCat.link === `/${segments.join("/")}`)
  
        if (subCategory) {
          return {
            title: subCategory.name === "View all" ? mainCategory.name : subCategory.name,
            breadcrumbs: [
              { name: "Home", link: "/" },
              { name: mainCategory.name, link: mainCategory.link },
              { name: subCategory.name, link: subCategory.link },
            ],
          }
        }
      }
    }
  
    // Default fallback
    return {
      title: segments[segments.length - 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      breadcrumbs: [
        { name: "Home", link: "/" },
        {
          name: segments[segments.length - 1]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          link: `/${segments.join("/")}`,
        },
      ],
    }
  }
  
  // Helper function to get mock products for a category
  export const getMockProductsForCategory = (category) => {
    // This is a simplified version - in a real app, you'd fetch from an API
    const baseProducts = [
      {
        id: "product-1",
        title: "Gold Tussar V-Neck Back-Open Sleeveless Blouse",
        price: 1698,
        image: "https://images.unsplash.com/photo-1610189844577-60bc4d9c771c?q=80&w=1780&auto=format&fit=crop",
        sizes: ["34", "36", "38"],
        colors: ["#e9c46a", "#f4a261", "#e76f51"],
        isExclusive: false,
        category: "Saree Blouses",
        fabric: "Tussar Silk",
        fit: "Regular",
        pattern: "Solid",
        occasion: "Festive",
        sleeve: "Sleeveless",
      },
      {
        id: "product-2",
        title: "Blush Pink Sequinned Embellished Georgette Padded Blouse",
        price: 1798,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1780&auto=format&fit=crop",
        sizes: ["34", "36", "38"],
        colors: ["#ffb4a2", "#e5989b", "#b5838d"],
        isExclusive: true,
        category: "Saree Blouses",
        fabric: "Georgette",
        fit: "Regular",
        pattern: "Embellished",
        occasion: "Party",
        sleeve: "Sleeveless",
      },
      {
        id: "product-3",
        title: "Gold Tissue Sleeveless Blouse",
        price: 1498,
        image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?q=80&w=1780&auto=format&fit=crop",
        sizes: ["34", "36", "40"],
        colors: ["#dda15e", "#bc6c25", "#606c38"],
        isExclusive: false,
        category: "Saree Blouses",
        fabric: "Tissue",
        fit: "Regular",
        pattern: "Solid",
        occasion: "Work",
        sleeve: "Sleeveless",
      },
      {
        id: "product-4",
        title: "Elegant Floral Print Tunic",
        price: 2199,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1783&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#264653", "#2a9d8f", "#e9c46a"],
        isExclusive: false,
        category: "Tunics",
        fabric: "Cotton",
        fit: "Regular",
        pattern: "Printed",
        occasion: "Casual",
        sleeve: "Full Sleeve",
      },
      {
        id: "product-5",
        title: "Embroidered Palazzo Pants",
        price: 1899,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1788&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#000000", "#14213d", "#e5e5e5"],
        isExclusive: true,
        category: "Palazzos",
        fabric: "Rayon",
        fit: "Relaxed",
        pattern: "Embroidered",
        occasion: "Festive",
        sleeve: "N/A",
      },
      {
        id: "product-6",
        title: "Designer Silk Dupatta",
        price: 1299,
        image: "https://images.unsplash.com/photo-1614886137474-2d57dd8eb5e5?q=80&w=1780&auto=format&fit=crop",
        sizes: ["Free Size"],
        colors: ["#ff595e", "#ffca3a", "#8ac926"],
        isExclusive: false,
        category: "Dupattas",
        fabric: "Silk",
        fit: "N/A",
        pattern: "Woven",
        occasion: "Wedding",
        sleeve: "N/A",
      },
    ]
  
    // Filter products based on category
    // This is a simplified approach - in a real app, you'd have more sophisticated filtering
    const lowerCategory = category.toLowerCase()
  
    if (lowerCategory.includes("tunic")) {
      return baseProducts.filter((p) => p.category === "Tunics")
    } else if (lowerCategory.includes("blouse")) {
      return baseProducts.filter((p) => p.category === "Saree Blouses")
    } else if (lowerCategory.includes("palazzo")) {
      return baseProducts.filter((p) => p.category === "Palazzos")
    } else if (lowerCategory.includes("dupatta")) {
      return baseProducts.filter((p) => p.category === "Dupattas")
    }
  
    // Default: return all products
    return baseProducts
  }
  
  // Get category descriptions
  export const getCategoryDescription = (category) => {
    const descriptions = {
      "Saree Blouses":
        "Soch is known for its exquisite collection of readymade padded blouses that are designed to perfection. A blouse design plays an essential role in enhancing the overall look of a saree. For a modern look, opt for a boat neck blouse or a spaghetti blouse. Sleeveless blouses are perfect for a contemporary look.",
      Tunics:
        "Our collection of tunics features elegant designs with intricate embroidery and contemporary patterns. Perfect for casual outings or formal gatherings, these tunics are crafted from premium fabrics for comfort and style.",
      Palazzos:
        "Explore our range of palazzo pants that combine comfort with style. These flowing pants are perfect for any occasion and can be paired with kurtas, tunics, or tops for a chic look.",
      Dupattas:
        "Add the perfect finishing touch to your outfit with our collection of dupattas. From traditional designs to contemporary patterns, our dupattas are crafted from premium fabrics like silk, cotton, and chiffon.",
      default:
        "Explore our stunning collection crafted with meticulous attention to detail. From traditional designs to contemporary styles, find the perfect piece for every occasion.",
    }
  
    return descriptions[category] || descriptions.default
  }
  
  // Get category tabs
  export const getCategoryTabs = (category) => {
    const tabs = {
      "Saree Blouses": [
        { id: "festive", label: "FESTIVE WEAR BLOUSES" },
        { id: "party", label: "PARTY WEAR BLOUSES" },
        { id: "everyday", label: "EVERYDAY WEAR BLOUSES" },
        { id: "work", label: "WORK WEAR BLOUSES" },
      ],
      Tunics: [
        { id: "casual", label: "CASUAL TUNICS" },
        { id: "formal", label: "FORMAL TUNICS" },
        { id: "printed", label: "PRINTED TUNICS" },
        { id: "embroidered", label: "EMBROIDERED TUNICS" },
      ],
      Palazzos: [
        { id: "solid", label: "SOLID PALAZZOS" },
        { id: "printed", label: "PRINTED PALAZZOS" },
        { id: "embroidered", label: "EMBROIDERED PALAZZOS" },
      ],
      Dupattas: [
        { id: "silk", label: "SILK DUPATTAS" },
        { id: "cotton", label: "COTTON DUPATTAS" },
        { id: "embroidered", label: "EMBROIDERED DUPATTAS" },
        { id: "printed", label: "PRINTED DUPATTAS" },
      ],
      default: [
        { id: "all", label: "ALL PRODUCTS" },
        { id: "new", label: "NEW ARRIVALS" },
        { id: "bestsellers", label: "BESTSELLERS" },
      ],
    }
  
    return tabs[category] || tabs.default
  }
  
  // Get banner image for category
  export const getCategoryBanner = (category) => {
    const banners = {
      "Saree Blouses": {
        src: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1780&auto=format&fit=crop",
        alt: "Summer Tales Collection",
        title: "SUMMER TALES",
        subtitle: "Elegant blouses for the summer season",
      },
      Tunics: {
        src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1783&auto=format&fit=crop",
        alt: "Tunic Collection",
        title: "ELEGANT TUNICS",
        subtitle: "Contemporary designs for the modern woman",
      },
      Palazzos: {
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1788&auto=format&fit=crop",
        alt: "Palazzo Collection",
        title: "FLOWING ELEGANCE",
        subtitle: "Comfort meets style in our palazzo collection",
      },
      Dupattas: {
        src: "https://images.unsplash.com/photo-1614886137474-2d57dd8eb5e5?q=80&w=1780&auto=format&fit=crop",
        alt: "Dupatta Collection",
        title: "FINISHING TOUCHES",
        subtitle: "Complete your look with our elegant dupattas",
      },
      default: {
        src: "https://images.unsplash.com/photo-1610189844577-60bc4d9c771c?q=80&w=1887&auto=format&fit=crop",
        alt: "Collection Banner",
        title: "ELEGANT COLLECTION",
        subtitle: "Discover our exquisite collection",
      },
    }
  
    return banners[category] || banners.default
  }
  
  