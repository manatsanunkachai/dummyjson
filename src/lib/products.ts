export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const initialProducts: Product[] = [
  {
    id: "p001",
    name: "Mechanical Keyboard",
    price: 2590,
    description: "คีย์บอร์ด Mechanical สำหรับทำงานและเล่นเกม",
  },
  {
    id: "p002",
    name: "Wireless Mouse",
    price: 1290,
    description: "เมาส์ไร้สายใช้งานสะดวก",
  },
  {
    id: "p003",
    name: "USB-C Hub",
    price: 1890,
    description: "USB-C Hub สำหรับเชื่อมต่ออุปกรณ์หลายชนิด",
  },
];

const globalForProducts = globalThis as typeof globalThis & {
  demoProducts?: Product[];
};

const products = globalForProducts.demoProducts ??= [...initialProducts];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return products.find((product) => product.id === id);
}

export async function updateProduct(
  id: string,
  data: Omit<Product, "id">
): Promise<Product | undefined> {
  const product = products.find((item) => item.id === id);

  if (!product) {
    return undefined;
  }

  product.name = data.name;
  product.price = data.price;
  product.description = data.description;

  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  return true;
}