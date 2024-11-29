import { createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { t } from "i18next";
import Category from "../pages/category";

export const Route = createLazyFileRoute("/_auth/category")({
  component: () => (
    <>
      <Category />
      <Helmet>
        <title>{t("dashboard")}</title>
      </Helmet>
    </>
  ),
});
