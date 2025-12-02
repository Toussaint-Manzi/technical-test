import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  PageLayout,
  Header,
  MainContent,
  Flex,
  Section,
} from "@/src/layout/container.layout";
import { Text } from "@/src/layout/text.layout";
import { Button } from "@/src/layout/button.layout";
import { IconButton } from "@/src/layout/icon-button.layout";
import { Loader, EmptyState } from "@/src/layout/loader.layout";
import { useToast } from "@/src/layout/toast.layout";
import { logout, getCurrentUser } from "@/src/service/auth.service";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  reorderProducts,
} from "@/src/service/products.service";
import { Product, ProductInput, User } from "@/src/types";
import ProductForm from "./product-form.component";
import ProductList from "./product-list.component";

export default function ProductsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const userResult = await getCurrentUser();

    if (!userResult.success || !userResult.data) {
      router.push("/");
      return;
    }

    setUser(userResult.data);

    const productsResult = await getProducts();

    if (productsResult.success && productsResult.data) {
      setProducts(productsResult.data);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    showToast("Logged out successfully", "info");
    router.push("/");
  };

  const handleAddProduct = async (input: ProductInput) => {
    const result = await createProduct(input);

    if (result.success && result.data) {
      setProducts((prev) => [...prev, result.data!]);
      setShowForm(false);
      showToast("Product added", "success");
    } else {
      showToast(result.error || "Failed to add product", "error");
    }
  };

  const handleUpdateProduct = async (
    id: string,
    input: Partial<ProductInput>
  ) => {
    const result = await updateProduct(id, input);

    if (result.success && result.data) {
      setProducts((prev) => prev.map((p) => (p.id === id ? result.data! : p)));
      showToast("Product updated", "success");
      return true;
    } else {
      showToast(result.error || "Failed to update product", "error");
      return false;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const result = await deleteProduct(id);

    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted", "success");
    } else {
      showToast(result.error || "Failed to delete product", "error");
    }
  };

  const handleReorder = async (orderedIds: string[]) => {
    const result = await reorderProducts({ orderedIds });

    if (result.success && result.data) {
      setProducts(result.data);
    } else {
      showToast(result.error || "Failed to reorder", "error");
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <Loader fullScreen />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ProductsHeader user={user} onLogout={handleLogout} />
      <MainContent>
        <ProductsContent
          products={products}
          showForm={showForm}
          onShowForm={() => setShowForm(true)}
          onHideForm={() => setShowForm(false)}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onReorder={handleReorder}
        />
      </MainContent>
    </PageLayout>
  );
}

interface ProductsHeaderProps {
  user: User | null;
  onLogout: () => void;
}

function ProductsHeader({ user, onLogout }: ProductsHeaderProps) {
  return (
    <Header>
      <Text variant="h3" gradient>
        My Products
      </Text>
      <Flex gap="md">
        <Text variant="caption" color="accent-blue">
          {user?.email}
        </Text>
        <IconButton icon="logout" onClick={onLogout} title="Logout" />
      </Flex>
    </Header>
  );
}

interface ProductsContentProps {
  products: Product[];
  showForm: boolean;
  onShowForm: () => void;
  onHideForm: () => void;
  onAddProduct: (input: ProductInput) => Promise<void>;
  onUpdateProduct: (
    id: string,
    input: Partial<ProductInput>
  ) => Promise<boolean>;
  onDeleteProduct: (id: string) => Promise<void>;
  onReorder: (orderedIds: string[]) => Promise<void>;
}

function ProductsContent({
  products,
  showForm,
  onShowForm,
  onHideForm,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onReorder,
}: ProductsContentProps) {
  return (
    <>
      <Flex justify="between" align="center">
        <Text variant="h2" color="accent">
          Products ({products.length})
        </Text>
        {!showForm && <Button onClick={onShowForm}>Add Product</Button>}
      </Flex>

      {showForm && (
        <Section>
          <ProductForm onSubmit={onAddProduct} onCancel={onHideForm} />
        </Section>
      )}

      <Section>
        {products.length === 0 ? (
          <EmptyState
            title="No products yet"
            description="Add your first product to get started"
            action={
              !showForm && <Button onClick={onShowForm}>Add Product</Button>
            }
          />
        ) : (
          <ProductList
            products={products}
            onUpdate={onUpdateProduct}
            onDelete={onDeleteProduct}
            onReorder={onReorder}
          />
        )}
      </Section>
    </>
  );
}
