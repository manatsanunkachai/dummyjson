import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <p>ไม่พบสินค้า</p>;
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main>
      <h1>ลบสินค้า</h1>

      <p>
        ต้องการลบสินค้า "{product.name}" ใช่หรือไม่?
      </p>

      <form action={deleteAction}>
        <button type="submit">ยืนยันการลบ</button>
        <Link href="/">ยกเลิก</Link>
      </form>
    </main>
  );
}