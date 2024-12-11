import { createLazyFileRoute } from "@tanstack/react-router";
import ProductPage from "../pages/product";

export const Route = createLazyFileRoute("/_auth/product")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProductPage />
    </div>
  );
}
