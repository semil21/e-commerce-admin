import { createLazyFileRoute } from "@tanstack/react-router";
import Category from "../pages/category";

export const Route = createLazyFileRoute("/_auth/category")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Category />
    </div>
  );
}
