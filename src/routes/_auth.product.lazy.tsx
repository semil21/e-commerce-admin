import { createLazyFileRoute } from "@tanstack/react-router";
import AddProductPage from "../pages/addProduct";

export const Route = createLazyFileRoute("/_auth/product")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AddProductPage />
    </div>
  );
}
