import { Header, Flex } from "@/src/layout/container.layout";
import { Text } from "@/src/layout/text.layout";
import { IconButton } from "@/src/layout/icon-button.layout";
import { useAuth } from "@/src/context/auth.context";
import { useToast } from "@/src/layout/toast.layout";

export default function ProductsHeader() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    await logout();
    showToast("Logged out successfully", "info");
  };

  return (
    <Header>
      <Text variant="h3">My Products</Text>
      <Flex gap="md">
        <Text variant="caption" color="accent-blue">
          {user?.email}
        </Text>
        <IconButton icon="logout" onClick={handleLogout} title="Logout" />
      </Flex>
    </Header>
  );
}
