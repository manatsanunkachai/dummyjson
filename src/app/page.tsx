import { auth } from "@/auth";
import { AuthButtons } from "./auth-buttons";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const session = await auth();
  const products = await getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Product Explorer
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              จัดการรายการสินค้า
            </p>
          </div>

          <AuthButtons
            isLoggedIn={isLoggedIn}
            userName={session?.user?.name}
          />
        </div>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Products
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-2 font-medium text-gray-700">
                  ราคา: {product.price} บาท
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>

                {isLoggedIn && (
                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <p className="mb-3 text-sm font-semibold text-gray-600">
                      จัดการสินค้า
                    </p>

                    <div className="flex gap-3">
                      <a
                        href={`/products/${product.id}/edit`}
                        className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                      >
                        ✏️ แก้ไข
                      </a>

                      <a
                        href={`/products/${product.id}/delete`}
                        className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        🗑️ ลบ
                      </a>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}