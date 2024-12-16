import { createLazyFileRoute } from "@tanstack/react-router";
import ViewProduct from "../pages/viewProduct";

export const Route = createLazyFileRoute("/_auth/viewProduct")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ViewProduct />
    </div>
  );
}
